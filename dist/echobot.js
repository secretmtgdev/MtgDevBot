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
const { ActivityTypes } = require('botbuilder');
const TURN_COUNTER_PROPERTY = 'turnCounterProperty';
class EchoBot {
    constructor(conversationState) {
        this.countProperty = conversationState.createProperty(TURN_COUNTER_PROPERTY);
        this.conversationState = conversationState;
    }
    onTurn(turnContext) {
        return __awaiter(this, void 0, void 0, function* () {
            if (turnContext.activity.type === ActivityTypes.Message) {
                let count = yield this.countProperty.get(turnContext);
                count = count === undefined ? 1 : ++count;
                yield turnContext.sendActivity(`${count}: You said "${turnContext.activity.text}"`);
                yield this.countProperty.set(turnContext, count);
            }
            else {
                yield turnContext.sendActivity(`[${turnContext.activity.type} event detected]`);
            }
            yield this.conversationState.saveChanges(turnContext);
        });
    }
}
exports.EchoBot = EchoBot;
exports.EchoBot = EchoBot;
//# sourceMappingURL=echobot.js.map