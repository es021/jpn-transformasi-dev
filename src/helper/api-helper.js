//TODO soap request here
import { SOAPClient, SOAPClientParameters } from './soap-helper';
import { SoapUrlRoot, SoapRefWebService } from '../config/app-config';

export function loadRefTable(tables, progressHandler, errorHandler) {
    if (typeof tables == "string") {
        tables = [tables];
    }
    if (!Array.isArray(tables)) {
        var err = "Parameter 'tables' is not of type array or string";
        console.error("loadRefTable ", err);
        if (errorHandler) {
            errorHandler(err);
        }
        return;
    }

    function getMethod(tableName) {
        var m = "Ssoap" + tableName;
        return m;
    }

    function getResponseEntity(tableName) {
        var m = "Out" + tableName;
        return m;
    }

    for (var i in tables) {

        let t = tables[i];
        let tableName = t.table;
        let tableField = t.field;
        let method = getMethod(tableName);
        let responseEntity = getResponseEntity(tableName);

        soapRequest({
            webService: SoapRefWebService,
            // TODO -- (SERVER) this is the name of the server procedure
            method: method,
            // TODO - (IMPORT) this is parameter structure set in soap service
            param: {},
            // TODO - (EXPORT) this is response entity that we are expecting from soap service
            responseEntity: responseEntity,
            // TODO - this is response field that we want to save, if empty array or null or undefined will take all
            responseField: tableField,
            success: data => {
                // TODO - set the key of this data so that we can access it later
                progressHandler(tableName, data);
            },
            error: err => {
                loadError(err);
            }
        });
    }

}

export function soapRequest({ webService, method, param, responseEntity, responseField, success, error }) {
    /*    
    method : "SsoapTbprParent";
    param : {
        InTbprParent : {
            BprHscNo : "000314011256"
        }
    }
    responseEntity : "OutTbprParent";
    success : function(data){}
    error : function(err){}
    */
    var url = SoapUrlRoot + webService;
    console.log(url)
    console.log(webService)
    var soapParam = new SOAPClientParameters(param);
    SOAPClient.doSoap(url, method, soapParam, responseEntity, responseField
        , function (data) {
            //console.log(data);
            success(data);
        }, function (err) {
            //console.log("err", err);
            error(err);
        }
    );
}

/*

function serialize(obj, prefix) {
    var str = [],
        p;
    for (p in obj) {
        if (obj.hasOwnProperty(p)) {
            var k = prefix ? prefix + "[" + p + "]" : p,
                v = obj[p];
            str.push((v !== null && typeof v === "object") ?
                serialize(v, k) :
                encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
    }
    return str.join("&");
}

export function getRequest(url, success, error) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            success(xhttp.responseText)
        }
    };
    xhttp.onerror = function (e) {
        error(e);
    };
    xhttp.send();
}

export function postRequest(url, data, success, error) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                success(xhttp.responseText)
            } else {
                error(xhttp.responseText);
            }
        }
    };
    xhttp.onerror = function (e) {
        error(e);
    };

    xhttp.send(serialize(data));
}

*/