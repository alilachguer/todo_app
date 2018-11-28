import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, ViewController  } from 'ionic-angular';
import { DatePicker, DatePickerOptions } from '@ionic-native/date-picker';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

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

  title: string;
  desc: string;
  myDate: any;
  todoDate: Date;
  public type: any;
  db: SQLiteObject;

  constructor(public navCtrl: NavController, 
      public navParams: NavParams,
      public datePicker: DatePicker,
      public sqlite: SQLite,
      public modalCtrl: ModalController) {
              
  }
  
  addTask(){
    console.log("clicked!!");
    
  }

  dateChanged(){
    this.todoDate = new Date(this.myDate);
    console.log(this.todoDate.getMonth()+1 + ", " + (this.todoDate.getHours()-1)+":"+this.todoDate.getMinutes() );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
  }

  openDescriptionModal() {
    let modal = this.modalCtrl.create(ModalDescription, {description : this.desc});
    modal.onDidDismiss(data => {
      if(data != null){
        this.desc = data.description;
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
    this.element.nativeElement.querySelector("textarea").style.height = "100%";
  }

  // @ViewChild('myDesc') myDesc: ElementRef;
  // resize(){
  //   var element = this.myDesc['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
  //   var scrollHeight = element.scrollHeight;
  //   element.style.height = scrollHeight + 'px';
  //   this.myDesc['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';
  // }
} 
