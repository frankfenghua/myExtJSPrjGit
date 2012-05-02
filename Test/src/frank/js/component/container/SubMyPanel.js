Ext.define('Frank.component.container.SubMyPanel',{
    extend:'Ext.panel.Panel',
    alias:'widget.submypanel',
    title:'My Sub Panel',


    config:{
        myTitle:'I changed  SubMyWindow'       ,
        columnWidth:'0.2',
        height: '100'
    },


    initComponent:function(cfg){
        var me = this;

        me.initConfig(cfg);
        me.callParent(arguments);
    },

    constructor:function(){
        this.callParent(arguments);
    },

    sayHi:function(){
        console.log("Hi from  " + this.title + " => SubMyPanel#sayHi() ");
    }
})