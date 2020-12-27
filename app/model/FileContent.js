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

Ext.define('Orbit.model.FileContent', {
    extend: 'Orbit.model.Base',

    requires: [
        'Ext.data.identifier.Sequential'
    ],

    uses: [
        'Ext.Date'
    ],

    idProperty: '_id',
    identifier: 'sequential',

    fields: [{
        name: 'file_id',
        mapping: 0
    },{
        name: 'planet_id',
        mapping: 1
    },{
        name: 'lineno',
        type: 'int',
        mapping: 2
    },{
        name: 'content',
        mapping: 3
    },{
        name: 'timestamp',
        type: 'date',
        mapping: 4,
        defaultValue: new Date(),
        convert: function(ts) { if (ts) return Ext.Date.parse(ts[0], ts[1]); }
    },{
        name: '_id',
        mapping: 5
    }]
});
