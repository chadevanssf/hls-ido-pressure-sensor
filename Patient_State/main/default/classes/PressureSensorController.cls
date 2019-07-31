public class PressureSensorController
{
    @AuraEnabled(cacheable=false)
    public static Patient_State__c getPatientState(String accountId)
    {
        List<Patient_State__c> states = [SELECT Id,Name,Account__c,Current_State__c,Display_Status__c,Orientation__c,
                                         PatientId__c,Time_in_Position__c
                                         FROM Patient_State__c
                                         WHERE Account__c= :accountId
                                         ORDER BY LastModifiedDate DESC
                                         LIMIT 1];
        
        Patient_State__c ps;
        if (states.isEmpty()) {
            //create a place holder to leverage
            ps = new Patient_State__c();
            ps.Account__c = accountId;
            insert ps;
        } else {
            ps = states[0];
        }
        return ps;
    }
    
    @AuraEnabled(cacheable=false)
    public static String getCardTitle()
    {
        String result = 'Pressure Sensor State';
        List<HealthCloudGA__CardView_Dropdown__c> vals = HealthCloudGA__CardView_Dropdown__c.getAll().values();
        for (HealthCloudGA__CardView_Dropdown__c val : vals)
        {
            if (val.HealthCloudGA__Sub_Category__c == 'Pressure Sensor')
            {
            	result = val.Name;
            }
        }
        return result;
    }
}