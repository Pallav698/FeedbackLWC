public with sharing class CalloutRecordController {
    @AuraEnabled(cacheable=true)
    public static List<Callout_Record__c> getCalloutRecord(){
        try {
            return[
                SELECT Id__c, Name__c, Phone__c, Type__c FROM Callout_Record__c
                WHERE CreatedDate = TODAY
            ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}