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

Ext.define('Orbit.view.stats.Stats', {
    extend: 'Ext.Component',

    requires: [
        'Ext.layout.container.VBox',

        'Orbit.view.stats.StatsController',
        'Orbit.view.stats.StatsModel',
        'Orbit.view.stats.ToolTip'
    ],

    alias: 'widget.orbit-stats',

    cls: 'stats-tiles',
    height: 100,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    controller: 'stats',
    viewModel: 'stats',

    bind: {
        data: '{stats}'
    },

    tpl: [
        '<div class="stats">',
            '<tpl for=".">',
                '<span id="stats-{id}">',
                    '<div>{count}</div> {name}',
                '</span>',
            '</tpl>',
        '</div>'
    ]
});