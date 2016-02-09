/**
 * Created by ld on 12/1/15.
 */

var Handler = require('../Handler')
var util = require('../util')

module.exports = class extends Handler {
    onMessage(message, reply) {
        if (message.contains('drone', 'company', 'name')) {
            var firstWords = [
                'Drone',
                'Precision',
                'Sky',
                'Scan',
                'Precise',
                'Air',
                'Fly',
                'Flyer',
                'Aero',
                'Pix'
            ];
            var secondWords = [
                'Drone',
                'Drone',
                'Deploy',
                'Sky',
                'Hawk',
                'Eagle',
                'Dragon',
                'Scan',
                'Catch',
                'Future',
                'Futures',
                'Air',
                'Fly',
                'Flyer',
                'Aero',
                '4d'
            ];
            reply(util.chooseRandom(firstWords) + util.chooseRandom(secondWords));
        }
    }
}