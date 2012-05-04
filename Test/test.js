Ext.Loader.setConfig({
    enabled : true,
    disableCaching:false, // fh :debug
    paths: {
        'Frank' : './src/frank/js'
    }
});

//Ext.require([
//    'Frank.component.window.Window' ,
//    'Frank.component.container.MyPanel',
//    'Frank.component.container.SubMyPanel'
//]);

Ext.onReady(function() {
	console.log("my Ext JS ready");

});
