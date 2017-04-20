import {Control} from "@angular/common";
/**
 * Created by hartex
 */

//todo rewrite validator
export class ReaValidators {

    static isNumber(control:Control) {
        if (!Number.isInteger(control.value)) {
            return {notANumber: true};
        }

        return null;
    }

    static isZIP(control:Control){
        return null;
    }
}