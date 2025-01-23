import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService'; // Corrected typo
import MESSAGE_CHANNEL from '@salesforce/messageChannel/lightningMessageChannel__c';

export default class HomepageComponent extends LightningElement {
    @wire(MessageContext) // Corrected typo
    messageContext;

    sendMessage() {
        console.log('messageContext',this.messageContext);
        const message = {
            message: 'Hello from home page!' // Fixed minor spacing
        };

        publish(this.messageContext, MESSAGE_CHANNEL, message);
        console.log('Message published:', message);
    }
}
