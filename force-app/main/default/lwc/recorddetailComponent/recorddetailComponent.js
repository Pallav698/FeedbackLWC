import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext, APPLICATION_SCOPE } from 'lightning/messageService';
import MESSAGE_CHANNEL from '@salesforce/messageChannel/lightningMessageChannel__c';

export default class RecorddetailComponent extends LightningElement {
    @wire(MessageContext)
    messageContext;

    receivedMessage = '';

    connectedCallback(){
        this.receiveMessage();
    }

    receiveMessage(){
        subscribe(this.messageContext, MESSAGE_CHANNEL, (message) => {
            this.handleMessage(message);
        }, { scope: APPLICATION_SCOPE })
    }

    handleMessage(message){
        console.log('handle message called');
        this.receivedMessage = message.message;
    }

}