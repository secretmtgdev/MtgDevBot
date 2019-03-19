import { TurnContext } from 'botbuilder';
import { QnAMaker, LuisRecognizer } from 'botbuilder-ai';
import { Planeswalker } from './types';


export class MtgBot {
    private _qnaMaker: QnAMaker;
    private _luis: LuisRecognizer;

    constructor(qnaMaker: QnAMaker, luis: LuisRecognizer) {
        this._qnaMaker = qnaMaker;
        this._luis = luis;
    }

    async onTurn(context: TurnContext) {
        if (context.activity.type === 'message') {
            const qnaResults = await this._qnaMaker.generateAnswer(context.activity.text);
            if (qnaResults.length > 0) {
                await context.sendActivity(qnaResults[0].answer).catch(error => console.log(error));
            } else {
                // let luis solve this 
                console.log('Luis is now solving this issue');
                await this._luis.recognize(context).then(res => {
                    const top = LuisRecognizer.topIntent(res);
                    context.sendActivity(`Top intent: ${LuisRecognizer.topIntent(res)}`)
                    // let data: Planeswalker[] = [];
                    // switch(top) {
                    //     case "Commander":
                    //         context.sendActivity('Commander data not present');
                    //         break;
                    //     case "Location":
                    //         context.sendActivity('Location data not present');
                    //         break;
                    //     case "Planeswalker":
                    //         context.sendActivity('Planeswalker data not present');
                    //         break;
                    //     case "Time":
                    //         context.sendActivity('Time data not present');
                    //         break;
                    //     default:
                    //         context.sendActivity('Could not find an answer to your question');
                    // }
                });
            }
        } else {
            await context.sendActivity(`${context.activity.type} event detected`);
        }
    }
}