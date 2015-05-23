// Quick DOM Load Function
// http://tinyurl.com/llzo5ba
var DOMReady = function(a,b,c) {
    b = document,
    c = 'addEventListener';
    b[c] ? b[c]('DOMContentLoaded', a) : window.attachEvent('onload', a);
};

// When page is loaded...
DOMReady(function () {
    
  // put your data here  
    

});

function ajax(opts) {

    // serialize form data
    var data = new FormData();
    for (var d in opts.data) data.append(d, opts.data[d]);
    
    // setup url with query string if method = GET
    if (opts.method === 'GET') {
        var str = [];
        for(var k in opts.data) {
            str.push(encodeURIComponent(k) + "=" + encodeURIComponent(opts.data[k]));
        }
        opts.url = opts.url + '?' + str.join("&");
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
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            opts.success(xmlhttp.response);
        }
    };
    xmlhttp.open(opts.method, opts.url);
    xmlhttp.send(data);
}

function addEvent(e, event, func) {
// - event handlers -
// http://stackoverflow.com/questions/6348494
    return (e.attachEvent)
     ? e.attachEvent('on' + event, func)
     : e.addEventListener(event, func, false);
}

// not all browsers support this

if (!document.getElementsByClassName) {
// - getElementsByClassName -
// http://tinyurl.com/phdx82d
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

/*

// Example ajax()

ajax({
    url: 'test.php',
    method: 'GET',
    data: {
      me: 'hey'  
    },
    success: function(results) {
        alert(results);
    }
});

// Example addEvent()

var e = document.getElementById('me');

addEvent(e, 'click', function() {

   alert("clicked on #me!");

});

*/