//====================
//   overrideXmlReader  using ExtJS4's way
//====================

Ext.define('MyApp.overrides.CustomXmlReader',{
    requires:[
        'Ext.data.reader.Xml'
        ,
        'Ext.ux.xpath.Xpath'
        ]
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
//                root = Ext.DomQuery.select(recordName, root);
                if(false){//selector){
//                    root = Ext.DomQuery.select(selector, root);
                    root = Ext.DomQuery.select(recordName, root);
                }else{
                    root = Ext.DomQuery.select(recordName, root);
//                    root = Ext.DomQuery.select( ('.//' + recordName), root);
                }
//                root =Xpath.xpath(selector ? selector : ('.//' + recordName), root);
                //patch
//                root = Ext.DomQuery.select('>' + recordName, root);
            } else {
                root = [root];
            }
            return this.callParent([root]);
        },
        readRecords: function(doc) {
            this.xmlData = doc;

            return this.callParent([doc]);
        },
        getRoot: function(data) {
            // http://www.sencha.com/forum/showthread.php?154911
            var nodeName = data.nodeName,
                root     = this.root;

            if (!root || (nodeName && nodeName == root)) {
                return data;
            } else {
                // This fix ensures we have XML data
                // Related to TreeStore calling getRoot with the root node, which isn't XML
                // Probably should be resolved in TreeStore at some point
                return Ext.DomQuery.selectNode(root, data);
            }
        }

    });
});

//Ext.DomQuery.select =
//    function(path, root, type) {
//        root = root || document;
//        if (Ext.DomQuery.isXml(root)){
//            return root.xpath(path)
//        }
//        return Ext.DomQuery.jsSelect.call(this, path, root, type);
//    };

//Ext.DomQuery.select = document.xpath ?
//    function(path, root, type) {
//        root = root || document;
//        if (Ext.DomQuery.isXml(root)){
//            return root.xpath(path)
//        }
//        return Ext.DomQuery.jsSelect.call(this, path, root, type);
//    }
//    : function(path, root, type) {
//        return Ext.DomQuery.jsSelect.call(this, path, root, type)
//    };
