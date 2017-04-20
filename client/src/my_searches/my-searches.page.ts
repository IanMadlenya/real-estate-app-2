/**
 * Created by hartex
 */

import {Component, OnInit} from '@angular/core';
import {AppHeaderComponent} from "../app-header/app-header.component";
import {AppFooterComponent} from "../app-footer/app-footer.component";
import {SubmittedSearchesService} from "./SubmittedSearchesService";
import {SubmittedRequest} from "./SubmittedRequest";
import {RequestRowComponent} from "./request_row/request-row.component";

@Component({
    selector: 'user-searches',
    templateUrl: 'my_searches/my-searches.tmpl.html',
    directives: [AppHeaderComponent, AppFooterComponent, RequestRowComponent]
})
export class UserSearchesPage implements OnInit {

    requests: SubmittedRequest[];

    constructor(private requestService: SubmittedSearchesService) {
    }

    ngOnInit(): void {
        this.requestService
            .getRequests()
            .subscribe(
                requests => this.getRequestsSuccess(requests),
                error => this.getRequestsError(<any>error)
            );
    }

    private getRequestsSuccess(requests: SubmittedRequest[]) {
        this.requests = requests;
        console.log(requests);
    }

    private getRequestsError(error) {
        console.error(error);
    }
}