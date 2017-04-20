/**
 * Created by hartex
 */

import {Component, OnDestroy} from '@angular/core';
import {Property} from "../Property";
import {PropertyCartService} from "../PropertyCartService";
import {PropertyDetailsModalService} from "../property_details_modal/PropertyDetailsModalService";

@Component({
    selector: 'property-cart',
    templateUrl: 'find_an_owner/property_cart/property-cart.tmpl.html'
})
export class PropertyCartComponent implements OnDestroy {

    private properties: Property[];
    private totalCost: number = 0;

    constructor(private propertyService: PropertyCartService, private propDetailsModal: PropertyDetailsModalService) {
        this.properties = propertyService.list();
        this.totalCost = propertyService.getTotalCost();
        propertyService.propertyAdded$.subscribe(property => this.onPropertyAdded(property));
        propertyService.propertyRemoved$.subscribe(property => this.onPropertyRemoved(property));
    }

    private onPropertyAdded(item: Property): void {
        this.getTotalCost();
    }

    private onPropertyRemoved(item: Property): void {
        this.getTotalCost();
    }

    public checkout() {
        this.propertyService
            .doCheckout()
            .subscribe(
                succeed => this.checkoutSuccess(succeed),
                error => this.checkoutError(<any>error)
            );
    }

    private checkoutSuccess(succeed) {
        this.propertyService.clearCart();
        this.getTotalCost();
        if (succeed.status === 'ok') this.propertyService.checkoutSucceeded$.emit(succeed.message);
    }

    private checkoutError(error) {
        this.propertyService.checkoutError$.emit(error);
        console.error('Checkout error', error);
    }

    private getTotalCost() {
        this.totalCost = this.propertyService.getTotalCost();
    }

    public initAndShowModal(event) {
        if (event) event.preventDefault();
        this.propDetailsModal.propertyModalOpened$.emit(event);
    }

    public ngOnDestroy(): void {
        this.propDetailsModal.propertyModalDestroy$.emit();
    }
}