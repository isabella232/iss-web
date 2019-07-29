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

Ext.define('Orbit.view.file.FileSearchController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.filesearch',

    /**
     * Select previous row containing a match.
     */
    gotoPrevious: function() {
        this.getGrid().gotoPrevMatch();
    },

    /**
     * Select next row containing a match.
     */
    gotoNext: function() {
        this.getGrid().gotoNextMatch();
    },

    /**
     * Toggle line wrap mode.
     */
    onLineWrapToggle: function(checkbox) {
        var grid    = this.getGrid();
        var checked = checkbox.checked;

        grid.el.toggleCls('line-wrap', checked);

        grid.view.variableRowHeight = checked;

        grid.getVisibleColumnManager()
            .getColumns()[1]
            .variableRowHeight = checked;
    },

    /**
     * Toggle whitespace mode.
     */
    onWhitespaceWrapToggle: function(checkbox) {
        this.getGrid().el.toggleCls('whitespace-wrap', !checkbox.checked);
    },

    /**
     * Change font size for each row.
     */
    onFontSizeChange: function(checkbox, checked) {
        var grid = this.getGrid();

        if (checkbox.fontSizeCls) {
            grid.el.toggleCls(checkbox.fontSizeCls, checked);
        }

        grid.updateLayout();
    },

    /**
     * The referred grid instance.
     */
    getGrid: function() {
        return this.getView().up('grid');
    }
});
