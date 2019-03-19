import { BotFrameworkAdapter } from 'botbuilder';
import * as restify from 'restify';
import { EchoBot } from './bot';

// set up the server
let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log(`${server.name} listening on ${server.url}`);
});

// bot framework code
const adapter = new BotFrameworkAdapter({
    appId: process.env.MICROSOFT_APP_ID, 
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

const echo: EchoBot = new EchoBot();


// set up the url to listen on 
server.post('/api/messages', (req, res) => {

    // This is an Test bot 
    adapter.processActivity(req, res, async (context) => {
        await echo.onTurn(context);
    });
});