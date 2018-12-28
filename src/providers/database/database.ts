import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from "@ionic-native/sqlite-porter";
import { Todo } from '../../Todo';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map'
import { Http } from "@angular/http";
import { BehaviorSubject } from "rxjs";
import {Platform} from "ionic-angular";

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/



@Injectable()
export class DatabaseProvider {

public DATABASE_NAME: string = 'todo.db';
public TABLE_NAME = 'Todos';
public COLUMN_NAME_ID = 'id';
public COLUMN_NAME_TITLE = 'title';
public COLUMN_NAME_DESCRIPTION = 'description';
public COLUMN_NAME_TYPE = 'type';
public COLUMN_NAME_DATE = 'date';
public COLUMN_NAME_TIMEHOUR = 'timehour';
public COLUMN_NAME_TIMEMINUTE = 'timeminute';
public COLUMN_NAME_NOTIFICATION = 'notification';

public SQL_CREATE_ENTRIES: string = 
      "CREATE TABLE if not exists" + this.TABLE_NAME + " (" +
      this.COLUMN_NAME_ID + " INTEGER PRIMARY KEY, " +
      this.COLUMN_NAME_TITLE + " TEXT, " +
      this.COLUMN_NAME_DESCRIPTION + " TEXT, " +
      this.COLUMN_NAME_DATE + " TEXT, " +
      this.COLUMN_NAME_TYPE + " TEXT, " +
      this.COLUMN_NAME_TIMEHOUR + " TEXT, " +
      this.COLUMN_NAME_TIMEMINUTE + " TEXT, " +
      this.COLUMN_NAME_NOTIFICATION + " TEXT)";

public SQL_DELETE_ENTRIES: string = "DROP TABLE IF EXISTS " + this.TABLE_NAME;



  db: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;
  public todos: Todo[];
  public titles: string[];
  constructor(public http: Http, public sqlite: SQLite,
              public storage: Storage, public sqlitePorter: SQLitePorter, private platform: Platform) {
    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: this.DATABASE_NAME,
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.db = db;
        this.storage.get('database_filled').then(val => {
          if(val){
            this.databaseReady.next(true);
          }else {
            this.fillDatabase();
          }
        });
      })
    });
    
  }

  getData(){
    return this.storage.get('todos');
  }

  save(data){
    this.storage.set('todos', data);
  }

  fillDatabase(){
    this.http.get('assets/TodoDump.sql')
      .map(res => res.text())
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.db, sql)
          .then(data => {
            this.databaseReady.next(true);
            this.storage.set('database_filled', true);
          })
          .catch(e => console.log(e));
      });
  }

  addTodo(title,desc,type,date,hour,min,notif){
    let data = [title,desc,type,date,hour,min,notif]
    //let data = [todo.$title, todo.$description, todo.$type, todo.$date, todo.$timeHour, todo.$timeMinute, todo.$notification];
    return this.db.executeSql("insert into todos(title, description, type, date, timehour, timeminute, notification) " +
      "values(?, ?, ?, ?, ?, ?, ?)", data)
      .then(res => {
        return res;
      });
  }

  getAllTodos(){
    return this.db.executeSql("select * from todos", [])
      .then(data => {
        let todos: Todo[] = [];
        if(data.rows.length() > 0){
          for (var i = 0; i < data.rows.length(); i++){
            todos.push(new Todo(data.rows.item(i).toString() , data.rows.item(i).toString(),
              data.rows.item(i).toString(), data.rows.item(i).toString(), data.rows.item(i).toString(),
              data.rows.item(i).toString(), data.rows.item(i).toString()));
          }
        }
        return todos;
      },
        err => {
          console.log('Error: ', err);
          return [];
        })
  }

  getDatabaseState(){
    return this.databaseReady.asObservable();
  }

  public getDB(){
    this.createDatabaseFile(this.sqlite);
    return this.db;
  }

  public createDatabaseFile(sqlite: SQLite): void{
    sqlite.create({
      name: this.DATABASE_NAME,
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      this.db = db;
      this.storage.get('database_filled').then(val => {
        if(val){
          this.databaseReady.next(true);
        }else {
          this.createTables(this.db);
        }
      });
      //db.executeSql(this.SQL_CREATE_ENTRIES);
      //console.log("executed SQL create database " + this.DATABASE_NAME);
      //this.createTables(this.db);
    })
    .catch(e => console.log(e));
  }

  public createTables(db: SQLiteObject){
    db.executeSql(this.SQL_CREATE_ENTRIES, [])
      .then(() => console.log('Executed SQL: ' + this.SQL_CREATE_ENTRIES))
      .catch(e => console.log(e));
  }

  public insertTodo(todo: Todo ){
    let req: string = "insert into " + this.TABLE_NAME + "values ("
    +"'"+todo.$title+"', '"+todo.$description+"', '"+todo.$type+"', '"
    +todo.$date+"', '"+todo.$timeHour+"', '"+todo.$timeMinute+"', '"+todo.$notification+
    ")";

    this.db.executeSql(req, []).catch(e => console.log(e));
  }

  public getTodos(){
    this.db.executeSql('select * from ' + this.TABLE_NAME, [])
    .then((response) => {
      if(response == null){
        return;
      }
      if(response.rows){
        if(response.rows.length > 0){
          for (let i = 0; i < response.rows.length; i++) {
            //let title = response.rows.item()
            this.titles.push(response.rows.item(i).title);
          }
        }
      }
    });
  }

}
