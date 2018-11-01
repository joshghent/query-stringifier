import 'mocha';
import { expect } from 'chai';
import qs from '../index';

const obj = {
    food : 'pizza',
    bar : 'chocolate'
};

describe('query-stringifier', () => {
    describe('#stringify', () => {
        it('converts an object to a query string', () => {
            const queryString = qs.stringify(obj, { prefix: '#'});

            expect(queryString).to.equal('#food=pizza&bar=chocolate');
        });

        it('the options parameter is optional', () => {
            const queryString = qs.stringify(obj);

            expect(queryString).to.equal('food=pizza&bar=chocolate');
        });

        it('a value can be an array that that gets to a csv', () => {
            const test3 = {
                'column': ['a', 'b', 'c'],
                'anotherCol': 2
            };
            const queryString = qs.stringify(test3);

            expect(queryString).to.equal('column=' + encodeURIComponent('a,b,c') + '&anotherCol=2');
        });
    });

    describe('#parse', () => {
        it('converts a query string to an object', () => {
            const queryString = '?foo=bar';
            const parsed = qs.parse(queryString);

            expect(parsed).to.be.an('object');
            expect(parsed).to.have.property('foo', 'bar');
        });

        it('converts an query string with an ampersand prefix', () => {
            const parsed = qs.parse('&foo=bar&thing=thung');

            expect(parsed).to.be.an('object');
            expect(parsed).to.have.property('foo', 'bar');
            expect(parsed).to.have.property('thing', 'thung');
        });

        it('converts an query string with arrays', () => {
            const parsed = qs.parse('&arr[]=1&arr[]=2&arr[]=3');

            expect(parsed).to.be.an('object');
            expect(parsed).to.have.keys(['arr']);
            expect(parsed).to.deep.equal({ arr: ['1', '2', '3'] });
        });

        it('converts an query string with arrays and indexes', () => {
            const parsed = qs.parse('&arr[2]=1&arr[0]=2&arr[1]=3');

            expect(parsed).to.be.an('object');
            expect(parsed).to.have.keys(['arr']);
            expect(parsed).to.deep.equal({ arr: ['2', '3', '1'] });
        });

        it('converts query string with duplicate keys', () => {
            const parsed = qs.parse('itemIds=1&itemIds=2');

            expect(parsed).to.be.an('object');
            expect(parsed).to.have.keys(['itemIds']);
            expect(parsed).to.deep.equal({ itemIds: ['1', '2'] });
        });
    });

    describe('#extract', () => {
        it('extract the query string of the url', () => {
            const url = 'www.dummyurl.com?firstqueryparam=first&secondqueryparam=second';
            const result = qs.extract(url);

            expect(result).to.equal('firstqueryparam=first&secondqueryparam=second');
        });

        it('should return empty if there is no query string', () => {
            const url = 'www.dummyurl.com';
            const result = qs.extract(url);

            expect(result).to.equal('');
        });
    });

    describe('#extract/#parse', () => {
        it('extract the query string of the url and parses it', () => {
            const url = 'www.dummyurl.com?firstqueryparam=first&secondqueryparam=second';
            const result = qs.parse(qs.extract(url));

            expect(result).to.be.an('object');
            expect(result).to.have.property('firstqueryparam', 'first');
            expect(result).to.have.property('secondqueryparam', 'second');
        });
    });

});