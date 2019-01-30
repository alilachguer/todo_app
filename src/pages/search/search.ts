import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import {Toast} from "@ionic-native/toast";
import {DomSanitizer} from "@angular/platform-browser";
import { normalizeURL } from 'ionic-angular';
import {CalendarPage} from "../calendar/calendar";

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  data = {
    id: 0,
    title : "",
    description : "",
    type : "",
    date : "",
    image: "",
    longitude: "",
    lattitude: "",
    notification : 0,
  };

  is_sport_task: boolean = false;

  constructor(public navCtrl: NavController, private toast: Toast,
              public navParams: NavParams, private DomSanitizer: DomSanitizer,
              private sqlite: SQLite, public dbProvider: DatabaseProvider) {

    this.is_sport_task = false;
    this.getCurrentData(navParams.get("id"));


  }

  startActivity(){
    this.navCtrl.push(CalendarPage);
  }

  getCurrentData(rowid) {
    this.sqlite.create({
      name: this.dbProvider.DATABASE_NAME,
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM '+this.dbProvider.TABLE_NAME+' WHERE '+this.dbProvider.COLUMN_NAME_ID+'=?', [rowid])
        .then(res => {
          if(res.rows.length > 0) {
            this.data.id = res.rows.item(0).id;
            this.data.title = res.rows.item(0).title;
            this.data.date = res.rows.item(0).date;
            this.data.type = res.rows.item(0).type;
            this.data.image = res.rows.item(0).image;
            this.data.longitude = res.rows.item(0).longitude;
            this.data.lattitude = res.rows.item(0).lattitude;
            this.data.description = res.rows.item(0).description;
            this.data.notification = res.rows.item(0).notification;
          }

          console.log("type: " + this.data.type);
          if(this.data.type === "Sport"){
            console.log("**** yep it is sport");
            this.is_sport_task = true;
          }

          console.log("img path avant: " + this.data.image);
          this.data.image = normalizeURL(this.data.image);
          console.log("img path apres: " + this.data.image);
        })
        .catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  ionViewWillEnter() {
    console.log('back to HomePage');
  }

}
