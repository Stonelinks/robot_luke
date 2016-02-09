/**
 * Created by ld on 12/1/15.
 */

var Handler = require('../Handler')

module.exports = class extends Handler {
    onMessage(message, reply) {
        if (message.contains('eval')) {
            reply('did you really think that would work?');
            //try {
            //    reply(eval(message.text.split('`')[1]));
            //} catch (e) {
            //    reply('```\n' + e.stack + '\n```')
            //}
        }
    }
}