/**
 * Created by ld on 12/1/15.
 */

var Handler = require('../Handler')

module.exports = class extends Handler {
    onMessage(message, reply) {
        if (message.contains('friend') || message.contains('friends')) {
            reply('you\'re my friend too');
        } else if (message.contains('childhood')) {
            reply(['I was born in Tapachula Chiapas Mexico in 1983. My birthday is in February 14 in San Valentine’s Day. When I was 6 years old I started the Primary School in IPCA. I studied there 6 years, and it was a really great time for me. I had my best friends there, because we were together 6 years, and we were like a family.',

                'In the end of my school day, when I was home all afternoons I used to do my homework and after I used to play with my dolls. Sometimes I used to go to my friend’s house to play, and sometimes they came to my house.',

                'When I was 8 years old I had baptism, and this day my father gave me my first dog, and her name is Jitana, and I love my dog. At the same age I started to have ballet classes, because I always like dance, and these classes were a good time for me.',

                'I think that I had a really nice childhood. I didn’t have any kind of problems, and I enjoyed all my childhood. I very really nice memories about my childhood.'].join('\n\n'));

        }
    }
}