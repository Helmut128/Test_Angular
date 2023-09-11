import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

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
}
