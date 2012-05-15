// ================================================================
//  jkl-form.js ---- JavaScript Kawasaki Library for Forms
//  Copyright 2002-2005 Kawasaki Yusuke <u-suke@kawa.net>
//  2005/04/06 - 最初のバージョン
//  2005/04/09 - 
//  2005/04/22 - selectOptionByIndex 追加
//  ========================================================

/***********************************************************

      <script type="text/javascript" src="jkl-form.js" charset="Shift_JIS"></script>
      <script>
        form1 = new JKL.Form("formname");
      </script>
      <form name="formname" action="#" method="GET">
      </form>

 **********************************************************/

// 親クラス

if ( typeof(JKL) == 'undefined' ) JKL = function() {};

// JKL.Form コンストラクタの定義

JKL.Form = function ( formid ) {
    this.formid     = formid;
    this.__formelem = null;
	return this;
}

//	フォームIDの入出力

JKL.Form.prototype.getFormElement = function () {
	if ( ! this.__formelem ) {
		this.__formelem = document.getElementById( this.formid );
		// 継承したい
		if ( this.__formelem ) {
			this.submit = this.__formelem.submit;
		}
	}
	return this.__formelem;
}

JKL.Form.prototype.setFormElement = function ( foemelem ) {
	this.__formelem = formelem;
	this.formid = formelem.id;
}

//	フォームエレメントの入出力

JKL.Form.prototype.setFormId = function ( formid ) {
	this.formid = formid;
	this.__formelem = null;
}

JKL.Form.prototype.getFormId = function ( formid ) {
	return this.formid;
}

//	フォームエレメントのプロパティの変更

JKL.Form.prototype.setFormAttribute = function ( key, val ) {
	var felem = this.getFormElement();
	if ( ! felem ) return;
	felem[key] = val;
}

JKL.Form.prototype.getFormAttribute = function ( key ) {
	var felem = this.getFormElement();
	if ( ! felem ) return;
	return felem[key];
}

// 	フォーム変数名で指定した要素の取り出し（必ず配列で返す）

JKL.Form.prototype.getElementsArray = function ( keyname ) {
	var felem = this.getFormElement();
    var olist = new Array();
	if ( ! felem ) return olist;
    if ( ! felem.elements.length ) return olist;
    for( var i=0; i < felem.elements.length; i++ ) {    // すべての変数について
        if ( felem.elements[i].name != keyname ) continue;
		olist[olist.length] = felem.elements[i];
	}
	return olist;
}

//	フォーム変数値の取り出し

JKL.Form.prototype.getValue = function ( keyname ) {
	var elist = this.getElementsArray( keyname );
    var olist = new Array();
	for( var i=0; i<elist.length; i++ ) {
		var e = elist[i];
        if ( e.type == "radio" ||            // ラジオボタン
             e.type == "checkbox" ) {        // チェックボックス
            if ( ! e.checked ) continue;
			olist[olist.length] = e.value;
        } else if ( e.type == "select-one" ||       // プルダウン
                    e.type == "select-multiple" ) { // 複数選択
            for( var j=0; j < e.length; j++ ) {
                if ( ! e.options[j].selected ) continue;
				olist[olist.length] = e.options[j].value;
            }
        } else {
			olist[olist.length] = e.value;
		}
    }
    if ( olist.length < 1 ) return;             // 無ければ空で返す
    if ( olist.length == 1 ) return olist[0];   // １つなら文字列で返す
    return olist;                               // 複数なら配列で返す
}

//  フォーム変数に値を書き込む

JKL.Form.prototype.setValue = function ( keyname, keyval, keyarg ) {
	var elist = this.getElementsArray( keyname );
	if ( ! keyarg ) keyarg = "value";
	for( var i=0; i<elist.length; i++ ) {
		var e = elist[i];
		if ( e.type == "radio" ) {           // ラジオボタン
            e.checked = ( e[keyarg] == keyval );
        } else if ( e.type == "checkbox" ) {        // チェックボックス
            if ( __isArray(keyval) ) {                  // 配列で入力（複数対応）
                var c = 0;
                for( k=0; k<keyval.length; k++ ) {
                    if ( e[keyarg] != keyval[k] ) continue;
					c ++;
					break;
                }
				e.checked = ( c > 0 );
            } else {
                e.checked = ( e[keyarg] == keyval );
            }
        } else if ( e.type == "select-one" ) {      // プルダウン
            for( var j=0; j < e.length; j++ ) {
                e.options[j].selected = ( e.options[j][keyarg] == keyval );
            }
        } else if ( e.type == "select-multiple" ) { // 複数選択
            for( var j=0; j < e.length; j++ ) {
                if ( __isArray(keyval) ) {              // 配列で入力（複数対応）
                    var c = 0;
                    for( k=0; k<keyval.length; k++ ) {
                        if ( e.options[j][keyarg] != keyval[k] ) continue;
						c ++;
						break;
                    }
                    e.options[j].selected = ( c > 0 );
                } else {
                    e.options[j].selected = ( e.options[j][keyarg] == keyval );
                }
            }
        } else {
            e.value = keyval;
        }
    }
	//  変数が配列かどうかを判定する
	function __isArray( x ){
	    return ((typeof(x) == "object") && (x.constructor == Array));
	}
}

//  フォーム要素を無効・有効とする（変数名と値で指定する）

JKL.Form.prototype.disableByName = function ( keyname ) {
	return this.disableOrEnableElement( true, keyname );
}
JKL.Form.prototype.enableByName = function ( keyname ) {
	return this.disableOrEnableElement( false, keyname );
}
JKL.Form.prototype.disableByValue = function ( keyname, keyval ) {
	return this.disableOrEnableElement( true, keyname, "value", keyval );
}
JKL.Form.prototype.enableByValue = function ( keyname, keyval ) {
	return this.disableOrEnableElement( false, keyname, "value", keyval );
}
JKL.Form.prototype.disableByText = function ( keyname, keytxt ) {
	return this.disableOrEnableElement( true, keyname, "text", keytxt );
}
JKL.Form.prototype.enableByText = function ( keyname, keytxt ) {
	return this.disableOrEnableElement( false, keyname, "text", keytxt );
}
JKL.Form.prototype.disableByIndex = function ( keyname, keyidx ) {
	return this.disableOrEnableElement( true, keyname, "index", keyidx );
}
JKL.Form.prototype.enableByIndex = function ( keyname, keyidx ) {
	return this.disableOrEnableElement( false, keyname, "index", keyidx );
}

JKL.Form.prototype.disableOrEnableElement = function ( torf, keyname, chktype, chkval ) {
	var elist = this.getElementsArray( keyname );
	for( var i=0; i<elist.length; i++ ) {
		var e = elist[i];
        if ( ! chktype ) {                          // 値が無指定の場合、
            e.disabled = torf;                     // 変数自体を消してしまう。
        } else if ( e.type == "radio" ||            // ラジオボタンまたは
                    e.type == "checkbox" ) {        // チェックボックスの場合、
            if ( e[chktype] != chkval ) continue;
            if ( torf ) e.checked = false;
            e.disabled = torf;                     // 選択不可にする
        } else if ( e.type == "select-one" ||       // プルダウンまたは
                    e.type == "select-multiple" ) { // 複数選択の場合、
            for( var j=0; j < e.length; j++ ) {
                if ( e.options[j][chktype] != chkval ) continue;
                if ( torf ) e.options[j].selected = false;
                // 選択不可になる（グレー表示になる）（Opera以外）
                if ( ! window.opera ) e.options[j].disabled = torf;
                // 選択可能のままグレー表示にする（IE用）
                e.options[j].style.color = torf ? "#999999" : "";
                // 項目が消える（空白欄になる）
                // e.options[j].style.visibility = torf ? "hidden" : "visible";
                // 項目が消える（無くなる）
                // e.options[j].style.display = torf ? "none" : "list-item";
                // 項目が消える（復活できない）
                // if ( torf ) e.options[j] = null;
            }
        }
    }
}

// <option> 要素で選択されている選択肢のIDを取り出す（値でなくて選択肢番号）

JKL.Form.prototype.getSelectedIndex = function( keyname ) {
	var elist = this.getElementsArray( keyname );
    var olist = new Array();
	for( var i=0; i<elist.length; i++ ) {
		var e = elist[i];
        if ( e.type == "select-one" ||          // プルダウン
             e.type == "select-multiple" ) {
            for( var j=0; j < e.length; j++ ) {
                if ( ! e.options[j].selected ) continue;
				olist[olist.length] = j;
            }
        }
    }
    if ( olist.length < 1 ) return;             // 無ければ空で返す
    if ( olist.length == 1 ) return olist[0];   // １つなら文字列で返す
    return olist;                               // 複数なら配列で返す
}

// <option> 要素で選択されている選択肢のテキストを取り出す

JKL.Form.prototype.getSelectedText = function( keyname ) {
	var elist = this.getElementsArray( keyname );
    var olist = new Array();
	for( var i=0; i<elist.length; i++ ) {
		var e = elist[i];
        if ( e.type == "select-one" ||          // プルダウン
             e.type == "select-multiple" ) {
            for( var j=0; j < e.length; j++ ) {
                if ( ! e.options[j].selected ) continue;
				olist[olist.length] = e.options[j].text;
            }
        }
    }
    if ( olist.length < 1 ) return;             // 無ければ空で返す
    if ( olist.length == 1 ) return olist[0];   // １つなら文字列で返す
    return olist;                               // 複数なら配列で返す
}

//  選択肢をクリアする（全ての選択肢を削除）

JKL.Form.prototype.deleteAllOptions = function( keyname ) {
	var elist = this.getElementsArray( keyname );
	for( var i=0; i<elist.length; i++ ) {
		var e = elist[i];
        if ( e.type == "select-one" ||              // プルダウン
             e.type == "select-multiple" ) {        // 複数選択
            e.options.length = 0;					// 選択肢数を0にする
        }
    }
}

//  選択中 or 未選択の選択肢を削除する

JKL.Form.prototype.deleteSelectedOptions = function( keyname, torf ) {
	if ( typeof(torf) != "boolean" ) torf = true;
	this.deleteOptions( keyname, "selected", torf );
}
JKL.Form.prototype.deleteOptionsByValue = function( keyname, keyval ) {
	this.deleteOptions( keyname, "value", keyval );
}
JKL.Form.prototype.deleteOptionsByText = function( keyname, keytxt ) {
	this.deleteOptions( keyname, "text", keytxt );
}
JKL.Form.prototype.deleteOptionsByIndex = function( keyname, keyidx ) {
	this.deleteOptions( keyname, "index", keyidx );
}

JKL.Form.prototype.deleteOptions = function( keyname, chktype, chkval ) {
	var elist = this.getElementsArray( keyname );
	for( var i=0; i<elist.length; i++ ) {
		var e = elist[i];
        if ( e.type == "select-one" ||              // プルダウン
             e.type == "select-multiple" ) {        // 複数選択
			for( var j=e.length-1; j >= 0; j-- ) {	// 念のため後ろから確認
				if ( e.options[j][chktype] != chkval ) continue;
				e.options[j] = null;				// 選択肢を削除する
			}
        }
    }
}

//  選択肢を追加する

JKL.Form.prototype.addOption = function( keyname, keyval, keytxt ) {
	var elist = this.getElementsArray( keyname );
	var oindex;
	for( var i=0; i<elist.length; i++ ) {
		var e = elist[i];
        if ( e.type == "select-one" ||              // プルダウン
             e.type == "select-multiple" ) {        // 複数選択
            oindex = e.options.length;
            var opt1 = document.createElement('option'); 
            opt1.value = keyval; 
            opt1.text = ( typeof keytxt != "undefined" ) ? keytxt : keyval; 
            e.options[oindex] = opt1;     // 追加する
        }
    }
    return oindex;                        // 追加した OptionIndex
}

//	selectAllOptions ---- チェックボックスまたはselect-multipleの値を統一

JKL.Form.prototype.selectAllOptions = function( keyname, torf ) {
	var elist = this.getElementsArray( keyname );
    if ( typeof(torf) != 'boolean' ) {
		// 新値が未指定の場合は、デフォルトは全てOFFにする
        torf = false;                       
		// 全ての値をチェックして、1つでも未選択があれば全てONにする
		for( var i=0; i<elist.length; i++ ) {
			var e = elist[i];
            if ( e.type == "checkbox" ) {
                if ( ! e.checked ) {                    // 1つでも未選択
                    torf = true;                        // 全てONにする
                    break;
                }
            } else if ( e.type == "select-multiple" ) {
                for( var j=0; j < e.length; j++ ) {
                    if ( ! e.options[j].selected ) {    // 1つでも未選択
                        torf = true;                    // 全てONにする
                        break;
                    }
                }
            }
        }
    }
	for( var i=0; i<elist.length; i++ ) {
		var e = elist[i];
        if ( e.type == "checkbox" ) {
            e.checked = torf;
        } else if ( e.type == "select-multiple" ) {
            for( var j=0; j < e.length; j++ ) {
                e.options[j].selected = torf;       // 統一する
            }
        }
    }
    return torf;        // 統一内容
}

//	selectOptions ---- チェックボックスまたはselect-multipleを選択

JKL.Form.prototype.selectOptionsByValue = function( keyname, keyval, torf ) {
	this.selectOptions( keyname, "value", keyval );
}
JKL.Form.prototype.selectOptionsByText = function( keyname, keytxt, torf ) {
	this.selectOptions( keyname, "text", keytxt );
}
JKL.Form.prototype.selectOptionsByIndex = function( keyname, keyidx, torf ) {
	this.selectOptions( keyname, "index", keyidx );
}

JKL.Form.prototype.selectOptions = function( keyname, chktype, chkval, torf ) {
    if ( typeof(torf) == 'undefined' ) {
        torf = true;                 // 未指定の場合は、ONにする
    } else if ( typeof(torf) != 'boolean' ) {
        torf = !! torf;
	}
	var elist = this.getElementsArray( keyname );
	for( var i=0; i<elist.length; i++ ) {
		var e = elist[i];
        if ( e.type == "select-one" ||              // プルダウン
             e.type == "select-multiple" ) {        // 複数選択
			for( var j=e.length-1; j >= 0; j-- ) {	// 念のため後ろから確認
				if ( e.options[j][chktype] != chkval ) continue;
				e.options[j].selected = torf;		// 選択する
			}
        }
    }
}

// <option> 中の選択している値を上下移動する

JKL.Form.prototype.upDownSelectedOptions = function( keyname, updown ) {
	var elist = this.getElementsArray( keyname );
	var oindex;
	for( var i=0; i<elist.length; i++ ) {
		var e = elist[i];
        if ( e.type == "select-one" ||          // プルダウン
             e.type == "select-multiple" ) {
            if ( e.length < 1 ) continue;       // 選択肢が1つ以下
            if ( updown < 0 ) {                 // 上方向に上げる
                for( var j=1; j < e.length; j++ ) {
                    if ( ! e.options[j].selected ) continue;
                    if ( e.options[j-1].selected ) continue;
                    __swap(e,j,j-1);
                }
            } else {                            // 下方向に下げる
                for( var j=e.length-2; j >= 0; j-- ) {
                    if ( ! e.options[j].selected ) continue;
                    if ( e.options[j+1].selected ) continue;
                    __swap(e,j,j+1);
                }
            }
        }
    }

    // ↓だけでは、スタイルとかがコピーされないので、どうにかしたい…
    function __swap(sel1,a,b) {
        var t = e.options[a].text;
        var v = e.options[a].value;
        var s = e.options[a].selected;
        e.options[a].text     = e.options[b].text;
        e.options[a].value    = e.options[b].value;
        e.options[a].selected = e.options[b].selected;
        e.options[b].text     = t;
        e.options[b].value    = v;
        e.options[b].selected = s;
    }
}

// ================================================================
