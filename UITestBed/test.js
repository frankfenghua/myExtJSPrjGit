/**
 * ExtJS really shines with data models and its ease to extend its functionality
 * REF:
 * http://www.andyscott.id.au/2011/5/17/ExtJS-really-shines-with-data-models-and-its-ease-to-extend-its-functionality
 */


Ext.Loader.setConfig({
    disableCaching: false,
    enabled: true
});

Ext.require([
    'Ext.data.*',
    'Ext.grid.*',
    'Ext.tree.*'
]);



//Ext.onReady(function(){

    Ext.define('User', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'id', type: 'int'},
            {name: 'name', type: 'string'} ]
    });

    Ext.define('PlayerAssReader', {
        extend : 'Ext.data.reader.Xml',
        alias : 'reader.playerassxml',
        record : 'player'
    });

    Ext.define('TeamStatsReader', {
        extend : 'Ext.data.reader.Xml',
        alias : 'reader.teamstatsxml',
        record : 'stats',
        root: 'xmlData',
        getAssociatedDataRoot:function(data, associationName) {
            if(associationName == 'players')
                return data;
            else
                return this.callParent(arguments);
        }
    });

    Ext.define('TeamStats', {
        extend : 'Ext.data.Model',
        fields : [
            { name : 'name', type : 'string', mapping : '@team' }
        ],
        associations:[{
            model:'Player',
            type:'hasMany',
            associationKey:'players',
            reader:'playerassxml'
        }]
//        hasMany : {model: 'Player', name: 'getPlayers', associationKey : 'players', reader: 'playerassxml'}
    });

    Ext.define('Player', {
        extend : 'Ext.data.Model',
        fields : [
            { name : 'id', type : 'string', mapping : '@id' },
            { name : 'name', type : 'string', mapping : '@name' },
            { name : 'shots', type : 'string', mapping : '@shots' }
        ],
        belongsTo : 'TeamStats'
    });

    Ext.define('MyStore', {
        extend:'Ext.data.TreeStore',
        requires:[
            'TeamStats'
        ],

        constructor: function(cfg) {
            var me = this;
            cfg = cfg || {};
            me.callParent([Ext.apply({
                autoLoad: true,
                storeId: 'MyStore',
                model: 'TeamStats',
                root: {
                    children : []
                },
                proxy: {
                    type: 'ajax',
                    url: 'test.xml',
                    reader: {
                        type: 'teamstatsxml',
                        root: 'xmlData',
                        record: 'stats',
                        read: function(response) {
//                    var data = Util.stringToXML(response.data);
                            var data = Util.stringToXML(response.responseText);
                            if (response && response.responseText) {
                                data = this.getResponseData(response);
                            }
                            if (data) {
                                return this.readRecords(data);
                            } else {
                                return this.nullResultSet;
                            }
                        }
                    }
                },
                listeners: {
                    beforeexpand: {
                        fn: me.onXmltreestoreBeforeExpand,
                        scope: me
                    }
                }
            }, cfg)]);
        },

        onXmltreestoreBeforeExpand: function(treestore, options) {
            console.log('onXmltreestoreBeforeExpand is called');
        }
    });

//    var mystore = Ext.create('MyStore');//,{);


/*
    var mystore = Ext.create('Ext.data.TreeStore', {
        //Try it with children and autoLoad : false
        // make autoload :flase works
        root: {
            children : []
        } ,

        model : 'TeamStats',
        proxy: //new Ext.data.ScriptTagProxy({
        {
            type: 'ajax',
//            type:'jsonp',
//            url: 'http://localhost/myextjs/UITestBed/test.xml',
            url: 'test.xml',
            reader: {
                type: 'teamstatsxml',
                root: 'xmlData',
                record : 'stats' ,
                read: function(response) {
//                    var data = Util.stringToXML(response.data);
                    var data = Util.stringToXML(response.responseText);
                    if (response && response.responseText) {
                        data = this.getResponseData(response);
                    }
                    if (data) {
                        return this.readRecords(data);
                    } else {
                        return this.nullResultSet;
                    }
                }
            }
        },
        autoLoad : false
    });
*/
//mystore.load({
//    callback: function(records, operation, successful) {
//        //the user that was loaded
//        var team = records[0];
//
//        console.log("Team for " + team.get('name') + ":")
//
//        //iterate over the Orders for each User
//        team.players().each(function(player) {
//            console.log("player ID: " + player.getId() + ", who has id :");
//            console.log("player name: " + player.get('name') + ", who has name :");
//            console.log("player shots: " + player.get('shots') + ", who getShots :");
//
//        });
//    }
//});


    Util = (function(){

        return {
                stringToXML:function(text){
                    if (window.ActiveXObject){
                        var doc=new ActiveXObject('Microsoft.XMLDOM');
                        doc.async='false';
                        doc.loadXML(text);
                    } else {
                        var parser=new DOMParser();
                        var doc=parser.parseFromString(text,'text/xml');
                    }
                return doc;
            }
        };
    })();

Ext.onReady(function(){
    var mystore = Ext.create('MyStore');//,{);

    // create the Tree
    var tree = Ext.create('Ext.tree.Panel', {
        store: mystore,
        hideHeaders: true,
        rootVisible: false,
//        viewConfig: {
//            plugins: [{
//                ptype: 'treeviewdragdrop'
//            }]
//        },
        columns: [
            {
                xtype: 'treecolumn',
                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                    return unescape(value);
                },
                id: 'treeColumn',
                dataIndex: 'name',
                flex: 1
            }
        ],
        height: 350,
        width: 400,
        title: 'Directory Listing',
        renderTo:Ext.getBody(),
        collapsible: true
    });

});