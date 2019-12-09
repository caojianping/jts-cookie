function isString(data: any) {
	return Object.prototype.toString.call(data) === "[object String]";
}

function isNumber(data: any) {
	return Object.prototype.toString.call(data) === "[object Number]";
}

function isBoolean(data: any) {
	return Object.prototype.toString.call(data) === "[object Boolean]";
}

function isArray(data: any) {
	return Object.prototype.toString.call(data) === "[object Array]";
}

function isObject(data: any) {
	return Object.prototype.toString.call(data) === "[object Object]";
}

export default {
	isString,
	isNumber,
	isBoolean,
	isArray,
	isObject
};