import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import {AddPage} from "../add/add";
import {DatabaseProvider} from "../../providers/database/database";
import {EditPage} from "../edit/edit";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public todos: any = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dbProvider: DatabaseProvider,
              private sqlite: SQLite) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.getData();
  }

  ionViewWillEnter() {
    console.log('back to HomePage');
    this.getData();
  }

  getData() {
    this.sqlite.create({
      name: this.dbProvider.DATABASE_NAME,
      location: 'default'
    }).then((db: SQLiteObject) => {

      db.executeSql(this.dbProvider.SQL_CREATE_ENTRIES, [])
        .then(res => console.log('Executed SQL'))
        .catch(e => console.log(e));

      db.executeSql('SELECT * FROM '+ this.dbProvider.TABLE_NAME +' ORDER BY ' + this.dbProvider.COLUMN_NAME_ID + ' DESC', [])
        .then(res => {
          this.todos = [];
          for(var i=0; i<res.rows.length; i++) {
            this.todos.push({
              id: res.rows.item(i).id,
              title: res.rows.item(i).title,
              description: res.rows.item(i).description,
              type: res.rows.item(i).type,
              date: res.rows.item(i).date,
              timehour: res.rows.item(i).timehour,
              timeminute: res.rows.item(i).timeminute,
              notification: res.rows.item(i).notification,
            })
          }
        })
        .catch(e => console.log(e));

    }).catch(e => console.log(e));

  }

  addData() {
    this.navCtrl.push(AddPage);
  }

  editData(rowid) {
    this.navCtrl.push(EditPage, {
      id:rowid
    });
  }

  deleteData(rowid) {
    this.sqlite.create({
      name: this.dbProvider.DATABASE_NAME,
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM ' + this.dbProvider.TABLE_NAME + ' WHERE ' + this.dbProvider.COLUMN_NAME_ID + ' = ?', [rowid])
        .then(res => {
          console.log(res);
          this.getData();
        })
        .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

}
