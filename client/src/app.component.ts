/**
 * Created by hartex
 */

import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {Component, OnInit} from '@angular/core';
import {Router, RouterModule, ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    selector: 'real-estate-app',
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS
    ]
})
export class AppComponent implements OnInit {

    constructor(private router:Router) {}

    ngOnInit() {
        // this.router.navigate(['/']);
    }
}