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

Ext.define('Orbit.view.report.plugin.ReconfigurableColumns', {
    extend: 'Ext.plugin.Abstract',

    alias: 'plugin.reconfigurablecolumns',

    /**
     * @cfg [Array] defaultFields
     * The default fields for every model.
     */
    defaultFields: [],

    /**
     * @cfg [Array]
     * An array of columns to show by default regardless of the model field.
     */
    defaultColumns: [],

    /**
     * @cfg [Object] columnDefaults
     * This option is a means of applying default settings to all columns.
     */
    columnDefaults: {},

    /**
     * Binds the reconfiguration method to the grid.
     */
    init: function(grid) {
        //<debug>
        if (!grid.isXType('tablepanel')) {
            Ext.raise('The gridautoselector plugin is designed only for grids and trees');
        }
        //</debug>

        grid.reconfigureColumns =
        Ext.bind(this.reconfigureColumns, this);

        return this.callParent(arguments);
    },

    /**
     * Break links between the plugin and the grid.
     */
    destroy: function() {
        delete this.getCmp().reconfigurablecolumns;
        this.callParent();
    },

    /**
     * Reconfigures the grid with a new columns.
     */
    reconfigureColumns: function(columns) {
        var grid   = this.getCmp();
        var store  = grid.getStore();
        var cols   = this.convertToGridColumns(columns);
        var fields = this.convertToModelFields(columns);

        grid.reconfiguring = true;
        Ext.suspendLayouts();

        grid.setColumns(cols);

        grid.lock(Ext.Array.findBy(grid.getColumns(), function(col) {
            return col.locked;
        }));

        store.setFields(fields);
        store.getProxy().getReader().setModel(store.model);

        delete grid.reconfiguring;
        Ext.resumeLayouts(true);
    },

    /**
     * Convert the result columns into grid columns.
     */
    convertToGridColumns: function(columns) {
        var cols    = Ext.Array.clone(this.defaultColumns);
        var colDefs = this.columnDefaults;

        columns.forEach(function(column, idx) {
            cols.push(Ext.apply({
                text: column[0],
                dataIndex: column[0],
                align: column[1] == 'string' ? 'left' : 'right'
            }, colDefs));
        });

        return cols;
    },

    /**
     * Convert the result columns into model fields.
     */
    convertToModelFields: function(columns) {
        var fields = Ext.Array.clone(this.defaultFields);
        var offset = fields.length;

        columns.forEach(function(column, idx) {
            fields.push({
                name: column[0],
                type: column[1],
                mapping: offset + idx
            });
        });

        return fields;
    }
});
