/*********************************************************
** Filename: no_jquery_template.js
** Author: Jonathan Gamble
*********************************************************/
/*
 * debugging to print AJAX errors
 */
var debug = 0;

/*
 * Quick DOM load function
 * http://tinyurl.com/llzo5ba
 */
var DOMReady = function(a,b,c) {
    b = document,
    c = 'addEventListener';
    b[c] ? b[c]('DOMContentLoaded', a) : window.attachEvent('onload', a);
};

/*
 * When page is loaded...
 */
DOMReady(function() {
    
  // put your data here
  

    
});

/*
 * Example ajax()
 *
 * ajax({
 *     url: 'test.php',
 *     method: 'GET',
 *     data: {
 *       me: 'hey'  
 *     },
 *     success: function(results) {
 *         alert(results);
 *     },
 *     error: myError
 * });
 *
 */
function ajax(opts) {

    // default method is POST
    if (!opts.hasOwnProperty('method')) opts.method = 'POST';
    
    // if method = GET setup url with query string
    if (opts.method === 'GET') {
        var str = [];
        for(var k in opts.data) {
            str.push(encodeURIComponent(k) + "=" + encodeURIComponent(opts.data[k]));
        }
        opts.url = opts.url + '?' + str.join("&");
        data = null;
    }
    else {
        // otherwise serialize form data for method = POST
        var data = new FormData();
        for (var d in opts.data) data.append(d, opts.data[d]);
    }

    // - xmlhttp object -
    // http://stackoverflow.com/questions/415160
    var xmlhttp = function() {
        try { return new XMLHttpRequest(); } catch (e) {}
        try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch (e) {}
        try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch (e) {}
        try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch (e) {}
        try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch (e) {}
        return false;
    }();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4) {
            (xmlhttp.status === 200)
                ? opts.success(xmlhttp.response)
                : opts.error(xmlhttp.statusText);
        }
    };
    xmlhttp.open(opts.method, opts.url);
    xmlhttp.send(data);
}

/*
 * Quick Error Function
 */
function myError(e) {
    if (debug) alert(e);
}

/*
 * event handlers
 * 
 * http://stackoverflow.com/questions/6348494
 * 
 * Example addEvent()
 *
 * var e = document.getElementById('me');
 *
 * addEvent(e, 'click', function() {
 *
 *   alert("clicked on #me!");
 *
 * });
 * 
 */
function addEvent(e, event, func) {
    return (e.attachEvent)
     ? e.attachEvent('on' + event, func)
     : e.addEventListener(event, func, false);
}
/*
 * getElementsByClassName()
 * 
 * http://tinyurl.com/phdx82d
 * 
 * added to support older browsers
 * 
 */
if (!document.getElementsByClassName) {

    document.getElementsByClassName = function(classname) {
        var elArray = [];
        var tmp = document.getElementsByTagName("*");
        var regex = new RegExp("(^|\s)" + classname + "(\s|$)");
        for (var i = 0; i < tmp.length; ++i) {
            if (regex.test(tmp[i].className)) {
                elArray.push(tmp[i]);
            }
        }
        return elArray;
    };
}
