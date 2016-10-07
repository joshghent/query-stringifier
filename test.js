var expect = require('chai').expect;
var qs = require('./');

describe('query-stringifier', function () {
    describe('#stringify', function () {
        it('converts an object to a query string', function () {
            var obj = {
                food : 'pizza',
                bar : 'chocolate'
            };
            var queryString = qs.stringify(obj, { prefix: '#'});

            expect(queryString).to.equal('#food=pizza&bar=chocolate');
        });
    });
});