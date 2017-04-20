/**
 * Created by hartex
 */

import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {AppHeaderComponent} from "../app-header/app-header.component";
import {AppFooterComponent} from "../app-footer/app-footer.component";
import {UserService} from "../user_management/UserService";
import {User} from "../user_management/User";
import {
    Validators, FormGroup, REACTIVE_FORM_DIRECTIVES, REACTIVE_FORM_PROVIDERS, FormControl
} from "@angular/forms";

@Component({
    selector: 'register',
    templateUrl: 'register/register.tmpl.html',
    providers: [REACTIVE_FORM_PROVIDERS],
    directives: [
        REACTIVE_FORM_DIRECTIVES,
        ROUTER_DIRECTIVES,
        AppHeaderComponent,
        AppFooterComponent
    ]
})
export class RegisterPage {

    registerForm: FormGroup;
    regSucceed = false;

    constructor(private userService: UserService) {
        let userName = new FormControl('', [Validators.required, Validators.minLength(4)]);
        let firstName = new FormControl('', [Validators.required, Validators.minLength(1)]);
        let lastName = new FormControl('', [Validators.required, Validators.minLength(1)]);
        let email = new FormControl('', Validators.required);
        let password = new FormControl('', [Validators.required, Validators.minLength(6)]);

        this.registerForm = new FormGroup({
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        });
    }

    doRegister() {
        this.regSucceed = false;
        let formData = this.registerForm.value;
        //let username = formData.firstName + '_' + formData.lastName.charAt(0);
        this.userService.register(new User(formData.userName, formData.firstName, formData.lastName, formData.email, formData.password))
            .subscribe(data => this.regSuccess(data), error => this.regError(<any>error));
        //console.log(formData);
    }

    private regSuccess(data) {
        if (data.code === 'ok') {
            console.log('register is ok');

            this.regSucceed = true;

            for (let name in this.registerForm.controls) {
                (<FormControl>this.registerForm.controls[name]).updateValue('');
                this.registerForm.controls[name].setErrors(null);
            }
        }
    }

    private regError(error) {
        console.log("Registration error", error);
    }
}