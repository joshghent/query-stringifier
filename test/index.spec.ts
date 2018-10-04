var expect = require('chai').expect;
var qs = require('./index.ts');

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

            expect(queryString).to.equal('column=' + encodeURIComponent('a,b,c') + '&anotherCol=2');
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
        it('converts an query string with arrays', function () {
            var parsed = qs.parse('&arr[]=1&arr[]=2&arr[]=3');

            expect(parsed).to.be.an('object');
            expect(parsed).to.have.keys(['arr']);
            expect(parsed).to.deep.equal({ arr: ['1', '2', '3'] });
        });
        it('converts an query string with arrays and indexes', function () {
            var parsed = qs.parse('&arr[2]=1&arr[0]=2&arr[1]=3');

            expect(parsed).to.be.an('object');
            expect(parsed).to.have.keys(['arr']);
            expect(parsed).to.deep.equal({ arr: ['2', '3', '1'] });
        });
    });

    describe('#extract', function () {
        it('extract the query string of the url', function() {
            var url = 'www.dummyurl.com?firstqueryparam=first&secondqueryparam=second';
            var result = qs.extract(url);

            expect(result).to.equal('firstqueryparam=first&secondqueryparam=second');
        });

        it('should return empty if there is no query string', function() {
            var url = 'www.dummyurl.com';
            var result = qs.extract(url);

            expect(result).to.equal('');
        });
    });

    describe('#extract/#parse', function() {
        it('extract the query string of the url and parses it', function () {
            var url = 'www.dummyurl.com?firstqueryparam=first&secondqueryparam=second';
            var result = qs.parse(qs.extract(url));

            expect(result).to.be.an('object');
            expect(result).to.have.property('firstqueryparam', 'first');
            expect(result).to.have.property('secondqueryparam', 'second');
        });
    });

});