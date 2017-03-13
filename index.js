/**
 * Created by ld on 2/8/16.
 */
var Botkit = require('botkit');
var Cleverbot = require('cleverbot-node');
var HerokuKeepalive = require('@ponko2/botkit-heroku-keepalive').default;

var fs = require('fs');
var path = require('path');
var handlersDir = './handlers';

// Expect a SLACK_TOKEN environment variable
var slackToken = process.env.SLACK_TOKEN;
if (!slackToken) {
    console.error('SLACK_TOKEN is required!');
    process.exit(1)
}

var controller = Botkit.slackbot();

var cleverbotToken = process.env.CLEVERBOT_TOKEN;
var cleverbot = new Cleverbot;
cleverbot.configure({botapi: cleverbotToken});
    
var herokuKeepalive;
controller.setupWebserver(process.env.PORT || 8080, function (err, webserver) {
    herokuKeepalive = new HerokuKeepalive(controller);
});

var bot = controller.spawn({
    token: slackToken
});

bot.startRTM(function (err, bot, payload) {
    if (err) {
        throw new Error('Could not connect to Slack')
    }

    fs.readdirSync(path.join(__dirname, handlersDir)).forEach(function (handlerName) {
        console.log(`booting ${handlerName}`)
        require(`${handlersDir}/${handlerName}`)(controller);
    })

    controller.hears('help.*', ['direct_message', 'direct_mention'], function (bot, message) {
        bot.reply(message, 'This is intentionally left blank')
    });



    controller.hears('.*', ['direct_message', 'direct_mention'], function (bot, message) {
        cleverbot.write(message.text, function (response) {
            bot.reply(message, response.output);
        });
    })

    herokuKeepalive.start();
    console.log('booted')
});
//
//controller.hears(['attachment'], ['direct_message', 'direct_mention'], function (bot, message) {
//    var text = 'Beep Beep Boop is a ridiculously simple hosting platform for your Slackbots.';
//    var attachments = [{
//        fallback: text,
//        pretext: 'We bring bots to life. :sunglasses: :thumbsup:',
//        title: 'Host, deploy and share your bot in seconds.',
//        image_url: 'https://storage.googleapis.com/beepboophq/_assets/bot-1.22f6fb.png',
//        title_link: 'https://beepboophq.com/',
//        text: text,
//        color: '#7CD197'
//    }];
//
//    bot.reply(message, {
//        attachments: attachments
//    }, function (err, resp) {
//        console.log(err, resp)
//    })
//});
//
