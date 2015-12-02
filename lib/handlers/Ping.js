/**
 * Created by ld on 12/1/15.
 */

var Handler = require('../Handler');

module.exports = class extends Handler {
    onMessage(message, reply) {
        if (message.contains('hello')) {
            reply('hello there');
        }
    }
}