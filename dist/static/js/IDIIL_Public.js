
  function isIE() { //ie?
    if (!!window.ActiveXObject || "ActiveXObject" in window)
       {
	     if(window.navigator.userAgent.indexOf("MSIE")>0)
	         return true;
		 else
             return false;
	   }
    else
        return false;
  }

function compareColor(sColor1,sColor2)
{
    var a = document.createElement("span");
    a.style.backgroundColor =sColor1;
    var sTemp1=a.style.backgroundColor;

    a.style.backgroundColor =sColor2;
    var sTemp2=a.style.backgroundColor;

    if(sTemp1==sTemp2){ return(true);} else {return(false);}
}



var CreateObject = function(object_id){
    if( isIE() ) return new ActiveXObject(object_id);
  if(object_id == 'HHFSO.FileSystemObject')
    return new idiil.legacy.shim.FSO();
};

var QueryString = location.search.substr(1);

var err = window.err || (window.err = {number: 0});

var sendOld = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function (data) {
  if (!!data && typeof data.xml == 'string') sendOld.call(this, data.xml);else sendOld.call(this, data);
};

function isEmpty(x) {
  return !x;
}


// No-op
function srand() {}

function array_slice(arr, x, y) {
  arr = arr || [];
  var tArr = [];
  for (var i = 0; x + i < y; i++) {
    tArr[i] = arr[x + i] || 0;
  }
  return tArr;
}

//TODO cross browser, more robust error handling
function xhrLoad(url, async) {
  try {
    AJAX = new XMLHttpRequest();
    if (AJAX) {
      AJAX.open("GET", url, !!async);
      AJAX.send(null);
      return AJAX;
    } else {
      return AJAX;
    }
  } catch (e) {
    return AJAX;
  }
}

function isStorageUri(uri) {
  return uri.toLowerCase().substr(0, 5) == 'file:' || uri.toLowerCase().substr(0, 2) == 'c:';
}

function XMLDOM_load(url,xmldoc){
//TODO pluggable storage

	// url is not a string, so must be XML object
	if ( typeof url !== 'string' ) {
        var newDocEl = xmldoc.adoptNode(url.documentElement.cloneNode(true));
		return !xmldoc.documentElement ? xmldoc.appendChild(newDocEl) : xmldoc.replaceChild(newDocEl, xmldoc.documentElement);
	}
    else {
        if ( isStorageUri( url.toLowerCase() ) ) {
            return xmldoc.loadXML(localStorage.getItem( url.toLowerCase() ));
        }
    }

    //TODO handle async
    var resp = xhrLoad(url);
    if(resp.responseXML) {
        var newDocEl = xmldoc.adoptNode(resp.responseXML.documentElement);
        return !xmldoc.documentElement ? xmldoc.appendChild(newDocEl) : xmldoc.replaceChild(newDocEl, xmldoc.documentElement);
    }
    else {
        return xmldoc.loadXML(resp.responseText);
    }
}

var createXMLDoc;
if (("ActiveXObject" in window) || typeof ActiveXObject != "undefined"){
    createXMLDoc = function() {
        var xmldoc = new ActiveXObject("Microsoft.XMLDOM");
		// force synchronous mode
		xmldoc.async=false;
		return xmldoc;
    }
}
else {
    createXMLDoc = function() {
        return document.implementation.createDocument("","",null);
    }

    //TODO cross browser, more robust error handling
    function xhrLoad(url) {
        try{
            AJAX=new XMLHttpRequest();
            if (AJAX) {
                AJAX.open("GET", url, false);
                AJAX.send(null);
                return AJAX;
            } else {
                return AJAX;
            }   }
        catch(e){
            return AJAX;
        }
    }

    /**
     *
     * @param {XMLDocument} parsedDocument
     * @returns {boolean}
     */
    function isParseError(parsedDocument) {
        if(typeof DOMParser == 'undefined') return false;
        // parser and parsererrorNS could be cached on startup for efficiency
        var parser = new DOMParser(),
            errorneousParse = parser.parseFromString('<', 'text/xml'),
            parsererrorNS = errorneousParse.getElementsByTagName("parsererror")[0].namespaceURI;

        if (parsererrorNS == 'http://www.w3.org/1999/xhtml') {
            // In PhantomJS the parseerror element doesn't seem to have a special namespace, so we are just guessing here :(
            return parsedDocument.getElementsByTagName("parsererror").length > 0;
        }

        return parsedDocument.getElementsByTagNameNS(parsererrorNS, 'parsererror').length > 0;
    }

    if (document.implementation && document.implementation.hasFeature("XPath", "3.0")) {
        if (typeof XMLDocument == "undefined") {
            XMLDocument = Document;
        }
        XMLDocument.prototype.selectNodes = function (cXPathString, xNode) {
            if (!xNode) {
                xNode = this;
            }
            var oNSResolver = this.createNSResolver(this.documentElement);
            var aItems = this.evaluate(cXPathString, xNode, oNSResolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            var aResult = [];
            for (var i = 0; i < aItems.snapshotLength; i++) {
                aResult[i] = aItems.snapshotItem(i);
            }
            return aResult;
        };
        XMLDocument.prototype.selectSingleNode = function (cXPathString, xNode) {
            if (!xNode) {
                xNode = this;
            }
            var xItems = this.selectNodes(cXPathString, xNode);
            if (xItems.length > 0) {
                return xItems[0];
            }
            else {
                return null;
            }
        };
        function isStorageUri(uri) {
            return uri.toLowerCase().substr(0,5) == 'file:' || uri.toLowerCase().substr(0,2) == 'c:';
        }
        XMLDocument.prototype.load = function(url) {
            XMLDOM_load(url,this);
        };
        XMLDocument.prototype.save = function(url){
            localStorage.setItem(url.toLowerCase(), this.xml);
        };
        XMLDocument.prototype.clear_ = function(){
            !this.documentElement || this.removeChild(this.documentElement);
        };
        XMLDocument.prototype.loadXML = function(xmlString){
            if(!xmlString) return this.clear_();
            var newDoc = new DOMParser().parseFromString(xmlString,'application/xml');
            if(isParseError(newDoc))
                return this.clear_();
            else {
                this.clear_();
                var newDocEl = this.adoptNode(newDoc.documentElement);
                this.appendChild(newDocEl);
            }
        };
        Element.prototype.selectNodes = function (cXPathString) {
            if (this.ownerDocument.selectNodes) {
                return this.ownerDocument.selectNodes(cXPathString, this);
            }
            else {
                throw "For XML Elements Only";
            }
        }
        Element.prototype.selectSingleNode = function (cXPathString) {
            if (this.ownerDocument.selectSingleNode) {
                return this.ownerDocument.selectSingleNode(cXPathString, this);
            }
            else {
                throw "For XML Elements Only";
            }
        }
        typeof Element.prototype.text == 'undefined' && Object.defineProperty(Element.prototype, "text", {
            get: function () {
                return this.textContent;
            },
            set: function(s) {
                return this.textContent = s;
            }
        });
        //Element.prototype.__defineGetter__("text", function(){ return this.textContent; });

        //Fix for bug in Chrome 34: responseXML doesn't inherit from XMLDocument @ 2014/04/22 Jonathan Hsu
        try {
          if (Document && Document.prototype && typeof Document.prototype.selectNodes == "undefined") {
              Document.prototype.selectNodes = XMLDocument.prototype.selectNodes;
              Document.prototype.selectSingleNode = XMLDocument.prototype.selectSingleNode;
          }
        }
        catch(e) {};
    }

    if (typeof XMLSerializer != 'undefined'  && typeof XMLDocument.prototype.xml == 'undefined') {
        if (typeof XMLDocument == "undefined") {
            XMLDocument = Document;
        }
        Object.defineProperty(XMLDocument.prototype, "xml", {
            get: function () {
                //XMLDocument.prototype.__defineGetter__("xml", function(){
                return new XMLSerializer().serializeToString(this);
            }
        });
        Object.defineProperty(Element.prototype, "xml", {
            get: function () {
                //Element.prototype.__defineGetter__("xml", function(){
                return new XMLSerializer().serializeToString(this);
            }
        });

      try{
        //Fix for bug in Chrome 34: responseXML doesn't inherit from XMLDocument @ 2014/04/22 Jonathan Hsu
        if (Document && Document.prototype && typeof Document.prototype.xml == "undefined")
            Object.defineProperty(Document.prototype, "xml", {
                get: function () {
                    //XMLDocument.prototype.__defineGetter__("xml", function(){
                    return new XMLSerializer().serializeToString(this);
                }
            });
      }
      catch(e){}
    }
}

var str_pad = function str_pad(x, y) {
  while (!! y--) {
    x = x + x;
    return x;
  }
};

var vbCrLf = '\n';
// dummy values for vb constants
var vbOk=1,
    vbCancel=2,
    vbAbort=3,
    vbRetry=4,
    vbIgnore=5,
    vbYes=6,
    vbNo=7,

    vbOkOnly=0,
    vbOkCancel=1,
    vbAbortRetryIgnore=2,
    vbYesNoCancel=3,
    vbYesNo=4,
    vbRetryCancel=5,
    vbCritical=16,
    vbQuestion=32,
    vbExclamation=48,
    vbInformation=64,
    vbDefaultButton1=0,
    vbDefaultButton2=256,
    vbDefaultButton3=512,
    vbDefaultButton4=768,
    vbApplicationModal=0,
    vbSystemModal=4096,
    vbMsgBoxHelpButton=16384,
    vbMsgBoxSetForeground=65536,
    VbMsgBoxRight=524288,
    VbMsgBoxRtlReading=1048576;

    var DEFAULT_TITLE = " IDIIL Prompt";

    MsgBox = function(msg, mode, title) {
        title = title || DEFAULT_TITLE;
        if ( mode == vbYesNo ) {
            return confirm(msg) ? vbYes : vbNo;
        }
        else if ( mode == vbOkCancel ) {
            return confirm(msg) ? vbOk : vbCancel;
        }
        else {
            if(!isIE() && typeof aMsg !== 'undefined'){
                // if message = submit record success
                if( msg == aMsg[2] )
                    alertify.success( msg );
                else
                    alertify.error( msg );
//                alertify.alert( title, msg );
            } else  {
                alert(msg);
            }
        }
    }


//CInt uses Gaussian Rounding
function gaussianRound(dVal, iDec) {

  // banker's style rounding or round-half-even
  // (round down when even number is left of 5, otherwise round up)
  // dVal is value to round
  // iDec specifies number of decimal places to retain

  if (typeof dVal !== "number") dVal = parseInt(dVal);

  if (typeof iDec !== "number") iDec = parseInt(iDec);

  iDec = iDec ? iDec : 0;

  var dFuzz = 0.00001,
      // to deal with floating-point precision loss
  iRoundup = 0,
      // amount to round up by
  iSign = dVal != 0.0 ? Math.floor(dVal / Math.abs(dVal)) : 1;

  dVal = Math.abs(dVal);

  // get decimal digit in question and amount to right of it as a fraction
  var dWorking = dVal * Math.pow(10.0, iDec + 1) - Math.floor(dVal * Math.pow(10.0, iDec)) * 10.0;

  var iEvenOddDigit = Math.floor(dVal * Math.pow(10.0, iDec)) - Math.floor(dVal * Math.pow(10.0, iDec - 1)) * 10.0;

  if (Math.abs(dWorking - 5.0) < dFuzz) iRoundup = iEvenOddDigit & 1 ? 1 : 0; // even testing using bitwise and
  else iRoundup = dWorking > 5.0 ? 1 : 0;

  return iSign * ((Math.floor(dVal * Math.pow(10.0, iDec)) + iRoundup) / Math.pow(10.0, iDec));
}

//TODO modify Date to use UTC time
/*
 Name: jsDate
 Desc: VBScript native Date functions emulated for Javascript
 Author: Rob Eberhardt, Slingshot Solutions - http://slingfive.com/
 Note: see jsDate.txt for more info
 */

/* http://slingfive.com/pages/code/jsDate/jsDate.js */

// constants
vbGeneralDate = 0;
vbLongDate = 1;
vbShortDate = 2;
vbLongTime = 3;
vbShortTime = 4; // NamedFormat
vbUseSystemDayOfWeek = 0;
vbSunday = 1;
vbMonday = 2;
vbTuesday = 3;
vbWednesday = 4;
vbThursday = 5;
vbFriday = 6;
vbSaturday = 7; // FirstDayOfWeek
vbUseSystem = 0;
vbFirstJan1 = 1;
vbFirstFourDays = 2;
vbFirstFullWeek = 3; // FirstWeekOfYear

// arrays (1-based)
Date.MonthNames = [null, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
Date.WeekdayNames = [null, 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

Date.IsDate = function (p_Expression) {
  return !isNaN(new Date(p_Expression)); // <-- review further
};

Date.CDate = function (p_Date) {
  if (Date.IsDate(p_Date)) {
    return new Date(p_Date);
  }

  var strTry = p_Date.replace(/\-/g, '/').replace(/\./g, '/').replace(/ /g, '/'); // fix separators
  strTry = strTry.replace(/pm$/i, " pm").replace(/am$/i, " am"); // and meridian spacing
  if (Date.IsDate(strTry)) {
    return new Date(strTry);
  }

  var strTryYear = strTry + '/' + new Date().getFullYear(); // append year
  if (Date.IsDate(strTryYear)) {
    return new Date(strTryYear);
  }

  if (strTry.indexOf(":")) {
    // if appears to have time
    var strTryYear2 = strTry.replace(/ /, '/' + new Date().getFullYear() + ' '); // insert year
    if (Date.IsDate(strTryYear2)) {
      return new Date(strTryYear2);
    }

    var strTryDate = new Date().toDateString() + ' ' + p_Date; // pre-pend current date
    if (Date.IsDate(strTryDate)) {
      return new Date(strTryDate);
    }
  }

  return false; // double as looser IsDate
  //throw("Error #13 - Type mismatch");	// or is this better?
};

Date.DateAdd = function (p_Interval, p_Number, p_Date) {
  if (!Date.CDate(p_Date)) {
    return "invalid date: '" + p_Date + "'";
  }
  if (isNaN(p_Number)) {
    return "invalid number: '" + p_Number + "'";
  }

  p_Number = new Number(p_Number);
  var dt = Date.CDate(p_Date);

  switch (p_Interval.toLowerCase()) {
    case "yyyy":
      {
        dt.setFullYear(dt.getFullYear() + p_Number);
        break;
      }
    case "q":
      {
        dt.setMonth(dt.getMonth() + p_Number * 3);
        break;
      }
    case "m":
      {
        dt.setMonth(dt.getMonth() + p_Number);
        break;
      }
    case "y": // day of year
    case "d": // day
    case "w":
      {
        // weekday
        dt.setDate(dt.getDate() + p_Number);
        break;
      }
    case "ww":
      {
        // week of year
        dt.setDate(dt.getDate() + p_Number * 7);
        break;
      }
    case "h":
      {
        dt.setHours(dt.getHours() + p_Number);
        break;
      }
    case "n":
      {
        // minute
        dt.setMinutes(dt.getMinutes() + p_Number);
        break;
      }
    case "s":
      {
        dt.setSeconds(dt.getSeconds() + p_Number);
        break;
      }
    case "ms":
      {
        // JS extension
        dt.setMilliseconds(dt.getMilliseconds() + p_Number);
        break;
      }
    default:
      {
        return "invalid interval: '" + p_Interval + "'";
      }
  }
  return dt;
};

Date.DateDiff = function (p_Interval, p_Date1, p_Date2, p_FirstDayOfWeek) {
  if (!Date.CDate(p_Date1)) {
    return "invalid date: '" + p_Date1 + "'";
  }
  if (!Date.CDate(p_Date2)) {
    return "invalid date: '" + p_Date2 + "'";
  }
  p_FirstDayOfWeek = isNaN(p_FirstDayOfWeek) || p_FirstDayOfWeek == 0 ? vbSunday : parseInt(p_FirstDayOfWeek); // set default & cast

  var dt1 = Date.CDate(p_Date1);
  var dt2 = Date.CDate(p_Date2);

  // correct DST-affected intervals ("d" & bigger)
  if ("h,n,s,ms".indexOf(p_Interval.toLowerCase()) == -1) {
    if (p_Date1.toString().indexOf(":") == -1) {
      dt1.setUTCHours(0, 0, 0, 0);
    }
    ; // no time, assume 12am
    if (p_Date2.toString().indexOf(":") == -1) {
      dt2.setUTCHours(0, 0, 0, 0);
    }
    ; // no time, assume 12am
  }

  // get ms between UTC dates and make into "difference" date
  var iDiffMS = dt2.valueOf() - dt1.valueOf();
  var dtDiff = new Date(iDiffMS);

  // calc various diffs
  var nYears = dt2.getUTCFullYear() - dt1.getUTCFullYear();
  var nMonths = dt2.getUTCMonth() - dt1.getUTCMonth() + (nYears != 0 ? nYears * 12 : 0);
  var nQuarters = parseInt(nMonths / 3); //<<-- different than VBScript, which watches rollover not completion

  var nMilliseconds = iDiffMS;
  var nSeconds = parseInt(iDiffMS / 1000);
  var nMinutes = parseInt(nSeconds / 60);
  var nHours = parseInt(nMinutes / 60);
  var nDays = parseInt(nHours / 24); // <-- now fixed for DST switch days
  var nWeeks = parseInt(nDays / 7);

  if (p_Interval.toLowerCase() == 'ww') {
    // set dates to 1st & last FirstDayOfWeek
    var offset = Date.DatePart("w", dt1, p_FirstDayOfWeek) - 1;
    if (offset) {
      dt1.setDate(dt1.getDate() + 7 - offset);
    }
    var offset = Date.DatePart("w", dt2, p_FirstDayOfWeek) - 1;
    if (offset) {
      dt2.setDate(dt2.getDate() - offset);
    }
    // recurse to "w" with adjusted dates
    var nCalWeeks = Date.DateDiff("w", dt1, dt2) + 1;
  }
  // TODO: similar for 'w'?

  // return difference
  switch (p_Interval.toLowerCase()) {
    case "yyyy":
      return nYears;
    case "q":
      return nQuarters;
    case "m":
      return nMonths;
    case "y": // day of year
    case "d":
      return nDays;
    case "w":
      return nWeeks;
    case "ww":
      return nCalWeeks; // week of year
    case "h":
      return nHours;
    case "n":
      return nMinutes;
    case "s":
      return nSeconds;
    case "ms":
      return nMilliseconds; // not in VBScript
    default:
      return "invalid interval: '" + p_Interval + "'";
  }
};

Date.DatePart = function (p_Interval, p_Date, p_FirstDayOfWeek) {
  if (!Date.CDate(p_Date)) {
    return "invalid date: '" + p_Date + "'";
  }

  var dtPart = Date.CDate(p_Date);

  switch (p_Interval.toLowerCase()) {
    case "yyyy":
      return dtPart.getFullYear();
    case "q":
      return parseInt(dtPart.getMonth() / 3) + 1;
    case "m":
      return dtPart.getMonth() + 1;
    case "y":
      return Date.DateDiff("y", "1/1/" + dtPart.getFullYear(), dtPart) + 1; // day of year
    case "d":
      return dtPart.getDate();
    case "w":
      return Date.Weekday(dtPart.getDay() + 1, p_FirstDayOfWeek); // weekday
    case "ww":
      return Date.DateDiff("ww", "1/1/" + dtPart.getFullYear(), dtPart, p_FirstDayOfWeek) + 1; // week of year
    case "h":
      return dtPart.getHours();
    case "n":
      return dtPart.getMinutes();
    case "s":
      return dtPart.getSeconds();
    case "ms":
      return dtPart.getMilliseconds(); // <-- JS extension, NOT in VBScript
    default:
      return "invalid interval: '" + p_Interval + "'";
  }
};

Date.MonthName = function (p_Month, p_Abbreviate) {
  if (isNaN(p_Month)) {
    // v0.94- compat: extract real param from passed date
    if (!Date.CDate(p_Month)) {
      return "invalid month: '" + p_Month + "'";
    }
    p_Month = DatePart("m", Date.CDate(p_Month));
  }

  var retVal = Date.MonthNames[p_Month];
  if (p_Abbreviate == true) {
    retVal = retVal.substring(0, 3);
  } // abbr to 3 chars
  return retVal;
};

Date.WeekdayName = function (p_Weekday, p_Abbreviate, p_FirstDayOfWeek) {
  if (isNaN(p_Weekday)) {
    // v0.94- compat: extract real param from passed date
    if (!Date.CDate(p_Weekday)) {
      return "invalid weekday: '" + p_Weekday + "'";
    }
    p_Weekday = DatePart("w", Date.CDate(p_Weekday));
  }
  p_FirstDayOfWeek = isNaN(p_FirstDayOfWeek) || p_FirstDayOfWeek == 0 ? vbSunday : parseInt(p_FirstDayOfWeek); // set default & cast

  var nWeekdayNameIdx = (p_FirstDayOfWeek - 1 + parseInt(p_Weekday) - 1 + 7) % 7 + 1; // compensate nWeekdayNameIdx for p_FirstDayOfWeek
  var retVal = Date.WeekdayNames[nWeekdayNameIdx];
  if (p_Abbreviate == true) {
    retVal = retVal.substring(0, 3);
  } // abbr to 3 chars
  return retVal;
};

// adjusts weekday for week starting on p_FirstDayOfWeek
Date.Weekday = function (p_Weekday, p_FirstDayOfWeek) {
  p_FirstDayOfWeek = isNaN(p_FirstDayOfWeek) || p_FirstDayOfWeek == 0 ? vbSunday : parseInt(p_FirstDayOfWeek); // set default & cast

  return (parseInt(p_Weekday) - p_FirstDayOfWeek + 7) % 7 + 1;
};

Date.FormatDateTime = function (p_Date, p_NamedFormat) {
  if (p_Date.toUpperCase().substring(0, 3) == "NOW") {
    p_Date = new Date();
  }
  ;
  if (!Date.CDate(p_Date)) {
    return "invalid date: '" + p_Date + "'";
  }
  if (isNaN(p_NamedFormat)) {
    p_NamedFormat = vbGeneralDate;
  }
  ;

  var dt = Date.CDate(p_Date);

  switch (parseInt(p_NamedFormat)) {
    case vbGeneralDate:
      return dt.toString();
    case vbLongDate:
      return Format(p_Date, 'DDDD, MMMM D, YYYY');
    case vbShortDate:
      return Format(p_Date, 'MM/DD/YYYY');
    case vbLongTime:
      return dt.toLocaleTimeString();
    case vbShortTime:
      return Format(p_Date, 'HH:MM:SS');
    default:
      return "invalid NamedFormat: '" + p_NamedFormat + "'";
  }
};

Date.Format = function (p_Date, p_Format, p_FirstDayOfWeek, p_firstweekofyear) {
  if (!Date.CDate(p_Date)) {
    return "invalid date: '" + p_Date + "'";
  }
  if (!p_Format || p_Format == '') {
    return dt.toString();
  }
  ;

  var dt = Date.CDate(p_Date);

  // Zero-padding formatter
  this.pad = function (p_str) {
    if (p_str.toString().length == 1) {
      p_str = '0' + p_str;
    }
    return p_str;
  };

  var ampm = dt.getHours() >= 12 ? 'PM' : 'AM';
  var hr = dt.getHours();
  if (hr == 0) {
    hr = 12;
  }
  ;
  if (hr > 12) {
    hr -= 12;
  }
  ;
  var strShortTime = hr + ':' + this.pad(dt.getMinutes()) + ':' + this.pad(dt.getSeconds()) + ' ' + ampm;
  var strShortDate = dt.getMonth() + 1 + '/' + dt.getDate() + '/' + new String(dt.getFullYear()).substring(2, 4);
  var strLongDate = Date.MonthName(dt.getMonth() + 1) + ' ' + dt.getDate() + ', ' + dt.getFullYear(); //

  var retVal = p_Format;

  // switch tokens whose alpha replacements could be accidentally captured
  retVal = retVal.replace(new RegExp('C', 'gi'), 'CCCC');
  retVal = retVal.replace(new RegExp('mmmm', 'gi'), 'XXXX');
  retVal = retVal.replace(new RegExp('mmm', 'gi'), 'XXX');
  retVal = retVal.replace(new RegExp('dddddd', 'gi'), 'AAAAAA');
  retVal = retVal.replace(new RegExp('ddddd', 'gi'), 'AAAAA');
  retVal = retVal.replace(new RegExp('dddd', 'gi'), 'AAAA');
  retVal = retVal.replace(new RegExp('ddd', 'gi'), 'AAA');
  retVal = retVal.replace(new RegExp('timezone', 'gi'), 'ZZZZ');
  retVal = retVal.replace(new RegExp('time24', 'gi'), 'TTTT');
  retVal = retVal.replace(new RegExp('time', 'gi'), 'TTT');

  // now do simple token replacements
  retVal = retVal.replace(new RegExp('yyyy', 'gi'), dt.getFullYear());
  retVal = retVal.replace(new RegExp('yy', 'gi'), new String(dt.getFullYear()).substring(2, 4));
  retVal = retVal.replace(new RegExp('y', 'gi'), Date.DatePart("y", dt));
  retVal = retVal.replace(new RegExp('q', 'gi'), Date.DatePart("q", dt));
  retVal = retVal.replace(new RegExp('mm', 'gi'), dt.getMonth() + 1);
  retVal = retVal.replace(new RegExp('m', 'gi'), dt.getMonth() + 1);
  retVal = retVal.replace(new RegExp('dd', 'gi'), this.pad(dt.getDate()));
  retVal = retVal.replace(new RegExp('d', 'gi'), dt.getDate());
  retVal = retVal.replace(new RegExp('hh', 'gi'), this.pad(dt.getHours()));
  retVal = retVal.replace(new RegExp('h', 'gi'), dt.getHours());
  retVal = retVal.replace(new RegExp('nn', 'gi'), this.pad(dt.getMinutes()));
  retVal = retVal.replace(new RegExp('n', 'gi'), dt.getMinutes());
  retVal = retVal.replace(new RegExp('ss', 'gi'), this.pad(dt.getSeconds()));
  retVal = retVal.replace(new RegExp('s', 'gi'), dt.getSeconds());
  retVal = retVal.replace(new RegExp('t t t t t', 'gi'), strShortTime);
  retVal = retVal.replace(new RegExp('am/pm', 'g'), dt.getHours() >= 12 ? 'pm' : 'am');
  retVal = retVal.replace(new RegExp('AM/PM', 'g'), dt.getHours() >= 12 ? 'PM' : 'AM');
  retVal = retVal.replace(new RegExp('a/p', 'g'), dt.getHours() >= 12 ? 'p' : 'a');
  retVal = retVal.replace(new RegExp('A/P', 'g'), dt.getHours() >= 12 ? 'P' : 'A');
  retVal = retVal.replace(new RegExp('AMPM', 'g'), dt.getHours() >= 12 ? 'pm' : 'am');
  // (always proceed largest same-lettered token to smallest)

  // now finish the previously set-aside tokens
  retVal = retVal.replace(new RegExp('XXXX', 'gi'), Date.MonthName(dt.getMonth() + 1, false)); //
  retVal = retVal.replace(new RegExp('XXX', 'gi'), Date.MonthName(dt.getMonth() + 1, true)); //
  retVal = retVal.replace(new RegExp('AAAAAA', 'gi'), strLongDate);
  retVal = retVal.replace(new RegExp('AAAAA', 'gi'), strShortDate);
  retVal = retVal.replace(new RegExp('AAAA', 'gi'), Date.WeekdayName(dt.getDay() + 1, false, p_FirstDayOfWeek)); //
  retVal = retVal.replace(new RegExp('AAA', 'gi'), Date.WeekdayName(dt.getDay() + 1, true, p_FirstDayOfWeek)); //
  retVal = retVal.replace(new RegExp('TTTT', 'gi'), dt.getHours() + ':' + this.pad(dt.getMinutes()));
  retVal = retVal.replace(new RegExp('TTT', 'gi'), hr + ':' + this.pad(dt.getMinutes()) + ' ' + ampm);
  retVal = retVal.replace(new RegExp('CCCC', 'gi'), strShortDate + ' ' + strShortTime);

  // finally timezone
  tz = dt.getTimezoneOffset();
  timezone = tz < 0 ? 'GMT-' + tz / 60 : tz == 0 ? 'GMT' : 'GMT+' + tz / 60;
  retVal = retVal.replace(new RegExp('ZZZZ', 'gi'), timezone);

  return retVal;
};

// ========================

/* if desired, map new methods to direct functions
 */
IsDate = Date.IsDate;
CDate = Date.CDate;
DateAdd = Date.DateAdd;
DateDiff = Date.DateDiff;
DatePart = Date.DatePart;
MonthName = Date.MonthName;
WeekdayName = Date.WeekdayName;
Weekday = Date.Weekday;
FormatDateTime = Date.FormatDateTime;
Format = Date.Format;

Date.Year = function (date) {
  return new Date(date).getFullYear();
};
Date.Day = function (date) {
  return new Date(date).getDate();
};
Date.Month = function Month(date) {
  return new Date(date).getMonth() + 1;
};

YEAR = year = Year = Date.Year;
DAY = day = Day = Date.Day;
MONTH = month = Month = Date.Month;

// and other capitalizations for easier porting
isdate = IsDate;
dateAdd = DateAdd;
dateDiff = DateDiff;
datePart = DatePart;
monthName = MonthName;
weekdayName = WeekdayName;
fordmatDateTime = FormatDateTime;
format = Format;

cdate = Cdate = cDate = CDate;
isdate = IsDate;
dateadd = DateAdd;
datediff = DateDiff;
datepart = DatePart;
monthname = MonthName;
weekdayname = WeekdayName;
formatdatetime = FormatDateTime;

ISDATE = IsDate;
DATEADD = DateAdd;
DATEDIFF = DateDiff;
DATEPART = DatePart;
MONTHNAME = MonthName;
WEEKDAYNAME = WeekdayName;
FORMATDATETIME = FormatDateTime;
FORMAT = Format;

time = function () {
  return Date.FormatDateTime('NOW', vbShortTime);
};
hour = function (datetime) {
  return new Date(datetime).getHours();
};
minute = function (datetime) {
  return new Date(datetime).getMinutes();
};
second = function (datetime) {
  return new Date(datetime).getSeconds();
};

date = function () {
  return Date.FormatDateTime('NOW', vbShortDate);
};

  function instrrev(s, charSearchFor) {
      return s.lastIndexOf(charSearchFor);
  }

Student = {};

Student.SetPath = CreateObject;
Student.openURLDirect = CreateObject;
Student.OpenUrl = CreateObject;

/**
 * Emulate VBScript Replace function
 * @param {string} str
 * @param {string} find
 * @param {number} start
 * @param {number} count
 * @return {string}
 */
var Replace = function Replace(str, find, replace, start, count) {
  if (start) str = str.substring(start - 1);

  if (count == undefined) str = str.split(find).join(replace); //replace all
  else for (var i = 0; i < count; i++) str = str.replace(find, replace);
  return str;
};

instr = Instr = InStr;
function InStr(arg1, arg2, arg3, arg4)
/*
 InStr(string, pattern, 0 || 1 (Binary || Text)
 InStr(starting index (1 indexed),string, pattern, 0 || 1 (Binary || Text)
 */{
  /*for (i=0; i < Len(strSearch); i++)
   {
   if (charSearchFor == Mid(strSearch, i, 1))
   {
   return i;
   }
   }*/
  if (typeof arg1 == "string") {
    var x = new String(arg1).indexOf(arg2);
    return x + 1;
  } else {
    var x = new String(arg2).indexOf(arg3, arg1 - 1);
    return x + 1;
  }
  //return x == -1 ? 0 : x + 1;
  //return -1;
}

String.prototype.trim = String.prototype.trim || function () {
  return this.replace(/^\s+|\s+$/g, "");
};
String.prototype.trimLeft = String.prototype.trimLeft || function () {
  return this.replace(/^\s+/, "");
};
String.prototype.trimRight = String.prototype.trimRight || function () {
  return this.replace(/\s+$/, "");
};

trim = Trim;
function Trim(str) {
  return String(str).trim();
}

mid = Mid;
function Mid(str, start, len)
/***
 IN: str - the string we are LEFTing
 start - our string's starting position (0 based!!)
 len - how many characters from start we want to get

 RETVAL: The substring from start to start+len
 ***/{
  str = String(str);
  // Make sure start and len are within proper bounds
  if (start < 0 || len < 0 || start > str.length) return "";

  return str.substr(start - 1, len);
}

function Right(str, n)
/***
 IN: str - the string we are RIGHTing
 n - the number of characters we want to return

 RETVAL: n characters from the right side of the string
 ***/{
  if (n <= 0) // Invalid bound, return blank string
    return "";else if (n > String(str).length) // Invalid bound, return
    return str; // entire string
  else {
      // Valid bound, return appropriate substring
      var iLen = String(str).length;
      return String(str).substring(iLen, iLen - n);
    }
}

function Left(str, n)
/***
 IN: str - the string we are LEFTing
 n - the number of characters we want to return

 RETVAL: n characters from the left side of the string
 ***/{
  if (n <= 0) // Invalid bound, return blank string
    return "";else if (n > String(str).length) // Invalid bound, return
    return str; // entire string
  else // Valid bound, return appropriate substring
    return String(str).substring(0, n);
}

function Len(str)
/***
 IN: str - the string whose length we are interested in

 RETVAL: The number of characters in the string
 ***/{
  return String(str).length;
}

function RTrim(str) {
  return String(str).trimRight();
}

function LTrim(str) {
  return String(str).trimLeft();
}

function FormatDateTime(datetime, FormatType)
/*
 FomatType takes the following values
 1 - General Date = Friday, October 30, 1998
 2 - Typical Date = 10/30/98
 3 - Standard Time = 6:31 PM
 4 - Military Time = 18:31
 */{
  var strDate = new String(datetime);

  if (strDate.toUpperCase() == "NOW") {
    var myDate = new Date();
    strDate = String(myDate);
  } else {
    var myDate = new Date(datetime);
    strDate = String(myDate);
  }

  // Get the date variable parts
  var Day = new String(strDate.substring(0, 3));
  if (Day == "Sun") Day = "Sunday";
  if (Day == "Mon") Day = "Monday";
  if (Day == "Tue") Day = "Tuesday";
  if (Day == "Wed") Day = "Wednesday";
  if (Day == "Thu") Day = "Thursday";
  if (Day == "Fri") Day = "Friday";
  if (Day == "Sat") Day = "Saturday";

  var Month = new String(strDate.substring(4, 7)),
      MonthNumber = 0;
  if (Month == "Jan") {
    Month = "January";
    MonthNumber = 1;
  }
  if (Month == "Feb") {
    Month = "February";
    MonthNumber = 2;
  }
  if (Month == "Mar") {
    Month = "March";
    MonthNumber = 3;
  }
  if (Month == "Apr") {
    Month = "April";
    MonthNumber = 4;
  }
  if (Month == "May") {
    Month = "May";
    MonthNumber = 5;
  }
  if (Month == "Jun") {
    Month = "June";
    MonthNumber = 6;
  }
  if (Month == "Jul") {
    Month = "July";
    MonthNumber = 7;
  }
  if (Month == "Aug") {
    Month = "August";
    MonthNumber = 8;
  }
  if (Month == "Sep") {
    Month = "September";
    MonthNumber = 9;
  }
  if (Month == "Oct") {
    Month = "October";
    MonthNumber = 10;
  }
  if (Month == "Nov") {
    Month = "November";
    MonthNumber = 11;
  }
  if (Month == "Dec") {
    Month = "December";
    MonthNumber = 12;
  }

  var curPos = 11;
  var MonthDay = new String(strDate.substring(8, 10));
  if (MonthDay.charAt(1) == " ") {
    MonthDay = "0" + MonthDay.charAt(0);
    curPos--;
  }

  var MilitaryTime = new String(strDate.substring(curPos, curPos + 5));

  var Year = new String(strDate.substring(strDate.length - 4, strDate.length));

  document.write(strDate + "");

  // Format Type decision time!
  if (FormatType == 1) strDate = Day + ", " + Month + " " + MonthDay + ", " + Year;else if (FormatType == 2) strDate = MonthNumber + "/" + MonthDay + "/" + Year.substring(2, 4);else if (FormatType == 3) {
    var AMPM = MilitaryTime.substring(0, 2) >= 12 && MilitaryTime.substring(0, 2) != "24" ? " PM" : " AM";
    if (MilitaryTime.substring(0, 2) > 12) strDate = MilitaryTime.substring(0, 2) - 12 + ":" + MilitaryTime.substring(3, MilitaryTime.length) + AMPM;else {
      if (MilitaryTime.substring(0, 2) < 10) strDate = MilitaryTime.substring(1, MilitaryTime.length) + AMPM;else strDate = MilitaryTime + AMPM;
    }
  } else if (FormatType == 4) strDate = MilitaryTime;

  return strDate;
}

function FormatCurrency(num, decimalNum, bolLeadingZero, bolParens, bolCommas)
/**********************************************************************
 IN:
 NUM - the number to format
 decimalNum - the number of decimal places to format the number to
 bolLeadingZero - true / false - display a leading zero for
 numbers between -1 and 1
 bolParens - true / false - use parenthesis around negative numbers
 bolCommas - put commas as number separators.

 RETVAL:
 The formatted number!
 **********************************************************************/{
  var tmpStr = new String(FormatNumber(num, decimalNum, bolLeadingZero, bolParens, bolCommas));

  if (tmpStr.indexOf("(") != -1 || tmpStr.indexOf("-") != -1) {
    // We know we have a negative number, so place '$' inside of '(' / after '-'
    if (tmpStr.charAt(0) == "(") tmpStr = "($" + tmpStr.substring(1, tmpStr.length);else if (tmpStr.charAt(0) == "-") tmpStr = "-$" + tmpStr.substring(1, tmpStr.length);

    return tmpStr;
  } else return "$" + tmpStr; // Return formatted string!
}

function FormatPercent(num, decimalNum, bolLeadingZero, bolParens, bolCommas)
/**********************************************************************
 IN:
 NUM - the number to format
 decimalNum - the number of decimal places to format the number to
 bolLeadingZero - true / false - display a leading zero for
 numbers between -1 and 1
 bolParens - true / false - use parenthesis around negative numbers
 bolCommas - put commas as number separators.

 RETVAL:
 The formatted number!
 **********************************************************************/{
  var tmpStr = new String(FormatNumber(num * 100, decimalNum, bolLeadingZero, bolParens, bolCommas));

  if (tmpStr.indexOf(")") != -1) {
    // We know we have a negative number, so place '%' inside of ')'
    tmpStr = tmpStr.substring(0, tmpStr.length - 1) + "%)";
    return tmpStr;
  } else return tmpStr + "%"; // Return formatted string!
}

function FormatNumber(num, decimalNum, bolLeadingZero, bolParens, bolCommas)
/**********************************************************************
 IN:
 NUM - the number to format
 decimalNum - the number of decimal places to format the number to
 bolLeadingZero - true / false - display a leading zero for
 numbers between -1 and 1
 bolParens - true / false - use parenthesis around negative numbers
 bolCommas - put commas as number separators.

 RETVAL:
 The formatted number!
 **********************************************************************/{
  if (isNaN(parseInt(num))) return "NaN";

  var tmpNum = num;
  var iSign = num < 0 ? -1 : 1; // Get sign of number

  // Adjust number so only the specified number of numbers after
  // the decimal point are shown.
  tmpNum *= Math.pow(10, decimalNum);
  tmpNum = Math.round(Math.abs(tmpNum));
  tmpNum /= Math.pow(10, decimalNum);
  tmpNum *= iSign; // Readjust for sign

  // Create a string object to do our formatting on
  var tmpNumStr = new String(tmpNum);

  // See if we need to strip out the leading zero or not.
  if (!bolLeadingZero && num < 1 && num > -1 && num != 0) if (num > 0) tmpNumStr = tmpNumStr.substring(1, tmpNumStr.length);else tmpNumStr = "-" + tmpNumStr.substring(2, tmpNumStr.length);

  // See if we need to put in the commas
  if (bolCommas && (num >= 1000 || num <= -1000)) {
    var iStart = tmpNumStr.indexOf(".");
    if (iStart < 0) iStart = tmpNumStr.length;

    iStart -= 3;
    while (iStart >= 1) {
      tmpNumStr = tmpNumStr.substring(0, iStart) + "," + tmpNumStr.substring(iStart, tmpNumStr.length);
      iStart -= 3;
    }
  }

  // See if we need to use parenthesis
  if (bolParens && num < 0) tmpNumStr = "(" + tmpNumStr.substring(1, tmpNumStr.length) + ")";

  return tmpNumStr; // Return our formatted string!
}

function getFile(url) {
	// FIXME does this work as intended?  use XMLDOM_load?
  if (url.toLowerCase().indexOf('file://') != -1 || url.toLowerCase().indexOf('c:') != -1) {
    var ret = createXMLDoc();
    return ret;
  }
  try {
    AJAX = new XMLHttpRequest();
    if (AJAX) {
      AJAX.open("GET", url, false);
      AJAX.send(null);
      var ret = createXMLDoc();
      ret.loadXML(AJAX.responseText);
      return ret;
    } else {
      var ret = createXMLDoc();
      return ret;
    }
  } catch (e) {
    var ret = createXMLDoc();
    return ret;
  }
}

function AddNode(vDocument, vParentNode, sNodeName, sNodeValue) {
  var oNode;
  oNode = vDocument.createElement(sNodeName);
  oNode.text = sNodeValue;
  vParentNode.appendChild(oNode);
}

var isset = isEmpty;

