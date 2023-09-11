import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './test_angular/users-list/users-list.component';
import { LanguageListComponent } from './language-list/language-list.component';
import { AreaComponent } from './area/area.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  { path: 'user-list', component: UsersListComponent },
  { path: 'language', component: LanguageListComponent },
  { path: 'area', component: AreaComponent },
  { path: 'menu', component: MenuComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
