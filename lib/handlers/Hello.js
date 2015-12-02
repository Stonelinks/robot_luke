/**
 * Created by ld on 12/1/15.
 */

var Handler = require('../Handler')
var Pokedex = require('pokedex');
var pokedex = new Pokedex();

module.exports = class extends Handler {
    onMessage(message, reply) {
        if (message.contains('ping')) {
            reply('pong');
        }
    }
}