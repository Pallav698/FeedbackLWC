public with sharing class OpportunityHandler {
    @AuraEnabled(cacheable=true)
    public static List<opportunityWrapper> getOpportunity() {
        try {
            List<opportunityWrapper> oppWrapperList = new List<opportunityWrapper>();
            List<Opportunity> oppLst = [
                SELECT Id, Name, Account.Name, StageName, CloseDate, Amount
                FROM Opportunity
                ORDER BY CreatedDate LIMIT 10
            ];
            for (Opportunity opp : oppLst) {
                opportunityWrapper oppWrapper = new opportunityWrapper();
                oppWrapper.oppName = opp.Name;
                oppWrapper.accName = opp.Account != null ? opp.Account.Name : null;
                oppWrapper.stageName = opp.StageName;
                oppWrapper.closeDate = opp.CloseDate;
                oppWrapper.amount = opp.Amount;
                oppWrapper.Id = opp.Id;
                oppWrapperList.add(oppWrapper);
            }
            return oppWrapperList;
        } catch (Exception e) {
            throw new AuraHandledException('Error fetching Opportunities: ' + e.getMessage());
        }
    }


    public class opportunityWrapper {
        @AuraEnabled
        public String oppName { get; set; }
        @AuraEnabled
        public String accName { get; set; }
        @AuraEnabled
        public String stageName { get; set; }
        @AuraEnabled
        public Date closeDate { get; set; }
        @AuraEnabled
        public Decimal amount { get; set; }
        @AuraEnabled
        public Id Id { get; set; }
    }
}
