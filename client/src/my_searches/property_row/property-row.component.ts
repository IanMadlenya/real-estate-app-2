/**
 * Created by hartex
 */

import {Component, Input} from '@angular/core';
import {Property} from "../../find_an_owner/Property";

@Component({
    selector: 'property-row',
    templateUrl: 'my_searches/property_row/propery-row.tmpl.html'
})
export class PropertyRowComponent {
    @Input() property:Property;
    @Input() ind:number;
}