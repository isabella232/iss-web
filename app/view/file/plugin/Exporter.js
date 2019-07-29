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

Ext.define('Orbit.view.file.plugin.Exporter', {
    extend: 'Ext.plugin.Abstract',

    alias: 'plugin.gridexporter',

    statics: {
        converterFns: {
            plain: function(rec) {
                return (rec.get('content') || '') + "\n";
            },

            csv: function(rec) {
                return '"' + (rec.get('content') || '').replace('"', '""') + '",\n';
            }
        }
    },

    /**
     * @cfg {String} defaultType
     * The default type to use if no other type was specified.
     */
    defaultType: 'plain',

    /**
     * Set up bidirectional links between the plugin and the grid.
     */
    init: function(grid) {
        grid.saveDocumentAs = Ext.bind(this.saveDocumentAs, this);
        grid.getDocumentData = Ext.bind(this.getDocumentData, this);

        this.callParent(arguments);
    },

    /**
     * Break links between the plugin and the grid.
     */
    destroy: function() {
        var grid = this.getCmp();

        delete grid.saveDocumentAs;
        delete grid.getDocumentData;

        this.callParent();
    },

    /**
     * Saves the grid content as specified as a local file download.
     */
    saveDocumentAs: function(config) {
        var data = this.getDocumentData(config);
        var type = this.getContentType(config.type);
        var blob = new Blob(data, { type: type });

        if (this.disabled)
            return;

        window.saveAs(blob, config.fileName);
    },

    /**
     * Extracts the formatted grid content to save.
     */
    getDocumentData: function(config) {
        var items       = this.getItems(config.unfiltered);
        var type        = config.type || this.defaultType;
        var converterFn = this.self.converterFns[type];

        return items.map(converterFn, this);
    },

    /**
     * Returns all items from the collection or only the filtered ones.
     */
    getItems: function(unfiltered) {
        var data = this.getCmp().getStore().getData();

        if (unfiltered) {
            data = data.getSource();
        }

        return data.items;
    },

    /**
     * Maps the export type to a content type.
     */
    getContentType(type) {
        var type = type || this.defaultType;

        return Ext.String.format('text/{0};charset=utf-8', type);
    }
});