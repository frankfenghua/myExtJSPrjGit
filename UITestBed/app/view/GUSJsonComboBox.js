Ext.define('MyApp.view.GUSJsonComboBox', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.gusjsoncombobox',
    id: 'gusjsoncombobox',
    height: 20,
    labelWidth: 130,
    emptyText: 'Search station',
    store: 'GUSJsonComboStore',
//    store: this.createStore(),
//    displayField: 'label',
    displayField: 'name',
    typeAhead: true,
    queryMode: 'local',
    valueField: 'id',

    initComponent: function() {
        var me = this;

//        me.mymodel = me.createModel();
//        me.store = Ext.create("MyApp.store.GUSJsonComboStore");
//        me.store = me.createStore();

        me.gjsonData = me.initXmlTree();

        Ext.applyIf(me, {
            viewConfig: {

            },

            // all of your config options
            listeners:{
                scope: me,
                'select': me.onComboboxSelect
            }
        });


        me.callParent(arguments);
    },

    onComboboxSelect: function(combo, records, options) {

    },

    initXmlTree:function(){
//        var url = 'http://localhost/js/myExtJSPrjGit/UITestBed/data/gus_qa001.xml' ;
        var url = 'data/gus_qa001.xml' ;
        var xml = new JKL.ParseXML( url, null );

        var gjsonData = xml.parse();
        return   gjsonData;
    }



});