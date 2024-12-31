public with sharing class FeebackHandler {
    @AuraEnabled
    public static String createfeedback(Map<String, Object> feedbackObj) {
        try{
            System.debug('ffeedbackString: ' + feedbackObj);
            
            
            
            Feedback__c feedback = new Feedback__c(
                Name__c = (String) feedbackObj.get('Name__c'),
                Email__c = (String) feedbackObj.get('Email__c'),
                Rating__c = Integer.valueOf(feedbackObj.get('Rating__c')),
                Mesage__c = (String) feedbackObj.get('Mesage__c'),
                Send_Copy__c = (boolean) feedbackObj.get('Send__Copy__c')
            );
            
            
            insert feedback;
            
            if(feedback.Send_Copy__c){
                String Body = '<p>Hello</p>' + '<p>Thank you for filling feedback form.</p>' 
                    + '<p>Below are your submitted responses.</p>' + 
                    '<p>Name: ' + feedback.Name__c + '</p>' +
                    '<p>Email:  ' + feedback.Email__c + '</p>' +
                    '<p>Message: ' + feedback.Mesage__c + '</p>' +
                    '<p>Rating: ' + feedback.Rating__c + '</p>' + 
                    '<p>Thanks and Regards</p>' + '<p>Pallav Pushparaj</p>';
                
                Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
                email.setHtmlBody(Body);
                email.setToAddresses(new List<String> {feedback.Email__c});
                email.setSubject('Recorded Reponse');
                Messaging.SendEmail(new List<Messaging.SingleEmailMessage> {email});         
            }
            
            return 'Feedback Received';
        }
        
        
        catch(Exception e){
            throw new AuraHandledException('Error Occured ' + e.getMessage());
        }
    }
}