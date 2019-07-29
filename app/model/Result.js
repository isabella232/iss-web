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

Ext.define('Orbit.model.Result', {
    extend: 'Orbit.model.Base',

    requires: [
        'Ext.data.identifier.Sequential'
    ],

    idProperty: '_id',
    identifier: 'sequential',

    statics: {
        getDefaultFields: function() {
            return [{
                name: 'job_id',
                mapping: 0
            },{
                name: 'report_id',
                mapping: 1
            },{
                name: 'planet_id',
                mapping: 2
            },{
                name: 'planet',
                mapping: 3
            },{
                name: 'valid',
                type: 'boolean',
                mapping: 4
            }]
        }
    },

    fields: [{
        name: 'job_id',
        mapping: 0
    },{
        name: 'report_id',
        mapping: 1
    },{
        name: 'planet_id',
        mapping: 2
    },{
        name: 'planet',
        mapping: 3
    },{
        name: 'valid',
        type: 'boolean',
        mapping: 4
    }],

    //<debug>
    fields: [
        'job_id', 'report_id', 'planet_id', 'planet', 'valid', "gateway", "telhandlerkm", "leappeng", "telhandlergp", "legsysmon", "gw_cp", "gw_cp_motor", "gw_ipsl", "gw_ipsq", "gw_plc", "gw_ps1", "gw_ps2", "gw_pt", "gw_sap", "gw_tia", "gw_disp", "gw_export", "gw_ng4", "gw_vflex", "gw_sicalis", "gw_kisslr", "gw_zta_dyz", "gw_zta_dyz_ps", "gw_cp_guss", "gw_pdem", "gw_ps", "gw_lw6", "gw_ab", "mls_adaptor", "mls_config_adaptor", "showver", "os", "unix", "webapp", "AdminVersion", "AdminVersions", "DB", "LC2", "Oracle", "adm", "ipa_core", "mls", "mqs", "nedit", "qca", "qxx", "ftf", "km", "lfv", "km_configurator", "python", "ipa_tools", '_id'
    ]
    //</debug>
});
