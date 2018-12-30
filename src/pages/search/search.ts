import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { SQLiteObject } from '@ionic-native/sqlite';

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

  todos: any[];
  titles: string[];
  db: SQLiteObject;
  constructor(public navCtrl: NavController, public navParams: NavParams, dbProvider: DatabaseProvider) {
    //dbProvider.createDatabaseFile();
    this.db = dbProvider.getDB();
    //dbProvider.getAllTodos();
    
    // this.db.executeSql('select * from ' + dbProvider.TABLE_NAME, [])
    // .then((response) => {
    //   if(response == null){
    //     return;
    //   }
    //   if(response.rows){
    //     if(response.rows.length > 0){
    //       for (let i = 0; i < response.rows.length; i++) {
    //         //let title = response.rows.item()
    //         this.titles.push(response.rows.item(i).title);
    //       }
    //     }
    //   }
    // });
    
    //this.todos = dbProvider.todos;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}
