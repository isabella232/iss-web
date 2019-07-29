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

Ext.define('Orbit.model.File', {
    extend: 'Orbit.model.Base',

    fields: [{
        name: 'id',
        type: 'string'
    },{
        name: 'planet_id',
        type: 'string'
    },{
        name: 'plc_id',
        type: 'string'
    },{
        name: 'name',
        type: 'string'
    },{
        name: 'size',
        type: 'int'
    },{
        name: 'mtime',
        type: 'date',

        convert: function(val) {
            return new Date(val * 1000);
        }
    },{
        name: 'fullName',

        calculate: function(data) {
            return data.plc_id ? data.name + ' [' + data.plc_id + ']' : data.name;
        }
    }]
});