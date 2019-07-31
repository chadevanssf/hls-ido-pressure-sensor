({
    doInit: function(component) {//, event, helper) {
        var origCnsl = component.get("v.consoleStuff");
        origCnsl = "Config Started.";
        component.set("v.consoleStuff", origCnsl);
        var action = component.get("c.getSessionId");
        action.setCallback(this, function(response) {
            // Configure CometD
            var sessionId = response.getReturnValue();
            var cometd = new window.org.cometd.CometD();
            cometd.configure({
                url: window.location.protocol + '//' + window.location.hostname + '/cometd/40.0/',
                requestHeaders: { Authorization: 'OAuth ' + sessionId},
                appendMessageTypeToURL : false
            });
            cometd.websocketEnabled = false;

            origCnsl = component.get("v.consoleStuff");
            origCnsl += "\nConfig done.";
            component.set("v.consoleStuff", origCnsl);
            var messageEvent = component.getEvent("onStart");
            messageEvent.fire();

            // Connect to
            cometd.handshake($A.getCallback(function(status) {
                if (status.successful) {
                    var eventName = component.get("v.channel");
                    cometd.subscribe(eventName, $A.getCallback(function(message) {

                        var cnsl = component.get("v.consoleStuff");
                        cnsl += "\nHeard another message";
                        component.set("v.consoleStuff", cnsl);

                        var messageEvent = component.getEvent("onMessage");
                        messageEvent.setParam("payload", message.data.payload);
                        messageEvent.fire();
                    }));
                } else {
                    // TODO: Handle errors
                    //console.log(status);
                }
            }));

        });
        $A.enqueueAction(action);
    }
})