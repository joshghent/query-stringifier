// Create our constructor
const QueryString = function () {};

// Add the query stringify method
// Arguments:
//  @params - OBJECT - An object of parameters to be built into a query string
QueryString.prototype.stringify = function (params, options) {
    const prefix = options.prefix || '';

    const queryStringArray = [];

    for (let key in params) {
        if (params.hasOwnProperty(key)) {
            queryStringArray.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
        }
    }

    if (queryStringArray.length === 0) {
        return '';
    }

    return prefix + queryStringArray.join('&');
};

// Export the module
module.exports = new QueryString();