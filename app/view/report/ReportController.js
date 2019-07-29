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

Ext.define('Orbit.view.report.ReportController', {
    extend: 'Orbit.view.base.ViewController',
    alias: 'controller.report',

    /**
     * Bind listener functions.
     */
    initViewModel: function(vm) {
        vm.bind('{job}',    'onJobChange',    this);
        vm.bind('{report}', 'onReportChange', this);
    },

    /**
     * Clear reports just to free memory.
     */
    onJobChange: function(job) {
        this.clearStore('results');
        this.clearStore('reports');

        if (!job.data)
            return;

        this.tweakCombo('report', 'remote', true);
    },

    /**
     * Load the results of the report into the grid.
     */
    onReportChange: function(report) {
        this.setDocTitle('job.name', 'report.name');

        if (!report.data)
            return;

        this.loadContent();
    },

    /**
     * Load list of jobs.
     */
    loadJobs: function() {
        this.resetCombo('job');
        this.loadStore('jobs', 'job');
    },

    /**
     * Load list of job reports.
     */
    loadReports: function() {
        this.resetCombo('report')
        this.loadStore('reports', 'job.id');
    },

    /**
     * Load the results of the report.
     */
    loadContent: function() {
        this.renderReport();
        this.loadStore('results', 'report.id');
    },

    /**
     * Load the results of the report into the grid.
     */
    renderReport: function() {
        var report = this.getData('report');
        var grid   = this.getView();

        grid.reconfigureColumns(report.get('columns'));
    }
});
