/**
 * A grid plugin for live search support.
 */
Ext.define('Ext.ux.grid.plugin.LiveSearch', {
    extend: 'Ext.plugin.Abstract',

    alias: 'plugin.gridlivesearch',

    config: {
        /**
         * @cfg {String} searchValue
         * The search value.
         */
        searchValue: null,

        /**
         * @cfg {Boolean} caseSensitive
         * Case sensitive mode.
         */
        caseSensitive: false,

        /**
         * @cfg {Boolean} regExpMode
         * Regular expression mode.
         */
        regExpMode: false,

        /**
         * @private
         * The generated regular expression used for searching.
         */
        searchRegExp: null
    },

    /**
     * @cfg {String} matchCls
     * The matched string css class.
     */
    matchCls: 'x-livesearch-match',

    /**
     * @cfg {String} matchCountFormat
     * How to format the match count in the status text.
     */
    matchCountFormat: '0,000',

    /**
     * @cfg {String} defaultStatusText
     * The default text when no matches were found.
     */
    defaultStatusText: 'Nothing Found',

    /**
     * @cfg {String} statusTextFormat
     * The plural format of the status text.
     */
    statusTextFormat: '{0} matches found.',

    /**
     * @cfg {String} statusTextSingularFormat
     * The singular format of the status text.
     */
    statusTextSingularFormat: '{0} match found.',

    /**
     * @private
     * The matched positions from the most recent search
     */
    matches: [],

    /**
     * @private
     * The current index matched.
     */
    currentIndex: null,

    /**
     * @private
     * detects html tag
     */
    tagsRe: /<[^>]*>/gm,

    /**
     * @private
     * DEL ASCII code
     */
    tagsProtect: '\x0f',

    /**
     * @private
     * Config properties that this plugin publishes to the grids ViewModel
     */
    publishes: ['searchRegExp', 'statusText'],

    /**
     * Set up bidirectional links between the plugin and its host grid.
     */
    init: function(grid) {
        var scrollable;

        //<debug>
        if (!grid.isXType('tablepanel')) {
            Ext.raise('The gridlivesearch plugin is designed only for grids and trees');
        }
        //</debug>

        grid.setSearchValue   = Ext.bind(this.setSearchValue, this);
        grid.setCaseSensitive = Ext.bind(this.setCaseSensitive, this);
        grid.setRegExpMode    = Ext.bind(this.setRegExpMode, this);
        grid.findMatches      = Ext.bind(this.find, this);
        grid.gotoPrevMatch    = Ext.bind(this.gotoPrev, this);
        grid.gotoNextMatch    = Ext.bind(this.gotoNext, this);

        if (scrollable = grid.getScrollable()) {
            scrollable.on('scrollend', 'highlight', this);
        }

        Ext.each(this.publishes, function(value) {
            grid[value] = null;
            grid.getPublishes()[value] = true;
        });

        this.monitorGrid();
        this.monitorStore();

        return this.callParent(arguments);
    },

    /**
     * Break links between the plugin and the grid.
     */
    destroy: function() {
        var grid = this.getCmp();
        var scrollable;

        delete grid.setSearchValue;
        delete grid.setCaseSensitive;
        delete grid.setRegExpMode;
        delete grid.findMatches;
        delete grid.gotoPrevMatch;
        delete grid.gotoNextMatch;

        if (scrollable = grid.getScrollable()) {
            scrollable.un('scrollend', 'highlight', this);
        }

        if (this.gridListeners) {
            this.gridListeners.destroy();
        }

        if (this.storeListeners) {
            this.storeListeners.destroy();
        }

        this.callParent();
    },

    /**
     * Enables the plugin.
     */
    enable: function() {
        this.callParent();
        this.find();
    },

    /**
     * Disables the plugin.
     */
    disable: function() {
        this.callParent();
        this.reset();
    },

    /**
     * Observe the grid for events that requires a new search.
     */
    monitorGrid: function() {
        var grid = this.getCmp();

        if (this.gridListeners) {
            this.gridListeners.destroy();
        }

        this.gridListeners = grid.on({
            storechange: 'monitorStore',
            columnhide: 'find',
            columnshow: 'find',
            scope: this,
            buffer: 10,
            destroyable: true
        });
    },

    /**
     * Observe the store for events that requires a new search.
     */
    monitorStore: function() {
        var grid = this.getCmp();

        if (this.storeListeners) {
            this.storeListeners.destroy();
        }

        this.storeListeners = grid.getStore().on({
            load: 'find',
            filterchange: 'find',
            sortchange: 'find',
            groupchange: 'find',
            scope: this,
            delay: 1,
            destroyable: true
        });
    },

    /**
     * In normal mode it returns the value
     * with protected regexp characters.

     * In regular expression mode it returns the raw value
     * except if the regexp is invalid.
     */
    applySearchRegExp: function(value) {
        if (!value || value === '')
            return null;

        if (!this.regExpMode) {
            value = Ext.String.escapeRegex(value);
        } else {
            try {
                new RegExp(value);
            } catch (err) {
                this.publishState('statusText', err.message);
                return;
            }

            if (value === '^' || value === '$')
                return;
        }

        return new RegExp(value, 'g' + (this.caseSensitive ? '' : 'i'));
    },

    /**
     * Publish regexp value and find matches.
     */
    updateSearchRegExp: function(value) {
        this.publishState('searchRegExp', value);
        Ext.defer(this.find, 1, this);
    },

    /**
     * Retry find after search string has changed.
     */
    updateSearchValue: function(value) {
        this.setSearchRegExp(value);
    },

    /**
     * Update search regex after case sensitive mode has changed.
     */
    updateCaseSensitive: function() {
        this.setSearchRegExp(this.searchValue);
    },

    /**
     * Update search regex after regexp mode has changed.
     */
    updateRegExpMode: function() {
        this.setSearchRegExp(this.searchValue);
    },

    /**
     * Finds all strings that matches the searched value in each grid cells.
     */
    find: function() {
        var me    = this;
        var count = 0;

        if (this.disabled)
            return;

        this.reset();

        this.publishState('statusText', me.searchRegExp ? me.defaultStatusText : null);

        if (this.searchRegExp === null) {
            this.publishState('statusText', null);
            return;
        }

        this.forEachGrid(function(grid) {
            var view          = grid.getView();
            var cellSelector  = view.getCellSelector();
            var innerSelector = view.innerSelector;
            var columns       = grid.getVisibleColumns();

            view.rowValues.view = view;

            grid.getStore().each(function(record, rid) {
                var node = view.getNode(record);

                if (node) {
                    node = Ext.fly(node);
                }

                columns.forEach(function(column, cid) {
                    var cell, cellHTML, matches, seen, out = [];

                    if (column.liveSearch === false)
                        return;

                    if (node) {
                        cell     = node.down(column.getCellInnerSelector(), true);
                        cellHTML = cell ? cell.innerHTML : null;
                    } else {
                        view.renderCell(column, record, rid, rid, cid, out);
                        cellHTML = out.join('');
                    }

                    if (!cellHTML) return;

                    cellHTML = cellHTML.replace(me.tagsRe, me.tagsProtect);

                    if (cell) {
                        matches = cellHTML.match(me.tagsRe);
                    }

                    // populate indexes array and replace wrap matched string
                    cellHTML = cellHTML.replace(me.searchRegExp, function(m) {
                        ++count;

                        if (!seen) {
                            me.matches.push({
                                record: record,
                                column: column
                            });
                            seen = true;
                        }

                        return cell ? '<span class="' + me.matchCls + '">' + m + '</span>' : null;
                    });

                    if (!cell) return;

                    // restore protected tags
                    Ext.each(matches, function(match) {
                        cellHTML = cellHTML.replace(me.tagsProtect, match);
                    });

                    // update cell html
                    cell.innerHTML = cellHTML;
                });
            });

            view.rowValues.view = null;
        });

        this.publishState('statusText', this.getStatusText(count));

        if (count) {
            this.currentIndex = 0;
        } else
        if (this.currentIndex === null) {
            this.getCmp().getSelectionModel().deselectAll();
        }
     },

    /**
     * Reset all matched cells.
     */
    reset: function() {
        this.currentIndex = null;

        this.matches.forEach(function(item) {
            this.refreshNode(item.record);
        }, this.getCmp().getView());

        this.matches = [];
    },

    /**
     * Highlight matches for all rendered cells.
     */
    highlight: function() {
        this.matches.forEach(function(item) {
            var record   = item.record;
            var column   = item.column;
            var view     = column.getView();
            var node     = view.getNode(record);
            var matchCls = this.matchCls;
            var matches, cellHTML;

            if (!node) return;

            view.refreshNode(record);

            var node = Ext.fly(node);
            var cell = node.down(column.getCellInnerSelector(), true);

            if (!cell) return;

            matches  = cell.innerHTML.match(this.tagsRe);
            cellHTML = cell.innerHTML.replace(this.tagsRe, this.tagsProtect);

            // populate indexes array, set currentIndex, and replace wrap matched string in a span
            cellHTML = cellHTML.replace(this.searchRegExp, function(m) {
                return '<span class="' + matchCls + '">' + m + '</span>';
            });

            // restore protected tags
            Ext.each(matches, function(match) {
                cellHTML = cellHTML.replace(this.tagsProtect, match);
            }, this);

            // update cell html
            cell.innerHTML = cellHTML;
        }, this);
    },

    /**
     * Selects the previous row containing a match.
     */
    gotoPrev: function() {
        var len = this.matches.length;
        var idx = this.currentIndex;

        if (!len || this.disabled)
            return;

        this.currentIndex = idx === 0 ? len - 1 : idx - 1;
        this.gotoCurrent();
    },

    /**
     * Selects the next row containing a match.
     */
    gotoNext: function() {
        var len = this.matches.length;
        var idx = this.currentIndex;

        if (!len || this.disabled)
            return;

        this.currentIndex = idx === len - 1 ? 0 : idx + 1;
        this.gotoCurrent();
    },

    /**
     * Selects the current row.
     */
    gotoCurrent: function() {
        var idx = this.currentIndex;
        var pos = this.matches[idx];
        var cmp = this.getCmp();

        if (this.disabled)
            return;

        cmp.getNavigationModel()
           .setPosition(pos.record, pos.column);

        cmp.getSelectionModel()
           .select(pos.record);

        this.highlight();
    },

    /**
     * Invoke function for each grid.
     * A locked grid contains 2 grids.
     */
    forEachGrid: function(fn, scope) {
        var grid = this.getCmp();

        if (grid.enableLocking) {
            fn.call(scope || this, grid.lockedGrid);
            fn.call(scope || this, grid.normalGrid);
        } else {
            fn.call(scope || this, grid);
        };
    },

    /**
     * Construct the status text depend on the match count.
     */
    getStatusText: function(count) {
        var format = this.statusTextSingularFormat;
        var matchCount;

        if (count === 0)
            return this.defaultStatusText;

        if (count > 1 || !format)
            format = this.statusTextFormat;

        matchCount = Ext.util.Format.number(count, '0,000');

        return Ext.String.format(format, matchCount);
    },

    /**
     * Publish this components state to the ViewModel.
     */
    publishState: function(property, value) {
        this.getCmp().publishState(property, value);
    }
});
