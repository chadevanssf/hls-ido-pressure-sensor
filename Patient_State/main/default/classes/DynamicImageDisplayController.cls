public class DynamicImageDisplayController {

    @AuraEnabled
    public static String getConfig(String configName)
    {
        List<Image_List__mdt> recs = [SELECT Id, DeveloperName, Image_Config__c
                                      FROM Image_List__mdt
                                     WHERE DeveloperName = :configName];
        
        String retVal = '';
        for (Image_List__mdt rec : recs)
        {
            retVal = rec.Image_Config__c;
        }
        return retVal;
    }
}