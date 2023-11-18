import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { users } from 'src/app/interface/users';

import { addUser } from 'src/app/interface/addUser';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  users: any[] = [];
  dataSource: any;

  user: addUser;

  form_fieldDataChanged(e: {
    component: { option: (formData: string) => addUser };
  }) {
    this.user = e.component.option('formData');

    if (this.user.userName === '') {
      console.log('Este campo es requerido');
      return;
    }
    if (this.user.name === '') {
      console.log('Este campo es requerido');
      return;
    }

    this.apiService.addUser(this.user).subscribe(() => {});
    console.log(this.user);
    this.getList();
  }

  buttonOptions: any = {
    Text: 'Agregar',
    type: 'success',
    useSubmitBehavior: true,
  };

  getList() {
    this.apiService.getUsers().subscribe((data: any[]) => {
      this.dataSource = data;
      console.log(data);
    });
  }

  constructor(private apiService: ApiService) {
    this.user = {
      name: '',
      userName: '',
    };
  }
  //Consume el api.services.ts para darnos los datos de getArea
  ngOnInit(): void {
    this.getList();
  }

  onRowUpdating(event: any) {
    const updateDataUser = event; // Los datos editados
    const rowKey = updateDataUser.key;

    console.log(updateDataUser);
    if (updateDataUser !== null) {
      const nuevosDatos = updateDataUser.newData;
      const usersToUpdate: users = { ...updateDataUser.oldData };

      usersToUpdate.idUser = rowKey;
      console.log(usersToUpdate);
      usersToUpdate.name = nuevosDatos.name;

      this.apiService.updateDataUser(usersToUpdate).subscribe((response) => {
        if (response.success) {
          console.log('Se ha actualizado correctamente');
        } else {
          // Maneja el error
        }
      });
      console.log(usersToUpdate);
    }
  }

  onRowRemoving(event: any) {
    const rowKey = event.key;
    // Envía la solicitud de eliminación al servidor (a través de tu servicio ApiService)
    this.apiService.deleteDataUser(rowKey).subscribe((response) => {
      if (response.success) {
        console.log(`Se ha eliminado el registro con el ID ${rowKey}`);
      } else {
        // Maneja el error
      }
    });
  }

  //Agregar Usuarios
  handleSubmit = function (e: { preventDefault: () => void }) {
    console.log('Hace el submit');
    e.preventDefault();
    //this.updateProduct(this.id, product).subscribe(() => {

    //  }
    //)
  };
}
