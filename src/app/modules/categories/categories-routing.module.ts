import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { DeleteCategoryComponent } from './delete-category/delete-category.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
    children: [
      {
        path: 'create',
        component: CreateCategoryComponent,
      },
      {
        path: 'list/edit/:id',
        component: EditCategoryComponent,
      },
      {
        path: 'list',
        component: ListCategoriesComponent,
      },
      {
        path: 'delete/:id',
        component: DeleteCategoryComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
