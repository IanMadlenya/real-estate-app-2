/**
 * Created by hartex
 */

import {Component, Input} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {UserService} from "../user_management/UserService";

@Component({
    selector: 'app-header',
    templateUrl: 'app-header/app-header.tmpl.html',
    directives: [ROUTER_DIRECTIVES]
})
export class AppHeaderComponent {

    @Input() page: string;

    constructor(private userService: UserService, private router: Router) {
    }

    public signOut() {
        this.userService
            .signOut()
            .subscribe(data => this.signOutSuccess(data), error => this.signOutError(<any>error));
    }

    private signOutSuccess(data): void {
        this.router.navigateByUrl('/');
    }

    private signOutError(error) {
        console.log(error);
    }
}