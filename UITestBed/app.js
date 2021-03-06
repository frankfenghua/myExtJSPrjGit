/*
 * File: app.js
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

Ext.Loader.setConfig({
    disableCaching: false,
    enabled: true,
    appFolder:'app',

    paths:{
        'MyApp':'app',
        'Ext.ux':'ux',
        'Ext':'ext/src'    //ext is symbol link to extjs-4.0.7-gpl/src
    }
});

Ext.require([
//    'MyApp.store.CarDataJson',
//    'MyApp.store.XmlStore',
//    'MyApp.store.UserXmlTreeStore' ,
    'MyApp.store.BleextopJsonStore' ,
//    'MyApp.store.UserJsonStore',
    'MyApp.store.GUSJsonStore',
//    'MyApp.store.NodesXmlTreeStore',
//    'MyApp.store.UserTreeStore',
    'MyApp.store.GUSXmlTreeStore',
    'MyApp.store.BleextopJsonStore'      ,
    'MyApp.store.GUSJsonComboStore'
//    'MyApp.store.MenuXmlTreeStore'
]);

//Ext.onReady(function(){
//    console.log('ready');
//});

Ext.application({
    models: [
        'BleextopJsonModel',
//        'TreeModel',
//        'CarDataModel',
        'UserModel',
//        'MyUserModel',
//        'NodeXmlModel',
//        'MenuXmlModel',
//        'GUSXmlTreeModel',
        'GUSJsonTreeModel',
        'MyGUSJsonModel'
    ],
    stores: [
//        'CarDataJson',
        'XmlStore',
//        'UserXmlTreeStore',
        'UserJsonStore',
//        'NodesXmlTreeStore',
//        'MenuXmlTreeStore',
        'UserTreeStore',
//        'GUSXmlTreeStore',
        'GUSJsonTreeStore',
        'GUSJsonStore'  ,
        'GUSJsonComboStore'
    ],
    views: [
        'MyViewport',
        'UserGridPanel',
//        'TreePanelTest',
        'ExplorerTreePanel',
//        'GUSXmlTreePanel'   ,
        'GUSJsonTreePanel',
        'GUSJsonComboBox'
    ],
    autoCreateViewport: true,
    name: 'MyApp',
    controllers: [
        'ExplorerController',
        'UserGridController',
//        'JsonUserController',
//        'GUSXmlTreepanelController',
        'GUSJsonTreepanelController'
    ]
//    ,
//    launch: function() {
//        Ext.create('MyApp.view.MyViewport', {
//        });
//    }
});
