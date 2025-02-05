import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonEditPage } from './person-edit.page';

const routes: Routes = [
  {
    path: '',
    component: PersonEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonEditPageRoutingModule {}
