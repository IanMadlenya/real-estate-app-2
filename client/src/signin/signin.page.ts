/**
 * Created by hartex
 */

import {Component} from '@angular/core';
import {Validators, FormGroup, REACTIVE_FORM_DIRECTIVES, REACTIVE_FORM_PROVIDERS, FormControl} from "@angular/forms";
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {AppHeaderComponent} from "../app-header/app-header.component";
import {AppFooterComponent} from "../app-footer/app-footer.component";
import {UserService} from "../user_management/UserService";

@Component({
    selector: 'signin',
    templateUrl: 'signin/signin.tmpl.html',
    providers: [REACTIVE_FORM_PROVIDERS],
    directives: [
        REACTIVE_FORM_DIRECTIVES,
        ROUTER_DIRECTIVES,
        AppHeaderComponent,
        AppFooterComponent
    ]
})
export class SignInPage {

    signInForm: FormGroup;
    signInSucceed: boolean = false;
    errorMessage: String = '';
    signInErrored: boolean = false;

    constructor(private userService: UserService, private router: Router) {
        let username = new FormControl('', Validators.required);
        let password = new FormControl('', Validators.required);

        this.signInForm = new FormGroup({
            username: username,
            password: password
        });
    }

    doSignIn() {
        let formData = this.signInForm.value;
        this.userService.signIn({
            username: formData.username,
            password: formData.password
        }).subscribe(data => this.signInSuccess(data), error => this.signInError(<any>error));
    }

    private signInSuccess(data) {
        this.signInSucceed = true;
        this.userService.currentUserData = data;
        this.signInErrored = false;
        this.errorMessage = '';
        this.redirectToMain();
    }

    private signInError(error) {
        if (typeof error === 'string') {
            this.signInErrored = true;
            this.errorMessage = error;
        }
        console.error(error);
    }

    private redirectToMain() {
        let userService = this.userService;
        let router = this.router;
        setTimeout(function () {
            userService.isCurrentUserSignedIn = true;
            router.navigateByUrl('/');
        }, 1300)
    }

}