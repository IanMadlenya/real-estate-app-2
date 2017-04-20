/**
 * Created by hartex
 */

import {Component, Input} from '@angular/core';
import {PropertyCartService} from "../../PropertyCartService";
import {Property} from "../../Property";


@Component({
    selector: 'property-attribute',
    templateUrl: 'find_an_owner/property_details_modal/property_attribute/property-attribute.tmpl.html'
})
export class PropertyAttributeComponent {
    @Input() attributeTitle;
    @Input() attributeRealTitle;
    @Input() attributeValue;
    @Input() propIndex;
    public properties:Property[];
    isEditing:boolean = false;

    constructor(private propertyService:PropertyCartService) {
        this.properties = propertyService.list();
    }

    public editPropAttribute(elemToFocus):void {
        this.isEditing = true;
        //todo set focus correctly
        setTimeout(function(){
            elemToFocus.focus()
        }, 1000);
    }

    public saveAttribute(newValue:string) {
        var prop:Property = this.properties[this.propIndex];
        prop[this.attributeRealTitle] = newValue;
        this.isEditing = false;
    }

    public cancelEditing(){
        this.isEditing = false;
    }
}