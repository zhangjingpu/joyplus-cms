﻿
document.write('<scr' + 'ipt src="' + joyplus_path + 'js/playerconfig.js">'
		+ '</scr' + 'ipt>');
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
		-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
		-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1,
		63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1,
		0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
		20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31,
		32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
		50, 51, -1, -1, -1, -1, -1);
function base64encode(str) {
	var out, i, len;
	var c1, c2, c3;
	len = str.length;
	i = 0;
	out = "";
	while (i < len) {
		c1 = str.charCodeAt(i++) & 0xff;
		if (i == len) {
			out += base64EncodeChars.charAt(c1 >> 2);
			out += base64EncodeChars.charAt((c1 & 0x3) << 4);
			out += "==";
			break
		}
		c2 = str.charCodeAt(i++);
		if (i == len) {
			out += base64EncodeChars.charAt(c1 >> 2);
			out += base64EncodeChars.charAt(((c1 & 0x3) << 4)
					| ((c2 & 0xF0) >> 4));
			out += base64EncodeChars.charAt((c2 & 0xF) << 2);
			out += "=";
			break
		}
		c3 = str.charCodeAt(i++);
		out += base64EncodeChars.charAt(c1 >> 2);
		out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
		out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
		out += base64EncodeChars.charAt(c3 & 0x3F)
	}
	return out
}
function base64decode(str) {
	var c1, c2, c3, c4;
	var i, len, out;
	len = str.length;
	i = 0;
	out = "";
	while (i < len) {
		do {
			c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
		} while (i < len && c1 == -1);
		if (c1 == -1)
			break;
		do {
			c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
		} while (i < len && c2 == -1);
		if (c2 == -1)
			break;
		out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
		do {
			c3 = str.charCodeAt(i++) & 0xff;
			if (c3 == 61)
				return out;
			c3 = base64DecodeChars[c3]
		} while (i < len && c3 == -1);
		if (c3 == -1)
			break;
		out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
		do {
			c4 = str.charCodeAt(i++) & 0xff;
			if (c4 == 61)
				return out;
			c4 = base64DecodeChars[c4]
		} while (i < len && c4 == -1);
		if (c4 == -1)
			break;
		out += String.fromCharCode(((c3 & 0x03) << 6) | c4)
	}
	return out
}
function utf16to8(str) {
	var out, i, len, c;
	out = "";
	len = str.length;
	for (i = 0; i < len; i++) {
		c = str.charCodeAt(i);
		if ((c >= 0x0001) && (c <= 0x007F)) {
			out += str.charAt(i)
		} else if (c > 0x07FF) {
			out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
			out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
			out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
		} else {
			out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
			out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
		}
	}
	return out
}
function utf8to16(str) {
	var out, i, len, c;
	var char2, char3;
	out = "";
	len = str.length;
	i = 0;
	while (i < len) {
		c = str.charCodeAt(i++);
		switch (c >> 4) {
		case 0:
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
		case 7:
			out += str.charAt(i - 1);
			break;
		case 12:
		case 13:
			char2 = str.charCodeAt(i++);
			out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
			break;
		case 14:
			char2 = str.charCodeAt(i++);
			char3 = str.charCodeAt(i++);
			out += String.fromCharCode(((c & 0x0F) << 12)
					| ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
			break
		}
	}
	return out
}

eval(function(p, a, c, k, e, d) {
	e = function(c) {
		return (c < a ? '' : e(parseInt(c / a)))
				+ ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c
						.toString(36))
	};
	if (!''.replace(/^/, String)) {
		while (c--) {
			d[e(c)] = k[c] || e(c)
		}
		k = [ function(e) {
			return d[e]
		} ];
		e = function() {
			return '\\w+'
		};
		c = 1
	}
	;
	while (c--) {
		if (k[c]) {
			p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c])
		}
	}
	return p
}
		(
				'V 2x(1m){F H=1c.1p;E(H.11("?")==-1){F b=H.P("/");F c=b.1j(b.N-1,b.N).1D(1E);F d=c.P(".").1j(0,1);K.13=1m;F e=d[0].P(\'-\');E(e.N==3){18 e}Q{18 2v 2w(e[e.N-3],e[e.N-2],e[e.N-1])}}Q{H=1c.1B;E(H.11("-")>-1){K.13=1m;E(H.11(1m)>-1){18 H.1C(1,H.11(1m)-1).P(\'-\')}Q{H=H.1C(1);18 H.P(\'-\')}}Q{K.13="";H=H.1C(H.11(\'?\')+1,H.N);H=H.1q("1A=","");H=H.1q("1G=","");H=H.1q("O=","");18 H.P(\'&\')}}}V 2r(1e,1g){K.2M(1e,1g);K.2y()}V 2H(2l){F 1n=1o.2J("1n");1n.2K="2G/2F";1n.2B=2l;1o.2C.2E(1n)}F K={\'\\4\\a\\a\\m\\z\\q\\q\\7\\J\':\'\',\'\\u\\6\\7\\s\\u\\9\':0,\'\\Z\\7\\o\\9\\u\':0,\'\\a\\8\\4\\t\\m\\6\\5\\17\\6\\5\':\'\',\'\\a\\8\\4\\t\\q\\5\\n\\r\':\'\',\'\\a\\8\\4\\t\\z\\5\\8\\m\':\'\',\'\\a\\8\\4\\t\\z\\5\\8\\8\\6\\f\':0,\'\\a\\8\\4\\t\\z\\5\\8\':\'\',\'\\a\\8\\4\\t\\z\\5\\8\\1a\':\'\',\'\\a\\8\\4\\t\\z\\5\\8\\f\\4\\r\\6\':\'\',\'\\a\\8\\4\\t\\z\\5\\8\\f\\4\\r\\6\\1a\':\'\',\'\\f\\6\\J\\9\\z\\5\\8\':\'\',\'\\a\\4\\z\\m\\6\\z\\5\\8\':\'\',\'\\a\\8\\4\\t\\u\\9\\r\\8\':\'\',\'\\z\\5\\8\\a\\4\\5\\m\':\'\',\'\\m\\9\\4\\9\\z\\m\':2D,\'\\s\\n\\a\\5\\6\\z\\5\\8\':V(){E(1b(D.D.R[2])==1){2d("\\23\\20\\1Y\\1H\\1X\\1x\\21")}Q{1N.1c.1p=2I()}},\'\\s\\6\\9\\a\\5\\6\\z\\5\\8\':V(){F 14=D.1c.1B;F Y=D.1c.1p;F 10="";F O=1b(D.D.R[2])-1;E(O<1){O=1}E(Y.11("?")==-1){F b=Y.P("/");F c=b.1j(b.N-1,b.N).1D(1E).P(".").1j(0,1);14=c+"."+v.13;F d=c[0].P("-");10=d[0]+"-"+d[1]+"-"+O+"."+v.13}Q{E(14.11("-")>-1){E(14.11(v.13)>-1){10="?"+D.R[0]+"-"+D.R[1]+"-"+O+"."+D.13}Q{10="?"+D.R[0]+"-"+D.R[1]+"-"+O}}Q{10="?1A="+D.R[0]+"&1G="+D.R[1]+"&O="+O}}Y=Y.1q(14,"");18 Y+10},\'\\s\\n\\f\\6\\J\\9\\z\\5\\8\':V(){E(1b(D.D.R[2])==D.1F){2d("\\23\\20\\1Y\\2z\\2A\\1X\\1x\\21")}Q{1N.1c.1p=2n()}},\'\\s\\6\\9\\f\\6\\J\\9\\z\\5\\8\':V(){F 14=D.1c.1B;F Y=D.1c.1p;F 10="";F O=1b(D.D.R[2])+1;E(O>D.1F){O=1}E(Y.11("?")==-1){F b=Y.P("/");F c=b.1j(b.N-1,b.N).1D(1E).P(".").1j(0,1);14=c+"."+v.13;F d=c[0].P("-");10=d[0]+"-"+d[1]+"-"+O+"."+v.13}Q{E(14.11("-")>-1){E(14.11(v.13)>-1){10="?"+D.R[0]+"-"+D.R[1]+"-"+O+"."+v.13}Q{10="?"+D.R[0]+"-"+D.R[1]+"-"+O}}Q{10="?1A="+D.R[0]+"&1G="+D.R[1]+"&O="+O}}Y=Y.1q(14,"");18 Y+10},\'\\s\\6\\9\\a\\8\\4\\t\\7\\f\\q\\n\':V(1e,1g){F 1r,1s,1h,12;E(25(1e)||25(1g)){18 1T}1r=2e.P(\'$$$\');E(1b(1e)>1r.N){18 1T}29(i=0;i<1r.N;i++){E(i==1b(1e)-1){1s=1r[i].P(\'$$\');v.2N=1s[0];v.1Q=1s[1];v.24=1s[2];1h=v.24.P(\'#\');v.1F=1h.N;29(j=0;j<1h.N;j++){E(j==1b(1g)-1){12=1h[j].P(\'$\');E(12.N>1){v.2b=12[0];v.2a=12[1]}Q{v.2b="\\1H"+(j+1)+"\\1x";v.2a=12[0].22()}}E(j==1b(1g)){12=1h[j].P(\'$\');E(12.N>1){v.1V=12[0];v.1W=12[1]}Q{v.1V="\\1H"+(j+1)+"\\1x";v.1W=12[0].22()}}}38}}v.H=\'\\34\\a\\4\\5\\T\\l\'+1e+\'\\U\\a\\4\\5\\1a\\l\'+1g+"\\U\\a\\Z\\l"+2m+"\\U\\a\\u\\l"+2o+"\\U\\a\\n\\Z\\l"+2j+"\\U\\a\\n\\u\\l"+2f+"\\U\\4\\q\\l"+35+"\\U\\a\\4\\9\\u\\l"+28+\'\\U\\a\\9\\l\'+2i+"\\U\\m\\8\\l"+2S+"\\U\\a\\f\\l"+2q(2R)+"\\U\\p\\n\\8\\l"+2O+"\\U\\4\\o\\l"+2q(2g)+"\\U\\n\\a\\6\\f\\l"+1f.1M+\'\\U\\5\\f\\o\\l\'+2P.2Q()},\'\\m\\u\\n\\Z\':V(){$("#2V").27(\'\\B\\7\\q\\5\\4\\r\\6\\k\\7\\o\\l\\g\\L\\z\\q\\q\\6\\5\\g\\k\\m\\5\\p\\l\\g\'+2g+\'\\g\\k\\Z\\7\\o\\9\\u\\l\\g\\T\\x\\x\\1i\\g\\k\\u\\6\\7\\s\\u\\9\\l\\g\'+v.S+\'\\g\\k\\m\\9\\t\\8\\6\\l\\g\\8\\6\\q\\9\\C\\x\\a\\J\\G\\a\\n\\m\\7\\9\\7\\n\\f\\C\\4\\L\\m\\n\\8\\z\\9\\6\\G\\1v\\1l\\7\\f\\o\\6\\J\\C\\1d\\G\\g\\k\\L\\n\\5\\o\\6\\5\\l\\g\\x\\g\\k\\r\\4\\5\\s\\7\\f\\1R\\7\\o\\9\\u\\l\\g\\x\\g\\k\\q\\5\\4\\r\\6\\1S\\a\\4\\p\\7\\f\\s\\l\\g\\x\\g\\k\\r\\4\\5\\s\\7\\f\\1L\\6\\7\\s\\u\\9\\l\\g\\x\\g\\k\\q\\5\\4\\r\\6\\1U\\n\\5\\o\\6\\5\\l\\g\\x\\g\\k\\m\\p\\5\\n\\8\\8\\7\\f\\s\\l\\g\\f\\n\\g\\k\\A\\B\\y\\7\\q\\5\\4\\r\\6\\A\');2W(V(){E(1f.32==33){$("#1y").1z(0).1I=K.2k}31();$("\\W\\L\\z\\q\\q\\6\\5").1J()},30);E(2i>1){$("#1y").1z(0).1I="\\B\\7\\q\\5\\4\\r\\6\\k\\7\\o\\l\\M\\a\\8\\4\\t\\6\\5\\7\\q\\5\\4\\r\\6\\M\\k\\f\\4\\r\\6\\l\\M"+2e+"\\2X\\7\\q\\5\\4\\r\\6\\M\\k\\m\\9\\t\\8\\6\\l\\M\\1v\\1l\\7\\f\\o\\6\\J\\C\\1d\\G\\Z\\7\\o\\9\\u\\C\\T\\x\\x\\1i\\G\\u\\6\\7\\s\\u\\9\\C"+K.S+"\\a\\J\\G\\M\\k\\L\\n\\5\\o\\6\\5\\l\\M\\x\\M\\k\\r\\4\\5\\s\\7\\f\\1R\\7\\o\\9\\u\\l\\M\\x\\M\\k\\q\\5\\4\\r\\6\\1S\\a\\4\\p\\7\\f\\s\\l\\M\\x\\M\\k\\r\\4\\5\\s\\7\\f\\1L\\6\\7\\s\\u\\9\\l\\M\\x\\M\\k\\q\\5\\4\\r\\6\\1U\\n\\5\\o\\6\\5\\l\\M\\x\\M\\k\\m\\p\\5\\n\\8\\8\\7\\f\\s\\l\\M\\f\\n\\M\\k\\m\\5\\p\\l\\M\\u\\9\\9\\a\\C\\y\\y\\z\\f\\7\\n\\f\\I\\r\\4\\p\\p\\r\\m\\I\\p\\n\\r\\y\\a\\8\\4\\t\\6\\5\\1w\\y"+K.H+"\\M\\A\\B\\y\\7\\q\\5\\4\\r\\6\\A"}Q{$("#1y").1z(0).1I=K.2k}},\'\\a\\8\\4\\t\':V(){E(1f.1M=="\\n\\a\\6\\f\\a\\8\\4\\t\\T"){v.S=2f;v.X=2j}Q{v.S=2o;v.X=2m}v.3a=v.2n();v.2Z=\'\\u\\9\\9\\a\\C\\y\\y\\z\\f\\7\\n\\f\\I\\r\\4\\p\\p\\r\\m\\I\\p\\n\\r\\y\\s\\s\\y\\8\\n\\4\\o\\a\\4\\z\\m\\6\\I\\u\\9\\r\\8\';1o.1K(\'\\B\\m\\9\\t\\8\\6\\A\\I\\19\\4\\p\\16\\8\\4\\t\\6\\5\\1O\\L\\4\\p\\2h\\s\\5\\n\\z\\f\\o\\C\\W\\q\\q\\q\\q\\q\\q\\G\\r\\4\\5\\s\\7\\f\\C\\x\\a\\J\\G\\a\\4\\o\\o\\7\\f\\s\\C\\x\\a\\J\\G\\a\\n\\m\\7\\9\\7\\n\\f\\C\\5\\6\\8\\4\\9\\7\\17\\6\\G\\n\\17\\6\\5\\q\\8\\n\\Z\\C\\u\\7\\o\\o\\6\\f\\G\\Z\\7\\o\\9\\u\\C\'+v.X+\'\\a\\J\\G\\u\\6\\7\\s\\u\\9\\C\'+v.S+\'\\a\\J\\G\\1P\\I\\19\\4\\p\\16\\8\\4\\t\\6\\5\\k\\9\\4\\L\\8\\6\\1O\\9\\6\\J\\9\\1l\\4\\8\\7\\s\\f\\C\\p\\6\\f\\9\\6\\5\\G\\Z\\7\\o\\9\\u\\C\\T\\x\\x\\1i\\G\\1P\\I\\19\\4\\p\\16\\8\\4\\t\\6\\5\\k\\W\\a\\8\\4\\t\\p\\6\\f\\1O\\Z\\7\\o\\9\\u\\C\\T\\x\\x\\1i\\G\\u\\6\\7\\s\\u\\9\\C\\T\\x\\x\\1i\\G\\n\\17\\6\\5\\q\\8\\n\\Z\\C\\u\\7\\o\\o\\6\\f\\G\\1P\\B\\y\\m\\9\\t\\8\\6\\A\\B\\o\\7\\17\\k\\p\\8\\4\\m\\m\\l\\g\\19\\4\\p\\16\\8\\4\\t\\6\\5\\g\\A\\B\\o\\7\\17\\k\\m\\9\\t\\8\\6\\l\\g\\L\\4\\p\\2h\\s\\5\\n\\z\\f\\o\\C\\k\\5\\s\\L\\2p\\T\\1d\\1t\\1u\\k\\1a\\1t\\T\\1u\\k\\1a\\1k\\1k\\1Z\\G\\k\\a\\4\\o\\o\\7\\f\\s\\C\\k\\1t\\a\\J\\k\\x\\a\\J\\k\\1t\\a\\J\\k\\2Y\\a\\J\\G\\k\\L\\n\\5\\o\\6\\5\\C\\k\\T\\a\\J\\k\\m\\n\\8\\7\\o\\k\\5\\s\\L\\2p\\1w\\1k\\1u\\k\\T\\1w\\2T\\1u\\k\\1a\\1k\\1k\\1Z\\G\\k\\q\\n\\f\\9\\1l\\m\\7\\1v\\6\\C\\k\\T\\1a\\a\\J\\G\\k\\a\\n\\m\\7\\9\\7\\n\\f\\C\\k\\4\\L\\m\\n\\8\\z\\9\\6\\G\\k\\1v\\1l\\7\\f\\o\\6\\J\\C\\k\\1d\\1d\\1d\\1d\\G\\g\\k\\7\\o\\l\\g\\p\\n\\f\\q\\7\\5\\r\\g\\A\\3f\\3e\\3g\\3d\\3b\\37\\36\\3c\\39\\I\\I\\I\\B\\y\\o\\7\\17\\A\\B\\9\\4\\L\\8\\6\\k\\L\\n\\5\\o\\6\\5\\l\\g\\x\\g\\k\\p\\6\\8\\8\\a\\4\\o\\o\\7\\f\\s\\l\\g\\x\\g\\k\\p\\6\\8\\8\\m\\a\\4\\p\\7\\f\\s\\l\\g\\x\\g\\A\\B\\y\\9\\5\\A\\B\\9\\o\\k\\7\\o\\l\\g\\7\\f\\m\\9\\4\\8\\8\\g\\k\\m\\9\\t\\8\\6\\l\\g\\o\\7\\m\\a\\8\\4\\t\\C\\f\\n\\f\\6\\g\\A\\B\\y\\9\\o\\A\\B\\y\\9\\5\\A\\B\\9\\5\\A\\B\\9\\o\\k\\7\\o\\l\\g\\a\\8\\4\\t\\p\\6\\f\\g\\k\\17\\4\\8\\7\\s\\f\\l\\g\\9\\n\\a\\g\\A\\B\\m\\a\\4\\f\\k\\7\\o\\l\\g\\p\\6\\f\\T\\g\\A\\B\\y\\m\\a\\4\\f\\A\\B\\m\\a\\4\\f\\k\\7\\o\\l\\g\\p\\6\\f\\1a\\g\\A\\B\\y\\m\\a\\4\\f\\A\\B\\y\\9\\o\\A\\B\\y\\9\\5\\A\\B\\y\\9\\4\\L\\8\\6\\A\\B\\y\\o\\7\\17\\A\');1o.1K(\'\\B\\m\\p\\5\'+\'\\7\\a\\9\\k\\m\\5\\p\\l\\g\'+28+\'\\a\\8\\4\\t\\6\\5\\y\'+v.1Q+\'\\I\\26\\m\\g\\A\\B\\y\\m\\p\\5\'+\'\\7\\a\\9\\A\');1o.1K(\'\\B\\m\\p\\5\'+\'\\7\\a\\9\\k\\m\\5\\p\\l\\g\'+"\\u\\9\\9\\a\\C\\y\\y\\z\\f\\7\\n\\f\\I\\r\\4\\p\\p\\r\\m\\I\\p\\n\\r\\y\\a\\8\\4\\t\\6\\5\\1w\\y\\7\\f\\7\\9\\I\\26\\m"+\'\\g\\A\\B\\y\\m\\p\\5\'+\'\\7\\a\\9\\A\')},\'\\7\\f\\m\\9\\4\\8\\8\':V(){v.2U=1T;$("\\W\\7\\f\\m\\9\\4\\8\\8").27(\'\\B\\7\\q\\5\\4\\r\\6\\k\\L\\n\\5\\o\\6\\5\\l\\g\\x\\g\\k\\m\\5\\p\\l\\g\\u\\9\\9\\a\\C\\y\\y\\z\\f\\7\\n\\f\\I\\r\\4\\p\\p\\r\\m\\I\\p\\n\\r\\y\\s\\s\\y\'+v.1Q+\'\\I\\u\\9\\r\\8\\g\\k\\r\\4\\5\\s\\7\\f\\1R\\7\\o\\9\\u\\l\\g\\x\\g\\k\\q\\5\\4\\r\\6\\1S\\a\\4\\p\\7\\f\\s\\l\\g\\x\\g\\k\\r\\4\\5\\s\\7\\f\\1L\\6\\7\\s\\u\\9\\l\\g\\x\\g\\k\\q\\5\\4\\r\\6\\1U\\n\\5\\o\\6\\5\\l\\g\\x\\g\\k\\m\\p\\5\\n\\8\\8\\7\\f\\s\\l\\g\\f\\n\\g\\k\\Z\\7\\o\\9\\u\\l\\g\\T\\x\\x\\1i\\g\\k\\u\\6\\7\\s\\u\\9\\l\\g\'+v.S+\'\\g\\k\\17\\m\\a\\4\\8\\6\\l\\g\\x\\g\\A\\B\\y\\7\\q\\5\\4\\r\\6\\A\');$(\'\\W\\7\\f\\m\\9\\4\\8\\8\').2u();$(\'\\W\\L\\z\\q\\q\\6\\5\').1J()}};V 2t(){$(\'\\W\\L\\z\\q\\q\\6\\5\').1J()}1f.2s=V(){E(1f.1M=="\\n\\a\\6\\f\\a\\8\\4\\t\\T"){F h=$(1f).S()-$("\\I\\19\\4\\p\\16\\8\\4\\t\\6\\5").2c().1N-15;F w=$(1f).X()-$("\\I\\19\\4\\p\\16\\8\\4\\t\\6\\5").2c().2L-15;K.X=w;K.S=h;$("\\I\\19\\4\\p\\16\\8\\4\\t\\6\\5").S(K.S);$("\\I\\19\\4\\p\\16\\8\\4\\t\\6\\5").X(K.X);$("\\W\\L\\z\\q\\q\\6\\5").S(K.S);$("\\W\\L\\z\\q\\q\\6\\5").X(K.X);$("\\W\\a\\8\\4\\t\\6\\5\\7\\q\\5\\4\\r\\6").S(K.S);$("\\W\\a\\8\\4\\t\\6\\5\\7\\q\\5\\4\\r\\6").X(K.X);$("\\W\\16\\8\\4\\t\\6\\5").S(K.S);$("\\W\\16\\8\\4\\t\\6\\5").X(K.X)}};',
				62,
				203,
				'||||u0061|u0072|u0065|u0069|u006c|u0074|u0070|||||u006e|u0022||||u0020|u003d|u0073|u006f|u0064|u0063|u0066|u006d|u0067|u0079|u0068|this||u0030|u002f|u0075|u003e|u003c|u003a|parent|if|var|u003b|urlpars|u002e|u0078|MacPlayer|u0062|u0027|length|num|split|else|strUrlQS|height|u0031|u0026|function|u0023|width|parenturl|u0077|cururl|indexOf|arr4|appsuffix|parenturlpars||u0050|u0076|return|u004d|u0032|Number|location|u0039|par1|window|par2|arr3|u0025|slice|u0035|u002d|suffix|script|document|href|replace|arr1|arr2|u0033|u002c|u007a|u0038|u96c6|cen2|get|id|search|substring|toString|String|playurllen|sort|u7b2c|innerHTML|hide|write|u0048|name|top|u007b|u007d|playfrom|u0057|u0053|false|u0042|playurlname2|playurl2|u4e00|u662f|u0029|u7ecf|u4e86|trim|u5df2|playurls|isNaN|u006a|html|joyplus_path|for|playurl|playurlname|offset|alert|joyplus_playlist|popenH|loadads|u006b|joyplusplay|popenW|playhtml|url|pwidth|getnexturl|pheight|u0028|encodeURI|getPlayer|onresize|AdsEnd|show|new|Array|getQS|play|u6700|u540e|src|body|true|appendChild|javascript|text|loadScript|getpreurl|createElement|type|left|getplayinfo|playserver|colors|Math|random|playname|showlist|u0037|status|cen1|setTimeout|u005f|u0034|pauseurl|adsloadtime|closew|joyplusplayer8status|undefined|u003f|autoFull|u8bf7|u4e2d|break|u5019|nexturl|u5165|u7a0d|u8f7d|u653e|u64ad|u5668'
						.split('|'), 0, {}));