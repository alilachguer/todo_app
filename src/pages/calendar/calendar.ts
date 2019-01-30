import {Component, NgZone} from '@angular/core';
import {NavController, NavParams, Platform, ToastController} from 'ionic-angular';
import {Pedometer} from "@ionic-native/pedometer";
import {Toast} from "@ionic-native/toast";

/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {

  start: boolean;
  PedometerData:any;
  stepCount : any = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public platformCtrl: Platform, public pedoCtrl: Pedometer ,
              public toast: Toast,
              public toastCtrl: ToastController , private ngZoneCtrl: NgZone) {
    this.stepCount = 0;
  }

  fnGetPedoUpdate(){
    if (this.platformCtrl.is('cordova')) {

      this.pedoCtrl.isDistanceAvailable()
        .then((available: boolean) => {
          this.toast.show('Pedometer not available', '5000', 'center');
          console.log("available: " + available)
        })
        .catch((error: any) => console.log(error));

      this.pedoCtrl.startPedometerUpdates()
        .subscribe((PedometerData) => {
          this.PedometerData = PedometerData;
          this.ngZoneCtrl.run(() => {
            this.stepCount = this.PedometerData.numberOfSteps;
          });
        });
      this.start = true;
      this.toast.show('Please Walk🚶‍to Get Pedometer Update.', '5000', 'center');
    }else{
      this.toast.show('This application needs to be run on📱device', '5000', 'center');
    }
  }

  fnStopPedoUpdate(){
    this.pedoCtrl.stopPedometerUpdates();
    this.start = false;
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
  }

}
