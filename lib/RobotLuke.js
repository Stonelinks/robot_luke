/**
 * Created by ld on 12/1/15.
 */

var Bot = require('slackbots');
var request = require('request');
var cheerio = require('cheerio');
var Pokedex = require('pokedex');
var pokedex = new Pokedex();

var fs = require('fs')
var path= require('path')
var handlersDir = './handlers'

var chooseRandom = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
};

class RobotLuke extends Bot {
    constructor(settings) {
        super(settings);
        this.on('start', this._onStart);
        this.on('message', this._onMessage);
        this.user = null;
        this.handlers= null;
    }

    _onStart() {
        this._loadBotUser();
        this.handlers = fs.readdirSync(path.join(__dirname, handlersDir)).map(function (handlerName) {
            var Handler = require(`${handlersDir}/${handlerName}`)
            return new Handler()
        })
    }

    _onMessage(message) {
        console.log(JSON.stringify(message, null, 2));
        if (this._shouldPayAttention(message)) {

            var reply = function (text) {
                this._replyToUser(message, text)
            }.bind(this)
            this.handlers.forEach(function (handler) {
                handler.onMessage(message, reply)
                debugger
            })

            //
            //if (message.text.toLowerCase().indexOf('ping') > -1) {
            //    this._ping(message);
            //} else if (message.text.toLowerCase().indexOf('hello') > -1) {
            //    this._hello(message);
            //} else if (message.text.toLowerCase().indexOf('acronym') > -1) {
            //    this._replyWithAcronym(message);
            //} else if (message.text.toLowerCase().indexOf('vince') > -1) {
            //    var int = setInterval(() => {
            //        this._replyToUser(message, '/giphy vince mcmahon', true);
            //    }, 1000);
            //    setTimeout(function () {
            //        clearInterval(int)
            //    }, 15 * 1000)
            //} else if (message.text.toLowerCase().indexOf('ooer') > -1) {
            //    this._replyToUser(message, "MAN NOT PLZ GOOD HELP I COMPUTER OH I OH PLZ GOOD PLZ NOT MAN COMPUTER TO HELP COMPUTER COMPUTER PLZ MAN NOT GOOD PLZ WITH I GOOD HELP COMPUTER NOT MAN GOOD HELP TO PLZ OH WITH HELP HELP NOT AM AM MAN TO GOOD HELP NOT I WITH I I COMPUTER MAN TO PLZ OH WITH HELP HELP NOT AM AM MAN NOT AM PLZ AM WITH I OH TO PLZ AM HELP TO HELP PLZ MAN MAN NOT AM PLZ I WITH PLZ TO HELP AM HELP HELP AM WITH WITH NOT AM TO COMPUTER HELP GOOD OH GOOD I OH MAN I PLZ MAN PLZ PLZ HELP GOOD GOOD WITH HELP OH MAN COMPUTER AM TO HELP HELP I OH GOOD I I AM PLZ NOT OH COMPUTER PLZ NOT NOT WITH NOT HELP AM WITH TO TO NOT HELP PLZ HELP TO NOT WITH AM AM COMPUTER HELP WITH WITH GOOD NOT WITH OH GOOD COMPUTER MAN NOT I TO PLZ MAN MAN NOT COMPUTER TO COMPUTER AM HELP TO OH NOT I MAN PLZ WITH I GOOD COMPUTER I WITH I NOT COMPUTER PLZ AM MAN GOOD GOOD HELP OH OH COMPUTER MAN NOT GOOD PLZ I I PLZ I AM MAN MAN PLZ TO PLZ COMPUTER MAN I MAN AM TO GOOD HELP MAN HELP NOT GOOD PLZ I MAN GOOD MAN I HELP TO WITH TO GOOD NOT COMPUTER TO AM TO AM TO AM COMPUTER WITH WITH AM PLZ OH OH HELP I AM NOT TO GOOD OH MAN GOOD COMPUTER AM WITH WITH NOT AM TO WITH COMPUTER WITH GOOD TO NOT MAN COMPUTER TO I GOOD I MAN GOOD MAN GOOD HELP TO PLZ HELP HELP WITH I HELP COMPUTER COMPUTER HELP GOOD AM GOOD TO HELP GOOD NOT PLZ MAN AM GOOD PLZ OH HELP HELP PLZ TO WITH OH COMPUTER MAN HELP COMPUTER I AM TO OH COMPUTER NOT COMPUTER AM PLZ HELP AM WITH TO TO HELP HELP HELP OH GOOD OH MAN GOOD COMPUTER GOOD MAN I MAN OH WITH PLZ NOT OH COMPUTER PLZ I AM GOOD MAN I HELP TO WITH WITH TO MAN NOT I COMPUTER PLZ OH TO NOT TO NOT OH WITH COMPUTER GOOD WITH MAN GOOD MAN OH WITH WITH WITH OH MAN NOT AM PLZ HELP PLZ MAN GOOD TO WITH NOT I WITH I WITH PLZ OH OH HELP GOOD COMPUTER COMPUTER NOT COMPUTER AM OH PLZ I HELP PLZ TO WITH OH COMPUTER OH AM OH WITH TO MAN PLZ HELP MAN MAN WITH MAN NOT I COMPUTER GOOD COMPUTER MAN TO GOOD OH HELP WITH GOOD MAN MAN TO TO HELP HELP HELP WITH I GOOD COMPUTER OH GOOD GOOD NOT TO GOOD OH NOT TO I PLZ PLZ TO NOT NOT NOT PLZ TO I OH I OH HELP OH COMPUTER HELP I COMPUTER I GOOD I MAN COMPUTER OH TO PLZ TO TO WITH WITH TO WITH COMPUTER COMPUTER PLZ MAN GOOD TO PLZ NOT TO TO I MAN PLZ PLZ OH TO NOT PLZ OH COMPUTER MAN OH AM MAN I TO HELP NOT MAN PLZ PLZ OH HELP WITH WITH WITH AM PLZ OH MAN HELP WITH GOOD MAN OH MAN GOOD COMPUTER AM WITH TO GOOD NOT PLZ TO I TO I PLZ PLZ MAN WITH NOT GOOD MAN NOT I OH AM HELP OH MAN TO COMPUTER COMPUTER MAN TO MAN HELP HELP NOT HELP NOT COMPUTER OH AM TO MAN GOOD MAN AM WITH NOT TO MAN WITH I WITH AM OH HELP I MAN TO WITH MAN GOOD HELP TO WITH TO TO MAN PLZ AM AM TO COMPUTER MAN OH AM HELP WITH COMPUTER WITH GOOD NOT NOT NOT MAN PLZ PLZ MAN WITH WITH NOT PLZ HELP HELP I NOT NOT I OH AM PLZ HELP AM GOOD NOT AM TO HELP GOOD HELP NOT GOOD NOT WITH OH GOOD NOT I TO PLZ NOT WITH AM AM TO MAN COMPUTER HELP OH TO MAN NOT OH OH COMPUTER MAN NOT GOOD GOOD COMPUTER TO AM TO MAN WITH NOT GOOD AM WITH COMPUTER COMPUTER PLZ MAN NOT I MAN GOOD COMPUTER GOOD MAN GOOD HELP WITH MAN MAN I I COMPUTER MAN TO PLZ OH NOT COMPUTER HELP GOOD HELP NOT GOOD NOT WITH PLZ MAN GOOD TO PLZ NOT MAN TO COMPUTER COMPUTER MAN HELP HELP TO GOOD HELP PLZ TO NOT OH WITH COMPUTER NOT HELP MAN COMPUTER GOOD GOOD I I GOOD MAN PLZ NOT TO I HELP NOT I MAN GOOD OH PLZ OH GOOD WITH COMPUTER PLZ TO HELP.");
            //} else if (message.text.toLowerCase().indexOf('friend') > -1) {
            //    this._replyToUser(message, 'you\'re my friend too');
            //} else  if (message.text.toLowerCase().indexOf('pokemon') > -1) {
            //    var name = message.text.split('pokemon').pop().split('for').pop().trim().toLowerCase();
            //    var pokemon = pokedex.pokemon(name);
            //    this._replyToUser(message, pokemon && pokemon.sprites && pokemon.sprites.animated ? pokemon.sprites.animated : pokemon.toString());
            //} else if (message.text.toLowerCase().indexOf('eval') > -1) {
            //    this._replyToUser(message, 'did you really think that would work?');
            //    //try {
            //    //    this._replyToUser(message, eval(message.text.split('`')[1]));
            //    //} catch (e) {
            //    //    this._replyToUser(message, '```\n' + e.stack + '\n```')
            //    //}
            //} else if (message.text.toLowerCase().indexOf('drone') > -1 && message.text.toLowerCase().indexOf('company') > -1 && message.text.toLowerCase().indexOf('name') > -1) {
            //    this._replyWithDroneCompanyName(message);
            //} else if (message.text.toLowerCase().indexOf('childhood') > -1) {
            //    this._replyToUser(message, ['I was born in Tapachula Chiapas Mexico in 1983. My birthday is in February 14 in San Valentine’s Day. When I was 6 years old I started the Primary School in IPCA. I studied there 6 years, and it was a really great time for me. I had my best friends there, because we were together 6 years, and we were like a family.',
            //
            //        'In the end of my school day, when I was home all afternoons I used to do my homework and after I used to play with my dolls. Sometimes I used to go to my friend’s house to play, and sometimes they came to my house.',
            //
            //        'When I was 8 years old I had baptism, and this day my father gave me my first dog, and her name is Jitana, and I love my dog. At the same age I started to have ballet classes, because I always like dance, and these classes were a good time for me.',
            //
            //        'I think that I had a really nice childhood. I didn’t have any kind of problems, and I enjoyed all my childhood. I very really nice memories about my childhood.'].join('\n\n'));
            //}
        }
    }

    _mentionUser(originalMessage) {
        return '<@' + originalMessage.user + '>';
    }

    _replyToUser(originalMessage, newMessage, noname) {
        this.postMessage(originalMessage.channel, (noname ? '' : (this._mentionUser(originalMessage)) + ' ') + newMessage);
    }

    _hello(originalMessage) {
        this._replyToUser(originalMessage, 'hello there!');
    }

    _ping(originalMessage) {
        this._replyToUser(originalMessage, 'ping');
    }

    _replyWithAcronym(originalMessage) {

        var acronym = originalMessage.text.split('acronym').pop().split('for').pop().trim();

        var url = 'http://acronyms.thefreedictionary.com/' + acronym;

        request(url, (error, response, html) => {
            if (!error) {
                var $ = cheerio.load(html);
                var acronyms = [];
                $('#AcrFinder').find('td:not(.acr)').slice(1).each(function (_, row) {
                    acronyms.push(cheerio(row).text());
                });
                var rand = acronyms[Math.floor(Math.random() * acronyms.length)];
                this._replyToUser(originalMessage, rand);
            }
        });
    }

    _replyWithDroneCompanyName(originalMessage) {
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
        this._replyToUser(originalMessage, chooseRandom(firstWords) + chooseRandom(secondWords));

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

module.exports = RobotLuke