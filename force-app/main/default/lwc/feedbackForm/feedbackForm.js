import { LightningElement, track, wire } from 'lwc';
import getTrainigrecords from '@salesforce/apex/TrainingHandler.getTrainigrecords';
import createfeedback from '@salesforce/apex/FeebackHandler.createfeedback';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class FeedbackForm extends LightningElement {
    ratingArray = [
        { id: 1, iconName: 'utility:favorite' },
        { id: 2, iconName: 'utility:favorite_alt' },
        { id: 3, iconName: 'utility:favorite_alt' },
        { id: 4, iconName: 'utility:favorite_alt' },
        { id: 5, iconName: 'utility:favorite_alt' }
    ];

    courseOptions = [];
    displayCourseOptions = false;
    @track courseOptions5 = [];
    courseName = '';
    sendCopyIconName = 'utility:toggle_off';
    ratingId;
    courseId = '';
    Name = '';
    Email = '';
    Message = '';

    handleNameChanhge(event){
        this.Name = event.target.value;
    }

    handleEmailChange(event){
        this.Email = event.target.value;
    }

    handleMessageChange(event){
        this.Message = event.target.value;
    }

    handleRatingChange(event) {
        this.ratingId = event.target.dataset.id;
        console.log('Rating: ' + this.ratingId);
        
        if(this.ratingId){
            this.ratingArray = this.ratingArray.map(item => {
                if(item.id <= this.ratingId){
                    return {
                        id: item.id,
                        iconName: 'utility:favorite'
                    }
                }
                else{
                    return {
                        id: item.id,
                        iconName: 'utility:favorite_alt'
                    }
                }
            })
        }
    }

    @wire(getTrainigrecords)
    wiredTrainigRecords({ error, data }) {
        if(data){
            this.courseOptions = data.map(item => {
                return {
                    label: item.Name,
                    value: item.Name
                }
            })

            this.handleCourseOptions5();
        }
    }

    handleCourseOptions5(val){
        if(val === undefined){
            this.courseOptions5 = this.courseOptions.slice(0, 5);
        }
        else{
            this.courseOptions5 = this.courseOptions.filter(item => {
                return item.label.toLowerCase().includes(val.toLowerCase());
            })

            if(this.courseOptions5.length > 5){
                this.courseOptions5 = this.courseOptions5.slice(0, 5);
            }
        }
    }

    handleCourseChange(event){
        const val = event.target.value;
        console.log('Course: ' + val);
        if(val !== ''){
            this.displayCourseOptions = true;
            this.handleCourseOptions5(val);
            
        }
        else{
            this.displayCourseOptions = false; 
        }
        
    }

    handleComboFocus(){
        this.displayCourseOptions = true;
        this.handleCourseOptions5();
        this.courseName = this.courseName === '' ? this.courseOptions[0].label : this.courseName;
    }

    handleCourseClick(event){
        this.courseId = event.target.dataset.id
        this.courseName = event.target.textContent;
        this.displayCourseOptions = false;
        console.log('Course Name: ' + this.courseName);
    }

    handleSendCopyChange(){
        this.sendCopyIconName = this.sendCopyIconName === 'utility:toggle_off' ? 'utility:toggle_on' : 'utility:toggle_off';
    }

    handleSubmit(){
        const feedbackObj = {
            Name__c: this.Name,
            Email__c: this.Email,
            Rating__c: this.ratingId,
            Training__c: this.courseId,
            Mesage__c: this.Message,
            Send__Copy__c: this.sendCopyIconName === 'utility:toggle_on' ? true : false
        }

        console.log('Feedback Object: ', JSON.stringify(feedbackObj));

        createfeedback({ feedbackObj: feedbackObj })
        .then(result => {
            this.ShowToastEvent('Success', 'Feedback Received Successfully', 'success');
            
        })
        .catch(error => {
            this.ShowToastEvent('Error', 'Error Occured While Sending Feedback', 'error');
        })
    }

    ShowToastEvent(title, message, variant){
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }
}