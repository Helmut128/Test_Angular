import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Area } from '../interface/area';
import { addArea } from '../interface/addArea';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss'],
})
export class AreaComponent {
  dataSource: any;

  area: addArea;

  form_fieldDataChanged(e: {
    component: { option: (formData: string) => addArea };
  }) {
    this.area = e.component.option('formData');
    this.apiService.addArea(this.area).subscribe(() => {});
    console.log(this.area);
    this.getList();
  }

  buttonOptions: any = {
    Text: 'Agregar',
    type: 'success',
    useSubmitBehavior: true,
  };

  constructor(private apiService: ApiService) {
    this.area = {
      name: '',
    };
  }

  //Consume el api.services.ts para darnos los datos de getArea
  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.apiService.getArea().subscribe((data: any[]) => {
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
          this.getList();
        }
      });
      console.log(areaToUpdate);

      // this.apiService.updateData()
    }
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

  //Agregar Area
  handleSubmit = function (e: { preventDefault: () => void }) {
    console.log('Hace el submit');
    e.preventDefault();
    //this.updateProduct(this.id, product).subscribe(() => {

    //  }
    //)
  };
}
