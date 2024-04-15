import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HelperService } from 'src/app/helpers/helper.service';
import { CategoryService } from '../services/category.service';
import { FormValidationResponse } from 'src/app/interfaces/formValidationResponse.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  
  public typeCategory: number = 1;
  public name: string = '';
  public icon: string = '';
  public position: number = 0;
  public department: number = 0;
  public category: number = 0;
  public status: number = 1;
  public categoryId: string = '';
  // Image preview and file
  public imgPreview: string = 'https://picsum.photos/id/14/200/200';
  public imgFile: any = null;

  // Options for the select elements
  public optionsDepartment: any[] = [];
  public optionsCategory: any[] = [];
  public optionsStatus: any[] = [
    { key: 0, status: 'Inactive' },
    { key: 1, status: 'Active' },
  ];

  // Services injection
  private _categoryService: CategoryService = inject(CategoryService);
  private _helper: HelperService = inject(HelperService);
  private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  public isLoading$: Observable<boolean>;


  constructor() { }


  ngOnInit(): void {
    this.isLoading$ = this._categoryService.isLoading$;

    // Load the departments and categories
    this.loadDepartmentsAndCategories();

    // Get the category id from the URL
    this._activatedRoute.params.subscribe(resp => {
      this.categoryId = resp.id
    });

    // Load the category data
    this.loadCategoryData();
  }


  // Method to process the image file uploaded
  public processFile($event: any): void {
    if ($event.target.files[0].type.indexOf('image') < 0) {
      this._helper.toaster('The file must be an image.', 'Error', 'error');
      return;
    }
    // Set the file to the imgFile property
    this.imgFile = $event.target.files[0];

    // Create a FileReader object to preview the image
    const reader = new FileReader();
    reader.readAsDataURL(this.imgFile);
    reader.onload = () => this.imgPreview = reader.result as string;
    this.previewImage();
  }


  public previewImage(): void {
    this._categoryService.isLoadingSubject.next(true);
    setTimeout(() => {
      this._categoryService.isLoadingSubject.next(false);
    }, 50);
  }


  public changeTypeCategory(type: number): void {
    this.typeCategory = type;
    console.log(this.typeCategory);
  }


  public onChangeStatus($event: any): void {
    this.status = $event.target.value;
  }
  
  
  public onChangeDepartment($event: any): void {
    this.department = $event.target.value;
    console.log(this.department);
  }


  public onChangeCategory($event: any): void {
    this.category = $event.target.value;
    console.log(this.category);
  }


  public updateCategory(): void {
    // Check all the form validations
    const resp: FormValidationResponse = this.checkValidations();
    if (!resp.isValid) {
      this._helper.toaster(resp.message, 'Error', 'error');
      return;
    }

    // Create a FormData object to send the data
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('icon', this.icon);
    formData.append('position', this.position.toString());
    formData.append('status', this.status.toString());
    formData.append('typeCategory', this.typeCategory.toString());

    if (this.imgFile) {
      formData.append('img', this.imgFile);
    }

    if (this.department) {
      formData.append('department_id', this.department.toString());
    }

    if (this.category) {
      formData.append('category_id', this.category.toString());
    }

    // Call the service to save the category
    this._categoryService.updateCategory(this.categoryId, formData).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response.code == 200) {
          console.log('Todo ok');
          this._helper.toaster(response.message, 'Success', 'success');
          this.loadDepartmentsAndCategories();
        }
        else {
          this._helper.toaster(response.message, 'Error', 'error');
        }
      },
      error: () => {
        this._helper.toaster('An error occurred while upgrading the category.', 'Error', 'error');
      }
    });
  }


  private checkValidations(): FormValidationResponse {

    const resp: FormValidationResponse = {
      isValid: false,
      message: ''
    }

    // Check if required fields are empty
    if (!this.name || !this.position) {
      resp.message = 'You must fill all the required fields.';
      return resp;
    }

    // Check if the image is not uploaded
    if (this.typeCategory === 1 && !this.imgFile) {
      resp.message = 'You must upload an image.';
      return resp;
    }

    // Check if the icon is not uploaded for the department
    if (this.typeCategory === 1 && !this.icon) {
      resp.message = 'You must upload an icon.';
      return resp;
    }

    // Check if the department is not selected for the category
    if (this.typeCategory === 2 && !this.department) {
      resp.message = 'You must select a department.';
      return resp;
    }

    // Check if the department and category are not selected for the subcategory
    if (this.typeCategory === 3 && !this.department && !this.category) {
      resp.message = 'You must select a department and a category.';
      return resp;
    }

    // If all validations are passed, return true
    resp.isValid = true;
    return resp;
  }


  private loadDepartmentsAndCategories(): void {
    this._categoryService.listDepartmentsAndCategories().subscribe({
      next: (response: any) => {
        if (response.code == 200) {
          this.optionsDepartment = response.departments;
          this.optionsCategory = response.categories;
          console.log(response);
        }
        else {
          this._helper.toaster(response.message, 'Error', 'error');
        }
      },
      error: (error: any) => {
        this._helper.toaster('An error occurred while loading the departments.', 'Error', 'error');
      }
    });
  }


  private loadCategoryData(): void {
    this._categoryService.getCategoryById(this.categoryId).subscribe({
      next: (resp: any) => {
        if (resp.code == 200) {
          const category = resp.category;
          this.name = category.name;
          this.icon = category.icon;
          this.position = category.position;
          this.status = category.status;
          this.department = category.department_id;
          this.category = category.category_id;
          this.imgPreview = category.image;
        }
        else {
          this._helper.toaster(resp.message, 'Error', 'error');
        }
      },
      error: (error: any) => {
        this._helper.toaster('An error occurred while loading the category data.', 'Error', 'error');
      }
    });
  }


  private clearForm(): void {
    this.typeCategory = 1;
    this.name = '';
    this.icon = '';
    this.position = 0;
    this.department = 0;
    this.category = 0;
    this.imgPreview = 'https://picsum.photos/id/14/200/200';
    this.imgFile = null;
  }
}
