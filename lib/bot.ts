import { TurnContext } from 'botbuilder';
import { QnAMaker } from 'botbuilder-ai';


export class MtgBot {
    private _qnaMaker: QnAMaker;

    constructor(qnaMaker: QnAMaker) {
        this._qnaMaker = qnaMaker;
    }

    async onTurn(context: TurnContext) {
        if (context.activity.type === 'message') {
            const qnaResults = await this._qnaMaker.generateAnswer(context.activity.text);
            if (qnaResults.length > 0) {
                await context.sendActivity(qnaResults[0].answer).catch(error => console.log(error));
            } else {
                await context.sendActivity('Could not find an answer to the question');
            }
        } else {
            await context.sendActivity(`${context.activity.type} event detected`);
        }
    }
}