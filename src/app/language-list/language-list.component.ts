import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { language } from '../interface/languague';
import { addLanguage } from '../interface/addLanguague';

@Component({
  selector: 'app-language-list',
  templateUrl: './language-list.component.html',
  styleUrls: ['./language-list.component.scss'],
})
export class LanguageListComponent implements OnInit {
  dataSource: any;

  language: addLanguage;

  form_fieldDataChanged(e: {
    component: { option: (formData: string) => addLanguage };
  }) {
    this.language = e.component.option('formData');
    this.apiService.addLanguage(this.language).subscribe(() => {});
    console.log(this.language);

    this.apiService.getLanguages().subscribe((data: any[]) => {
      // this.users = users;
      this.dataSource = data;
      console.log(data);
    });
  }

  buttonOptions: any = {
    Text: 'Agregar',
    type: 'success',
    useSubmitBehavior: true,
  };

  constructor(private apiService: ApiService) {
    this.language = {
      name: '',
      code: '',
    };
  }

  ngOnInit(): void {
    this.apiService.getLanguages().subscribe((data: any[]) => {
      // this.users = users;
      this.dataSource = data;
      console.log(data);
    });
  }

  onRowUpdating(event: any) {
    const updateDataLanguage = event; // Los datos editados
    const rowKey = updateDataLanguage.key;

    console.log(updateDataLanguage);
    if (updateDataLanguage !== null) {
      const nuevosDatos = updateDataLanguage.newData;
      const languageToUpdate: language = { ...updateDataLanguage.oldData };

      languageToUpdate.idLanguage = rowKey;
      console.log(languageToUpdate);
      languageToUpdate.name = nuevosDatos.name;

      this.apiService
        .updateDataLanguage(languageToUpdate)
        .subscribe((response) => {
          if (response.success) {
            console.log('Se ha actualizado correctamente');
          } else {
            // Maneja el error
          }
        });
      console.log(languageToUpdate);

      // this.apiService.updateData()
    }
  }

  onRowRemoving(event: any) {
    const rowKey = event.key;
    // Envía la solicitud de eliminación al servidor (a través de tu servicio ApiService)
    this.apiService.deleteDataLanguage(rowKey).subscribe((response) => {
      if (response.success) {
        console.log(`Se ha eliminado el registro con el ID ${rowKey}`);
      } else {
        // Maneja el error
      }
    });
  }

  //Agregar languague
  handleSubmit = function (e: { preventDefault: () => void }) {
    console.log('Hace el submit');
    e.preventDefault();
    //this.updateProduct(this.id, product).subscribe(() => {

    //  }
    //)
  };
}
