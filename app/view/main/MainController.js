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

Ext.define('Orbit.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    routes: {
        '!:id': {
            action: 'onNavigate',
            before: 'beforeNavigate'
        },

        '!:id/:state': {
            action: 'onNavigateDeep',
            before: 'beforeNavigateDeep'
        }
    },

    listen: {
        controller: {
            '*': {
                // We delegate all changes of router history to this controller by firing
                // the "changeroute" event from other controllers.
                changeroute: 'changeRoute',
                unmatchedroute: 'onUnmatchedRoute'
            }
        }
    },

    destroy: function () {
        Ext.destroyMembers(this, 'menu');
        this.callParent();
    },

    beforeNavigate: function (id, action) {
        var view = this.getView();
        var tab = view.getComponent(id);

        if (tab) {
            action.resume();
        } else {
            this.onBadRoute();
        }
    },

    beforeNavigateDeep: function (id, state, action) {
        var view = this.getView();
        var tab = view.getComponent(id);
        var valid;

        if (tab.isValidState) {
            valid = tab.isValidState(state);
        } else {
            valid = true;
        }

        if (valid) {
            action.resume();
        } else {
            this.onBadRoute();
        }
    },

    changeRoute: function (controller, route) {
        if (route.substring(0, 1) !== '!') {
            route = '!' + route;
        }

        this.redirectTo(route);
    },

    getTabRoute: function (tab) {
        var route = tab.itemId || tab.xtype;

        if (tab.getActiveState) {
            route += '/' + (tab.getActiveState() || tab.getDefaultActiveState());
        }

        return route;
    },

    onBadRoute: function () {
        var app = Orbit.app.getApplication();
        this.changeRoute(this, app.getDefaultToken());
    },

    onNavigate: function (id) {
        var tabs = this.getView();
        var tab = tabs.setActiveTab(id);

        if (tab) {
            var route = this.getTabRoute(tab);
            if (route && route !== id) {
                this.changeRoute(this, route);
            }
        }
    },

    onNavigateDeep: function (id, state) {
        var tabs = this.getView();
        var tab = tabs.setActiveTab(id) || tabs.getActiveTab();

        tab.setActiveState(state);
    },

    onTabChange: function (mainView, newTab) {
        var route = this.getTabRoute(newTab);
        this.changeRoute(this, route);
    },

    onUnmatchedRoute: function(token) {
        if (token) {
            this.onBadRoute();
        }
    }
});
