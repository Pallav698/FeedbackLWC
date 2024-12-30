public with sharing class TrainingHandler {
    @AuraEnabled(cacheable=true)
    public static List<Training__c>  getTrainigrecords(){
        try {
            return [
                SELECT Id, Name FROM Training__c
            ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}