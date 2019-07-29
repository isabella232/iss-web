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

Ext.define('Orbit.view.stats.ToolTip', {
    extend: 'Ext.tip.ToolTip',

    alias: 'widget.statstooltip',

    width: 600,
    shadow: false,

    loader: {
        loadOnRender: true,

        ajaxOptions: {
            disableCaching: false
        },

        renderer: function(tip, res) {
            return tip.getTarget().update(
                Ext.decode(res.responseText).join('<br>')
            );
        }
    },

    /**
     * @cfg {Orbit.model.Meta} record
     * The record to render.
     */
    record: null,

    // Component initialization override.
    initComponent: function() {
        var rec = this.record;

        this.target = 'stats-' + rec.get('id');
        this.title  = rec.get('name');
        this.loader.url = '/stats/' + rec.get('id') + '/list'

        this.callParent(arguments);
    }
});
