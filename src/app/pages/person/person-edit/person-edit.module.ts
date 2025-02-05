import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonEditPageRoutingModule } from './person-edit-routing.module';

import { PersonEditPage } from './person-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonEditPageRoutingModule
  ],
  declarations: [PersonEditPage]
})
export class PersonEditPageModule {}
