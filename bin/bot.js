#!/usr/bin/env node

'use strict';

var LukeBot = require('../lib/robotluke');

///**
// * Environment variables used to configure the bot
// */
var token = process.env.BOT_API_KEY || require('../secrets.js').token;

var luke = new LukeBot({
    token: token,
    name: 'robot_luke'
});

luke.run();