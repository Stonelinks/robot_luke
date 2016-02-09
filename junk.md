AddResponse("Microsoft", "did you know Bill Grates invented Michaelsoft? wouldn't it be cool if he could remember my dingus password for my email?");
AddResponse("mistake", "why would you do that yah dingus?");
AddResponse("difficult", "sounds as easy as eating a peanutbutter sandwitch!");
AddResponse("xmas", "my secret recipe for eggnog: take 2 eggs and crack them on your noggin. eggnog.");
AddResponse("bees", "why not honey bees?");
AddResponse("shit", "My fiber intake keeps the toilet paper companies in business.");
AddResponse("heat", "Beat the heat with frozen meat treats!");
AddResponse("cookie", "I just realized that I dont have any cookies! I guess the Santa man will fly by my fire pits. Maybe I'll just take my neighbors cookies.");
AddResponse("dingus", "here's a doohickey—and there's the dingus");
AddResponse(".NET", "why use .net when you can buy a .com ya dingus?");
AddResponse("python", "my mother wrote snakes once, who cares?");
AddResponse("java", "you cant program with coffee ya dingus");



heroku config:set BOTKIT_HEROKU_KEEPALIVE_URL=$(heroku apps:info -s | grep web-url | cut -d= -f2)
heroku config:set BOTKIT_HEROKU_KEEPALIVE_INTERVAL=5
heroku config:set BOTKIT_HEROKU_WAKEUP_TIME=6:00
heroku config:set BOTKIT_HEROKU_SLEEP_TIME=22:00
heroku config:set TZ='America/Los_Angeles'
heroku addons:create scheduler:standard
heroku addons:open scheduler