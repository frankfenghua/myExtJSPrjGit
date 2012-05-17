Ext.define('MyApp.model.GUSJsonComboModel', {
    extend: 'Ext.data.Model',

//    fields: ['id', 'name', 'artist', 'album', 'played_date', 'station']
//        <guidelineSet nodeid="AA692AD8-69FD-8091-7761-09919E19A656"
//                      selected="false" versionid="E1877D78-B223-1846-DBEF-8D770161CB5E">Acute%20Myeloid%20Leukemia</guidelineSet>

fields: [
    {
        convert: function(v, rec) {
            return  unescape(v);
        },
        name: 'guidelineSet',
        type: 'string'
    },
    {
        mapping: '@nodeid',
        name: 'nodeid',
        type: 'string'
    },
    {
        mapping: '@selected',
        name: 'selected',
        type: 'string'
    }

    ]
});