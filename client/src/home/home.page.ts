/**
 * Created by hartex
 */

import {Component} from '@angular/core';
import {AppHeaderComponent} from "../app-header/app-header.component";
import {AppFooterComponent} from "../app-footer/app-footer.component";

@Component({
    selector: 'home',
    directives: [AppHeaderComponent, AppFooterComponent],
    templateUrl: 'home/home.tmpl.html'
})
export class HomePage {
    constructor() {

    }
}