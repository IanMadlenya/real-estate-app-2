/**
 * Created by hartex
 */

import {Component} from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: 'app-footer/app-footer.tmpl.html'
})
export class AppFooterComponent {
    constructor() {
    }

    getCurrentYear(): number{
        var curDate = new Date();
        return curDate.getFullYear();
    }
}