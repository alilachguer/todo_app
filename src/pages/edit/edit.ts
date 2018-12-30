import {Component, ElementRef} from '@angular/core';
import {ModalController, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import {ModalDescription} from "../add/add";
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";
import {Toast} from "@ionic-native/toast";
import {DatabaseProvider} from "../../providers/database/database";

/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  todoDate: Date;
  data = {
    id: 0,
    title : "",
    description : "",
    type : "",
    date : "",
    notification : 0,
  };

  constructor(public navCtrl: NavController, private sqlite: SQLite,
              private toast: Toast,
              public dbProvider: DatabaseProvider,
              public navParams: NavParams, public modalCtrl: ModalController) {
    this.getCurrentData(navParams.get("id"));
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
            this.data.description = res.rows.item(0).description;
            this.data.notification = res.rows.item(0).notification;
          }
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

  updateData() {
    this.sqlite.create({
      name: this.dbProvider.DATABASE_NAME,
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.dateChanged();
      db.executeSql('UPDATE '+this.dbProvider.TABLE_NAME
        +' SET '+this.dbProvider.COLUMN_NAME_TITLE+'=?, '
        +this.dbProvider.COLUMN_NAME_DESCRIPTION+'=?, '
        + this.dbProvider.COLUMN_NAME_TYPE+'=?, '
        + this.dbProvider.COLUMN_NAME_DATE+'=?, '
        +this.dbProvider.COLUMN_NAME_TIMEHOUR+'=?, '
        +this.dbProvider.COLUMN_NAME_TIMEMINUTE+'=?, '
        +this.dbProvider.COLUMN_NAME_NOTIFICATION+'=? '
        +' WHERE '+this.dbProvider.COLUMN_NAME_ID+'=? ',
        [this.data.title,
          this.data.description,
          this.data.type,
          this.data.date,
          this.todoDate.getHours()-1,
          this.todoDate.getMinutes(),
          0,
          this.data.id
        ])
        .then(res => {
          console.log(res);
          this.toast.show('Data updated', '5000', 'center').subscribe(
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
  }

  dateChanged(){
    this.todoDate = new Date(this.data.date);
    console.log(this.todoDate.getMonth()+1 + ", " + (this.todoDate.getHours()-1)+":"+this.todoDate.getMinutes() );
  }

  openDescriptionModal() {
    let modal = this.modalCtrl.create(ModalDescription, {description : this.data.description});
    modal.onDidDismiss(data => {
      if(data != null){
        this.data.description = data.description;
      }
    });
    modal.present();
  }

}


@Component({
  selector: 'desc-edit',
  templateUrl: 'description.html'
})
export class ModalDescriptionEdit {

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

}
