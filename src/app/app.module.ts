import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AddPage, ModalDescription } from '../pages/add/add';
import { CalendarPage } from '../pages/calendar/calendar';
import { SearchPage } from '../pages/search/search';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DatePicker } from '@ionic-native/date-picker';
import { SQLite } from '@ionic-native/sqlite';
import { NativeStorage } from '@ionic-native/native-storage';
import { DatabaseProvider } from '../providers/database/database';
@NgModule({
  declarations: [
    MyApp,
    AddPage,
    CalendarPage,
    SearchPage,
    TabsPage,
    ModalDescription
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddPage,
    CalendarPage,
    SearchPage,
    TabsPage,
    ModalDescription
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePicker,
    NativeStorage,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider
  ]
})
export class AppModule {}
