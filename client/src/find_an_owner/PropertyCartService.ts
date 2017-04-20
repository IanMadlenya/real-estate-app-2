/**
 * Created by hartex
 */

import {Property} from "./Property";
import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Headers, RequestOptions, Http, Response} from "@angular/http";
import {UserService} from "../user_management/UserService";

@Injectable()
export class PropertyCartService {

    public propertyAdded$: EventEmitter<Property>;
    public propertyRemoved$: EventEmitter<Property>;

    public checkoutSucceeded$: EventEmitter<Property>;
    public checkoutError$: EventEmitter<Property>;

    private propertiesInCart: Property[] = [];
    private totalCost: number = 0;

    private checkoutUrl = '/rea/requests';

    constructor(private http: Http, private userService: UserService) {
        this.propertyAdded$ = new EventEmitter<Property>();
        this.propertyRemoved$ = new EventEmitter<Property>();
        this.checkoutSucceeded$ = new EventEmitter<any>();
        this.checkoutError$ = new EventEmitter<any>();
    }

    public list(): Property[] {
        this.checkTotalCost();
        return this.propertiesInCart;
    }

    public getTotalCost(): number {
        this.checkTotalCost();
        return this.totalCost;
    }

    public add(property: Property): void {
        this.propertiesInCart.push(property);
        this.checkTotalCost();
        this.propertyAdded$.emit(property);
    }

    public remove(propertyToRemove: Property): void {
        var index = this.propertiesInCart.indexOf(propertyToRemove);
        this.propertiesInCart.splice(index, 1);
        this.checkTotalCost();
        this.propertyAdded$.emit(propertyToRemove);
    }

    public doCheckout(): Observable<any> {
        let userID = this.userService.currentUserData['uid'];
        let body = JSON.stringify({props: this.propertiesInCart, uid: userID});
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http
            .post(this.checkoutUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public checkTotalCost() {
        this.totalCost = this.propertiesInCart.length * 5;
    }

    public clearCart() {
        this.propertiesInCart.splice(0, this.propertiesInCart.length);
    }

    private extractData(res: Response) {
        return res.json();
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}