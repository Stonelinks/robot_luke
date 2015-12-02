/**
 * Created by ld on 12/1/15.
 */

var Handler = require('../Handler')

module.exports = class Ping extends Handler {
    onMessage(message, reply) {
        if (message.text.toLowerCase().indexOf('ping') > -1) {
            reply('pong');
        }
    }
}