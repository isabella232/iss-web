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

Ext.define('Orbit.Application', {
    extend: 'Ext.app.Application',

    uses: [
        'Orbit.view.UpdateDialog'
    ],

    name: 'Orbit',
    quickTips: true,

    defaultToken: '!report',

    views: [
        'Orbit.view.main.Main'
    ],

    mainView: 'Orbit.view.main.Main',

    launch: function() {
        // Let's add a CSS class to body if flex box wrap is not implemented or broken
        // http://flexboxlayouts.com/flexboxlayout_tricks.html
        if (Ext.browser.is.Gecko && Ext.browser.version.major < 28) {
            Ext.getBody().addCls('x-flex-wrap-broken');
        }
    },

    onAppUpdate: function() {
        Ext.create('Orbit.view.UpdateDialog').show();
    }
});
