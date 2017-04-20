/**
 * Created by hartex
 */

import {Component, Input} from '@angular/core';
import {SubmittedRequest} from "../SubmittedRequest";
import {PropertyRowComponent} from "../property_row/property-row.component";

@Component({
    selector: 'request-row',
    templateUrl: 'my_searches/request_row/request-row.tmpl.html',
    directives: [PropertyRowComponent]
})
export class RequestRowComponent {
    @Input() request:SubmittedRequest;
    showPropertyRows:boolean = false;

    constructor() {
    }

    togglePropertyRows():void {
        this.showPropertyRows ? this.showPropertyRows = false : this.showPropertyRows = true;
    }

    getStatusSymbol() {
        switch (this.request.status) {
            case 'Done':
                return ['fa', 'fa-check'];
            case 'Pending':
                return ['fa', 'fa-clock-o'];
            case 'In Progress':
                return ['fa', 'fa-cogs'];
            default:
                break;
        }
    }

    getStatusClass(){
        switch (this.request.status) {
            case 'Done':
                return 'rea-my_searches-status-done';
            case 'Pending':
                return 'rea-my_searches-status-pending';
            case 'In Progress':
                return 'rea-my_searches-status-in_progress';
            default:
                break;
        }
    }
}