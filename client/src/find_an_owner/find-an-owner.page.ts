/**
 * Created by hartex
 */

import {Component} from '@angular/core';
import {AppHeaderComponent} from "../app-header/app-header.component";
import {AppFooterComponent} from "../app-footer/app-footer.component";
import {AddNewPropertyComponent} from "./add_new_property/add-new-property.component";
import {PropertyCartComponent} from "./property_cart/property-cart.component";
import {PropertyDetailsModalComponent} from "./property_details_modal/property-details-modal.component";
import {PropertyCartService} from "./PropertyCartService";

@Component({
    selector: 'find-an-owner',
    directives: [
        AppHeaderComponent,
        AppFooterComponent,
        AddNewPropertyComponent,
        PropertyCartComponent,
        PropertyDetailsModalComponent
    ],
    templateUrl: 'find_an_owner/find-an-owner.tmpl.html'
})
export class FindAnOwnerPage {

    isCheckoutSucceeded: boolean = false;
    checkoutMessage: string;

    constructor(private propService: PropertyCartService) {
        propService.checkoutSucceeded$.subscribe(message => this.checkoutSucceeded(message));
    }

    checkoutSucceeded(message){
        this.isCheckoutSucceeded = true;
        this.checkoutMessage = message;
    }
}