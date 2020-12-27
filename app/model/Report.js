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

Ext.define('Orbit.model.Report', {
    extend: 'Orbit.model.Base',

    uses: [
        'Ext.Date'
    ],

    fields: [{
        name: 'job_id'
    },{
        name: 'timestamp',
        type: 'date',

        convert: function(val) {
            return new Date(val * 1000);
        }
    },{
        name: 'columns',
        defaultValue: ['planet', 'Planet', 'string']
    },{
        name: 'name',
        type: 'string',

        calculate: function(data) {
            return data.timestamp.toUTCString();
        }
    },{
        name: 'elapsedDays',
        type: 'int',

        calculate: function(data) {
            return Ext.Date.diff(data.timestamp, Date.now(), 'd');
        }
    }]
});
