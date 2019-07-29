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

Ext.define('Orbit.view.UpdateDialog', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.container.Container',
        'Ext.form.Label',
        'Ext.button.Button',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox'
    ],

    alias: 'widget.updatedialog',

    autoSize: true,
    closable: false,
    padding: 15,
    constrain: true,
    draggable: false,
    modal: true,
    shadow: false,
    frameHeader: false,
    border: false,

    layout: 'vbox',

    header: {
        style: 'background-color:white;'
    },

    title: '<strong>Application Update</strong>',

    items: [{
        xtype: 'label',
        text: 'A new version of Orbit has been released.'
    },{
        xtype: 'label',
        margin: { top: 25 },
        text: 'It is recommended that you load this update immediately before continuing to use Orbit.'
    },{
        xtype: 'label',
        margin: { top: 1 },
        text: 'The next time the page is reloaded, the update is automatically downloaded.'
    },{
        xtype: 'label',
        margin: { top: 25 },
        text: "Press 'OK' to update the application."
    }],

    dockedItems: [{
        xtype: 'container',
        dock: 'bottom',
        margin: '25 0 0 0',

        defaults: {
            xtype: 'button',
            minWidth: 70
        },

        layout: {
            type: 'hbox',
            pack: 'end'
        },

        items: [{
            text: 'CANCEL',
            handler: function() { this.up('updatedialog').destroy(); }
        },{
            text: 'OK',
            margin: { left: 13 },
            handler: function() { window.location.reload(); }
        }]
    }]
});
