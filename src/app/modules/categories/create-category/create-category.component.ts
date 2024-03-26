import { Component } from '@angular/core';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent {

  public typeCategory: number = 1;


  constructor() { }

  
  public processFile($event: any) {
    console.log($event)
  }


  public changeTypeCategory(type: number) {
    this.typeCategory = type;
  }
}
