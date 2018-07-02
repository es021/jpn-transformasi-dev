
// all functions here will either return false 
// or if there is error, will return string
// cannot use this here, must use Validate
var ValidateClass = function () {

}
// common function put here
function isValidNumber(input) {
    // var num = Number.parseInt(input);
    // var numText = num + "";
    if (isNaN(input)) {
        return false;
    }
    return true;
}




ValidateClass.prototype.noPermohonan = function (input) {
    if (!isValidNumber(input)) {
        return "No Permohonan must only contain numbers";
    }

    if (input.length !== 24) {
        return "No Permohanan must has length of 24. Given Length : " + input.length;
    }
    return false
}

ValidateClass.prototype.checkDate = function (input) {
    console.log("checkDate", input)
    var generalErr = `'${input}' is not a valid date`;

    if (input.indexOf("/") <= -1) {
        return generalErr
    }

    var inArr = input.split("/");
    if (inArr.length !== 3) {
        return generalErr
    }

    if (inArr[0].length !== 2 || inArr[1].length !== 2 || inArr[2].length !== 4) {
        return generalErr;
    }


    return false;
}


ValidateClass.prototype.noKpt = function (input) {
    if (isValidNumber(input)) {
        return "No KPT must only contain numbers";
    }

    if (input.length !== 12) {
        return "No KPT must has length of 12. Given Length : " + input.length;
    }

    return false
}

var Validate = new ValidateClass();
export default Validate;