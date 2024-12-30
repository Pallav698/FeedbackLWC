import { LightningElement, track, wire } from 'lwc';
import getTrainigrecords from '@salesforce/apex/TrainingHandler.getTrainigrecords';

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

    handleRatingChange(event) {
        const id = event.target.dataset.id;
        console.log('Rating: ' + id);
        
        if(id){
            this.ratingArray = this.ratingArray.map(item => {
                if(item.id <= id){
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
        this.courseName = event.target.textContent;
        this.displayCourseOptions = false;
        console.log('Course Name: ' + this.courseName);
    }
}