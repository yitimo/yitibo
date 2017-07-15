import { Injectable } from '@angular/core';
import { Http, Headers, Jsonp } from '@angular/http';
import 'rxjs/add/operator/toPromise';

const appId = '1799973901';
const appSecret = '758737a095f5e044a412efb8b8419bf5';
const redirectUri = 'https://weibo.yitimo.com/#/weibo/redirect';

@Injectable()
export class WeiboService {
    private postHeader: Headers;
    constructor(
        private http: Http,
        private json: Jsonp
    ) {
        this.postHeader = new Headers({'Content-Type':
        'text/plain'});
    }
    public ATCheck(): Promise<any> {
        return new Promise((resolve, reject) => {
            let tryGet = JSON.parse(window.localStorage.getItem('AT') || 'false');
            if (tryGet) {
                return resolve(tryGet);
            } else {
                return reject({_none: true});
            }
        });
    }
    public OAuthBegin(state?: string) {
        let rs = `https://api.weibo.com/2/oauth2/authorize?client_id=${appId
        }&redirect_uri=${encodeURIComponent(redirectUri)
        }&response_type=code`;
        if (state) {
            rs += `&state=${state}`;
            window.localStorage.setItem('OAuthState', state);
        }
        window.location.href = rs;
    }
    public OAuth(code: string) {
        return this.http.post(
            `https://api.weibo.com/2/oauth2/access_token?client_id=${appId
            }&client_secret=${appSecret}&grant_type=authorization_code&code=${code}&redirect_uri=${
            encodeURIComponent(redirectUri)}`, {}, {headers: this.postHeader}
        ).toPromise().catch((err) => {
            return err;
        });
    }
    public StateResolve(state: string) {
        let oldState = window.localStorage.getItem('OAuthState') || false;
        if (state === oldState) {
            window.location.href = oldState;
        } else {
            window.location.href = 'https://weibo.yitimo.com';
        }
    }
}
