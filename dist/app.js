"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const botbuilder_1 = require("botbuilder");
const restify = require("restify");
const bot_1 = require("./bot");
const botbuilder_ai_1 = require("botbuilder-ai");
const botframework_config_1 = require("botframework-config");
const botConfig = botframework_config_1.BotConfiguration.loadSync('./Echo_Bot.bot', process.env.BOT_FILE_SECRET);
let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log(`${server.name} listening on ${server.url}`);
});
const adapter = new botbuilder_1.BotFrameworkAdapter({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
const qnaMaker = new botbuilder_ai_1.QnAMaker({
    knowledgeBaseId: botConfig.findServiceByNameOrId('Magic-the-gathering-kb').kbId,
    endpointKey: botConfig.findServiceByNameOrId('Magic-the-gathering-kb').endpointKey,
    host: botConfig.findServiceByNameOrId('Magic-the-gathering-kb').hostname
});
const luis = new botbuilder_ai_1.LuisRecognizer({
    applicationId: '23693392-f7ab-43d2-999b-cfbb5ff0a362',
    endpointKey: '47d1f0fb19a94dfbb66b0b5dd6a3aa15',
    endpoint: 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/23693392-f7ab-43d2-999b-cfbb5ff0a362?verbose=true&timezoneOffset=-360&subscription-key=47d1f0fb19a94dfbb66b0b5dd6a3aa15&q='
});
const echo = new bot_1.MtgBot(qnaMaker, luis);
server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, (context) => __awaiter(this, void 0, void 0, function* () {
        yield echo.onTurn(context);
    }));
});
//# sourceMappingURL=app.js.map