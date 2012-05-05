/*
 * File: app/store/GUSXmlTreeStore.js
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

Ext.define('MyApp.store.GUSXmlTreeStore', {
    extend: 'Ext.data.TreeStore',
    requires: [
        'MyApp.model.GUSXmlTreeModel',
        'MyApp.overrides.CustomXmlReader'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            storeId: 'GUSXmlTreeStore',
            model: 'MyApp.model.GUSXmlTreeModel',
            root: {
//                text: 'Guideline',
                id: 'label',
                expanded: true
            },
            proxy: {
                type: 'ajax',
                url: 'data/gus_org.xml',
//                url: 'data/gus_full.xml',
                reader: {
                    type: 'xml',
                    root: 'explorer',
                    record: 'node'
                }
            },
            listeners:{
                beforeexpand: {
                    fn: me.onXmltreestoreBeforeExpand,
                    scope: me
                },
                expand:{
                    fn: me.onXmltreestoreExpand,
                    scope: me
                }
            }
        }, cfg)]);
    },

    onXmltreestoreBeforeExpand: function(treestore, options) {
        console.log("onXmltreestoreBeforeExpand()" + " :  treestore.data.label = " + treestore.data.label);
    },
    onXmltreestoreExpand: function(treestore, options) {
        console.log("onXmltreestoreExpand()" + " :  treestore.data.label = " + treestore.data.label);
    }
});