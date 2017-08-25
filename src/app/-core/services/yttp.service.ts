import { Injectable } from '@angular/core';
import { Http, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class Yttp {
    constructor(
        private http: Http
    ) {}
    public Text(url: string) {
        return this.http.get(url, {responseType: ResponseContentType.Text}).toPromise().then((res) => res.text());
    }
    public get(url: string): Promise<any> {
        return this.http.get(url)
        .toPromise()
        .then(this.reqSucc)
        .catch(this.reqErr);
    }
    private reqSucc(res: any) {
        let body = res.json();
        return body;
    }
    private reqErr(error: any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body['error'] || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message || error.statusText || error.toString();
        }
        return Promise.reject(errMsg);
    }
}
