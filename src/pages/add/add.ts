import { Component, ElementRef } from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController, Platform, ViewController, AlertController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../../providers/database/database';
import {Toast} from "@ionic-native/toast";
import {LocalNotifications} from '@ionic-native/local-notifications';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {CalendarPage} from "../calendar/calendar";


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
  //public type: any;
  public items = [];
  notification: Boolean = true;
  public camera_path: string = "";
  public longitude: string = "";
  public lattitude: string = "";

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
              public platform: Platform,
              public alertCtrl: AlertController,
              public localNotifications: LocalNotifications,
              public dbProvider: DatabaseProvider,
              private camera: Camera,
              public modalCtrl: ModalController) {

  }

  submitNotification(id: number) {
    if(this.notification === true){
      this.todo.notification = 1;
      console.log(this.todo);
      var date = new Date(this.todo.date);
      date.setHours(date.getHours()-1);
      console.log(date);
      console.log("--------------- inserted id: " + id);
      this.localNotifications.schedule({
        id: id,
        title: 'Notification: ' + this.todo.title,
        text: this.todo.description,
        trigger: { at: date },
        led: 'FF0000',
        sound: null,
      });

      //this.todo = { title : "", description : "", type : "", date : "", notification : 0 };
      console.log("******** notification has been planted!!")
    }
  }

  submitNotificationWithAction(id: number){
    if(this.notification === true){
      this.todo.notification = 1;
      console.log(this.todo);
      var date = new Date(this.todo.date);
      date.setHours(date.getHours()-1);
      console.log(date);
      console.log("--------------- inserted id: " + id);
      this.localNotifications.schedule({
        id: id,
        title: 'Notification: ' + this.todo.title,
        text: this.todo.description,
        trigger: { at: date },
        led: 'FF0000',
        sound: null,
        actions: [
          { id: 'no', title: 'ignore' },
          { id: 'yes', title: 'start', foreground: false }

        ]
      });
      //this.todo = { title : "", description : "", type : "", date : "", notification : 0 };
      console.log("******** notification has been planted!! with action");

      this.localNotifications.on('yes').subscribe( (notification) => {
        this.navCtrl.push(CalendarPage);
      });
    }
  }

  takePhoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      console.log("image: " + imageData);
      this.camera_path = imageData;
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.camera_path = base64Image;
      console.log("camera_path: " + this.camera_path);
    }, (err) => {
      console.log("image error: " + err);
    });
  }

  dataURLtoBlob(dataURL) {
    let binary = atob(dataURL.split(',')[1]);
    let array = [];
    for (var index = 0; index < binary.length; index++) {
      array.push(binary.charCodeAt(index));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  }

  saveData() {
    this.sqlite.create({
      name: this.dbProvider.DATABASE_NAME,
      location: 'default'
    }).then((db: SQLiteObject) => {
      if(this.notification === true){
        this.todo.notification = 1;
      }
      db.executeSql('INSERT INTO '+ this.dbProvider.TABLE_NAME +' VALUES(NULL,?,?,?,?,?,?,?,?,?,?)',
        [this.todo.title,
          this.todo.description,
          this.todo.type,
          this.todo.date,
          (this.todoDate.getHours()-1),
          this.todoDate.getMinutes(),
          this.camera_path,
          this.longitude,
          this.lattitude,
          this.todo.notification])
        .then(res => {
          console.log(res);
          this.toast.show('Data saved', '5000', 'center').subscribe(
            toast => {
              if(this.todo.type === 'Sport'){
                this.submitNotificationWithAction(res.insertId);
              }else{
                this.submitNotification(res.insertId);
              }
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


  // fonction UI, permet d'affecter la date choisie par le user a la variable todoDate
  dateChanged(){
    this.todoDate = new Date(this.todo.date);
    console.log("la date a ete changee a :" + this.todoDate);
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
