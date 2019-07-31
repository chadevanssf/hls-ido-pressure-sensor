({
	doInit : function(component, event, helper) {
        var labelAction = component.get("c.getCardTitle");
        labelAction.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var title = response.getReturnValue();
                component.set("v.title", title);
            }  else if (state === "ERROR") {
                console.log("patientPressureSensor:doInit:labelAction:response");
                console.log(response.getError());
                $A.log(response.getError());
                $A.reportError("patientPressureSensor", response.getError());
            } //end if errors
        });
        $A.enqueueAction(labelAction);
        
        var action = component.get("c.getPatientState");
        console.log("patientPressureSensor:doInit recordId=" + component.get("v.recordId"));
        action.setParams({
            'accountId' : component.get("v.recordId")
        });
        action.setCallback(this,function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var pState = response.getReturnValue();
                component.set("v.patientState", pState);
                component.set("v.patientStateId", pState.Id);
                
                component.set("v.ready", true);
            }  else if (state === "ERROR") {
                console.log("patientPressureSensor:doInit:action:response");
                console.log(response.getError());
                $A.log(response.getError());
                $A.reportError("patientPressureSensor", response.getError());
            } //end if errors
        });
        $A.enqueueAction(action);
	},
    
    recordUpdated : function(component, event, helper) {
        // when the record is loaded for the first time, or updated in the interface
        var changeType = event.getParams().changeType;

        if (changeType === "ERROR") {
            /* handle error; do this first! */
        } else if (changeType === "LOADED" || changeType === "CHANGED") {
            var rec = component.get("v.simpleRecord");
            var fieldName = component.get("v.fieldName");
            component.set("v.currentStatus", rec[fieldName]);
        }
    },
    
    handleRefresh : function(component, event, helper) {
        var recData = component.find("record");
        recData.reloadRecord(true);
    }
})