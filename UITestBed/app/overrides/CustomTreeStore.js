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
        fillNode: function(node, newNodes) {
            var me = this,
                ln = newNodes ? newNodes.length : 0,
                sorters = me.sorters,
                i, sortCollection,
                needsIndexSort = false,
                performLocalSort = ln && me.sortOnLoad && !me.remoteSort && sorters && sorters.items && sorters.items.length,
                node1, node2;

            // See if there are any differing index values in the new nodes. If not, then we do not have to sortByIndex
            for (i = 1; i < ln; i++) {
                node1 = newNodes[i];
                node2 = newNodes[i - 1];
                needsIndexSort = node1[node1.persistenceProperty].index != node2[node2.persistenceProperty].index;
                if (needsIndexSort) {
                    break;
                }
            }

            // If there is a set of local sorters defined.
            if (performLocalSort) {
                // If sorting by index is needed, sort by index first
                if (needsIndexSort) {
                    me.sorters.insert(0, me.indexSorter);
                }
                sortCollection = new Ext.util.MixedCollection();
                sortCollection.addAll(newNodes);
                sortCollection.sort(me.sorters.items);
                newNodes = sortCollection.items;

                // Remove the index sorter
                me.sorters.remove(me.indexSorter);
            } else if (needsIndexSort) {
                Ext.Array.sort(newNodes, me.sortByIndex);
            }

            node.set('loaded', true);
            for (i = 0; i < ln; i++) {
                if(!node.isRoot()){
                    if(node.raw.node){
                        node.appendChild(newNodes[i], undefined, true);
                        if( !newNodes[i].raw.node ){
                            newNodes[i].set('leaf',true);
                        }
                    }else{
                        node.set('leaf',true);
                    }
                }else{
                    node.appendChild(newNodes[i], undefined, true);
                }
            }

            return newNodes;
        }
        /*/
         ,
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
         //*/
    });
});


