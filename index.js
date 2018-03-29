/*
* Main class
*/
class Polylang {
    /**
     * @example
     * polylang = new Polylang({
     *     defaultLang: 'en'
     *     accessDelimiter: '.',
     *     startInterpolationDelimiter: '<<',
     *     endInterpolationDelimiter: '>>'
     * });
     * 
     * @param  {string} {defaultLang - the default language that will be used to translate the text
     * @param  {string} accessDelimiter - delimiter used to represent levels in the translation object (ex: 'errors.password.too_short')
     * @param  {string} startInterpolationDelimiter - delimiter used to interpolate custom string into the translation at the start of the word
     * @param  {string} endInterpolationDelimiter} - delimiter used to interpolate custom string into the translation at the start of the word
     */
    constructor({ defaultLang = 'en', accessDelimiter = '.', startInterpolationDelimiter = '<<', endInterpolationDelimiter = '>>' } = {}) {
        this.lang = defaultLang;
        this.accessDelimiter = accessDelimiter;
        this.startInterpolationDelimiter = startInterpolationDelimiter;
        this.endInterpolationDelimiter = endInterpolationDelimiter;
        this.languages = {};
    }
    /** Add a translation
     * @example
     * polylang.add('en',{
            errors: {
                invalid_email: 'The email "<<email>>" is invalid',
                password: {
                    too_short: 'The password is too short',
                    one_digit: 'The passowrd must contain at least one digit'
                },
            }
        });
     *
     * @param  {string} language - language
     * @param  {object} data - translation object
     */
    add(language, data) {
        this.languages[language] = data;
    }
    /** Remove a translation
     * @example
     * polylang.remove('en');
     * 
     * @param  {string} language - language name that wil be removeed
     */
    remove(language) {
        delete this.languages[language];
    }
    /** Translate
     * @example
     * polylang.t('errors.invalid_email', 'test@test.com');
     * polylang.t('errors.invalid_email', {email: 'test@test.com', reason: 'it is taken!'}); //if invalid_email string would be 'The email "<<email>>" is invalid because <<reason>>'
     * 
     * @param  {string} selector - translation path
     * @param  {string|object} interpolationValues - value/s to be replaced between interpolation delimiters
     */
    t(selector, interpolationValues) {
        return this.translate(selector, this.languages[this.lang], interpolationValues);
    }
    /** Translate in custom language
     * @example
     * polylang.t('errors.invalid_email', 'en', 'test@test.com');
     * @param  {string} selector - translation path
     * @param  {string} language - translation language
     * @param  {string|object} interpolationValues - value/s to be replaced between interpolation delimiters
     */
    translate(selector, language, interpolationValues) {
        let text = this._getNestedItem(selector, this.accessDelimiter, language, language);
        text = text.replace(new RegExp(this.startInterpolationDelimiter + '(.+?)' + this.endInterpolationDelimiter, 'g'), (match, p1) => {
            if(typeof interpolationValues !== 'object') return interpolationValues;
            return interpolationValues[p1];
        });
        return text;
    }
    _getNestedItem(selector, delimiter, data) {
        if(typeof data === 'string' || selector.length === 0) return data;
        selector = selector.split(delimiter);
        data = data[selector[0]];
        selector.shift();
        return this._getNestedItem(selector.join(delimiter), delimiter, data);
    }
}

module.exports = Polylang;