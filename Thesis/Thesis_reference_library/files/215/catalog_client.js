//ep catalog utilities, jQuery version, 
//requires jquery-1.6.2.js and date_utils.js

// ===================================================================
// Array.indexOf is a recent addition to the ECMA-262 standard; 
// as such it may not be present in all browsers. To work around
// the problem, add the following code.
// ===================================================================
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
        "use strict";
        if (this === void 0 || this === null) {
            throw new TypeError();
        }
        var t = Object(this);
        var len = t.length >>> 0;
        if (len === 0) {
            return -1;
        }
        var n = 0;
        if (arguments.length > 0) {
            n = Number(arguments[1]);
            if (n !== n) { // shortcut for verifying if it's NaN
                n = 0;
            } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }
        if (n >= len) {
            return -1;
        }
        var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
        for (; k < len; k++) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }
        return -1;
    }
}

//Simple string template
String.prototype.format = function() {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};


// ===================================================================
// Get product catalog dom from given url
// This function has to be called in the callback context of 
// $(document).ready();
// ===================================================================
function getCataXmlFromURL(url, param) {
	var xml;
	$.ajax({
		'type' : "GET",
		'url' : url,
		'dataType' : "xml",
		'data' : param,
		'header': {'Access-Control-Allow-Origin':'*'},
        'async': false,
        'global': false,
		success: function(data) {  xml = data; }
	});	
	return xml;
}

// ===================================================================
// Get product element from given catalog xmlDoc 
// ===================================================================
function getProduct(xml)
{
	// there is only one product, usually, the root element
	return $(xml).find("product")[0];
}

// Get product xml from url with parameters{string:string}
// This function has to be called in the callback context of 
// $(document).ready();
function getProductFromURL(url, param)
{
	if (!param) param = {};
	return getProduct(getCataXmlFromURL(url, param));
}

// ===================================================================
// Return a dictionary of <condition.name, string of expected values> of the given catalog xml
// This is useful to construct a testing form
// ===================================================================
function getConditionNamesAndValues(xml)
{
	var condDic = new Object;
	var seenValue = new Object;
	$(xml).find("condition").each(function(i, x){
		collectKeyValues(x, seenValue, condDic);
	});
	$(xml).find("product-condition").each(function(i, x){
		collectKeyValues(x, seenValue, condDic);
	});
	$(xml).find("item-condition").each(function(i, x){
		collectKeyValues(x, seenValue, condDic);
	});
	$(xml).find("price-condition").each(function(i, x){
		collectKeyValues(x, seenValue, condDic);
	});
	return condDic;
}

//=================================================================
// Collect keys and values
//=================================================================
function collectKeyValues(x, seen, keyValue)
{
	var v, k;
	k = $(x).attr('name');
	if ($(x).attr('operator') == '==') {
		v = $(x).text();
	} else {
		v = $(x).attr('operator') + "(" + $(x).text() + ")";
	}
	var seenKey = k + v;
	 if (!seen[seenKey]) {
		seen[seenKey] = true;
		if (keyValue[k]) {
			v = keyValue[k] + "|" + v;
		}
		keyValue[k] = v;	
	}
}

// ===================================================================
// Get a list of product-item elements from given product element
// that matches the conditions 
// The condition is a dictionary of <key string, value string>
// ===================================================================
function getProductItems(product, conditions)
{
	if (!conditions) conditions = {};
	var selected = new Array;
	$(product).find("product-item").each(function(i, x){
		if (isElementGoodFor(x, 'item-condition', conditions)) {
			selected.push(x);
		}
	});
	return selected;
} 

// ===================================================================
// Get a list of product-item elements of the given catagory
// that matches the conditions 
// The condition is a dictionary of <key string, value string>
// e.g getProductItemsOfCategory(product, "ppv", null)
// ===================================================================
function getProductItemsOfCategory(product, requiredCategory, conditions)
{
	if (!conditions) {conditions = {};}
	var selected = new Array;
	$(product).find("product-item").each(function(i, x){
		if ($(x).attr("category") == requiredCategory &&
			isElementGoodFor(x, 'item-condition', conditions)) {
			selected.push(x);
		}
	});
	return selected;
}

// ===================================================================
// Get a list of price elements from given product-item element
// that matches the conditions 
// The condition is a dictionary of <key string, value string>
// ===================================================================
function getProductItemPrices(productItem, conditions)
{
	if (!conditions) conditions = {};
	var selected = new Array;
	$(productItem).find("price").each(function(i, x){
		if (isElementGoodFor(x, 'price-condition', conditions)) {
			selected.push(x);
		}
	});
	return selected;
}

// ===================================================================
// Test to see if the given catalog object is good for the given conditions
// The condition is a dictionary of <key string, value string>
// ===================================================================
function isElementGoodFor(cata, conditionTag, conditions)
{
	var ok = 1;
	$(cata).find(conditionTag).each(function(i,rule){
		ok = isConditionGoodFor(rule, conditions);
		if (!ok) return ok;
		//Return false to break out each loop if any rule test returns false	
	})
	//Return ture only all rule tests are positive or there is no rules
	return ok;	
}

// ===================================================================
// Evaluation the rule with the given conditions
// The condition is a dictionary of <key string, value string>
// Return the result of eval(condition[rule.name] rule.op rule.value) 
// ===================================================================
function isConditionGoodFor(rule, conditions)
{
	var key = $(rule).attr("name");
	
	//return true if no key, i.e. condition name found
	if(!Object.prototype.hasOwnProperty.call(conditions, key)) {
		return 1;
	}
	
	var param = conditions[key];
	
	if (!param || !param.length) 
	{
		//Return false if no parameter is set for this rule
		return 0;
	}
	var op = $(rule).attr("operator");
	var valueType = $(rule).attr("value-type");
	var format = $(rule).attr("format");
	var value = $(rule).text();
	switch(valueType)
	{
		case "date":
		case "datetime":
	  		return isDateConditionGoodFor(param, op, value, format);
		case "daterange":
	  		return isDateRangeConditionGoodFor(param, op, value, format);
		case "number":
	  		return isNumberConditionGoodFor(param, op, value, format);
		case "csv":
	  		return isCSVConditionGoodFor(param, op, value, format);
		case "regex":
	  		return isStringConditionGoodFor(param, op, value, format);
		default:
	  		return isStringConditionGoodFor(param, op, value, format);
	}	
}

function isStringConditionGoodFor(param, op, value, format)
{
	//alert("cond:" + param + op + value);
	switch(op)
	{
		case "==":
		case "equal":
	  		return param == value;
		case "!=":
		case "not_equal":
	  		return param != value;
		case ">":
		case "gt":
		case "greater_than":
	  		return param > value;
		case "<":
		case "lt":
		case "less_than":
	  		return param < value;
		case ">=":
		case "ge":
		case "greater_or_equal":
	  		return param >= value;
		case "<=":
		case "le":
		case "less_or_equal":
	  		return param <= value;
		case "=~":
		case "match":
	  		return param.match(value);
		case "!~":
		case "not_match":
	  		return !param.match(value);
		case "e":
		case "one-of":
	  		return value.indexOf(param) != -1;
		case "!e":
		case "not-one-of":
		  	return value.indexOf(param) == -1;
		default:
	  		return 0;
	}
}

function isNumberConditionGoodFor(numberParam, op, numberValue, format)
{
	var param = parseFloat(numberParam);
	var value = parseFloat(numberValue);
	switch(op)
	{
		case "==":
		case "equal":
	  		return param == value;
		case "!=":
		case "not_equal":
	  		return param != value;
		case ">":
		case "gt":
		case "greater_than":
	  		return param > value;
		case "<":
		case "lt":
		case "less_than":
	  		return param < value;
		case ">=":
		case "ge":
		case "greater_or_equal":
	  		return param >= value;
		case "<=":
		case "le":
		case "less_or_equal":
	  		return param <= value;
		case "e":
		case "one_of":
	  		return param.match(value);
		case "!e":
		case "not_one_of":
	  		return !param.match(value);
		case "in":
		case "between":
			var values = value.split(',');
			if (values.length > 1) {
				var min = parseFloat(values[0]);
				var max = parseFloat(values[1]);
	  			return (min < param && param < max);
			} else {
				return 0;
			}
		case "!in":
		case "not_between":
			var values = value.split(',');
			if (values.length > 1) {
				var min = parseFloat(values[0]);
				var max = parseFloat(values[1]);
	  			return (min >= param && param>= max);
			} else {
				return 0;
			}
		default:
	  		return 0;
	}
}

function isCSVConditionGoodFor(param, op, csvValue, format)
{
	var value = csvValue.split(',');
	switch(op)
	{
		case "in":
		case "between":
			return value.indexOf(param) != -1;
		case "!in":
		case "not-between":
			return value.indexOf(param) == -1;
		default:
	  		return 0;
	}
}

function isDateConditionGoodFor(dateParam, op, dateValue, format)
{
	var param;
	var value;
	param = parseDate(dateParam, format);
	if (format) {
		value = getDateFromFormat(dateValue, format);
	} else {
		value = parseDate(dateValue, format);
		
	}
	if (!param || ! value) {
		return false;
	}
	switch(op)
	{
		case "==":
		case "equal":
	  		return param == value;
		case "!=":
		case "not_equal":
	  		return param != value;
		case ">":
		case "gt":
		case "greater_than":
		case "after":
	  		return param > value;
		case "<":
		case "lt":
		case "less_than":
		case "before":
	  		return param < value;
		case ">=":
		case "ge":
		case "greater_or_equal":
	  		return param >= value;
		case "<=":
		case "le":
		case "less_or_equal":
	  		return param <= value;
		default:
	  		return 0;
	}
}

function isDateRangeConditionGoodFor(dateParam, op, rangeValue, format)
{
	var param;
	var min;
	var max;
	var dates = rangeValue.split(',');
	if (dates.length < 2) {
		return false;
	}
	param = parseDate(dateParam, format);
	if (format) {
		min = getDateFromFormat(dates[0], format);
		max = getDateFromFormat(dates[1], format);
	} else {
		min = parseDate(dates[0], format);
		max = parseDate(dates[1], format);
		
	}
	if (!param || !min || !max) {
		return false;
	}
	switch(op)
	{
		case "in":
		case "between":
			return (min < param && param < max);
		case "!in":
			return (min >= param && param >= max);
		case "out":
		case "not-between":
			return (min > param && param > max);
		default:
	  		return 0;
	}
}