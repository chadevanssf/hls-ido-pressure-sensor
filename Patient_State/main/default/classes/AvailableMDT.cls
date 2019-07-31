global class AvailableMDT extends VisualEditor.DynamicPickList {
    
    global override VisualEditor.DataRow getDefaultValue(){
        VisualEditor.DataRow defaultValue = new VisualEditor.DataRow('<Please Select>', '<Please Select>');
        return defaultValue;
    }
    
    global override VisualEditor.DynamicPickListRows getValues() {
        Image_List__mdt[] items = [SELECT MasterLabel, DeveloperName FROM Image_List__mdt];
        
        VisualEditor.DynamicPickListRows values = new VisualEditor.DynamicPickListRows();
        
        values.addRow(getDefaultValue());
        
        for (Image_List__mdt item : items) {
            values.addRow(new VisualEditor.DataRow(item.MasterLabel, item.DeveloperName));
        }
        
        return values;
    }
    
}