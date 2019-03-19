import { BotFrameworkAdapter } from 'botbuilder';
import * as restify from 'restify';
import { MtgBot } from './bot';
import { QnAMaker, LuisRecognizer } from 'botbuilder-ai';
import { IQnAService, BotConfiguration, ILuisService } from 'botframework-config';

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

const luis = new LuisRecognizer({
    applicationId:'23693392-f7ab-43d2-999b-cfbb5ff0a362',
    endpointKey:'47d1f0fb19a94dfbb66b0b5dd6a3aa15',
    endpoint:'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/23693392-f7ab-43d2-999b-cfbb5ff0a362?verbose=true&timezoneOffset=-360&subscription-key=47d1f0fb19a94dfbb66b0b5dd6a3aa15&q='
});

const echo: MtgBot = new MtgBot(qnaMaker, luis);

// set up the url to listen on 
server.post('/api/messages', (req, res) => {

    // This is an Test bot 
    adapter.processActivity(req, res, async (context) => {
        await echo.onTurn(context);
    });
});