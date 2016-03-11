/**
 * Created by ld on 2/10/16.
 */

 var request = require('request');
 var cheerio = require('cheerio');

 module.exports = function (controller) {

     controller.hears('cloud service name', ['direct_message', 'direct_mention'], function (bot, message) {

         var url = 'https://en.wikipedia.org/wiki/List_of_Germanic_deities';

         request(url, (error, response, html) => {
             if (!error) {
                 var $ = cheerio.load(html);
                 var choices = [];
                 $('table.wikitable tr:not(:first-child)').each(function (_, row) {
                     var name = cheerio(row).find('td:first-child').text();
                     var meaning = cheerio(row).find('td:nth-child(2)').text().replace(/ *\[[^)]*\] */g, "");
                     choices.push({
                         name: name,
                         meaning: meaning
                     });
                 });
                 var choice = chooseRandom(choices);
                 var text = `Name: ${choice.name}\nMeaning: ${choice.meaning}`;
                 var attachments = [{
                     fallback: text,
                     pretext: 'Okay, here is one:',
                     text: text
                 }];

                 bot.reply(message, {
                     attachments: attachments
                 })
             }
         });
     })
 };

 function chooseRandom(arr) {
     return arr[Math.floor(Math.random() * arr.length)];
 }
