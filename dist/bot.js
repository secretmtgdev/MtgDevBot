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
const botbuilder_ai_1 = require("botbuilder-ai");
class MtgBot {
    constructor(qnaMaker, luis) {
        this._qnaMaker = qnaMaker;
        this._luis = luis;
    }
    onTurn(context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (context.activity.type === 'message') {
                const qnaResults = yield this._qnaMaker.generateAnswer(context.activity.text);
                if (qnaResults.length > 0) {
                    yield context.sendActivity(qnaResults[0].answer).catch(error => console.log(error));
                }
                else {
                    console.log('Luis is now solving this issue');
                    yield this._luis.recognize(context).then(res => context.sendActivity(`Top intent: ${botbuilder_ai_1.LuisRecognizer.topIntent(res)}`));
                }
            }
            else {
                yield context.sendActivity(`${context.activity.type} event detected`);
            }
        });
    }
}
exports.MtgBot = MtgBot;
//# sourceMappingURL=bot.js.map