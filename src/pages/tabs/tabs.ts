import { Component } from '@angular/core';

import { CalendarPage } from '../calendar/calendar';
import { AddPage } from '../add/add';
import { SearchPage } from '../search/search';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AddPage;
  tab2Root = CalendarPage;
  tab3Root = SearchPage;

  constructor() {

  }
}
