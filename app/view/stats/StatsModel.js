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

Ext.define('Orbit.view.stats.StatsModel', {
    extend: 'Ext.app.ViewModel',

    requires: [
        'Orbit.model.Meta'
    ],

    alias: 'viewmodel.stats',

    data: {
        stats: []
    },

    stores: {
        stats: {
            model: 'Meta',
            autoLoad: true,
            storeId: 'stats',

            proxy: {
                url: '/stats',
                type: 'ajax',
                reader: 'array',
                pageParam: '',
                startParam: '',
                limitParam: '',
                noCache: false
            },

            //<debug>
            data: [
                ['server', 'Instances', 41],
                ['db', 'Databases', 82],
                ['web', 'Webserver', 84],
                ['tool', 'Tools', 85]
            ],
            //</debug>
        }
    }
});
