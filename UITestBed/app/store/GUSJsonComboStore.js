Ext.define('MyApp.store.GUSJsonComboStore', {
    extend: 'Ext.data.Store',
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
                type: 'ajax',
                url: 'data/gus_qa001.xml',
                reader: {
                    type: 'xml',
                    root: 'explorer',
                    record:'guidelineSets'
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