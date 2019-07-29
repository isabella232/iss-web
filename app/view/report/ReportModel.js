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

Ext.define('Orbit.view.report.ReportModel', {
    extend: 'Ext.app.ViewModel',

    requires: [
        'Orbit.model.Job',
        'Orbit.model.Report',
        'Orbit.model.Result'
    ],

    alias: 'viewmodel.report',

    stores: {
        jobs: {
            model: 'Job',

            proxy: {
                url: '/jobs',
                type: 'ajax',
                reader: 'array',
                pageParam: '',
                startParam: '',
                limitParam: '',
                noCache: false
            },

            //<debug>
            data: [
                ['hostname', 'hostname', 0, null],
                ['showver', 'showver', 2, 1494162353]
            ],
            //</debug>

            sorters: [{
                property: 'name'
            }]
        },

        reports: {
            model: 'Report',

            proxy: {
                url: '/jobs/{job.value}/reports',
                type: 'ajax',
                reader: 'array',
                pageParam: '',
                startParam: '',
                limitParam: '',
                noCache: false
            },

            //<debug>
            data: [
                ['1494162186', 'showver', '1494162186', [["gateway", "string"], ["telhandlerkm", "string"], ["leappeng", "string"], ["telhandlergp", "string"], ["legsysmon", "string"], ["gw_cp", "string"], ["gw_cp_motor", "string"], ["gw_ipsl", "string"], ["gw_ipsq", "string"], ["gw_plc", "string"], ["gw_ps1", "string"], ["gw_ps2", "string"], ["gw_pt", "string"], ["gw_sap", "string"], ["gw_tia", "string"], ["gw_disp", "string"], ["gw_export", "string"], ["gw_ng4", "string"], ["gw_vflex", "string"], ["gw_sicalis", "string"], ["gw_kisslr", "string"], ["gw_zta_dyz", "string"], ["gw_zta_dyz_ps", "string"], ["gw_cp_guss", "string"], ["gw_pdem", "string"], ["gw_ps", "string"], ["gw_lw6", "string"], ["gw_ab", "string"], ["mls_adaptor", "string"], ["mls_config_adaptor", "string"], ["showver", "string"], ["os", "string"], ["unix", "string"], ["webapp", "string"], ["AdminVersion", "string"], ["AdminVersions", "string"], ["DB", "string"], ["LC2", "string"], ["Oracle", "string"], ["adm", "string"], ["ipa_core", "string"], ["mls", "string"], ["mqs", "string"], ["nedit", "string"], ["qca", "string"], ["qxx", "string"], ["ftf", "string"], ["km", "string"], ["lfv", "string"], ["km_configurator", "string"], ["python", "string"], ["ipa_tools", "string"]]],
                ['1494162353', 'showver', '1494162353', [["gateway", "string"], ["telhandlerkm", "string"], ["leappeng", "string"]]],
                ['1494199181', 'hostname', '1494199181', [["Hostname", "string"], ["Anzahl", "int"]]]
            ],
            //</debug>

            filters: [{
                property: 'job_id',
                value: '{job.value}',
                exactMatch: true
            }],

            sorters: [{
                property: 'timestamp',
                direction: 'DESC'
            }]
        },
        results: {
            model: 'Result',

            proxy: {
                url: '/jobs/{job.value}/reports/{report.value}/results',
                type: 'ajax',
                reader: 'array',
                pageParam: '',
                startParam: '',
                limitParam: '',
                noCache: false,
                timeout: 60000
            },

            //<debug>
            data: [
                ['showver','1494162353','p07-mcv-int','Leipzig MCV INT',true, '4.7.1.1 (build time Mar 16 2017 13:26:11)', '4.7.1.0 (build time Dec  9 2016 07:07:32)', 'V4.7.1.1 R21345 for Java 1.7'],
                ["showver","1494162186","p01-prod","München Fahrzeugwerk",true,"4.7.1.1","4.7.1.0","V4.7.1.7","","1.19","4.7.1.2","","4.7.1.0","","4.7.1.1","4.7.1.0","4.7.1.0","","4.7.1.3","4.7.1.2","4.7.1.0","4.7.1.0","","","","4.7.1.0","","","","","","","","2.12","1.2","","Linux lp01ipst2vm 3.0.101-0.7.53.1.13090.1.PTF-xen #1 SMP Thu Jun 29 08:36:04 UTC 2017 (f839fa7) x86_64 x86_64 x86_64 GNU/Linux","SUSE Linux Enterprise Server 11 (x86_64); VERSION = 11; PATCHLEVEL = 2","","keine","keine","IPS-T 4.7.1.009","V1.0.6.0, V1.0.7.0, V1.0.7.1, V1.0.7.3, V1.0.7.4","Oracle Database 12c Enterprise Edition Release 12.1.0.2.0 - 64bit Production","2.8.9-1","1.5.3-1","4.7.1-2","2.3.9-1","5.5.0-2","4.3.5-1","9.5.3-1","","4.12.7-1","1.7.2-1","","",""],
                ["showver","1494162186","p01-int","München Fahrzeugwerk INT",true,"4.7.1.1","4.7.1.0","V4.7.1.1","","1.19","4.7.1.2","","4.7.1.0","","4.7.1.1","4.7.1.0","4.7.1.0","","4.7.1.3","4.7.1.3","4.7.1.0","4.7.1.0","","","","4.7.1.0","","","","","","","","1.1","","2.2","Linux li01ipst2vm 3.0.101-0.7.53.1.15185.0.PTF-xen #1 SMP Wed Apr 11 06:44:50 UTC 2018 (fe2f412) x86_64 x86_64 x86_64 GNU/Linux","SUSE Linux Enterprise Server 11 (x86_64); VERSION = 11; PATCHLEVEL = 2","","keine","keine","IPS-T 4.7.1.009","V1.0.7.0, V1.0.7.1, V1.0.7.3, V1.0.7.4","Oracle Database 12c Enterprise Edition Release 12.1.0.2.0 - 64bit Production","2.8.9-1","1.5.3-1","4.7.1-2","2.3.9-1","5.5.0-2","4.3.5-1","9.5.3-1","1.3.6-1","4.12.7-1","1.7.2-1","1.0.2-2","3.6.2.1-1",""],
                ["showver","1494162186","p01-mot-prod","München Motorenwerk",false,"","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""],
                ["showver","1494162186","p01-mot-int","München Motorenwerk INT",true,"4.7.1.1","4.7.1.0","V4.6.1.2","","1.19","","4.7.1.2","","","","4.7.1.0","4.7.1.0","","4.6.0.0","","","","","","","","","","","","","","","2.4","","2.2","Linux lt01ipstam2vm 3.0.101-0.7.53-xen #1 SMP Mon Jan 23 15:58:00 UTC 2017 (92ef197) x86_64 x86_64 x86_64 GNU/Linux","SUSE Linux Enterprise Server 11 (x86_64); VERSION = 11; PATCHLEVEL = 2","","4.5.1.1","V4.4.1.7,V4.4.1.11,V4.4.1.12,V4.5.0.0,V4.5.1.1","IPS-T 4.7.1.009","V1.0.7.0,V1.0.7.1, V1.0.7.3, V1.0.7.4","Oracle Database 12c Enterprise Edition Release 12.1.0.2.0 - 64bit Production","2.8.8-1","","","","","","","","","","","",""],
                ["showver","1494162186","p21-prod","Dingolfing Fahrzeugwerk",false,"","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""],
                ["showver","1494162186","p24-prod","Dingolfing",true,"4.7.1.1","4.7.1.0","V4.7.1.7","","","4.7.1.2","","4.7.1.0","4.7.1.0","4.7.1.1","4.7.1.0","4.7.1.0","","4.7.1.3","4.7.1.3","","4.7.1.0","","","","","","","","","","","","","","","Linux lp02ipst2vm 3.0.101-0.7.53-xen #1 SMP Mon Jan 23 15:58:00 UTC 2017 (92ef197) x86_64 x86_64 x86_64 GNU/Linux","SUSE Linux Enterprise Server 11 (x86_64); VERSION = 11; PATCHLEVEL = 2","","Keine","Keine","IPS-T 4.7.1.009","V1.0.5.1,V1.0.2.1,V1.0.3.0,V1.0.3.1,V1.0.4.0,V1.0.5.0,V1.0.5.2,V1.0.6.0, V1.0.7.0,V1.0.7.1, V1.0.7.2, V1.0.7.3, V1.0.7.4","Oracle Database 12c Enterprise Edition Release 12.1.0.2.0 - 64bit Production","2.8.9-1","1.5.3-1","4.7.1-2","2.3.9-1","5.5.0-2","4.3.5-1","9.5.3-1","","4.12.7-1","1.7.2-1","","",""],
                ["showver","1494162186","p24-int","Dingolfing INT",true,"4.7.1.1","4.7.1.0","V4.7.1.10","","1.2","4.7.1.2","","4.7.1.0","4.7.1.0","4.7.1.1","4.7.1.1","4.7.1.0","","4.7.1.3","4.7.1.4","","","","","4.7.1.1","","","","","","","","","1.1","1.1","2.2","Linux lt02ipstvm 3.0.101-0.7.53.1.13958.0.PTF-xen #1 SMP Thu Oct 19 13:12:00 UTC 2017 (e08e0ba) x86_64 x86_64 x86_64 GNU/Linux","SUSE Linux Enterprise Server 11 (x86_64); VERSION = 11; PATCHLEVEL = 2","","","","","","","2.9.0-2","","4.7.1-2","2.3.9-1","5.5.0-2","4.3.5-1","9.5.3-1","","4.12.7-1","1.7.2-1","","",""],
                ["showver","1494162186","p24-tkb-prod","Dingolfing TKB",true,"4.7.1.1","4.7.1.0","V4.7.1.7","","1.21","4.7.1.2","","4.7.1.0","","","4.7.1.0","4.7.1.0","","4.7.1.3","4.7.1.3","","","","","4.7.1.1","4.7.1.0","","","","","","","","2.12","1.2","2.2","Linux lp02tkbt2vm 3.0.101-0.7.53.1.13958.0.PTF-xen #1 SMP Thu Oct 19 13:12:00 UTC 2017 (e08e0ba) x86_64 x86_64 x86_64 GNU/Linux","SUSE Linux Enterprise Server 11 (x86_64); VERSION = 11; PATCHLEVEL = 2","","KEINE","KEINE","IPS-T 4.7.1.009","","","2.8.9-1","1.5.3-1","4.7.1-2","2.3.9-1","5.5.0-2","4.3.5-1","9.5.3-1","","4.12.7-1","1.7.2-1","","",""],
                ["showver","1494162186","p24-tkb-int","Dingolfing TKB INT",false,"","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""],
                ["showver","1494162186","p03-prod","Berlin",true,"4.7.1.1","4.7.1.0","V4.7.1.7","","","4.7.1.2","","4.7.1.0","","4.7.1.1","4.7.1.0","","","4.7.1.3","4.7.1.3","","","","","","","","","","","","","","","","","Linux lp03ipst2vm 3.0.101-0.7.44.1.11942.10.PTF-xen #1 SMP Tue Nov 22 05:57:46 UTC 2016 () x86_64 x86_64 x86_64 GNU/Linux","SUSE Linux Enterprise Server 11 (x86_64); VERSION = 11; PATCHLEVEL = 2","","Keine","Keine","IPS-T 4.7.1.009","V1.0.5.1,V1.0.7.1,V1.0.7.2,V1.0.7.3,V1.0.7.4","Oracle Database 12c Enterprise Edition Release 12.1.0.2.0 - 64bit Production","2.9.0-2","1.5.3-1","4.7.1-2","2.3.9-1","5.5.0-2","4.3.5-1","9.5.3-1","","4.12.7-1","1.7.2-1","","",""],
                ["showver","1494162186","p03-int","Berlin INT",true,"4.7.1.1","4.7.1.0","V4.7.1.10","","1.21","4.7.1.3","","4.7.1.0","","4.7.1.1","4.7.1.1","","","4.7.1.3","4.7.1.4","","","","","","","","","","","","","","2.12","1.2","2.2","Linux li03ipst2vm 3.0.101-0.7.44.1.11942.10.PTF-xen #1 SMP Tue Nov 22 05:57:46 UTC 2016 () x86_64 x86_64 x86_64 GNU/Linux","SUSE Linux Enterprise Server 11 (x86_64); VERSION = 11; PATCHLEVEL = 2","","4.5.1.2","","IPS-T 4.7.1.010","V1.0.7.1,V1.0.7.4,V2.0.0.1","Oracle Database 12c Enterprise Edition Release 12.1.0.2.0 - 64bit Production","2.10.1-1","1.8.0-1","4.7.3-1","2.3.9-1","5.5.0-2","4.3.5-1","9.5.3-1","","4.13.0-1","1.7.2-1","","",""],
                ["showver","1494162186","p05-prod","Steyr",true,"4.7.1.1","4.7.1.0","V4.7.1.7","","1.21","","4.7.1.0","","","","4.7.1.0","4.7.1.0","","4.7.1.3","","","","","","","","","","","4.7.1.3","","","","2.12","1.1","2.2","Linux lp05ipst2vm 3.0.101-0.7.53.1.13958.0.PTF-xen #1 SMP Thu Oct 19 13:12:00 UTC 2017 (e08e0ba) x86_64 x86_64 x86_64 GNU/Linux","SUSE Linux Enterprise Server 11 (x86_64); VERSION = 11; PATCHLEVEL = 2","","keine","keine","IPS-T 4.7.1.009","V1.0.3.1,V1.0.4.0,V1.0.5.0,V1.0.5.1,V1.0.5.2,V1.0.6.0, V1.0.7.0, V1.0.7.1, V1.0.7.3,  V1.0.7.4","Oracle Database 12c Enterprise Edition Release 12.1.0.2.0 - 64bit Production","2.10.1-1","1.6.9-1","4.7.3-1","2.3.9-1","5.5.0-2","4.3.5-1","9.5.3-1","","4.12.7-1","1.7.2-1","","",""],
                ["showver","1494162186","p05-int","Steyr INT",true,"4.7.1.1","4.7.1.0","V4.7.1.7","","1.21","","4.7.1.0","","","","4.7.1.0","4.7.1.0","","4.7.1.3","","","","","","","","","","","4.7.1.2","","","","2.12","1.1","2.2","Linux li05ipst2vm 3.0.101-0.7.53.1.13958.0.PTF-xen #1 SMP Thu Oct 19 13:12:00 UTC 2017 (e08e0ba) x86_64 x86_64 x86_64 GNU/Linux","SUSE Linux Enterprise Server 11 (x86_64); VERSION = 11; PATCHLEVEL = 2","","Keine","Keine","IPS-T 4.7.1.009","V1.0.1.0,V1.0.2.0,V1.0.2.1, V1.0.3.1, V1.0.4.0, V1.0.5.1, V1.0.6.0, V1.0.7.1, V1.0.7.0,V1.0.7.3,V1.0.7.4","Oracle Database 12c Enterprise Edition Release 12.1.0.2.0 - 64bit Production","2.10.1-1","1.6.8-1","4.7.3-1","2.3.9-1","5.5.0-2","4.3.5-1","9.5.3-1","","4.12.7-1","1.7.2-1","","","1.12.0-1"],
                ["showver","1494162186","p06-prod","Regensburg",true,"4.7.1.1","4.7.1.0","V4.7.1.7","","1.21","4.7.1.2","","4.7.1.0","4.7.1.0","4.7.1.1","4.7.1.0","4.7.1.0","","4.7.1.3","4.7.1.3","","4.7.1.0","","","","","","","","","","","","1.1","1.2","","Linux lp06ipst2vm 3.0.101-0.7.53-xen #1 SMP Mon Jan 23 15:58:00 UTC 2017 (92ef197) x86_64 x86_64 x86_64 GNU/Linux","SUSE Linux Enterprise Server 11 (x86_64); VERSION = 11; PATCHLEVEL = 2","","4.5.1.2","V4.2.0.0, V4.4.1.11,V4.5.0.0,V4.5.1.1,V4.5.1.2","IPS-T 4.7.1.009","1.0.1.0, 1.0.2.1, 1.0.3.0, 1.0.3.1, 1.0.4.0, 1.0.5.0, 1.0.5.1, 1.0.5.2, 1.0.6.0,1.0.7.0, 1.0.7.1, 1.0.7.2, 1.0.7.3, 1.0.7.4","Oracle Database 12c Enterprise Edition Release 12.1.0.2.0 - 64bit Production","2.8.9-1","1.5.3-1","4.7.1-2","2.3.9-1","5.5.0-2","4.3.5-1","9.5.3-1","","4.12.7-1","1.7.2-1","","",""],
                ["showver","1494162186","p06-int","Regensburg INT",true,"4.7.1.1","4.7.1.0","V4.7.1.10","","1.21","4.7.1.2","","4.7.1.0","4.7.1.0","4.7.1.1","4.7.1.1","4.7.1.0","","4.7.1.3","4.7.1.4","","4.7.1.0","","","","","","","","","","","","2.12","1.2","2.2","Linux lt06ipst2vm 3.0.101-0.7.53.1.13090.1.PTF-xen #1 SMP Thu Jun 29 08:36:04 UTC 2017 (f839fa7) x86_64 x86_64 x86_64 GNU/Linux","SUSE Linux Enterprise Server 11 (x86_64); VERSION = 11; PATCHLEVEL = 2","","4.5.1.2","V4.2.0.0, V4.4.1.11,V4.5.0.0,V4.5.1.1,V4.5.1.2","IPS-T 4.7.1.010","1.0.5.2, 1.0.6.0, 1.0.3.1, 1.0.4.0, 1.0.5.0, 1.0.5.1, 1.0.7.1,1.0.7.3,1.0.7.4, 1.0.7.3,1.0.7.4","Oracle Database 12c Enterprise Edition Release 12.1.0.2.0 - 64bit Production","2.10.1-1","1.8.0-1","4.7.3-1","2.3.9-1","5.5.0-2","","9.5.3-1","","4.13.0-1","","","",""],
                ["showver","1494162186","p07-prod","Leipzig Blech",true,"4.7.1.1","4.7.1.0","V4.7.1.7","","1.21","4.7.1.2","","4.7.1.0","4.7.1.0","4.7.1.1","4.7.1.0","","","4.7.1.3","4.7.1.3","","4.7.1.0","","","","","","","","","","","","2.12","1.2","2.2","Linux lp07ipst2vm 3.0.101-0.7.53.1.13958.0.PTF-xen #1 SMP Thu Oct 19 13:12:00 UTC 2017 (e08e0ba) x86_64 x86_64 x86_64 GNU/Linux","SUSE Linux Enterprise Server 11 (x86_64); VERSION = 11; PATCHLEVEL = 2","","Keine","Keine","IPS-T 4.7.1.009","V1.0.6.0, V1.0.7.0, V1.0.7.1, V1.0.7.3, V1.0.7.4","Oracle Database 12c Enterprise Edition Release 12.1.0.2.0 - 64bit Production","2.8.9-1","","4.7.1-2","2.3.9-1","5.5.0-2","4.3.5-1","9.5.3-1","","4.12.7-1","1.7.2-1","","",""],
                ["showver","1494162186","p07-int","Leipzig Blech INT",true,"4.7.1.1","4.7.1.0","V4.7.1.10","","1.21","4.7.1.3","","4.7.1.0","4.7.1.0","4.7.1.1","4.7.1.1","","","4.7.1.3","4.7.1.4","","4.7.1.0","","","","","","","","","","","","2.12","1.2","2.2","Linux lt07ipst3vm 3.0.101-0.7.53.1.13958.0.PTF-xen #1 SMP Thu Oct 19 13:12:00 UTC 2017 (e08e0ba) x86_64 x86_64 x86_64 GNU/Linux","SUSE Linux Enterprise Server 11 (x86_64); VERSION = 11; PATCHLEVEL = 2","","Keine","Keine","IPS-T 4.7.1.010","V1.0.7.1,V1.0.7.4,V2.0.0.1","Oracle Database 12c Enterprise Edition Release 12.1.0.2.0 - 64bit Production","2.10.1-1","1.8.0-1","4.7.3-1","2.3.9-1","5.5.0-2","4.3.5-1","9.5.3-1","1.3.6-1","4.13.0-1","1.7.2-1","","",""],
                ["showver","1494162186","p07-mcv-prod","Leipzig MCV",true,"4.7.1.1","4.7.1.0","V4.7.1.7","","1.21","4.7.1.2","","4.7.1.0","4.7.1.0","4.7.1.1","4.7.1.0","","","4.7.1.3","4.7.1.3","","","","","","","","","","","","","","2.12","1.2","2.2","Linux lp07ipstivm 3.0.101-0.7.53.1.13958.0.PTF-xen #1 SMP Thu Oct 19 13:12:00 UTC 2017 (e08e0ba) x86_64 x86_64 x86_64 GNU/Linux","SUSE Linux Enterprise Server 11 (x86_64); VERSION = 11; PATCHLEVEL = 2","","KEINE","KEINE","IPS-T 4.7.1.009","V1.0.7.0, V1.0.7.1, V1.0.7.3, V1.0.7.4","Oracle Database 12c Enterprise Edition Release 12.1.0.2.0 - 64bit Production","2.8.9-1","1.5.3-1","4.7.1-2","2.3.9-1","5.5.0-2","4.3.5-1","9.5.3-1","","4.12.7-1","1.7.2-1","","",""],
                ["showver","1494162186","p07-mcv-int","Leipzig MCV INT",true,"4.7.1.1","4.7.1.0","V4.7.1.7","","1.21","4.7.1.2","","4.7.1.0","4.7.1.0","4.7.1.1","","4.7.1.0","","4.7.1.3","4.7.1.3","","4.7.1.0","","","","","","","","","","","","2.12","1.2","2.2","Linux lt07ipstivm 3.0.101-0.7.53.1.13958.0.PTF-xen #1 SMP Thu Oct 19 13:12:00 UTC 2017 (e08e0ba) x86_64 x86_64 x86_64 GNU/Linux","SUSE Linux Enterprise Server 11 (x86_64); VERSION = 11; PATCHLEVEL = 2","","KEINE","KEINE","IPS-T 4.7.1.009","V1.0.7.0, V1.0.7.1, V1.0.7.3, V1.0.7.4","Oracle Database 12c Enterprise Edition Release 12.1.0.2.0 - 64bit Production","2.8.9-1","1.5.3-1","4.7.1-2","","5.5.0-2","4.3.5-1","9.5.3-1","1.3.6-1","4.12.7-1","1.7.2-1","","",""],
                ["showver","1494162186","p09-prod","Rosslyn",true,"4.7.1.1","4.7.1.0","V4.7.1.7","","1.19","4.7.1.2","","4.7.1.0","","4.7.1.1","","","","4.7.1.3","4.7.1.3","","4.7.1.0","","","","","","","","","","","","2.9","1.2","2.2","Linux lp09ipst01 3.0.101-0.7.53.1.15185.0.PTF-xen #1 SMP Wed Apr 11 06:44:50 UTC 2018 (fe2f412) x86_64 x86_64 x86_64 GNU/Linux","SUSE Linux Enterprise Server 11 (x86_64); VERSION = 11; PATCHLEVEL = 2","","Keine","Keine","IPS-T 4.7.1.009","","","2.9.0-2","1.5.3-1","4.7.1-2","2.3.9-1","5.5.0-2","4.3.5-1","9.5.3-1","","4.12.7-1","1.7.2-1","","",""],
                ["showver","1494162186","p09-int","Rosslyn INT",true,"4.7.1.1","4.7.1.0","","","1.21","","","","","","","","","","","","","","","","","","","","","","","","2.12","1.1","2.2","Linux lt09ipst01 3.0.101-0.7.53.1.13090.1.PTF-xen #1 SMP Thu Jun 29 08:36:04 UTC 2017 (f839fa7) x86_64 x86_64 x86_64 GNU/Linux","SUSE Linux Enterprise Server 11 (x86_64); VERSION = 11; PATCHLEVEL = 2","","Keine","Keine","IPS-T 4.7.1.009","","","2.9.0-2","1.5.3-1","4.7.1-2","2.3.9-1","5.5.0-2","4.3.5-1","9.5.3-1","","4.12.7-1","1.7.2-1","","3.6.2.3-2","1.7.0-1"],
                ["showver","1494162186","p10-prod","Spartanburg",true,"4.7.1.1","4.7.1.0","V4.7.1.7","","1.21","4.7.1.2","","4.7.1.0","4.7.1.0","4.7.1.1","4.7.1.0","4.7.1.0","","4.7.1.3","4.7.1.3","","4.7.1.0","","","","","","","","","","","","2.12","1.2","2.2","Linux lp10ipst2vm 3.0.101-0.7.53.1.13958.0.PTF-xen #1 SMP Thu Oct 19 13:12:00 UTC 2017 (e08e0ba) x86_64 x86_64 x86_64 GNU/Linux","SUSE Linux Enterprise Server 11 (x86_64); VERSION = 11; PATCHLEVEL = 2","","Keine","Keine","IPS-T 4.7.1.009","","","2.9.0-2","1.5.3-1","4.7.1-2","2.3.9-1","5.5.0-2","4.3.5-1","9.5.3-1","","4.12.7-1","1.7.2-1","","","1.10.0-2"],
                ["showver","1494162186","p10-int","Spartanburg INT",true,"4.7.1.1","4.7.1.0","V4.7.1.7","","1.21","4.7.1.2","","4.7.1.0","4.7.1.0","4.7.1.1","4.7.1.0","4.7.1.0","","4.7.1.3","4.7.1.3","4.7.1.0","4.7.1.0","","","","","","","","","","","","2.12","","2.2","Linux lt10ipst2vm 3.0.101-0.7.53.1.13090.1.PTF-xen #1 SMP Thu Jun 29 08:36:04 UTC 2017 (f839fa7) x86_64 x86_64 x86_64 GNU/Linux","SUSE Linux Enterprise Server 11 (x86_64); VERSION = 11; PATCHLEVEL = 2","","No_one","No_one","IPS-T 4.7.1.009","","","2.10.1-1","1.6.8-1","4.7.3-1","2.3.9-1","5.5.0-2","4.3.5-1","9.5.3-1","","4.12.7-1","1.7.2-1","","",""],
                ["showver","1494162186","p10-biw-prod","Spartanburg BIW",true,"4.7.1.1","4.7.1.0","V4.7.1.7","","1.1","","","4.7.1.0","","","4.7.1.0","","","","4.7.1.3","","","","","","","","","","","","","","1.1","1.2","2.2","Linux lp10biwt2vm 3.0.101-0.7.53.1.13958.0.PTF-xen #1 SMP Thu Oct 19 13:12:00 UTC 2017 (e08e0ba) x86_64 x86_64 x86_64 GNU/Linux","SUSE Linux Enterprise Server 11 (x86_64); VERSION = 11; PATCHLEVEL = 2","","Keine","Keine","IPS-T 4.7.1.009","","","2.9.0-2","1.6.8-1","4.7.1-2","2.3.9-1","5.5.0-2","4.3.5-1","9.5.3-1","","4.12.7-1","1.7.2-1","","","1.11.0-1"],
                ["showver","1494162186","p12-prod","Hams Hall",true,"4.7.1.1","4.7.1.0","V4.7.1.7","","1.21","","4.7.1.0","4.7.1.0","","","","","","","","","","","","","","","","","","","","","2.7","1.2","2.2","Linux lp12ipstahvm 3.0.101-0.7.53.1.13958.0.PTF-xen #1 SMP Thu Oct 19 13:12:00 UTC 2017 (e08e0ba) x86_64 x86_64 x86_64 GNU/Linux","SUSE Linux Enterprise Server 11 (x86_64); VERSION = 11; PATCHLEVEL = 2","","Keine","Keine","IPS-T 4.7.1.009","","","2.10.1-1","1.6.9-1","4.7.3-1","2.3.9-1","5.5.0-2","4.3.5-1","9.5.3-1","","4.12.7-1","1.7.2-1","","",""],
                ["showver","1494162186","p12-int","Hams Hall INT",true,"4.7.1.1","4.7.1.0","V4.7.1.7","","1.21","","4.7.1.0","4.7.1.0","","","4.7.1.0","","","4.7.1.3","","","","","","","","","","","","","","","2.12","1.2","2.2","Linux lt12ipstahvm 3.0.101-0.7.53.1.13958.0.PTF-xen #1 SMP Thu Oct 19 13:12:00 UTC 2017 (e08e0ba) x86_64 x86_64 x86_64 GNU/Linux","SUSE Linux Enterprise Server 11 (x86_64); VERSION = 11; PATCHLEVEL = 2","","No","No one","IPS-T 4.7.1.009","","","2.10.1-1","1.6.9-1","4.7.3-1","2.3.9-1","5.5.0-2","4.3.5-1","9.5.3-1","","4.12.7-1","1.7.2-1","","",""],
                ["showver","1494162186","p30-int","Mexiko INT",true,"4.7.1.1","4.7.1.0","V4.7.1.7","","1.21","4.7.1.2","","4.7.1.0","","","4.7.1.0","4.7.1.0","","4.7.1.3","4.7.1.3","","","","","","","","","","","","","","2.12","1.2","2.2","Linux lt00ipstw30vm 3.0.101-0.7.53.1.13958.0.PTF-xen #1 SMP Thu Oct 19 13:12:00 UTC 2017 (e08e0ba) x86_64 x86_64 x86_64 GNU/Linux","SUSE Linux Enterprise Server 11 (x86_64); VERSION = 11; PATCHLEVEL = 2","","","","IPS-T 4.7.1.008","","","2.8.9-1","1.5.3-1","4.7.1-2","2.3.9-1","5.5.0-2","","9.5.3-1","","4.12.7-1","","","3.6.1-1","1.6.1-1"],
                ["showver","1494162186","p34-prod","Oxford",true,"4.7.1.1","4.7.1.0","V4.7.1.7","","1.21","4.7.1.3","","4.7.1.0","","4.7.1.1","","4.7.1.0","","4.7.1.3","","4.7.1.0","","","","","","","","","","","","","2.12","1.2","2.2","Linux lp34ipst2vm 3.0.101-0.7.53.1.13090.1.PTF-xen #1 SMP Thu Jun 29 08:36:04 UTC 2017 (f839fa7) x86_64 x86_64 x86_64 GNU/Linux","SUSE Linux Enterprise Server 11 (x86_64); VERSION = 11; PATCHLEVEL = 2","","Keine","Keine","IPS-T 4.7.1.009","","","2.10.1-1","1.6.9-1","4.7.3-1","2.3.9-1","5.5.0-2","4.3.5-1","9.5.3-1","","4.12.7-1","1.7.2-1","","",""],
                ["showver","1494162186","p34-int","Oxford INT",true,"4.7.1.1","4.7.1.0","V4.7.1.7","","1.21","4.7.1.2","","","","4.7.1.1","4.7.1.0","4.7.1.0","","4.7.1.3","","","","","","","","","","","","","","4.7.1.0","2.12","1.2","2.2","Linux lt34ipst2vm 3.0.101-0.7.53-xen #1 SMP Mon Jan 23 15:58:00 UTC 2017 (92ef197) x86_64 x86_64 x86_64 GNU/Linux","SUSE Linux Enterprise Server 11 (x86_64); VERSION = 11; PATCHLEVEL = 2","","Keine","Keine","IPS-T 4.7.1.009","","","2.10.1-1","1.6.9-1","4.7.3-1","2.3.9-1","5.5.0-2","4.3.5-1","9.5.3-1","","4.12.7-1","1.7.2-1","","","1.12.0-1"],
                ["showver","1494162186","p71-int","Dadong INT",false,"","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""],
                ["showver","1494162186","cte","CTE",false,"","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""],
                ["showver","1494162186","cte-sapient","CTE Sapient",true,"4.7.1.1","4.7.1.0","V4.7.1.10RC1","","1.21","4.7.1.2","4.7.1.0","4.7.1.0","4.7.1.0","4.7.1.1","4.7.1.0","4.7.1.0","","4.7.1.3","4.7.1.3","","","","","","","","","","","","","","2.12","1.2","2.2","Linux li07ipst2vm 3.0.101-0.7.53.1.13958.0.PTF-xen #1 SMP Thu Oct 19 13:12:00 UTC 2017 (e08e0ba) x86_64 x86_64 x86_64 GNU/Linux","SUSE Linux Enterprise Server 11 (x86_64); VERSION = 11; PATCHLEVEL = 2","","4.5.1.2","V4.2.0.0, V4.4.1.11,V4.5.0.0,V4.5.1.1,V4.5.1.2","IPS-T 4.7.1.010","1.0.3.1, 1.0.4.0, 1.0.5.0, 1.0.5.1, 1.0.5.2, 1.0.6.0,1.0.7.0, 1.0.7.1, 1.0.7.3,V1.0.7.4","Oracle Database 12c Enterprise Edition Release 12.1.0.2.0 - 64bit Production","2.8.9-1","1.5.3-1","4.7.1-2","2.3.9-1","5.5.0-2","4.3.5-1","9.5.3-1","","4.12.7-1","1.7.2-1","","",""]
            ],
            //</debug>

            filters: [{
                property: 'job_id',
                value: '{job.value}',
                exactMatch: true
            },{
                property: 'report_id',
                value: '{report.value}',
                exactMatch: true
            },{
                property: 'valid',
                value: true
            }],

            sorters: [{
                property: 'planet'
            }]
        }
    }
});
