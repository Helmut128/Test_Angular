import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Menu } from '../interface/menu';
import { addMenu } from '../interface/addMenu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  dataSource: any;

  menu: addMenu;

  form_fieldDataChanged(e: {
    component: { option: (formData: string) => addMenu };
  }) {
    this.menu = e.component.option('formData');
    if (this.menu.url === '') {
      console.log('Este campo es requerido');
      return;
    }

    if (this.menu.name === '') {
      console.log('Este campo es requerido');
      return;
    }

    this.apiService.addMenu(this.menu).subscribe(() => {});
    console.log(this.menu);
    this.getList();
  }

  buttonOptions: any = {
    Text: 'Agregar',
    type: 'success',
    useSubmitBehavior: true,
  };

  getList() {
    this.apiService.getMenu().subscribe((data: any[]) => {
      this.dataSource = data;
      console.log(data);
    });
  }

  constructor(private apiService: ApiService) {
    this.menu = {
      name: '',
      url: '',
    };
  }
  //Consume el api.services.ts para darnos los datos de getArea
  ngOnInit(): void {
    this.getList();
  }

  onRowUpdating(event: any) {
    const updateDataMenu = event; // Los datos editados
    const rowKey = updateDataMenu.key;

    console.log(updateDataMenu);
    if (updateDataMenu !== null) {
      const nuevosDatos = updateDataMenu.newData;
      const menuToUpdate: Menu = { ...updateDataMenu.oldData };

      menuToUpdate.idMenu = rowKey;
      console.log(menuToUpdate);
      menuToUpdate.name = nuevosDatos.name;

      this.apiService.updateDataMenu(menuToUpdate).subscribe((response) => {
        if (response.success) {
          console.log('Se ha actualizado correctamente');
        } else {
          // Maneja el error
        }
      });
      console.log(menuToUpdate);

      // this.apiService.updateData()
    }
  }

  onRowRemoving(event: any) {
    const rowKey = event.key;
    // Envía la solicitud de eliminación al servidor (a través de tu servicio ApiService)
    this.apiService.deleteDataMenu(rowKey).subscribe((response) => {
      if (response.success) {
        console.log(`Se ha eliminado el registro con el ID ${rowKey}`);
      } else {
        // Maneja el error
      }
    });
  }

  //Agregar Menu
  handleSubmit = function (e: { preventDefault: () => void }) {
    console.log('Hace el submit');
    e.preventDefault();
    //this.updateProduct(this.id, product).subscribe(() => {

    //  }
    //)
  };
}
