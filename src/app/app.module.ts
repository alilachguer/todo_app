import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AddPage, ModalDescription } from '../pages/add/add';
import { CalendarPage } from '../pages/calendar/calendar';
import { SearchPage } from '../pages/search/search';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from "@angular/http";

import { DatePicker } from '@ionic-native/date-picker';
import { SQLite } from '@ionic-native/sqlite';
import { NativeStorage } from '@ionic-native/native-storage';
import { DatabaseProvider } from '../providers/database/database';
import { IonicStorageModule } from '@ionic/storage';
import { SQLitePorter} from "@ionic-native/sqlite-porter";

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
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
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
    DatePicker,
    NativeStorage,
    SQLite,
    DatabaseProvider,
    SQLitePorter,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
