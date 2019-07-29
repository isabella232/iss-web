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

Ext.define('Orbit.view.file.FileReloadController', {
    extend: 'Orbit.view.base.ViewController',

    alias: 'controller.filereload',

    listen: {
        store: {
            '#lines': {
                load: 'onContentLoaded'
            }
        }
    },

    /**
     * Bind listener functions.
     */
    init: function() {
        var vm = this.getViewModel();

        vm.bind('{planet}', 'onPlanetChanged', this);
        vm.bind('{file}',   'onFileChanged',   this);
        vm.bind('{cycle}',  'onCycleChanged',  this);
    },

    /**
     * Init cyclic reload for new logfile.
     */
    onContentLoaded: function() {
        this.startPolling();
    },

    /**
     * Clear cyclic reloads.
     */
    onPlanetChanged: function() {
        this.stopPolling();
    },

    /**
     * Setup cyclic releads.
     */
    onFileChanged: function() {
        this.startPolling();
    },

    /**
     * Set new cyclic relead interval.
     */
    onCycleChanged: function() {
        this.stopPolling();
        this.startPolling();
    },

    /**
     * If cyclic relead is activated.
     */
    isPolling: function() {
        return this.getData('interval');
    },

    /**
     * Init cycle reloads if enabled.
     */
    startPolling: function() {
        var cycle = this.getData('cycle');

        if (!(cycle.data && cycle.id > 0))
            return;

        if (!this.getData('file.id'))
            return;

        if (this.isPolling())
            return;

        if (this.isLoading())
            return;

        this.setData('interval', this.newInterval(cycle));
    },

    /**
     * Clear the cyclic interval.
     */
    stopPolling: function() {
        clearInterval(this.getData('interval'));
        this.setData('interval', null);
    },

    /**
     * If there's an ongoing load operation.
     */
    isLoading: function() {
        return this.getStore('lines').isLoading();
    },

    /**
     * Load content of the selected file.
     */
    loadContent: function() {
        this.loadStore('lines', 'file.id');
    },

    /**
     * Create a new interval and return its identifier.
     */
    newInterval: function(cycle) {
        return Ext.interval(this.loadContent, cycle.id, this);
    }
});
