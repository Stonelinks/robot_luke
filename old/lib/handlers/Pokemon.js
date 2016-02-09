/**
 * Created by ld on 12/1/15.
 */

var Handler = require('../Handler')

var Pokedex = require('pokedex')
var pokedex = new Pokedex()

module.exports = class extends Handler {
    onMessage(message, reply) {
        if (message.contains('pokemon')) {
            var name = message.text.split('pokemon').pop().split('for').pop().trim().toLowerCase();
            var pokemon = pokedex.pokemon(name);
            reply(pokemon && pokemon.sprites && pokemon.sprites.animated ? pokemon.sprites.animated : pokemon.toString());
        }
    }
}