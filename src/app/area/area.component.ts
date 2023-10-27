import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { DxDataGridModule } from 'devextreme-angular';

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
    console.log(updatedData.idArea);

    // Asegúrate de que updatedData contenga una propiedad 'id' válida
    /*  if (updatedData && updatedData.id) {
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
    const removedData = event.data; // Datos del registro a eliminar
    // Envía la solicitud de eliminación al servidor (a través de tu servicio ApiService)
    this.apiService.deleteData(removedData.id).subscribe((response) => {
      if (response.success) {
        // El registro se eliminó con éxito
      } else {
        // Maneja el error
      }
    });
  }
}
