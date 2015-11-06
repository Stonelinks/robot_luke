/**
 * Created by ld on 11/5/15.
 */

'use strict';

var util = require('util');
var Bot = require('slackbots');
var request = require('request');
var cheerio = require('cheerio');

var LukeBot = function Constructor(settings) {
    this.settings = settings;
    this.user = null;
};

util.inherits(LukeBot, Bot);

LukeBot.prototype.run = function() {
    LukeBot.super_.call(this, this.settings);

    this.on('start', this._onStart);
    this.on('message', this._onMessage);
};

LukeBot.prototype._onStart = function() {
    this._loadBotUser();
};

LukeBot.prototype._onMessage = function(message) {
    console.log(JSON.stringify(message, null, 2));
    if (this._shouldPayAttention(message)) {
        if (message.text.toLowerCase().indexOf('ping') > -1) {
            this._ping(message);
        } else if (message.text.toLowerCase().indexOf('acronym') > -1) {
            this._replyWithAcronym(message);
        } else if (message.text.toLowerCase().indexOf('childhood') > -1) {
            this._replyToUser(message, ['I was born in Tapachula Chiapas Mexico in 1983. My birthday is in February 14 in San Valentine’s Day. When I was 6 years old I started the Primary School in IPCA. I studied there 6 years, and it was a really great time for me. I had my best friends there, because we were together 6 years, and we were like a family.',
                
            'In the end of my school day, when I was home all afternoons I used to do my homework and after I used to play with my dolls. Sometimes I used to go to my friend’s house to play, and sometimes they came to my house.',

            'When I was 8 years old I had baptism, and this day my father gave me my first dog, and her name is Jitana, and I love my dog. At the same age I started to have ballet classes, because I always like dance, and these classes were a good time for me.',

            'I think that I had a really nice childhood. I didn’t have any kind of problems, and I enjoyed all my childhood. I very really nice memories about my childhood.'].join('\n\n'));
        }
    }
};

LukeBot.prototype._mentionUser = function(originalMessage) {
    return '<@' + originalMessage.user + '>';
};

LukeBot.prototype._replyToUser = function(originalMessage, newMessage) {
    this.postMessage(originalMessage.channel, this._mentionUser(originalMessage) + ' ' + newMessage);
};

LukeBot.prototype._ping = function(originalMessage) {
    this._replyToUser(originalMessage, 'ping');
};

LukeBot.prototype._replyWithAcronym = function(originalMessage) {

    var acronym = originalMessage.text.split('acronym').pop().split('for').pop().trim();

    var url = 'http://acronyms.thefreedictionary.com/' + acronym;

    request(url, function(error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            var acronyms = [];
            $('#AcrFinder td:not(.acr)').slice(1).each(function(_, row) {
                acronyms.push(cheerio(row).text());
            });
            var rand = acronyms[Math.floor(Math.random() * acronyms.length)];
            this._replyToUser(originalMessage, rand);
        }
    }.bind(this));
};

LukeBot.prototype._loadBotUser = function() {
    var self = this;
    this.user = this.users.filter(function(user) {
        return user.name === self.name;
    })[0];
};

LukeBot.prototype._messageHasText = function(message) {
    return message.type === 'message' && Boolean(message.text);
};

LukeBot.prototype._isChannelConversation = function(message) {
    return typeof message.channel === 'string' && message.channel[0] === 'C';
};

LukeBot.prototype._isDirectMessage = function(message) {
    return typeof message.channel === 'string' && message.channel[0] === 'D';
};

LukeBot.prototype._isGroupMessage = function(message) {
    return typeof message.channel === 'string' && message.channel[0] === 'G';
};

LukeBot.prototype._isMentioned = function(message) {
    return message.text.indexOf(this.user.id) > -1;
};

LukeBot.prototype._isFromSelf = function(message) {
    return message.user === this.user.id || message.username === this.name;
};

LukeBot.prototype._getChannelById = function(channelId) {
    return this.channels.filter(function(item) {
        return item.id === channelId;
    })[0];
};

LukeBot.prototype._shouldPayAttention = function(message) {
    return this._messageHasText(message) &&
        !this._isFromSelf(message) &&
        (this._isDirectMessage(message) || (this._isMentioned(message) && (this._isChannelConversation(message) || this._isGroupMessage(message))));
};


module.exports = LukeBot;
