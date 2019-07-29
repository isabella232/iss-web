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

Ext.define('Orbit.view.file.FileExportController', {
    extend: 'Orbit.view.base.ViewController',

    alias: 'controller.fileexport',

    /**
     * The referred grid instance.
     */
    getGrid: function() {
        return this.getView().up('grid');
    },

    /**
     * Exports grid content as a plain text file.
     */
    onSaveAsText: function() {
        this.getGrid().saveDocumentAs({
            type: 'plain',
            unfiltered: this.getData('isUnfiltered.checked'),
            fileName: this.getData('file.id') + '.txt'
        });
    },

    /**
     * Exports grid content as a csv file.
     */
    onSaveAsCSV: function() {
        this.getGrid().saveDocumentAs({
            type: 'csv',
            unfiltered: this.getData('isUnfiltered.checked'),
            fileName: this.getData('file.id') + '.csv'
        });
    }
});
