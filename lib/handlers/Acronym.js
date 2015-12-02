/**
 * Created by ld on 12/1/15.
 */

var request = require('request');
var cheerio = require('cheerio');

var Handler = require('../Handler')
var util = require('../util')

module.exports = class extends Handler {
    onMessage(message, reply) {
        if (message.contains('acronym')) {
            var acronym = message.text.split('acronym').pop().split('for').pop().trim();

            var url = 'http://acronyms.thefreedictionary.com/' + acronym;

            request(url, (error, response, html) => {
                if (!error) {
                    var $ = cheerio.load(html);
                    var acronyms = [];
                    $('#AcrFinder').find('td:not(.acr)').slice(1).each(function (_, row) {
                        acronyms.push(cheerio(row).text());
                    });
                    reply(util.chooseRandom(acronyms));
                }
            });

        }
    }
}