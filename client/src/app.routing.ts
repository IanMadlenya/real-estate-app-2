import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomePage} from "./home/home.page";
import {RegisterPage} from "./register/register.page";
import {SignInPage} from "./signin/signin.page";
import {SettingsPage} from "./settings/settings.page";
import {FindAnOwnerPage} from "./find_an_owner/find-an-owner.page";
import {UserSearchesPage} from "./my_searches/my-searches.page";
import {ManageSearchesPage} from "./manage_searches/manage-searches.page";

const appRoutes: Routes = [
    {path: '', component: HomePage},
    {path: 'register', component: RegisterPage},
    {path: 'signin', component: SignInPage},
    {path: 'settings', component: SettingsPage},
    {path: 'find', component: FindAnOwnerPage},
    {path: 'searches', component: UserSearchesPage},
    {path: 'manage', component: ManageSearchesPage},
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);