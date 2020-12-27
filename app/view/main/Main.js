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

Ext.define('Orbit.view.main.Main', {
    extend: 'Ext.tab.Panel',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.form.Label',
        'Ext.toolbar.Toolbar',

        'Orbit.view.file.File',
        'Orbit.view.report.Report',
        'Orbit.view.stats.Stats'
    ],

    ui: 'navigation',
    cls: 'orbit-menu-navigation',

    tabBarHeaderPosition: 1,
    headerPosition: 'left',
    titleRotation: 0,
    tabRotation: 0,

    controller: 'main',
    viewModel: 'main',

    plugins: 'viewport',

    header: {
        iconCls: 'orbit-header-icon',

        layout: {
            align: 'stretch'
        },

        bind: {
            hidden: '{fullscreen}'
        },

        title: {
            text: 'Orbit',
            textAlign: 'center',
            flex: 0,
            minWidth: 100
        },

        tools: [{
            xtype: 'label',
            cls: 'orbit-footer',
            text: 'Version 1.5.2-dev'
        },{
            xtype: 'label',
            cls: 'orbit-footer',
            html: 'Made with <span style="color:#f60";>&hearts;</span> by <strong>appPlant<strong>'
        }]
    },

    tabBar: {
        flex: 1,

        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    listeners: {
        tabchange: 'onTabChange'
    },

    tbar: {
        xtype: 'orbit-stats',

        bind: {
            hidden: '{fullscreen}'
        }
    },

    defaults: {
        userCls: 'orbit-main-subview'
    },

    items: [{
        xtype: 'component',
        tabConfig: { hidden: true }
    },{
        itemId: 'report',
        xtype: 'orbit-report',
        title: 'Reports',
        iconCls: 'x-fa fa-clipboard-list'
    },{
        itemId: 'lfv',
        xtype: 'orbit-file',
        title: 'Logs',
        iconCls: 'x-fa fa-book-reader'
    }]
});
