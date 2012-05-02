Ext.define('Frank.component.window.Window',{
    config:{
        id:'myWindow',
        title:'myTitle',
        resizeable:true
    },

    constructor:function(config){
        this.initConfig(config);
        /*test error*/
//        throw new Error('['+ Ext.getDisplayName(arguments.callee) +'] Some message here');
    }


})