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

Ext.define('Orbit.view.file.FileController', {
    extend: 'Orbit.view.base.ViewController',

    alias: 'controller.file',

    routes: {
        '!lfv/:state': {
            before: 'onBeforeNavigate'
        }
    },

    listen: {
        store: {
            '#planets': {
                load: { fn: 'onStoreLoaded', args: ['planet'] }
            },
            '#files': {
                load: { fn: 'onStoreLoaded', args: ['file'] }
            },
            '#lines': {
                load: 'onContentLoaded'
            }
        }
    },

    /**
     * Bind listener functions.
     */
    initViewModel: function(vm) {
        vm.bind('{planet}', 'onPlanetChanged', this);
        vm.bind('{file}',   'onFileChanged',   this);
        vm.bind('{size}',   'onSizeChanged',   this);
    },

    /**
     * Set fix planet if defined by route.
     */
    onBeforeNavigate: function(state) {
        var view     = this.getView();
        var defState = view.getDefaultActiveState();

        if (state != defState) {
            this.setFixPlanet(state);
        } else {
            this.unsetFixPlanet();
        }
    },

    /**
     * Cleanup and reset state.
     */
    onPlanetChanged: function(planet) {
        // this.clearStore('files');
        this.clearStore('lines');

        if (!planet.data)
            return;

        this.tweakCombo('file', 'remote', true);
    },

    /**
     * Load content of selected file.
     */
    onFileChanged: function() {
        this.setDocTitle('file.name', 'planet.name');
        this.loadContent();
    },

    /**
     * Reload content for new size.
     */
    onSizeChanged: function(value, oldValue) {
        if (!value || !oldValue)
            return;

        if (value.id == oldValue.id)
            return;

        this.loadContent();
    },

    /**
     * Filter locally once the store has been loaded.
     */
    onStoreLoaded: function(comboId) {
        this.tweakCombo(comboId, 'local');
    },

    /**
     * Scroll to the top or end of the content grid.
     */
    onContentLoaded: function() {
        this.scrollTo(this.getScrollY());
    },

    /**
     * Load list of planets.
     */
    loadPlanets: function() {
        this.resetCombo('planet');
        this.loadStore('planets');
    },

    /**
     * Load list of files from planet.
     */
    loadFiles: function() {
        this.resetCombo('file');
        this.loadStore('files', 'planet.id');
    },

    /**
     * Load content of the file.
     */
    loadContent: function() {
        this.loadStore('lines', 'file.id');
    },

    /**
     * Scroll to the y coordinate.
     */
    scrollTo: function(y) {
        var grid = this.getView();

        grid.view.refresh();
        grid.setScrollY(y);

        grid.view.refresh();
        grid.setScrollY(y);
    },

    /**
     * Disable selection of other planet.
     */
    setFixPlanet: function(id) {
        var combo = this.lookup('planet');
        var store = this.getStore('planets');

        combo.reset();
        combo.setReadOnly(true);

        store.load(function() {
            combo.setValue(id);
        });

        this.setFullscreen(true);
    },

    /**
     * Enable selection of any planet.
     */
    unsetFixPlanet: function() {
        var combo = this.lookup('planet');

        combo.setReadOnly(false);
        combo.reset();

        this.setFullscreen(false);
    },

    /**
     * Show or hide the navigation bar.
     */
    setFullscreen: function(value) {
        var main = Orbit.app.getMainView();
        var vm   = main.getViewModel();

        vm.set('fullscreen', value);
        vm.notify();
    },

    /**
     * Either the top or the end of the Y coordinate.
     */
    getScrollY: function() {
        return this.getData('size.id') >= 0 ? 0 : Infinity;
    }
});
