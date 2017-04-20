/**
 * Created by hartex
 */

import {Component} from '@angular/core';
import {AppHeaderComponent} from "../app-header/app-header.component";
import {AppFooterComponent} from "../app-footer/app-footer.component";

@Component({
    selector: 'settings',
    templateUrl: 'settings/settings.tmpl.html',
    directives: [AppHeaderComponent, AppFooterComponent]
})
export class SettingsPage {
    constructor() {
    }
}