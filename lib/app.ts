import { BotFrameworkAdapter } from 'botbuilder';
import * as restify from 'restify';
import { MtgBot } from './bot';
import { QnAMaker } from 'botbuilder-ai';
import { IQnAService, BotConfiguration } from 'botframework-config';

const botConfig = BotConfiguration.loadSync('./Echo_Bot.bot', process.env.BOT_FILE_SECRET);

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

const qnaMaker = new QnAMaker({
    knowledgeBaseId: (<IQnAService>botConfig.findServiceByNameOrId('Magic-the-gathering-kb')).kbId,
    endpointKey: (<IQnAService>botConfig.findServiceByNameOrId('Magic-the-gathering-kb')).endpointKey,
    host: (<IQnAService>botConfig.findServiceByNameOrId('Magic-the-gathering-kb')).hostname
});

const echo: MtgBot = new MtgBot(qnaMaker);

// set up the url to listen on 
server.post('/api/messages', (req, res) => {

    // This is an Test bot 
    adapter.processActivity(req, res, async (context) => {
        await echo.onTurn(context);
    });
});