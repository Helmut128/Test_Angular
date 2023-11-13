import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import DataSource from 'devextreme/data/data_source';
import { RouterModule } from '@angular/router';

import {
  DxButtonModule,
  DxDataGridModule,
  DxBulletModule,
  DxTemplateModule,
  DxFormModule,
  DxTextBoxModule,
} from 'devextreme-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersListComponent } from './test_angular/users-list/users-list.component';
import { LanguageListComponent } from './language-list/language-list.component';
import { AreaComponent } from './area/area.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    LanguageListComponent,
    AreaComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxButtonModule,
    DxDataGridModule,
    DxBulletModule,
    DxTemplateModule,
    HttpClientModule,
    RouterModule,
    DxFormModule,
    DxTextBoxModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
