/**
 * Created by ld on 2/10/16.
 */

var request = require('request');

module.exports = function (controller){

    controller.hears(['vulnerability name'], ['direct_message', 'direct_mention'], function (bot, message) {
        var firstWords = ['Aftermath','Alarm','April','Beard','Bomb','Bulldozer','Cable','Chicken','Clutch','Cow','Doctor','Drill','Ethernet','Explosion','Fancy','Fat','Forehead','Friction','Gas','Goldfish','Grasshopper','Grease','Green','Horn','Monday','Notify','Onion','Orange','Page','Pain','Paper','Pillow','Pint','Plastic','Poison','Popcorn','Reduction','Screen','Screw','Seeder','Sidecar','Sleet','Soil','Spike','Stranger','Straw','Target','Tin','Vault','Yak','Moose','Candle','Ostrich','Leaf','Heart','Shell','Brain','Rug','Beaver','Pillow','Lemon','Bottle','Box','Budgie'];
        var secondWords = ['Arrest','Bake','Blast','Blush','Boil','Bounce','Brake','Bump','Burn','Bury','Carve','Charge','Choke','Clear','Cry','Burp','Dare','Decay','Disarm','Divide','Drop','Dump','Dust','End','Explode','Fail','Fart','Flood','Glue','Grate','Grip','Heat','Hook','Hug','Include','Jam','Jump','Kiss','Launch','Lick','Milk','Mine','Move','Muddle','Muncher','Orgasm','Part','Post','Press','Pull','Punch','Puncture','Punish','Push','Question','Reach','Refuse','Release','Roll','Rot','Rub','Ruin','Rush','Saw','Scare','Scorch','Scream','Scribble','Settle','Shock','Slap','Smoke','Split','Spoil','Squash','Squeak','Squeeeze','Squirt','Stain','Strip','Surprise','Tickle','Tie','Trap','Trick','Vanish','Wash','Whine','Whip','Wrap','Wriggle'];
        bot.reply(message, chooseRandom(firstWords) + ' ' + chooseRandom(secondWords));
    })
}

function chooseRandom (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
