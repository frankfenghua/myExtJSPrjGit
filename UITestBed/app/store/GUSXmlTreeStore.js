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
                },
                append:{
                    fn: me.onXmltreestoreAppend,
                    scope:me
                }
            }
        }, cfg)]);
    },

    onXmltreestoreBeforeExpand: function(treestore, options) {
        console.log("onXmltreestoreBeforeExpand()" + " :  treestore.data.label = " + treestore.data.label);
    },
    onXmltreestoreExpand: function(treestore, options) {
        console.log("onXmltreestoreExpand()" + " :  treestore.data.label = " + treestore.data.label);
    },
    // Each demo.UserModel instance will be automatically
    // decorated with methods/properties of Ext.data.NodeInterface
    // (i.e., a "node"). Whenever a UserModel node is appended
    // to the tree, this TreeStore will fire an "append" event.
    // http://jsfiddle.net/QvaMG/195/
    onXmltreestoreAppend: function( thisNode, newChildNode, index, eOpts ) {
//        console.log("onXmltreestoreAppend()" + " :  treestore.data.label = " + treestore.data.label);
        // If the node that's being appended isn't a root node, then we can
        // assume it's one of our UserModel instances that's been "dressed
        // up" as a node
        if( !newChildNode.isRoot() ) {

            // The node is a UserModel instance with NodeInterface
            // properties and methods added. We want to customize those
            // node properties  to control how it appears in the TreePanel.

            // A user "item" shouldn't be expandable in the tree
            newChildNode.set('leaf', true);

            // Use the model's "name" value as the text for each tree item
            newChildNode.set('text', newChildNode.get('label'));

            // Use the model's profile url as the icon for each tree item
//            newChildNode.set('icon', newChildNode.get('profile_image_url'));
//            newChildNode.set('cls', 'demo-userNode');
//            newChildNode.set('iconCls', 'demo-userNodeIcon');
        }

    }
});