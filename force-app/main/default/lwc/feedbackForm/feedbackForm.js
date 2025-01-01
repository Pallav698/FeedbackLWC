import { LightningElement, track, wire } from 'lwc';
import getTrainigrecords from '@salesforce/apex/TrainingHandler.getTrainigrecords';
import createfeedback from '@salesforce/apex/FeebackHandler.createfeedback';
import { NavigationMixin } from 'lightning/navigation';
import ToastContainer from 'lightning/toastContainer';


export default class FeedbackForm extends NavigationMixin(LightningElement) {
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

    connectedCallback() {
        const toastContainer = ToastContainer.instance();
        toastContainer.maxShown = 5;
        toastContainer.toastPosition = 'top-right';
    }

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

            //this.handleCourseOptions5();
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
            //this.handleCourseOptions5(val);
            
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
        const allInputs = this.template.querySelectorAll('lightning-input, lightning-textarea');
        let allValid = true;

        allInputs.forEach(input => {
            if(!input.reportValidity()){
                allValid = false;
                console.log('Input: ', input);
            }
        });

        if(allValid){
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
            this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                attributes: {
                    url: '/thankyou'
                }
            });
            
        })
        .catch(error => {
            
        })
    }
    else{
        
    }
}
    
}