/**
 * Created by ld on 12/1/15.
 */

var _ = require('lodash');

class Message {
    constructor(origMessage) {
        _.extend(this, origMessage)
    }

    contains() {
        var _contains = function (s) {
            return this.text.toLowerCase().indexOf(s) > -1
        }.bind(this)

        var ret = true;
        Array.prototype.slice.call(arguments).forEach(function (word) {
            ret = ret && _contains(word)
        });
        return ret;
    }
}

module.exports = Message