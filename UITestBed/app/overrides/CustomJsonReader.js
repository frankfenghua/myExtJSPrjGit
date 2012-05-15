//====================
//   overrideXmlReader  using ExtJS4's way
//====================

Ext.define('MyApp.overrides.CustomJsonReader',{
    alias : 'reader.customJsonReader',
    requires:[
        'Ext.data.reader.Json'
        ]
},function(){
    Ext.override(Ext.data.reader.Json, {
        getResponseData : function(response) {
            console.log("in overridden getResponseData");
            var jsonData = this.callOverridden(arguments);
//            jsonData = Ext.JSON.decode(response.responseText);

//            return jsonData.explorer;
            return jsonData;

        }
    });
});

