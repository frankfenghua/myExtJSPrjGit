//====================
//   overrideXmlReader  using ExtJS4's way
//====================

Ext.define('MyApp.overrides.CustomXmlReader',{
    requires:'Ext.data.reader.Xml'
},function(){
    Ext.override(Ext.data.reader.Xml, {
        extractData: function(root) {
            var recordName = this.record;

            //<debug>
            if (!recordName) {
                Ext.Error.raise('Record is a required parameter');
            }
            //</debug>

            if (recordName != root.nodeName) {
                root = Ext.DomQuery.select(recordName, root);
                //patch
//                root = Ext.DomQuery.select('>' + recordName, root);
            } else {
                root = [root];
            }
            return this.callParent([root]);
        }
    });
});


