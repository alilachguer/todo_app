import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, ViewController  } from 'ionic-angular';
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
  myDate: Date;

  constructor(public navCtrl: NavController, 
      public navParams: NavParams,
      public modalCtrl: ModalController) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
  }

  openDescriptionModal() {
    let modal = this.modalCtrl.create(ModalDescription, {description : this.desc});
    modal.onDidDismiss(data => {
      this.desc = data.description;
    });
    modal.present();
  }
  
  

}


// modal de la description
@Component({
  selector: 'desc-add',
  templateUrl: 'description.html'
})
export class ModalDescription{

  public description: string;
  constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController){
    this.description = params.get('description');
  }

  descriptionDone(){
    let data = {'description' : this.description};
    this.viewCtrl.dismiss(data);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
} 
