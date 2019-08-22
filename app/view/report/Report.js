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

Ext.define('Orbit.view.report.Report', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Ext.toolbar.Toolbar',
        'Ext.form.field.ComboBox',
        'Ext.grid.feature.Grouping',
        'Ext.grid.RowNumberer',
    ],

    alias: 'widget.orbit-report',

    config: {
        activeState: null,
        defaultActiveState: 'results'
    },

    cls: 'report-grid',
    enableLocking: true,
    emptyText: 'No content',
    columnLines: true,
    leadingBufferZone: 80,
    trailingBufferZone: 40,

    controller: 'report',
    viewModel: 'report',

    viewConfig: {
        deferEmptyText: false,
        loadMask: true
    },

    bind: {
        store: '{results}'
    },

    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '<b>{columnName}: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})<b/>'
    }],

    plugins: [{
        ptype: 'reconfigurablecolumns',

        defaultFields: [{
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

        defaultColumns: [{
            xtype: 'rownumberer',
            text: '#',
            align: 'right',
            width: 46
        },{
            text: 'Planet',
            dataIndex: 'planet',
            width: 250,
            hideable: false,
            cellWrap: true,
            locked: true
        }],

        columnDefaults: {
            flex: 1,
            minWidth: 200,
            groupable: true,
            resizable: true,
            sortable: true,
            cellWrap: true,
            emptyCellText: '-'
        }
    }],

    columns: [{
        text: '#',
        align: 'right',
        width: 46,
        draggable: false,
        menuDisabled: true
    },{
        flex: 1,
        sortable: false,
        draggable: false,
        menuDisabled: true,
    }],

    tbar: {
        margin: '0 0 19 0',
        padding: false,

        defaults: {
            editable: false,
            publishes: 'value',
            valueField: 'id',
            displayField: 'name',
            queryParam: null,

            defaultListConfig: {
                emptyText: 'No content',
                shadow: false,
                resizable: true,
                resizeHandles: 's'
            }
        },

        items: [{
            reference: 'job',
            xtype: 'combobox',
            emptyText: 'Select a job...',
            width: 300,
            allowBlank: true,

            bind: {
                store: '{jobs}',
                selection: '{job}'
            },

            triggers: {
                refresh: {
                    cls: Ext.baseCSSPrefix + 'form-refresh-trigger',
                    extraCls: Ext.baseCSSPrefix + 'form-small-trigger',
                    tooltip: 'Update job list',
                    handler: 'loadJobs',
                    weight: -1
                }
            },

            tpl: [
                '<ul class="' + Ext.plainListCls + '"><tpl for=".">',
                    '<li role="option" class="' + Ext.baseCSSPrefix + 'boundlist-item">',
                        '<strong>{name}</strong>',
                        '<div class="' + Ext.baseCSSPrefix + 'boundlist-subitem">',
                            '{runs} report{[values.runs !== 1 ? "s" : ""]}',
                            '<tpl if="runs &gt; 0">',
                                ' · last run {elapsedDays} {[values.elapsedDays > 0 ? "days ago" : "recently"]}',
                            '</tpl>',
                        '</div>',
                    '</li>',
                '</tpl></ul>'
            ]
        },{
            reference: 'report',
            xtype: 'combobox',
            emptyText: 'Select a report...',
            forceSelection: true,
            hidden: true,
            width: 320,

            bind: {
                store: '{reports}',
                selection: '{report}',
                disabled: '{!job.value}',
                hidden: '{!job.value}'
            },

            triggers: {
                refresh: {
                    cls: Ext.baseCSSPrefix + 'form-refresh-trigger',
                    extraCls: Ext.baseCSSPrefix + 'form-small-trigger',
                    tooltip: 'Update report list',
                    handler: 'loadReports',
                    weight: -1
                }
            },

            tpl: [
                '<ul class="' + Ext.plainListCls + '"><tpl for=".">',
                    '<li role="option" class="' + Ext.baseCSSPrefix + 'boundlist-item">',
                        '<strong>{name}</strong>',
                        '<div class="' + Ext.baseCSSPrefix + 'boundlist-subitem">',
                            'Generated {elapsedDays} {[values.elapsedDays > 0 ? "days ago" : "recently"]}',
                        '</div>',
                    '</li>',
                '</tpl></ul>'
            ]
        }]
    }
});
