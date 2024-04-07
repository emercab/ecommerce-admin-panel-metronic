import { Component, OnInit, inject } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { colorLighten } from 'src/app/_metronic/kt/_utils';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit{

  public categories: any[] = [];
  public search: string = '';
  public totalPages: number = 0;
  public currentPage: number = 1;
  public isLoading$: Observable<boolean>;

  // Inject the services
  private _categoryService: CategoryService = inject(CategoryService);
  private _modalService: NgbModal = inject(NgbModal);


  constructor() {}


  ngOnInit(): void {
    this.isLoading$ = this._categoryService.isLoading$;
    this.listCategories();
  }


  public listCategories(page: number = 1): void {
    this._categoryService.getCategoriesBySearch(this.search, page).subscribe({
      next: (response: any) => {
        console.log(response);
        this.categories = response.categories.data;
        this.totalPages = response.totalPages;
        this.currentPage = page;
      }
    });
  }


  public parseIconHtml(category: any): string {
    // Convert the icon string to HTML
    const myDiv = document.getElementById(`svg-category-${category.id}`);
    myDiv!.innerHTML = category.icon;
    return '';
  }


  public loadPage($event: any): void {
    const currentPage = $event;
    this.listCategories(currentPage);
  }


  public categorySearch($event: Event): void {
    this.search = ($event.target as HTMLInputElement).value;
    console.log(this.search);
    this._categoryService.getCategoriesBySearch(this.search);
  }
}
