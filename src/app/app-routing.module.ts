import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './test_angular/users-list/users-list.component';
import { LanguageListComponent } from './language-list/language-list.component';
import { AreaComponent } from './area/area.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  { path: 'user-list', title: 'UserList', component: UsersListComponent },
  { path: 'language', title: 'Language', component: LanguageListComponent },
  { path: 'area', title: 'Area', component: AreaComponent },
  { path: 'menu', title: 'Menu', component: MenuComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
