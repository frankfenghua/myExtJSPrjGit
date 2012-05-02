Ext.define('Frank.component.container.MyPanel',{
    extend:'Ext.panel.Panel',
    title:'My Panel',

    width:'900',
    height:'200',

    id:'idMypanel',
    layout:'column',
//    suspendLayout:true,
//      floating:true,
    config:{
        myTitle:'second MyWindow'
    },
    renderTo: Ext.getBody(),

    items:
        [  {
                xtype:'panel',
                title:'first child panel',
                columnWidth:'0.25',
                height:'100'
            },{
                xtype:'panel',
                title:'second child panel',
                columnWidth:'0.2',
                height:'100'
            }
        ] ,

    initComponent:function(cfg){
        var me = this;

        me.initConfig(cfg);
        me.callParent(arguments);
    },

    constructor:function(){
        this.callParent(arguments);
    },

    sayHello:function(){
        console.log("Hello from Frank.component.container.MyPanel#sayHello()");
    }
})