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

Ext.define('Orbit.view.stats.StatsController', {
    extend: 'Orbit.view.base.ViewController',

    uses: [
        'Orbit.view.stats.ToolTip'
    ],

    alias: 'controller.stats',

    listen: {
        store: {
            '#stats': {
                load: 'onStatsLoaded'
            }
        }
    },

    /**
     * Update the status bar to display the meta stats.
     */
    onStatsLoaded: function(store) {
        var stats = store.data.items;

        this.setData('stats', stats.map(function(rec) {
            return rec.data;
        }));

        this.createToolTips();
    },

    /**
     * Create tooltips for the meta stats.
     */
    createToolTips: function(stats) {
        this.getStore('stats').each(this.createToolTip, this);
    },

    /**
     * Create tooltip for the meta.
     */
    createToolTip: function(meta) {
        Ext.create({ xtype: 'statstooltip', record: meta });
    }
});
