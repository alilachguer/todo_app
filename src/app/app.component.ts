import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import{ DatabaseProvider } from '../../src/providers/database/database';

import { TabsPage } from '../pages/tabs/tabs';
import {HomePage} from "../pages/home/home";
import {SplashScreen} from "@ionic-native/splash-screen";




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, public database: DatabaseProvider, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }

}
