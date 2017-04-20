import {Injectable} from "@angular/core";
import {SubmittedRequest} from "./SubmittedRequest";
import {Http, Response} from "@angular/http";
import {UserService} from "../user_management/UserService";
import {Observable} from "rxjs";
import {Property} from "../find_an_owner/Property";

/**
 * Created by hartex
 */

@Injectable()
export class SubmittedSearchesService {

    private requestsUrl: string = '/rea/requests/';

    constructor(private http: Http, private userService: UserService) {}

    public getRequests(): Observable<any> {
        let userID = this.userService.currentUserData['uid'];

        return this.http
            .get(this.requestsUrl + userID)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response): SubmittedRequest[] {
        let searches: SubmittedRequest[] = [];

        res.json().map(function (prop) {
            searches.push(new SubmittedRequest(
                prop['requestID'],
                prop['uid'],
                new Date(prop['requestDate']),
                prop['status'],
                new Property(
                    prop['streetAddress'],
                    prop['city'],
                    prop['state'],
                    prop['zip']
                )
            ))
        });

        return searches;
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}