/**
 * Created by ld on 12/1/15.
 */


module.exports = function (controller){

    controller.hears(['drone*.company'], ['direct_message', 'direct_mention'], function (bot, message) {
        var firstWords = [
            'Drone',
            'Trim',
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
            'Falcon',
            'Dragon',
            'Scan',
            'Catch',
            'Future',
            'Futures',
            'Air',
            'Fly',
            'ble',
            'ly',
            'lr',
            'Flyer',
            'Aero',
            '4d',
            '5d',
            '9d',
            ' 3000'
        ];
        bot.reply(message, 'Your drone company name is ' + chooseRandom(firstWords) + chooseRandom(secondWords));
    })
}

function chooseRandom (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}