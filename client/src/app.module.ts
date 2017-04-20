import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, FORM_PROVIDERS, ReactiveFormsModule, REACTIVE_FORM_PROVIDERS} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HttpModule} from "@angular/http";
import {AppComponent}  from './app.component';
import {PropertyCartService} from "./find_an_owner/PropertyCartService";
import {ROUTER_PROVIDERS} from "@angular/router-deprecated";
import {UserService} from "./user_management/UserService";
import {SubmittedSearchesService} from "./my_searches/SubmittedSearchesService";
import {Routing} from "./app.routing";
import {HomePage} from "./home/home.page";
import {RegisterPage} from "./register/register.page";
import {SignInPage} from "./signin/signin.page";
import {SettingsPage} from "./settings/settings.page";
import {FindAnOwnerPage} from "./find_an_owner/find-an-owner.page";
import {UserSearchesPage} from "./my_searches/my-searches.page";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {PropertyDetailsModalService} from "./find_an_owner/property_details_modal/PropertyDetailsModalService";
import {ManageSearchesPage} from "./manage_searches/manage-searches.page";
import {SubmittedSearchComponent} from "./my_searches/submitted_search/submitted-search.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpModule,
        Routing
    ],
    declarations: [
        AppComponent,
        HomePage,
        RegisterPage,
        SignInPage,
        SettingsPage,
        FindAnOwnerPage,
        UserSearchesPage,
        ManageSearchesPage,
        SubmittedSearchComponent
    ],
    providers: [
        ROUTER_PROVIDERS,
        REACTIVE_FORM_PROVIDERS,
        FORM_PROVIDERS,
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        PropertyCartService,
        PropertyDetailsModalService,
        UserService,
        SubmittedSearchesService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}