/**
 * Created by hartex
 */

import {Component} from '@angular/core';
import {Validators, FormGroup, REACTIVE_FORM_DIRECTIVES, REACTIVE_FORM_PROVIDERS, FormControl} from "@angular/forms";
import {PropertyCartService} from "../PropertyCartService";
import {Property} from "../Property";

@Component({
    selector: 'add-new-property',
    templateUrl: 'find_an_owner/add_new_property/add-new-property.tmpl.html',
    providers: [REACTIVE_FORM_PROVIDERS],
    directives: [REACTIVE_FORM_DIRECTIVES]
})
export class AddNewPropertyComponent {

    private properties: Property[];
    private addNewPropertyForm: FormGroup;

    constructor(private propertyService: PropertyCartService) {

        let streetAddress = new FormControl('', Validators.required);
        let city = new FormControl('', Validators.required);
        let state = new FormControl('', Validators.required);
        let zip = new FormControl('', Validators.required);

        this.addNewPropertyForm = new FormGroup({
            streetAddress: streetAddress,
            city: city,
            state: state,
            zip: zip,
        });

        this.properties = propertyService.list();
    }

    doAdd() {
        let formData = this.addNewPropertyForm.value;
        this.propertyService.add(new Property(formData.streetAddress, formData.city, formData.state, formData.zip));
    }

    doReset(event) {
        event.preventDefault();
        this.addNewPropertyForm.reset()
    }
}