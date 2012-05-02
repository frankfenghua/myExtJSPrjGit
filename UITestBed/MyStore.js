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