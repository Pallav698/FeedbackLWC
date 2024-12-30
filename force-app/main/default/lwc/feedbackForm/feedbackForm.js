import { LightningElement } from 'lwc';

export default class FeedbackForm extends LightningElement {
    ratingArray = [
        { id: 1, iconName: 'utility:favorite' },
        { id: 2, iconName: 'utility:favorite_alt' },
        { id: 3, iconName: 'utility:favorite_alt' },
        { id: 4, iconName: 'utility:favorite_alt' },
        { id: 5, iconName: 'utility:favorite_alt' }
    ];

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
}