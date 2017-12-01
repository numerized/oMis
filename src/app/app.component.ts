import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';

import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

declare var $;
declare var IOTA;
declare var MerkleTree;

import * as MAM from 'mam.client.js';

console.log(MAM)

var iota = new IOTA({
  'provider': 'http://service.iotasupport.com',
  'sandbox'   :  false,
  'port':14265,
  'token': '7e5aacc4-2e3c-45af-8303-87d96d9a6809'
});

const seed = 'XXMPUFDZTAWNORLGZT9SZXHXXMSINBQVPCJITKOGIIPPUCARZEATSCUBMRXXQTXYRUTXUCBEV9YUMIFJB';
const start = 3;
const count = 4;
const security = 2;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(private http: Http, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      console.log(iota)
      console.log(iota.utils.convertUnits(1, 'Ti', 'Gi'))});

      let headers = new Headers({ 'Content-Type': 'application/json', 'X-IOTA-API-Version': '1' });
      let options = new RequestOptions({ headers: headers });

      this.http.post("http://service.iotasupport.com:14265", {"command": "getNodeInfo"}, options)
        .catch((error:any) => Observable.throw(error.json().error || 'Server unreachable'))
        .toPromise()
        .then((data)=>{
          console.log(data)
        })

      const tree0 = new MAM.Merkle(seed, start, count, security);
      const tree1 = new MAM.Merkle(seed, start + count, count, security);

      console.log(tree0)
      console.log(tree1)
  }


}

