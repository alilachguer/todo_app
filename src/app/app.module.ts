import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import { MyApp } from './app.component';

import { AddPage, ModalDescription } from '../pages/add/add';
import { CalendarPage } from '../pages/calendar/calendar';
import { SearchPage } from '../pages/search/search';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage} from "../pages/home/home";
import {EditPage, ModalDescriptionEdit} from "../pages/edit/edit";

import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from "@angular/http";

import { DatePicker } from '@ionic-native/date-picker';
import { SQLite } from '@ionic-native/sqlite';
import { NativeStorage } from '@ionic-native/native-storage';
import { DatabaseProvider } from '../providers/database/database';
import { IonicStorageModule } from '@ionic/storage';
import { SQLitePorter} from "@ionic-native/sqlite-porter";
import {SplashScreen} from "@ionic-native/splash-screen";
import {Toast} from "@ionic-native/toast";

import { LocalNotifications } from '@ionic-native/local-notifications';
import {Camera} from "@ionic-native/camera";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddPage,
    CalendarPage,
    SearchPage,
    TabsPage,
    ModalDescription,
    EditPage,
    ModalDescriptionEdit
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddPage,
    HomePage,
    CalendarPage,
    SearchPage,
    TabsPage,
    EditPage,
    ModalDescriptionEdit,
    ModalDescription
  ],
  providers: [
    StatusBar,
    DatePicker,
    SplashScreen,
    NativeStorage,
    SQLite,
    Camera,
    Toast,
    DatabaseProvider,
    LocalNotifications,
    SQLitePorter,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
