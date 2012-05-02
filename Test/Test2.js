Ext.Loader.setConfig({
    enabled : true,
    disableCaching:false, // fh :debug
    paths: {
        'Frank' : './src/frank/js'
    }
});

//Ext.Loader.setConfig({
//    enabled:true,
//    disableCaching:true,
//    paths:{
//        'Ext.ux':'app/lib/ux',
//        'Ext.ux.app':'app/lib/ux/app'
//    }
//});

Ext.require([
    'Frank.component.window.Window' ,
    'Frank.component.container.MyPanel',
    'Frank.component.container.SubMyPanel'
]);

Ext.onReady(function() {
	console.log("Ext JS ready");

    Ext.define('My.own.WindowBottomBar', {

    });

    Ext.define('My.own.Window', {
        /** @readonly */
        isWindow: true,

        config: {
            title: 'Title Here',

            bottomBar: {
                enabled: true,
                height: 50,
                resizable: false
            }
        },

        constructor: function(config) {
//            this.initConfig(config);
        },

        applyTitle: function(title) {
            if (!Ext.isString(title) || title.length === 0) {
//                Ext.Msg.alert('Error: Title must be a valid non-empty string');
                console.log('Error: Title must be a valid non-empty string');
            }
            else {
                return title;
            }
        },

        applyBottomBar: function(bottomBar) {
            if (bottomBar && bottomBar.enabled) {
                if (!this.bottomBar) {
                    return Ext.create('My.own.WindowBottomBar', bottomBar);
                }
                else {
                    this.bottomBar.setConfig(bottomBar);
                }
            }
        }
    });

    var myWindow = Ext.create('My.own.Window', {
        title: 'Hello World',
        bottomBar: {
            height: 60
        }
    });

//    alert(myWindow.getTitle()); // alerts "Hello World"
    console.log(myWindow.getTitle()); // alerts "Hello World"
    console.log("myWindow.title = " + myWindow.title); // alerts "Hello World"


    myWindow.setTitle('Something New');

//    alert(myWindow.getTitle()); // alerts "Something New"
    console.log(myWindow.getTitle()); // alerts "Something New"

    myWindow.setTitle(null); // alerts "Error: Title must be a valid non-empty string"

    myWindow.setBottomBar({ height: 100 }); // Bottom bar's height is changed to 100

    // my own test
    var frankWin = Ext.create('Frank.component.window.Window',{
         title:'change title',
         resizable:false
    });

    console.log("frankWin.title = " + frankWin.title);
    console.log("frankWin.getTitle = " + frankWin.getTitle());

    console.log("frankWin.resizable = " + frankWin.resizeable);
    console.log("frankWin.getResizable= " + frankWin.getResizeable());

    var frankPanel = Ext.create('Frank.component.container.MyPanel',{
        title:'frankPanel title'
    });

    console.log("frankPanel.myTitle = " + frankPanel.myTitle);

// Add a couple of child items.  We could add these both at the same time by passing an array to add(),
// but lets pretend we needed to add them separately for some reason.
    frankPanel.add({
        xtype: 'panel',
        title: 'program added:  Child Panel 1(frankPanel.add)',
        height: '100',
        columnWidth: '0.25'
    });
    /*
     frankPanel.add({
        xtype: 'panel',
        title: 'Child Panel 2',
        height: '100',
        columnWidth: '0.25'
    });
*/
// Turn the suspendLayout flag off.
//    frankPanel.suspendLayout = false;
// Trigger a layout.
        // expensive
//    frankPanel.doLayout();

    // uncomment flowing line pause js debuger
//    debugger;
    var subPanel = Ext.create('Frank.component.container.SubMyPanel',{
        title:'sub frankPanel title' ,
        columnWidth:'0.3'
    });
    var subPanel2 = Ext.create('Frank.component.container.SubMyPanel',{
        title:'sub2 frankPanel2 title',
        columnWidth:'0.2'
    });
    console.log("subPanel.myTitle = " +  subPanel.myTitle);
    frankPanel.add([subPanel,subPanel2]);
//    frankPanel.show();
    console.log("version = " + Ext.getVersion().getMajor());
    console.log("version = " + Ext.getVersion().getMinor());
    var version = Ext.getVersion();
    console.log(version.getMajor()); // 4
    console.log(version.getMinor()); // 0
    console.log(version.getPatch()); // 7
    console.log(version.getBuild()); // 0
    console.log(version.getRelease()); // beta

    //get DOM el
    console.log("Ext.get('my-div').id = " + Ext.get('my-div').id);

    // get Ext component by id
    var ref = Ext.getCmp('idMypanel');
    if(ref){
        ref.sayHello();
    }

//    debugger;
    var refSubPanel = Ext.get('submypanel');
    var refSubPanel2 = Ext.ComponentQuery.query('submypanel')[0];
    if(refSubPanel2){
        refSubPanel2.sayHi();
    }
    var refSubPanel3 = Ext.ComponentQuery.query('submypanel')[1];
    if(refSubPanel3){
        refSubPanel3.sayHi();
    }

});
