import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AccountForm extends LightningElement {
    handleClick(){
        const event = new ShowToastEvent({
            title: 'Success',
            message:'Account Created Successfully',
            variant: 'success'
        });
        this.dispatchEvent(event);
    }
}