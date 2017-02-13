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
        });
        it('a value can be an array that that gets to a csv', function() {
            var test3 = {
                'column': ['a', 'b', 'c'],
                'anotherCol': 2
            };
            var queryString = qs.stringify(test3);

            expect(queryString).to.equal('column=a,b,c&anotherCol=2');
        });
    });

    describe('#parse', function () {
        it('converts a query string to an object', function () {
            var queryString = '?foo=bar';
            var parsed = qs.parse(queryString);

            expect(parsed).to.be.an('object');
            expect(parsed).to.have.property('foo', 'bar');
        });
        it('converts an query string with an ampersand prefix', function () {
            var parsed = qs.parse('&foo=bar&thing=thung');

            expect(parsed).to.be.an('object');
            expect(parsed).to.have.property('foo', 'bar');
            expect(parsed).to.have.property('thing', 'thung');
        });
    });
});