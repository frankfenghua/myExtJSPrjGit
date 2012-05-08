//====================
//   overrideXmlReader  using ExtJS4's way
//====================

Ext.define('MyApp.overrides.CustomTreeStore',{
    requires:'Ext.data.TreeStore'
},function(){
    Ext.override(Ext.data.TreeStore, {
        /**
         * Fills a node with a series of child records.
         * @private
         * @param {Ext.data.NodeInterface} node The node to fill
         * @param {Ext.data.Model[]} records The records to add
         */
        fillNode: function(node, records) {
            var me = this,
                ln = records ? records.length : 0,
                raw,
                i = 0, sortCollection;

            if (ln && me.sortOnLoad && !me.remoteSort && me.sorters && me.sorters.items) {
                sortCollection = Ext.create('Ext.util.MixedCollection');
                sortCollection.addAll(records);
                sortCollection.sort(me.sorters.items);
                records = sortCollection.items;
            }

            node.set('loaded', true);
            for (; i < ln; i++) {
                //me
                raw = records[i].raw;
//                console.log("CustomTreeStore::fillNode() raw = " + raw); // returned xml rather than object
                console.log( raw); // returned xml rather than object
//                if(raw.childNodes.lengh > 0 ){
//                    newChildNode.set('leaf', false);
//                }else{
//                    newChildNode.set('leaf', true);
//                }
//                records[i].data.leaf = raw.leaf; // so this fails probably

                node.appendChild(records[i], undefined, true);
            }

            return records;
//            return this.callParent(arguments);
        },
        onNodeAdded: function(parent, node) {
            var proxy = this.getProxy(),
                reader = proxy.getReader(),
                data = node.raw || node.data,
                dataRoot, children;

            Ext.Array.remove(this.removed, node);
            node.set('leaf', true);

            if (!node.isLeaf() && !node.isLoaded()) {
                dataRoot = reader.getRoot(data);
                if (dataRoot) {
                    this.fillNode(node, reader.extractData(dataRoot));
                    delete data[reader.root];
                }
            }
        }
    });
});


