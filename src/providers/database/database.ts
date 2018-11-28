import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Todo } from '../../Todo';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const DATABASE_NAME: string = 'todo';
const TABLE_NAME = 'Todos';
const COLUMN_NAME_ID = 'id';
const COLUMN_NAME_TITLE = 'title';
const COLUMN_NAME_DESCRIPTION = 'description';
const COLUMN_NAME_TYPE = 'type';
const COLUMN_NAME_DATE = 'date';
const COLUMN_NAME_TIMEHOUR = 'timehour';
const COLUMN_NAME_TIMEMINUTE = 'timeminute';
const COLUMN_NAME_NOTIFICATION = 'notification';

const SQL_CREATE_ENTRIES: string = 
      "CREATE TABLE if not exists" + TABLE_NAME + " (" +
      COLUMN_NAME_ID + " INTEGER PRIMARY KEY, " +
      COLUMN_NAME_TITLE + " TEXT, " +
      COLUMN_NAME_DESCRIPTION + " TEXT, " +
      COLUMN_NAME_DATE + " TEXT, " +
      COLUMN_NAME_TYPE + " TEXT, " +
      COLUMN_NAME_TIMEHOUR + " TEXT, " +
      COLUMN_NAME_TIMEMINUTE + " TEXT, " +
      COLUMN_NAME_NOTIFICATION + " TEXT)";

const SQL_DELETE_ENTRIES: string = "DROP TABLE IF EXISTS " + TABLE_NAME;

@Injectable()
export class DatabaseProvider {

  db: SQLiteObject;
  constructor(public http: HttpClient, public sqlite: SQLite) {
    console.log('Hello DatabaseProvider Provider');

  }

  public createDatabaseFile(): void{
    this.sqlite.create({
      name: DATABASE_NAME,
      location: 'default'
    })
    .then((db: SQLiteObject) =>{
      db.executeSql(SQL_CREATE_ENTRIES)
        console.log("executed SQL create database " + DATABASE_NAME);
        this.db = db;
        this.createTables();
    })
    .catch(e => console.log(e));
  }

  public createTables(){
    this.db.executeSql(SQL_CREATE_ENTRIES, [])
      .then(() => console.log('Executed SQL: ' + SQL_CREATE_ENTRIES))
      .catch(e => console.log(e));
  }

  public insertTodo(todo: Todo ){
    let req: string = "insert into " + TABLE_NAME + "values ("
    +"'"+todo.$title+"', '"+todo.$description+"', '"+todo.$type+"', '"
    +todo.$date+"', '"+todo.$timeHour+"', '"+todo.$timeMinute+"', '"+todo.$notification+
    ")";

    this.db.executeSql(req, []).catch(e => console.log(e));
  }

}
