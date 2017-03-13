/**
 * Created by ld on 12/1/15.
 */



module.exports = function (controller) {

    controller.on('bot_channel_join', function (bot, message) {
        bot.reply(message, "I'm here!")
    });

    // controller.hears('childhood', ['direct_message', 'direct_mention'], function (bot, message) {
    //     bot.reply(message, 'I was born in Tapachula Chiapas Mexico in 1983. My birthday is in February 14 in San Valentine’s Day. When I was 6 years old I started the Primary School in IPCA. I studied there 6 years, and it was a really great time for me. I had my best friends there, because we were together 6 years, and we were like a family.');

    //     bot.reply(message, 'In the end of my school day, when I was home all afternoons I used to do my homework and after I used to play with my dolls. Sometimes I used to go to my friend’s house to play, and sometimes they came to my house.');

    //     bot.reply(message, 'When I was 8 years old I had baptism, and this day my father gave me my first dog, and her name is Jitana, and I love my dog. At the same age I started to have ballet classes, because I always like dance, and these classes were a good time for me.');

    //     bot.reply(message, 'I think that I had a really nice childhood. I didn’t have any kind of problems, and I enjoyed all my childhood. I have really nice memories about my childhood.')
    // });

    // controller.hears(['hello', 'hi', 'hey'], ['direct_mention'], function (bot, message) {
    //     bot.reply(message, `Hello <@${message.user}>`)
    // });

    // controller.hears(['hello', 'hi', 'hey'], ['direct_message'], function (bot, message) {
    //     bot.reply(message, 'Hey it\'s nice to talk to you directly.');
    // });
};