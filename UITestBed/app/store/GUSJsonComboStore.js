Ext.define('MyApp.store.GUSJsonComboStore', {
    extend: 'Ext.data.Store',
//    extend: 'Ext.data.TreeStore',
    requires: [
        'MyApp.model.GUSJsonComboModel'
    ],
    model:'MyApp.model.GUSJsonComboModel'
    ,


    constructor: function(cfg) {
        var me = this;


        me.gjsonData = me.initXmlTree();

        cfg = cfg || {};
        me.callParent([Ext.apply({

            autoLoad: true,
            storeId: 'GUSJsonComboStore',
            model: 'MyApp.model.GUSJsonComboModel',
            proxy: {
                type:'memory',
                data:me.gjsonData,

                reader: {
                    type: 'json',
                    root: function(o) {
                        if (o.explorer) { //root
                            return o.explorer.guidelineSets.guidelineSet;     // for treegrid_nested_json2.json
                        } else {
                            return o.node; // for    treegrid_nested_json.json
                        }
                    }
                }
            }
        }, cfg)]);


    },

    initXmlTree:function(){
//        var url = 'http://localhost/js/myExtJSPrjGit/UITestBed/data/gus_qa001.xml' ;
        var url = 'data/gus_qa001.xml' ;
        var xml = new JKL.ParseXML( url, null );

        var gjsonData = xml.parse();
        return   gjsonData;
    }

});