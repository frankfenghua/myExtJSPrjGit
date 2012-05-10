Ext.define('Ext.ux.xpath',{
    singleton	: true,
    ns 			: {":": "http://www.w3.org/1999/xhtml11","xsl": "http://www.w3.org/1999/XSL/Transform", "xsi": "http://www.w3.org/2001/XMLSchema-instance", "xsd": "http://www.w3.org/2001/XMLSchema", "xf": "http://www.w3.org/2002/xforms", "ev": "http://www.w3.org/2001/xml-events", "ext": "http://www.sencha.com"}
});


Ext.define('Ext.ux.xpath.Xpath', {
    expression	: '.',
    ns 			: Ext.ux.xpath.ns,
    constructor: function(config){
        var me = this;
        Ext.apply(me,config);
        if(!me.expression) {me.expression = '.'};
        if(me.expression.substring(0,2) == '.[') { me.expression = 'self::node()' +me.expression.substring(1)} // bug ?? in chrome not evaluation .[@attribute]  or .[element]
        if(!me.ctx) {me.ctx = document};
        if(!me.doc) {me.doc= me instanceof Document ? me: document};
    },
    evalMapping : {
        1: 'numberValue',
        2: 'stringValue',
        3: 'booleanValue'
    },
    evaluate	: function() {
        var temp,x,me=this;
        try {
            x=me.doc.evaluate(
                me.expression,
                me.ctx,
                me.ns ? function(prefix) {return me.ns[prefix ? prefix : ":"] || null}
                    : me.doc.createNSResolver ? me.doc.createNSResolver(me.ctx) : null,
                XPathResult.ANY_TYPE
                ,null);
        } catch (e) {
            Ext.Error.raise({
                parseError: e,
                xpath: me,
                msg: "xpath expression is invalid: " + me.expression
            });
        }
        switch (x.resultType)
        {case XPathResult.NUMBER_TYPE:
            case XPathResult.STRING_TYPE:
            case XPathResult.BOOLEAN_TYPE:
                me.value=x[me.evalMapping[x.resultType]];
                break;

            case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
            case XPathResult.ORDERED_NODE_ITERATOR_TYPE:
                me.value=[];
                while (!!(temp=x.iterateNext())) me.value.push(temp);
                break;

            case XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE:
            case XPathResult.ORDERED_NODE_SNAPSHOT_TYPE:
                me.value=[];
                for (temp=0;temp<x.snapshotLength;++temp) me.value.push(x.snapshotItem(i));
                break;

            case XPathResult.ANY_UNORDERED_NODE_TYPE:
            case XPathResult.FIRST_ORDERED_NODE_TYPE:
                me.value=x.singleNodeValue;
                break;}

        return me.value
    },
    evaluateIE : function() {
        var me = this;
        me.setDocIE();

        return me.value = me.ctx.selectNodes(me.expression);
    },
    setDocIE : function() {
        var x='', me = this;
        if(me.doc instanceof HTMLDocument) {
            me.doc = new ActiveXObject("Msxml2.DOMDocument").appendChild(me.doc.cloneNode(true));
            Ext.apply(me.doc, {async: false, validateOnParse : false })
        }
        me.doc.setProperty("SelectionLanguage", "XPath");
        for (var ns in me.ns) {x += "xmlns" +(ns == ":"? "'": ":'") + this.ns[ns] + "' "};
        me.doc.setProperty("SelectionNamespaces", x);
    }
},function() {
    var Xp = this;
    if(Ext.isIE){
        Element.prototype.xpath = function(expression,ns) {return new Xp( {expression: expression , ns: ns || Xp.prototype.ns, ctx:this, doc:this.ownerDocument || this.elementDocument}).evaluateIE()}
    }
    else {
        Node.prototype.xpath = function(expression,ns) {return new Xp( {expression: expression , ns: ns || Xp.prototype.ns, ctx:this, doc:this.ownerDocument}).evaluate()}
    }
});