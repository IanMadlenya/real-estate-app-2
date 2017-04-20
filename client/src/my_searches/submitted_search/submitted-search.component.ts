/**
 * Created by hartex
 */

import {Component, Input} from '@angular/core';
import {SubmittedRequest} from "../SubmittedRequest";

@Component({
    selector: 'submitted-search',
    templateUrl: 'my_searches/submitted_search/submitted-search.tmpl.html'
})
export class SubmittedSearchComponent {

    @Input() request: SubmittedRequest;
    showDetailedInfo: boolean = false;

    constructor() {
    }

    toggleDetailedInfo(): void {

    }

    togglePropertyRows(): void {
        this.showDetailedInfo = !this.showDetailedInfo;
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

    getStatusClass() {
        switch (this.request.status) {
            case 'Done':
                return 'rea-submitted_search-status-done';
            case 'Pending':
                return 'rea-submitted_search-status-pending';
            case 'In Progress':
                return 'rea-submitted_search-status-in_progress';
            default:
                break;
        }
    }
}