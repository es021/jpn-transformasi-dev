
export function _GET(sParam) {
    try {
        var sPageURL = decodeURIComponent(window.location.href);
        var getParam = sPageURL.split("?")[1];
        var sURLVariables = getParam.split('&');
        var sParameterName;
        var i;
        var toRet = null;
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam) {
                toRet = sParameterName[1] === undefined ? true : sParameterName[1];
                break;
            }
        }
        return toRet;
    } catch (err) {
        console.log("GET err", err);
        return null;
    }

}

String.prototype.replaceAll = function (search, replace) {
    return this.replace(new RegExp(search, 'g'), replace);
}

//#########################################################
// ---------- Window Popup ------------------------------ 
var windowPopups = {};
const WINDOW_ID = "JPN_WINDOW";

// function createYourWindow(paramWinId){
//     var yourWindow = someExtGetElement(WINDOW_ID) ;
//     if ( !yourWindow ){
//       // create your window here
//       yourWindow = new Ext.Window ...
//     }
//     yourWindow.show()
//   }


export function openWindowPopup(url, id, width, height, top, left) {

    closeWindowPopup(id);

    // var left = document.getElementById("jpn-left-bar").offsetWidth;
    // var width = screen.width - left;
    // var top = 100;
    // var height = screen.height - 200;

    // fullscreen
    width = (!width) ? screen.width : width;
    height = (!height) ? screen.height : height;
    top = (!top) ? 0 : top;
    left = (!left) ? 0 : left;

    id = (typeof id === "undefined") ? WINDOW_ID : id;

    var windowPopup = window.open(
        url,
        id,
        `toolbar=no,scrollbars=yes,resizable=no,top=${top},left=${left},width=${width},height=${height}`,
        true
    );

    windowPopups[id] = windowPopup;

    return windowPopup;

    //setTimeout(function(){windowPopup.focus()},1000);
    //window.open('javascript:void window.focus()', WINDOW_ID, '');

    // the following will only work if it's the same domain, else subject to SOP -
    // so in the case of initially opening it with google, this won't work!
    //myWindow.document.location.href = "/example/test.html";
}


// export function openWindowPopup2(url) {
//     //var myWindow = window.open(url, WINDOW_ID);
//     closeWindowPopup();
//     var left = document.getElementById("jpn-left-bar").offsetWidth;
//     //var width = document.getElementById("jpn-content").clientWidth - left;
//     var width = screen.width - left;

//     var top = 100;

//     var height = screen.height - 200;
//     //var height = window.innerHeight;

//     windowPopup = window.open(
//         url,
//         "_blank",
//         `menubar=no,status=no,toolbar=no,scrollbars=yes,alwaysRaised=yes,resizable=no,top=${top},left=${left},width=${width},height=${height}`,
//         true
//     );

//     setTimeout(function(){windowPopup.focus();},1000);
//    // windowPopup.focus();

//     // the following will only work if it's the same domain, else subject to SOP -
//     // so in the case of initially opening it with google, this won't work!
//     //myWindow.document.location.href = "/example/test.html";
// }

export function closeWindowPopup(id) {
    id = (typeof id === "undefined") ? WINDOW_ID : id;
    var windowPopup = windowPopups[id];

    if (typeof windowPopup !== "undefined" && windowPopup !== null) {
        var r = windowPopup.close();
        console.log("close", r);
    }
}
