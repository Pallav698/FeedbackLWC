import { LightningElement, wire } from 'lwc';
import getCalloutRecord from '@salesforce/apex/CalloutRecordController.getCalloutRecord';
const COLUMNS = [
    {label: 'Account Name', fieldName: 'Name__c'},
    {label: 'Phone', fieldName: 'Phone__c'},
    {label: 'Type', fieldName: 'Type__c'},
];

export default class DisplayAccountsOnMainOrg extends LightningElement {
    columns = COLUMNS;
    accounts = [];

    @wire(getCalloutRecord)
    wiredAccounts({error, data}){
        if(data){
            this.accounts = data;
            console.log('Data: ', data);
        } else if(error){
            console.error('Error in fetching data: ', error);
        }
    }
}