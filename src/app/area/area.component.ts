import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { DxDataGridModule } from 'devextreme-angular';
import { Area } from '../interface/area';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss'],
})
export class AreaComponent {
  dataSource: any;

  constructor(private apiService: ApiService) {}

  //Consume el api.services.ts para darnos los datos de getArea
  ngOnInit(): void {
    this.apiService.getArea().subscribe((data: any[]) => {
      // this.users = users;
      this.dataSource = data;
      console.log(data);
    });
  }

  onRowUpdating(event: any) {
    const updatedData = event; // Los datos editados
    const rowKey = updatedData.key; // para obtener el id esta en su documentación -->  https://supportcenter.devexpress.com/ticket/details/t704618/datagrid-how-to-get-updated-data-onrowupdated-in-angular

    console.log(updatedData);
    if (updatedData !== null) {
      const nuevosDatos = updatedData.newData;
      const areaToUpdate: Area = { ...updatedData.oldData };

      areaToUpdate.idArea = rowKey;
      console.log(areaToUpdate);
      areaToUpdate.name = nuevosDatos.name;

      this.apiService.updateData(areaToUpdate).subscribe((response) => {
        if (response.success) {
          console.log('Se ha actualizado correctamente');
        } else {
          // Maneja el error
        }
      });
      console.log(areaToUpdate);

      // this.apiService.updateData()
    }

    // Asegúrate de que updatedData contenga una propiedad 'id' válida
    /*if (updatedData && updatedData.id) {
      this.apiService.updateData(updatedData).subscribe((response) => {
        if (response.success) {
          event.cancel = true; // Cancela la actualización localmente
        } else {
          // Maneja el error
        }
      });
    } else {
      console.error('ID no válido', updatedData);
      // Maneja el caso en el que updatedData no tenga un 'id' válido
    }*/
  }

  onRowRemoving(event: any) {
    const rowKey = event.key;
    // Envía la solicitud de eliminación al servidor (a través de tu servicio ApiService)
    this.apiService.deleteData(rowKey).subscribe((response) => {
      if (response.success) {
        console.log(`Se ha eliminado el registro con el ID ${rowKey}`);
      } else {
        // Maneja el error
      }
    });
  }
}
