({
    addImageElement : function(component, id, className, imgLoc, archLoc, us) {
        var newSrc = "";
        if (archLoc && archLoc !== "") {
            newSrc = $A.get('$Resource.' + archLoc) + imgLoc;
        } else {
            newSrc = $A.get('$Resource.' + imgLoc);
        }
        $A.createComponent(
            "aura:HTML",
            { // options
                tag: "img",
                HTMLAttributes: {
                    "id": id,
                    "aura:id": id,
                    "class": className,
                    "src": newSrc
                }
            },
            function(newComp){
                var container = component.find("images");
                if (container.isValid()) {
                    
                    var body = container.get("v.body");
                    body.push(newComp);
                    container.set("v.body", body);
                    
                    var dynamicComponentsByAuraId = component.get("v.dynamicComponentsByAuraId");
                    dynamicComponentsByAuraId[id] = newComp;
                    component.set("v.dynamicComponentsByAuraId", dynamicComponentsByAuraId);
                    
                    us(component);
                }
            }
        );
    },
    
    updateStatus : function(component) {
        var currentStatus = component.get("v.currentStatus");
        if (currentStatus) {
            var status = JSON.parse(currentStatus);
            
            for (var s in status) {
                if (status.hasOwnProperty(s)) {
                    var compName = "layer_" + s;
                    // work around for W-2529066, can't find dynamically created component
                    //var img = component.find(compName);
                    var dynamicComponentsByAuraId = component.get("v.dynamicComponentsByAuraId");
                    if (dynamicComponentsByAuraId) {
                        var img = dynamicComponentsByAuraId[compName];
                        if (img) {
                            if (status[s] === "hide") {
                                $A.util.addClass(img, "hide");
                                $A.util.removeClass(img, "show");
                            } else {
                                $A.util.addClass(img, "show");
                                $A.util.removeClass(img, "hide");
                            }
                        }
                    }
                }
            }
        }
    }
})