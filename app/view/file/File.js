/*
 * This file is part of Orbit.
 * Copyright (c) 2016 appPlant GmbH.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

Ext.define('Orbit.view.file.File', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Ext.menu.Menu',
        'Ext.menu.CheckItem',
        'Ext.button.Button',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.Text',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Checkbox',
        'Ext.form.trigger.Trigger',

        'Ext.ux.DateTimeField',
        'Ext.ux.grid.plugin.LiveSearch',

        'Orbit.view.file.plugin.Exporter',
        'Orbit.view.file.FileController',
        'Orbit.view.file.FileExportController',
        'Orbit.view.file.FileReloadController',
        'Orbit.view.file.FileSearchController',
        'Orbit.view.file.FileModel',
    ],

    alias: 'widget.orbit-file',

    config: {
        activeState: null,
        defaultActiveState: '_'
    },

    controller: 'file',
    viewModel: 'file',

    reference: 'grid',
    cls: ['report-grid', 'whitespace-wrap'],
    emptyText: 'No content',
    columnLines: true,
    bufferedRenderer: true,
    leadingBufferZone: 80,
    trailingBufferZone: 40,

    viewConfig: {
        enableTextSelection: true,
        deferEmptyText: false,
        loadMask: true
    },

    plugins: ['gridlivesearch', 'gridexporter'],

    bind: {
        store: '{lines}',
        caseSensitive: '{isCaseSensitive.checked}',
        regExpMode: '{isRegExp.checked}',
        searchValue: '{searchField.value}'
    },

    columns: [{
        dataIndex: 'lineno',
        text: '#',
        width: 46,
        align: 'right',
        draggable: false,
        hideable: false,
        resizable: true,
        menuDisabled: true,
        sortable: false,
        liveSearch: false
    },{
        dataIndex: 'content',
        text: 'Content',
        flex: 1,
        sortable: false,
        hideable: false,
        draggable: false
    }],

    dockedItems: [{
        xtype: 'toolbar',
        margin: '0 0 19 0',
        padding: false,

        defaults: {
            width: 300,
            editable: true,
            hidden: true,
            minChars: 0,
            forceSelection: true,
            publishes: 'value',
            displayField: 'name',
            valueField: 'id',
            queryParam: null,

            defaultListConfig: {
                emptyText: 'No content',
                shadow: false,
                resizable: true,
                resizeHandles: 's'
            }
        },

        items: [{
            reference: 'planet',
            xtype: 'combobox',
            emptyText: 'Select a planet...',
            allowBlank: true,
            anyMatch: false,
            hidden: false,

            bind: {
                store: '{planets}',
                selection: '{planet}'
            },

            triggers: {
                refresh: {
                    cls: Ext.baseCSSPrefix + 'form-refresh-trigger',
                    extraCls: Ext.baseCSSPrefix + 'form-small-trigger',
                    tooltip: 'Update planet list',
                    handler: 'loadPlanets',
                    weight: -1
                }
            },

            tpl: [
                '<ul class="' + Ext.plainListCls + '"><tpl for=".">',
                    '<li role="option" class="' + Ext.baseCSSPrefix + 'boundlist-item">',
                        '<strong>{name}</strong>',
                        '<div class="' + Ext.baseCSSPrefix + 'boundlist-subitem">',
                            '{url}',
                        '</div>',
                    '</li>',
                '</tpl></ul>'
            ]
        },{
            reference: 'file',
            xtype: 'combobox',
            emptyText: 'Select a file...',
            displayField: 'fullName',
            anyMatch: true,
            width: Ext.isSafari ? 412 : 413,

            bind: {
                store: '{files}',
                selection: '{file}',
                hidden: '{!planet.value}'
            },

            triggers: {
                refresh: {
                    cls: Ext.baseCSSPrefix + 'form-refresh-trigger',
                    extraCls: Ext.baseCSSPrefix + 'form-small-trigger',
                    tooltip: 'Update file list',
                    handler: 'loadFiles',
                    weight: -1
                }
            },

            tpl: [
                '<ul class="' + Ext.plainListCls + '"><tpl for=".">',
                    '<li role="option" class="' + Ext.baseCSSPrefix + 'boundlist-item">',
                        '<strong>{name}</strong>',
                        '<div class="' + Ext.baseCSSPrefix + 'boundlist-subitem">',
                            '<tpl if="size &gt;= 1e+6">',
                                '{[(values.size / 1e+6).toFixed(2)]} MB',
                            '<tpl else>',
                                '{[(values.size / 1e+3).toFixed(2)]} kB',
                            '</tpl>',
                            '&emsp;',
                            '{[values.mtime.toLocaleString()]}',
                            '&emsp;',
                            '{plc_id}',
                        '</div>',
                    '</li>',
                '</tpl></ul>'
            ]
        },{
            reference: 'size',
            xtype: 'combobox',
            editable: false,
            displayField: 'text',
            value: -1e4,

            tpl: [
                '<ul class="' + Ext.plainListCls + '"><tpl for=".">',
                    '<li role="option" class="' + Ext.baseCSSPrefix + 'boundlist-item <tpl if="disabled">' + Ext.baseCSSPrefix + 'form-item-default ' + Ext.baseCSSPrefix + 'item-disabled</tpl>">',
                        '{text}',
                    '</li>',
                    '<tpl if="xindex % 2 == 0"><hr/></tpl>',
                '</tpl></ul>'
            ],

            bind: {
                store: '{sizes}',
                selection: '{size}',
                hidden: '{!file.value}'
            }
        },{
            reference: 'cycle',
            xtype: 'combobox',
            editable: false,
            displayField: 'text',
            value: 0,

            controller: 'filereload',

            triggers: {
                refresh: {
                    cls: Ext.baseCSSPrefix + 'form-refresh-trigger',
                    extraCls: Ext.baseCSSPrefix + 'form-small-trigger',
                    tooltip: 'Reload file',
                    handler: 'loadContent',
                    weight: -1
                }
            },

            bind: {
                store: '{cycles}',
                selection: '{cycle}',
                hidden: '{!file.value}'
            }
        }]
    },{
        xtype: 'toolbar',
        margin: '0 0 19 0',
        padding: false,
        hidden: true,

        controller: 'filesearch',

        bind: {
            hidden: '{!file.value}'
        },

        items: [{
            xtype: 'textfield',
            reference: 'searchField',
            publishes: 'value',
            emptyText: 'Search...',
            checkChangeBuffer: 500,
            width: 300,

            triggers: {
                prev: {
                    cls: Ext.baseCSSPrefix + 'form-caret-left-trigger',
                    extraCls: Ext.baseCSSPrefix + 'form-small-trigger',
                    tooltip: 'Backward',
                    handler: 'gotoPrevMatch'
                },
                next: {
                    cls: Ext.baseCSSPrefix + 'form-caret-right-trigger',
                    tooltip: 'Forward',
                    handler: 'gotoNextMatch'
                }
            }
        },{
            reference: 'isRegExp',
            xtype: 'checkbox',
            boxLabel: 'Regular expression',
            formatText: 'For example [0-9] or [a-z]{5,}'
        },{
            reference: 'isCaseSensitive',
            xtype: 'checkbox',
            boxLabel: 'Case sensitive'
        },{
            reference: 'isFilter',
            xtype: 'checkbox',
            boxLabel: 'Filter lines',
            formatText: 'Show matching lines only'
        },{
            reference: 'from',
            xtype: 'datetimefield',
            publishes: 'value',
            emptyText: 'From',
            width: 300,

            bind: {
                maxValue: '{to.value}'
            }
        },{
            reference: 'to',
            xtype: 'datetimefield',
            publishes: 'value',
            emptyText: 'To',
            width: 300,

            bind: {
                minValue: '{from.value}'
            }
        },{
            xtype: 'button',
            iconCls: 'x-fa fa-bars',
            arrowVisible: false,
            menuAlign: 'tr-br?',
            tooltip: 'More options',

            menu: [{
                text: 'Line wrap',
                checked: false,
                handler: 'onLineWrapToggle'
            },{
                text: 'Compact',
                checked: false,
                handler: 'onWhitespaceWrapToggle'
            },'-',{
                text: 'Font size',
                menu: [{
                    text: 'Smaller',
                    checked: false,
                    group: 'font-size',
                    fontSizeCls: 'font-size-smaller',
                    checkHandler: 'onFontSizeChange'
                },{
                    text: 'Small',
                    checked: false,
                    group: 'font-size',
                    fontSizeCls: 'font-size-small',
                    checkHandler: 'onFontSizeChange'
                },{
                    text: 'Regular',
                    checked: true,
                    group: 'font-size',
                    checkHandler: 'onFontSizeChange'
                },{
                    text: 'Large',
                    checked: false,
                    group: 'font-size',
                    fontSizeCls: 'font-size-large',
                    checkHandler: 'onFontSizeChange'
                },{
                    text: 'Larger',
                    checked: false,
                    group: 'font-size',
                    fontSizeCls: 'font-size-larger',
                    checkHandler: 'onFontSizeChange'
                }]
            },'-',{
                text: 'Export as',
                controller: 'fileexport',
                menu: [{
                    text: 'Text',
                    iconCls: 'x-fa fa-file-alt',
                    handler: 'onSaveAsText'
                },{
                    text: 'CSV',
                    iconCls: 'x-fa fa-file-csv',
                    handler: 'onSaveAsCSV'
                },'-',{
                    reference: 'isUnfiltered',
                    publishes: 'checked',
                    text: 'Unfiltered',
                    checked: false
                }]
            }]
        }]
    },{
        xtype: 'label',
        dock: 'bottom',
        userCls: 'orbit-file-search-status',
        hidden: true,

        bind: {
            text: '{grid.statusText}',
            hidden: '{!grid.statusText}'
        }
    }],

    isValidState: function(state) {
        if (!this.getActiveState()) {
            this.setActiveState(state)
        }

        return true;
    }
});
