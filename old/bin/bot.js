#!/usr/bin/env node

'use strict';

var RobotLuke = require('../lib/RobotLuke');

///**
// * Environment variables used to configure the bot
// */
var token = process.env.BOT_API_KEY || require('../secrets.js').token;

var luke = new RobotLuke({
    token: token,
    name: 'robot_luke'
});