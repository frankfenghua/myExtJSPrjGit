//====================
//   overrideXmlReader  using ExtJS4's way
//====================

Ext.define('MyApp.overrides.CustomXmlReader',{
    extend:'Ext.data.reader.Xml',
    alias : 'reader.customXmlReader',


//      @private
//      We're just preparing the data for the superclass by pulling out the record nodes we want
//      @param {XMLElement} root The XML root node
//      @return {Ext.data.Model[]} The records

    extractData: function(root) {
        var recordName = this.record;

        //<debug>
        if (!recordName) {
            Ext.Error.raise('Record is a required parameter');
        }
        //</debug>

        if (recordName != root.nodeName) {
            //root = Ext.DomQuery.select(recordName, root);
            //patch
            root = Ext.DomQuery.select('>' + recordName, root);
        } else {
            root = [root];
        }
        return this.callParent([root]);
    }
});


