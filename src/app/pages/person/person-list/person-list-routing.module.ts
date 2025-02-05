import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonListPage } from './person-list.page';

const routes: Routes = [
  {
    path: '',
    component: PersonListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonListPageRoutingModule {}
