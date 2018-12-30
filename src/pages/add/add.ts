import { Component, ElementRef } from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController, Platform, ViewController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Todo } from '../../Todo';
import { DatabaseProvider } from '../../providers/database/database';
import {Toast} from "@ionic-native/toast";


/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  todoDate: Date;
  public type: any;
  public items = [];

  todo = {
    title : "",
    description : "",
    type : "",
    date : "",
    notification : 0,
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public datePicker: DatePicker,
              public sqlite: SQLite,
              public toast: Toast,
              public dbProvider: DatabaseProvider,
              public modalCtrl: ModalController) {

    /**
    this.dbProvider.getData().then((todos) => {
      if(todos){
        this.items = todos;
      }
    });
    **/
    /*
    this.dbProvider.getDatabaseState().subscribe(ready => {
      if(ready){
        this.loadTodoData();
      }
    })
    */
      //this.createDatabaseFile();
  }




  saveData() {
    this.sqlite.create({
      name: this.dbProvider.DATABASE_NAME,
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO '+ this.dbProvider.TABLE_NAME +' VALUES(NULL,?,?,?,?,?,?,?)',
        [this.todo.title,
          this.todo.description,
          this.todo.type,
          this.todo.date,
          (this.todoDate.getHours()-1),
          this.todoDate.getMinutes(),
          0])
        .then(res => {
          console.log(res);
          this.toast.show('Data saved', '5000', 'center').subscribe(
            toast => {
              this.navCtrl.popToRoot();
            }
          );
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

  /****
  addItem() {
    let todo = new Todo(this.title, this.desc, this.type, this.todoDate,
      (this.todoDate.getHours()-1).toString(), this.todoDate.getMinutes().toString(), '0');
    this.saveItem(todo);
  }

  saveItem(item){
    this.items.push(item);
    this.dbProvider.save(this.items);
  }

  loadTodoData(){
    this.dbProvider.getAllTodos().then(data => {
      this.todos = data;
    });
  }

  addTodo(){
    //let todo = new Todo(this.title, this.desc, this.type, this.todoDate, (this.todoDate.getHours()-1).toString(), this.todoDate.getMinutes().toString(), '0');
    this.dbProvider.addTodo(this.title, this.desc, this.type,
      this.todoDate, (this.todoDate.getHours()-1).toString(), this.todoDate.getMinutes().toString(), '0').then(data => {
      this.loadTodoData();
    });
  }

  public createDatabaseFile(): void{
    this.sqlite.create({
      name: this.dbProvider.DATABASE_NAME,
      location: 'default'
    })
    .then((db: SQLiteObject) =>{
      db.executeSql(this.dbProvider.SQL_CREATE_ENTRIES)
        console.log("executed SQL create database " + this.dbProvider.DATABASE_NAME);
        this.db = db;
        this.createTables();
    })
    .catch(e => console.log(e));
  }

  public createTables(){
    this.db.executeSql(this.dbProvider.SQL_CREATE_ENTRIES, [])
      .then(() => console.log('Executed SQL: ' + this.dbProvider.SQL_CREATE_ENTRIES))
      .catch(e => console.log(e));
  }

  public insertTodo(todo: Todo ){
    let req: string = "insert into " + this.dbProvider.TABLE_NAME + "values ("
    +"'"+todo.$title+"', '"+todo.$description+"', '"+todo.$type+"', '"
    +todo.$date+"', '"+todo.$timeHour+"', '"+todo.$timeMinute+"', '"+todo.$notification+
    ")";

    this.db.executeSql(req, []).catch(e => console.log(e));
    console.log("tache inseree!!");
  }
   addTask(){
    console.log("clicked!!");
    let todo = new Todo(this.title, this.desc, this.type,
      this.todoDate, this.todoDate.getHours.toString(),
      this.todoDate.getMinutes.toString(), "0");

    //this.addTodo();
    //this.insertTodo(todo);

  }

  ***/




  // fonction UI, permet d'affecter la date choisie par le user a la variable todoDate
  dateChanged(){
    this.todoDate = new Date(this.todo.date);
    console.log(this.todoDate.getMonth()+1 + ", " + (this.todoDate.getHours()-1)+":"+this.todoDate.getMinutes() );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
  }

  // ouvre le modal qui permet d'inserer une description
  openDescriptionModal() {
    let modal = this.modalCtrl.create(ModalDescription, {description : this.todo.description});
    modal.onDidDismiss(data => {
      if(data != null){
        this.todo.description = data.description;
      }
    });
    modal.present();
  }
  
}


// modal de la description
@Component({
  selector: 'desc-add',
  templateUrl: 'description.html'
})
export class ModalDescription {

  public description: string;
  constructor(public platform: Platform, 
      public params: NavParams,
      public element:ElementRef,
      public modalCtrl: ModalController,
      public viewCtrl: ViewController){
    this.description = params.get('description');
    //this.element = element;
  }

  descriptionDone(){
    let data = {'description' : this.description};
    this.viewCtrl.dismiss(data);
  }

  

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ngAfterViewInit(){
    console.log("I'm alive!");
    this.element.nativeElement.querySelector("textarea");
  }

  // @ViewChild('myDesc') myDesc: ElementRef;
  // resize(){
  //   var element = this.myDesc['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
  //   var scrollHeight = element.scrollHeight;
  //   element.style.height = scrollHeight + 'px';
  //   this.myDesc['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';
  // }
} 
