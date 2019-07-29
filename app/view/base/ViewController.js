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

Ext.define('Orbit.view.base.ViewController', {
    extend: 'Ext.app.ViewController',

    /**
     * Load store if date for path is given.
     */
    loadStore: function(storeId, path, callback, scope) {
        if (path && !this.getData(path)) {
            this.clearStore(storeId);
            return;
        }

        var store = this.getStore(storeId);

        if (store.isLoading())
            return;

        store.load();
    },

    /**
     * Clear store.
     */
    clearStore: function(storeId) {
        this.getStore(storeId).removeAll();
    },

    /**
     * Get the data value from the viewmodel.
     */
    getData: function(path) {
        return this.getViewModel().get(path);
    },

    /**
     * Set a value in the data for this viewmodel.
     */
    setData: function(path, value) {
        var vm = this.getViewModel();

        vm.set(path, value);
        vm.notify();
    },

    /**
     * Set query mode, delete last query and init trigger click.
     */
    tweakCombo: function(comboId, mode, doClick)
    {
        var combo = this.lookup(comboId);

        delete combo.lastQuery;
        combo.queryMode = mode;

        if (!doClick)
            return;

        Ext.defer(combo.onTriggerClick, 1, combo);
    },

    resetCombo: function(comboId) {
        this.lookup(comboId).reset();
    },

    /**
     * Update the page title.
     */
    setDocTitle: function(firstKey, otherKey)
    {
        var first = this.getData(firstKey);
        var other = this.getData(otherKey);
        var title = this.getView().getTitle();

        if (first && other) {
            title = first + ' · ' + other;
        }
        else if (first || other) {
            title = (first || other) + ' · ' + title;
        }

        Ext.getDoc().dom.title = title;
    }
});
