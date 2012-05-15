// ================================================================
//  jkl-debug.js ---- JavaScript Kantan Library for Debugging
//  Copyright 2005 Kawasaki Yusuke <u-suke@kawa.net>
//  2005/04/09  v0.01  first release (using sub window)
//  2005/05/18  v0.10  updated
//  2005/06/13  v0.20  display messages within the same window
//  http://www.kawa.net/works/js/jkl/debug.html
//  ========================================================

/***********************************************************

    <script type="text/javascript" src="jkl-debug.js"></script>
    <form>
    <input type="button" onClick="debug.print('Hello, World!');">
    <input type="button" onClick="debug.clear();">
    </form>

 **********************************************************/

if ( typeof(JKL) == 'undefined' ) JKL = function() {};

//  constructor

JKL.Debug = function() {
    this.init();
    return this;
};

JKL.Debug.VERSION = "0.20";

//  stylesheets

JKL.Debug.STYLESHEETS = {
    debug:      "background: #CCCCFF; border: #333399 1px solid;",
    odd:        "background: #FFFFCC; font-size: 13px; ",
    even:       "background: #CCFFFF; font-size: 13px; ",
    timestamp:  "font-family: arial; font-size: 11px;"
};

//  initialize

JKL.Debug.prototype.init = function() {
    this.counter = 0;           // counter
    this.lasttime = 0;          // last time debug message displayed
    this.__messelem = null;     // message area
}

//  clear all debug messages

JKL.Debug.prototype.clear = function() {
    var elem = this.getMessageElement();
    elem.parentNode.removeChild( elem );
    var body0 = document.getElementsByTagName("body")[0];
    body0.style.paddingRight = this.save_paddingRight;
    this.init();
};

//  flush (dummy)

JKL.Debug.prototype.flush = function() {
    this.getMessageElement();
    // nothing to do.
};

//  focus the debug message

JKL.Debug.prototype.focus = function() {
    window.scrollTo( 0, 0 );                // scroll to top
};

//  get message element on the debug window

JKL.Debug.prototype.getMessageElement = function() {
    if ( this.__messelem ) return this.__messelem;

    var body0 = document.getElementsByTagName("body")[0];
    var div1 = document.createElement( "div" );

    div1.style.cssText = JKL.Debug.STYLESHEETS["debug"];
    div1.style.padding = "0px";
    div1.style.margin = "0px";
    div1.style.width = "160px";
    div1.style.height = "100%";
    div1.style.overflow = "scroll";
    div1.style.position = "absolute";
    div1.style.top = "0px";
    div1.style.right = "0px";
    div1.style.whiteSpace = "nowrap";

    this.save_paddingRight = body0.style.paddingRight;
    body0.style.paddingRight = "160px";
    body0.insertBefore( div1, body0.firstChild );

    // close debug area when double clicked
    var copy = this;
    var func = function() { copy.clear(); };
    if ( window.addEventListener ) {
        div1.addEventListener( "dblclick", func, false );   // Opera, Firefox
    } else if ( window.attachEvent ) {
        div1.attachEvent( "ondblclick", func );          // IE6
    }

    this.__messelem = div1;
    return this.__messelem;
};

//  print debug message

JKL.Debug.prototype.print = function( str ) {
    var dd = new Date();
    var nowtime = Math.floor(dd.getTime()/1000);
    if ( nowtime - this.lasttime >= 1 ) {
        this.printTimestamp();              // with one sec interval
    }
    this.lasttime = nowtime;

    var stl = ( this.counter++ % 2 ) ? "odd" : "even";
    if ( typeof(str) == "object" ) {
        stl += " object";
    }
    this.printLine( str, stl );             // print message
};

//  print one line

JKL.Debug.prototype.printLine = function( str, stl ) {
    var div1 = document.createElement( "div" );
    div1.style.cssText = JKL.Debug.STYLESHEETS[stl];
    div1.style.padding = "0px 0px 0px 2px";
    div1.style.margin = "0px";
    var txt = document.createTextNode( str );
    div1.appendChild( txt );
    var elem = this.getMessageElement();
    elem.appendChild( div1 );
};

//  print timestamp

JKL.Debug.prototype.printTimestamp = function( str, stl ) {
    var dd = new Date();
    var year = dd.getYear();
    var mon = dd.getMonth() + 1;
    var day = dd.getDate();
    var hour = dd.getHours();
    var min = dd.getMinutes();
    var sec = dd.getSeconds();
    if (year < 2000) { year += 1900; }
    if (mon < 10) { mon = "0" + mon; }
    if (day < 10) { day = "0" + day; }
    if (hour < 10) { hour = "0" + hour; }
    if (min < 10) { min = "0" + min; }
    if (sec < 10) { sec = "0" + sec; }
    var date = year+"/"+mon+"/"+day+" "+hour+":"+min+":"+sec;
    this.printLine( date, "timestamp" );
};

//  default instance "debug"

var debug = new JKL.Debug();
