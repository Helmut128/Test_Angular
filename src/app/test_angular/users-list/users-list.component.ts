import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { users } from 'src/app/interface/users';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userName } from 'src/app/interface/username';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  users: any[] = [];
  dataSource: any;

  // Define un formulario reactivo para recoger los datos del nuevo usuario
  addUserForm: FormGroup;

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.addUserForm = this.fb.group({
      name: ['', Validators.required],
      userName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.apiService.getUsers().subscribe((data: any[]) => {
      // this.users = users;
      this.dataSource = data;
      console.log(data);
    });
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

      // this.apiService.updateData()
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

  submitButtonOptions = {
    text: 'Submit the Form',
    useSubmitBehavior: true,
  };

  handleSubmit = (e: any) => {
    console.log(this.addUserForm);
    if (this.addUserForm.valid) {
      console.log(this.addUserForm);

      const newUserName: userName = {
        name: this.addUserForm.value.name,
        UserName: this.addUserForm.value.userName,
      };
      console.log(this.addUserForm);

      console.log(newUserName);
    }

    e.preventDefault();
  };

  //Agregando nuevos usuarios
  addUser() {
    // Verifica si el formulario es válido antes de intentar agregar el usuario
    if (this.addUserForm.valid) {
      console.log(this.addUserForm);

      const newUserName: userName = {
        name: this.addUserForm.value.name,
        UserName: this.addUserForm.value.userName,
      };
      console.log(this.addUserForm);

      console.log(newUserName);
      //  const newUser = this.addUserForm.value;
      // this.apiService.addUser(newUser).subscribe((response) => {
      //   if (response.idUser) {
      //     console.log('Se ha agregado un nuevo usuario correctamente');
      //     // Recargar la lista de usuarios después de agregar uno nuevo
      //     this.apiService.getUsers().subscribe((data: any[]) => {
      //       this.dataSource = data;
      //     });

      //     // Restablecer el formulario después de agregar el usuario
      //     this.addUserForm.reset();
      //   } else {
      //     // Manejar errores
      //   }
      // });
    }
  }
}
