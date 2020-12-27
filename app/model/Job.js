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

Ext.define('Orbit.model.Job', {
    extend: 'Orbit.model.Base',

    uses: [
        'Ext.Date'
    ],

    fields: [{
        name: 'id'
    },{
        name: 'name'
    },{
        name: 'runs',
        type: 'int'
    }, {
        name: 'lastRunAt',
        type: 'date',

        convert: function(val) {
            return new Date(val * 1000);
        }
    },{
        name: 'elapsedDays',
        type: 'int',

        calculate: function(data) {
            return Ext.Date.diff(data.lastRunAt, Date.now(), 'd');
        }
    }]
});
