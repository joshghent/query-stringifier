interface options {
    prefix: string;
}
/**
 * A small library for build query strings
 * @class
 */
declare class QueryString {
    /**
     * Add the query stringify method
     * @param {object} params - Parameters to be built into a query string
     * @param {object} options - Optional settings
     * @property {string} options.prefix - The prefix that should be joined to the resulted query string
     * @returns {string} Returns query-stringified object
     */
    static stringify(params: object, options?: options): string;
    /**
     * Add the query stringify method
     * @param {string | any} queryStr - The query string to parse into an object. If any type other than string, just returns it
     * @returns {object} Returns query-string as object
     */
    static parse(queryStr: string): object;
    /**
     * Extract the query string sentence from any url. If there is no query string, empty string should be returned.
     * @param {string} url - url which contains
     * @returns {string} Extracted query string from url
     */
    static extract(url: string): string;
}
export default QueryString;
