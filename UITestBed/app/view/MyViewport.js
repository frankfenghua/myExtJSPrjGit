/*
 * File: app/view/MyViewport.js
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

Ext.define('MyApp.view.MyViewport', {
    extend: 'Ext.container.Viewport',
    requires: [
        'MyApp.view.ExplorerTreePanel',
        'MyApp.view.GUSJsonTreePanel',
        'MyApp.store.GUSJsonTreeStore',
        'MyApp.view.UserGridPanel'       ,
        'MyApp.view.GUSJsonComboBox'
//        ,
//        'MyApp.store.BleextopXmlStore'
    ],

    autoScroll: false,
    layout: {
        type: 'border'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
/*
                {
                    xtype: 'explorertreepanel',
                    collapsible: true,
//                    store: 'BleextopXmlStore',
//                    store: 'NodesXmlTreeStore',
//                    store: 'MenuXmlTreeStore',
//                    store: 'GUSJsonStore',
                    region: 'east',
                    split: true
                },
*/
                {
                    xtype: 'panel',
                    width: 200,
                    layout: {
                        align: 'stretch',
                        type: 'vbox'
                    },
                    collapsed: false,
                    collapsible: true,

                    region: 'west',
                    hideCollapseTool: true,
                    split: true,
                    items: [
                        {
                            xtype: 'gusjsoncombobox',
                            height: 20
                        },
                        {
                            xtype: 'gusjsontreepanel',
                            collapsible: true,
                            region: 'west',
                            flex: 1,
                            split: true
                        }
                    ]
                }
                ,
                {
                    xtype: 'panel',
                    height: 150,
                    collapsible: true,
                    title: 'My Panel',
                    region: 'north',
                    split: true
                },
                {
                    xtype: 'usergridpanel',
                    region: 'center'
                }
            ]
        });

        me.callParent(arguments);
    }

});