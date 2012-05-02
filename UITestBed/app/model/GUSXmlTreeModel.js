/*
 * File: app/model/GUSXmlTreeModel.js
 *
 * This file was generated by Sencha Architect version 2.0.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.0.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MyApp.model.GUSXmlTreeModel', {
    extend: 'Ext.data.Model',

    fields: [
        {
            convert: function(v, rec) {
                return  unescape(v);
            },
            mapping: '@label',
            name: 'label',
            type: 'string'
        },
        {
            mapping: '@versionid',
            name: 'versionid',
            type: 'string'
        },
        {
            mapping: '@type',
            name: 'type',
            type: 'string'
        },
        {
            mapping: '@nodeid',
            name: 'nodeid',
            type: 'string'
        },
        {
            mapping: '@selected',
            name: 'selected',
            type: 'string'
        },
        {
            mapping: '@version',
            name: 'version',
            type: 'string'
        },
        {
            mapping: '@seqnum',
            name: 'seqnum',
            type: 'string'
        },
        {
            mapping: '@year',
            name: 'year',
            type: 'string'
        }
    ]
});