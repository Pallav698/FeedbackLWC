import { LightningElement, wire } from 'lwc';
import getOpportunity from '@salesforce/apex/OpportunityHandler.getOpportunity';
import { updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
const columns = [
    { label: 'Opportunity Name', fieldName: 'oppName', editable: true },
    { label: 'Stage Name', fieldName: 'stageName', editable: true },
    { label: 'Amount', fieldName: 'amount', type: 'currency', editable: true },
    { label: 'Close Date', fieldName: 'closeDate', type: 'date', editable: true },
    { label: 'Account Name', fieldName: 'accName', editable: false }
];

export default class EditableDatatable extends LightningElement {
    columns = columns;
    oppList = [];
    draftValues = [];

    @wire(getOpportunity)
    wiredOpportunity({ error, data }) {
        if (data) {
            this.oppList = data;
            console.log('this.oppList: ', this.oppList);
            
        } else if (error) {
            console.error(error);
        }
    }

    handleSave(event){
        this.draftValues = event.detail.draftValues;
        const recordInputs = this.draftValues.map(draft => {
            console.log('draft: ', draft);
            return {
                fields: {
                    Id: draft.Id,
                    Name: draft.oppName,
                    StageName: draft.stageName,
                    Amount: draft.amount,
                    CloseDate: draft.closeDate
                }
            };
        });
        const promises = recordInputs.map(recordInput => updateRecord(recordInput));
        Promise.all(promises).then(() => {
            this.draftValues = [];
            return refreshApex(wiredOpportunity);
        }).catch(error => {
            console.error(error.body.message);
        });
        console.log('recordInputs: ', recordInputs);
        console.log('this.draftValues: ', this.draftValues);
    }
}