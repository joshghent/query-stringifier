var expect = require('chai').expect;
var qs = require('./');

var obj = {
    food : 'pizza',
    bar : 'chocolate'
};

describe('query-stringifier', function () {
    describe('#stringify', function () {
        it('converts an object to a query string', function () {
            
            var queryString = qs.stringify(obj, { prefix: '#'});

            expect(queryString).to.equal('#food=pizza&bar=chocolate');
        });
        it('the options parameter is optional', function () {
            var queryString = qs.stringify(obj);

            expect(queryString).to.equal('food=pizza&bar=chocolate');
        })
    });
});