Ext.define('MyApp.store.GUSJsonComboStore', {
    extend: 'Ext.data.Store',
    requires: [
        'MyApp.model.GUSJsonComboModel'
    ],
    model:'MyApp.model.GUSJsonComboModel'
//    ,

	/**
	 * override fillNode only foe this class, not globally
	 */
/*
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
    },

    constructor: function(cfg) {
        var me = this;


        me.gjsonData = me.initXmlTree();
//        me.initConfig(cfg);

        cfg = cfg || {};
        me.callParent([Ext.apply({

            autoLoad: true,
            storeId: 'GUSJsonComboStore',
            model: 'MyApp.model.GUSJsonComboModel',
            root: {
                name: 'People',
                label: 'People',
                nodeid: 'root_nodeid',
                expanded: true
            } ,
            proxy: {
                type: 'memory',
                data: me.gjsonData,
                reader: {
                    type: 'json',
                    root: function(o) {
                        if (o.explorer) { //root
                            return o.explorer.node;     // for treegrid_nested_json2.json
                        } else {
                            return o.node; // for    treegrid_nested_json.json
                        }
                    }
                }
            },
            listeners:{
//                beforeexpand: {
//                    fn: me.onXmltreestoreBeforeExpand,
//                    scope: me
//                },
//                expand:{
//                    fn: me.onXmltreestoreExpand,
//                    scope: me
//                },
//                append:{
//                    fn: me.onXmltreestoreAppend,
//                    scope:me
//                },
//                load:{
//                    fn:me.onXmltreestoreLoad,
//                    scope:me
//                }
            }
        }, cfg)]);


    },

    initXmlTree:function(){
//        var url = 'http://localhost/js/myExtJSPrjGit/UITestBed/data/gus_qa001.xml' ;
        var url = 'data/gus_qa001.xml' ;
        var xml = new JKL.ParseXML( url, null );

        var gjsonData = xml.parse();
        return   gjsonData;
    }
*/
});