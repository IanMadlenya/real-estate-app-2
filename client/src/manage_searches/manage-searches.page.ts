/**
 * Created by hartex
 */

import {Component} from '@angular/core';
import {AppHeaderComponent} from "../app-header/app-header.component";
import {AppFooterComponent} from "../app-footer/app-footer.component";

@Component({
    selector: 'manage-searches',
    templateUrl: 'manage_searches/manage-searches.tmpl.html',
    directives: [AppHeaderComponent, AppFooterComponent]
})
export class ManageSearchesPage {

    constructor() {
    }

}