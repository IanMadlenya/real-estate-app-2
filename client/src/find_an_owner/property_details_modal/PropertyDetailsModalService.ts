import {EventEmitter, Injectable} from '@angular/core';

/**
 * Created by hartex
 */

@Injectable()
export class PropertyDetailsModalService {

    public isModalAlreadyInit: boolean = false;

    public propertyModalOpened$: EventEmitter<any>;
    public propertyModalDestroy$: EventEmitter<any>;

    constructor() {
        this.propertyModalOpened$ = new EventEmitter();
        this.propertyModalDestroy$ = new EventEmitter();
    }
}