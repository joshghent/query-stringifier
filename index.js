'use strict';

/**
 * A small library for build query strings
 * @class
 */
const QueryString = function () {};

/**
 * Add the query stringify method
 * @param {object} params - Parameters to be built into a query string
 * @param {object} options - Optional settings
 * @property {string} options.prefix - The prefix that should be joined to the resulted query string
 * @returns {string} Returns query-stringified object
 */
QueryString.prototype.stringify = function (params, options) {
    // If the options parameter was not defined then create it with some default values.
    if (options === undefined) {
        options = {
            prefix: ''
        };
    }

    // Create an array that will hold the stringified parameters
    // Each element will be key value pair like 'foo=bar'
    const queryStringArray = [];

    // Iterate through the parameters object that was passed to the method
    for (let key in params) {
        if (params.hasOwnProperty(key)) {
            // If the element is an array then loop through it
            if (Array.isArray(params[key]) === true) {
                queryStringArray.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key].join(',')));
            } else {
                // Add the URI encoded key and value to the array separated by an equals
                queryStringArray.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
            }
        }
    }

    // If the parameters object was blank for some reason then we return a blank string
    if (queryStringArray.length === 0) {
        return '';
    }

    // Otherwise return the query string prefixed with the options.prefix
    return options.prefix + queryStringArray.join('&');
};

/**
 * Add the query stringify method
 * @param {string | any} queryStr - The query string to parse into an object. If any type other than string, just returns it
 * @returns {object} Returns query-string as object
 */
QueryString.prototype.parse = function (queryStr) {
    let obj = Object.create(null);

    if (typeof queryStr !== 'string') {
        return obj;
    }

    queryStr = queryStr.trim().replace(/^(\?|&|#)/, '');

    queryStr.split('&').forEach((param) => {
        const components = param.split('=');
        const value = decodeURIComponent(components[1]);
        var key = decodeURIComponent(components[0]);

        //Is the query param an array?
        if (key.search(/\[([0-9]*)\]/) !== -1) {
            const indexOfArray = key.slice(-2) !== '[]' ? key.charAt(key.length - 2) : undefined;
            key = key.slice(0, key.indexOf('['));

            //Does the array already exist in the object
            if (obj[key]) {
                if (indexOfArray) {
                    obj[key][indexOfArray] = value;
                } else {
                    obj[key].push(value);
                }
            } else {
                if (indexOfArray) {
                    obj[key] = [];
                    obj[key][indexOfArray] = value;
                } else {
                    obj[key] = [value];
                }   
            }
        } else {
            // Check if the key is already in the object 
            if (Object.keys(obj).indexOf(key) > -1) {
                if (Array.isArray(obj[key])) {
                    obj[key].push(value); 
                } else {
                    let newArray = []; 
                    newArray.push(obj[key]); 
                    newArray.push(value);
                    obj[key] = newArray; 
                }

            } else {
                obj[key] = value;
            }
            
        }
    });

    return obj;
}

/**
 * Extract the query string sentence from any url. If there is no query string, empty string should be returned.
 * @param {string} url - url which contains
 * @returns {string} Extracted query string from url
 */
QueryString.prototype.extract = function (url) {
    const queryStringPosition = url.indexOf('?')
    const isThereQueryString = queryStringPosition > -1

    if (!isThereQueryString) return ''

    return url.substring(queryStringPosition + 1);
}

// Export the module
module.exports = new QueryString();