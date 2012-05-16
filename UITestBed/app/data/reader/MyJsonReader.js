

Ext.define('MyApp.data.reader..MyJsonReader',{
    extends:'Ext.data.reader.Json',
    alias : 'reader.myJsonReader',
    requires:[
        'Ext.data.reader.Json'
    ]
    ,

    getResponseData : function(response) {
        console.log("MyJsonReader() in overridden getResponseData");
        var jsonData = this.callOverridden(arguments);
        return jsonData;

    }

});
