const assert = require('chai').assert;
const Polylang = require('../index');

describe('constructor', () => {
    it('should set default language to english', () => {
        const polylang = new Polylang();
        assert.equal(polylang.lang, 'en');
    });
    it('should set language to english if it\'s specified', () => {
        const polylang = new Polylang({defaultLang: 'ro'});
        assert.equal(polylang.lang, 'ro');
    });
    it('should set default dot delimiter to .', () => {
        const polylang = new Polylang();
        assert.equal(polylang.accessDelimiter, '.');
    });
    it('should set dot delimiter to / if it\'s specified', () => {
        const polylang = new Polylang({accessDelimiter: '/'});
        assert.equal(polylang.accessDelimiter, '/');
    });
    it('should set default interpolation delimiter to << and >>', () => {
        const polylang = new Polylang();
        assert.equal(polylang.startInterpolationDelimiter, '<<');
        assert.equal(polylang.endInterpolationDelimiter, '>>');
    });
    it('should set interpolation delimiter to [[ and ]] if it\'s specified', () => {
        const polylang = new Polylang({startInterpolationDelimiter: '[[', endInterpolationDelimiter: ']]'});
        assert.equal(polylang.startInterpolationDelimiter, '[[');
        assert.equal(polylang.endInterpolationDelimiter, ']]');
    });
});
describe('data', () => {
    const polylang = new Polylang();
    it('adding data', () => {
        polylang.add('en', {
            welcome: 'welcome',
        });
        assert.equal(Object.keys(polylang.languages)[0], 'en');
        assert.equal(polylang.languages[Object.keys(polylang.languages)[0]].welcome, 'welcome');
    });
    it('removing data', () => {
        polylang.remove('en');
        assert.equal(Object.keys(polylang.languages).length, 0);
    });
    it('accessing data and interpolation', () => {
        const data = {
            welcome: 'welcome <<name>> <<age>>',
            exit_confirm: 'Are you shure you want to exit?',
            errors: {
                invalid_email: 'The email "<<email>>" is invalid',
                password: {
                    too_short: 'The password is too short',
                    one_digit: 'The passowrd must contain at least one digit'
                },
            }
        };
        
        polylang.add('en', data);
        assert.equal(polylang.t('welcome', {name: 'name', age: 12}), 'welcome name 12');
        assert.equal(polylang.t('errors.invalid_email', 'test@test.com'), 'The email "test@test.com" is invalid');
        assert.equal(polylang.t('errors.password.too_short'), data.errors.password.too_short);
    });
});