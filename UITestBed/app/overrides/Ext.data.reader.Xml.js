
//====================
//   overrideXmlReader
//====================
/*modify extract Data so as to allow an xpath selector*/
/*
Ext.override(Ext.data.XmlReader,{
    extractData: function(root) {
        var me = this;
        var recordName = me.record,
            selector	= me.selector;

        if (!recordName) {
            Ext.Error.raise('Record is a required parameter');
        }
        if (recordName != root.nodeName) {
            root = Ext.DomQuery.select(selector ? selector : ('.//' + recordName), root);
        } else {
            root = [root];
        }
        return this.callParent([root]);
    }
});


Ext.DomQuery.select = document.xpath ?
    function(path, root, type) {
        root = root || document;
        if (Ext.DomQuery.isXml(root)) {return root.xpath(path)}
        return Ext.DomQuery.jsSelect.call(this, path, root, type);
    }
    : function(path, root, type) {
        return Ext.DomQuery.jsSelect.call(this, path, root, type)
};
*/

Ext.override(Ext.data.reader.Xml,{


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


