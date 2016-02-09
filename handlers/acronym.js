/**
 * Created by ld on 12/1/15.
 */

var request = require('request');
var cheerio = require('cheerio');

module.exports = function (controller) {

    controller.hears('acronym (.*)', ['direct_message', 'direct_mention'], function (bot, message) {

        var matches = message.text.match(/acronym (.*)/i);
        var acronym = matches[1];
        var url = 'http://acronyms.thefreedictionary.com/' + acronym;

        request(url, (error, response, html) => {
            if (!error) {
                var $ = cheerio.load(html);
                var acronyms = [];
                $('#AcrFinder').find('td:not(.acr)').slice(1).each(function (_, row) {
                    acronyms.push(cheerio(row).text());
                });
                bot.reply(message, acronyms.join('\n\n'));
            }
        });
    })
}