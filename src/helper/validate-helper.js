
// all functions here will either return false 
// or if there is error, will return string
// cannot use this here, must use Validate
var ValidateClass = function () {

}
// common function put here
ValidateClass.prototype.isValidNumber = function (input) {
    var num = Number.parseInt(input);
    var numText = num + "";
    if (!Number.isNaN(num) && numText.length == input.length) {
        return true;
    }
    return false;
}

ValidateClass.prototype.noPermohonan = function (input) {
    if (input.length !== 24) {
        return "No Permohanan must has length of 24. Given Length : " + input.length;
    }
    return false
}

ValidateClass.prototype.noKpt = function (input) {
    if (!Validate.isValidNumber(input)) {
        return "No KPT must only contain numbers";
    }

    if (input.length !== 12) {
        return "No KPT must has length of 12. Given Length : " + input.length;
    }

    return false
}

var Validate = new ValidateClass();
export default Validate;