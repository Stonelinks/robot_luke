/**
 * Created by ld on 12/1/15.
 */
        
var Bot = require('slackbots');

var fs = require('fs');
var path = require('path');
var handlersDir = './handlers';

var Message = require('./Message');

class RobotLuke extends Bot {
    constructor(settings) {
        super(settings);
        this.on('start', this.onStart);
        this.on('message', this.onMessage);
        this.user = null;
        this.handlers = null;
    }

    onStart() {
        this._loadBotUser();
        this.handlers = fs.readdirSync(path.join(__dirname, handlersDir)).map(function (handlerName) {
            var Handler = require(`${handlersDir}/${handlerName}`);
            return new Handler()
        })
    }

    onMessage(rawMessage) {
        var message = new Message(rawMessage);
        console.log(JSON.stringify(message, null, 2));
        if (this._shouldPayAttention(message)) {

            var reply = function (text) {
                this._replyToUser(message, text)
            }.bind(this);

            this.handlers.forEach(function (handler) {
                handler.onMessage(message, reply)
            })
        }
    }

    _mentionUser(originalMessage) {
        return '<@' + originalMessage.user + '>';
    }

    _replyToUser(originalMessage, newMessage, noname) {
        this.postMessage(originalMessage.channel, (noname ? '' : (this._mentionUser(originalMessage)) + ' ') + newMessage);
    }

    _loadBotUser() {
        var self = this;
        this.user = this.users.filter(function (user) {
            return user.name === self.name;
        })[0];
    }

    _messageHasText(message) {
        return message.type === 'message' && Boolean(message.text);
    }

    _isChannelConversation(message) {
        return typeof message.channel === 'string' && message.channel[0] === 'C';
    }

    _isDirectMessage(message) {
        return typeof message.channel === 'string' && message.channel[0] === 'D';
    }

    _isGroupMessage(message) {
        return typeof message.channel === 'string' && message.channel[0] === 'G';
    }

    _isMentioned(message) {
        return message.text.indexOf(this.user.id) > -1;
    }

    _isFromSelf(message) {
        return message.user === this.user.id || message.username === this.name;
    }

    _getChannelById(channelId) {
        return this.channels.filter(function (item) {
            return item.id === channelId;
        })[0];
    }

    _shouldPayAttention(message) {
        return this._messageHasText(message) && !this._isFromSelf(message) &&
            (this._isDirectMessage(message) || (this._isMentioned(message) && (this._isChannelConversation(message) || this._isGroupMessage(message))));
    }
}

module.exports = RobotLuke;