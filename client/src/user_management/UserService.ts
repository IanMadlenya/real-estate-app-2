import {Injectable} from "@angular/core";
import {Headers, RequestOptions, Http, Response} from '@angular/http';
import {Observable} from "rxjs/Rx";
import {User} from "./User";

/**
 * Created by hartex
 */

@Injectable()
export class UserService {

    isCurrentUserSignedIn: boolean = false;
    currentUserData: Object;
    currentUserRole: string;

    private loginUrl = '/nodebb/api/login';
    private registerUrl = '/nodebb/api/users';
    private logOutUrl = '/forum/logout';

    constructor(private http: Http) {
    }

    signIn(params): Observable<any> {
        let body = `username=${params.username}&password=${params.password}`;
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({headers: headers});

        return this.http
            .post(this.loginUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    register(user: User): Observable<User> {
        let body = `username=${user.userName}&password=${user.password}&email=${user.email}&firstName=${user.firstName}&lastName=${user.lastName}&_uid=1`;
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer 69453755-99a0-42a9-9739-09df6f97860d'
        });
        let options = new RequestOptions({headers: headers});
        return this.http
            .post(this.registerUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    signOut(): Observable<User> {
        let body = {};
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        let options = new RequestOptions({headers: headers});
        return this.http
            .post(this.logOutUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
        /*
         $.ajax(config.relative_path + '/logout', {
         type: 'POST',
         headers: {
         'x-csrf-token': config.csrf_token
         },
         success: function() {
         window.location.href = config.relative_path + '/';
         }
         });*/
    }

    private extractData(res: Response) {
        return res.json();
    }

    private handleError(error: Response) {
        let errorJson = error.json();
        let errMsg = (errorJson.message) ? errorJson.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return Observable.throw(errMsg);
    }
}