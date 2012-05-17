Ext.define('MyApp.model.GUSJsonComboModel', {
    extend: 'Ext.data.Model',
/*
    fields: [
        {
            convert: function(v, rec) {
                return  unescape(v);
            },
            name: 'label',
            type: 'string'
        },
        {
            name: 'versionid',
            type: 'string'
        },
        {
            name: 'type',
            type: 'string'
        },
        {
            name: 'nodeid',
            type: 'string'
        },
        {
            name: 'selected',
            type: 'string'
        },
        {
            name: 'version',
            type: 'string'
        },
        {
            name: 'seqnum',
            type: 'string'
        },
        {
            name: 'year',
            type: 'string'
        }
    ]
    ,
*/
    fields: ['id', 'name', 'artist', 'album', 'played_date', 'station'],
    proxy: {
        noCache:false,
        type: 'ajax',
        url: 'data/stations.json',
        reader: {
            type: 'json',
            root: 'results'
        }
    }
});