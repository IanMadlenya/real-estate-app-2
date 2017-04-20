/**
 * Created by hartex
 */

import {Component} from '@angular/core';
import {PropertyCartService} from "../PropertyCartService";
import {Property} from "../Property";
import {PropertyAttributeComponent} from "./property_attribute/property-attribute.component";
import {PropertyDetailsModalService} from "./PropertyDetailsModalService";

declare var jQuery: any;

@Component({
    selector: 'property-details-modal',
    templateUrl: 'find_an_owner/property_details_modal/property-details-modal.tmpl.html',
    directives: [PropertyAttributeComponent]
})
export class PropertyDetailsModalComponent {

    public properties: Property[];

    private $jModal: any;
    private elementID: string = '#rea-property_modal';

    constructor(private propertyService: PropertyCartService, private propDetailsModal: PropertyDetailsModalService) {
        this.properties = propertyService.list();
        propDetailsModal.propertyModalOpened$.subscribe(event => this.initAndShow());
        propDetailsModal.propertyModalDestroy$.subscribe(event => this.destroy());
    }

    public initAndShow(): void {
        this.$jModal = jQuery(this.elementID);
        if (!this.propDetailsModal.isModalAlreadyInit) this.init();
        this.show();
    }

    public destroy(): void {
        if (this.$jModal) {
            this.hide();
            this.$jModal.data(this.elementID, null);
            this.$jModal.remove();
            this.$jModal = null;
        }
    }

    public removeProperty(propertyToRemove: Property): void {
        this.propertyService.remove(propertyToRemove);
    }


    private init(): void {
        this.$jModal.modal({show: false});
        this.propDetailsModal.isModalAlreadyInit = true;
    }

    private show(): void {
        this.$jModal.modal('show');
    }

    private hide(): void {
        this.$jModal.modal('hide');
    }

}