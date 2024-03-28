import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { AuthService } from '../../auth';
import { URL_SERVICES } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  // Observable that emits true when the service is loading data
  public isLoading$: Observable<boolean>;
  public isLoadingSubject: BehaviorSubject<boolean>;

  // Inject the HttpClient and AuthService services
  private _http: HttpClient = inject(HttpClient);
  private _authService: AuthService = inject(AuthService);

  
  constructor() {
    // Initialize the BehaviorSubject with false as its initial value
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }


  public getCategoriesBySearch(search: string): Observable<any> {
    // Emit true when the request starts
    this.isLoadingSubject.next(true)

    // Create the URL and headers for the request
    const url = `${URL_SERVICES}admin/category`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this._authService.token}`
    });

    // Make the request and return the observable
    return this._http.get(url, { headers }).pipe(
      // Emit false when the request is completed
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }


  public getCategoryById(id: string): Observable<any> {
    // Emit true when the request starts
    this.isLoadingSubject.next(true)

    // Create the URL and headers for the request
    const url = `${URL_SERVICES}admin/category/${id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this._authService.token}`
    });

    // Make the request and return the observable
    return this._http.get(url, { headers }).pipe(
      // Emit false when the request is completed
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }


  public createCategory(category: any): Observable<any> {
    // Emit true when the request starts
    this.isLoadingSubject.next(true)

    // Show in console the data to be sent
    console.log({'received': category});

    // Create the URL and headers for the request
    const url = `${URL_SERVICES}admin/category`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this._authService.token}`
    });

    // Make the request and return the observable
    return this._http.post(url, category, { headers }).pipe(
      // Emit false when the request is completed
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }


  public updateCategory(id: string, category: any): Observable<any> {
    // Emit true when the request starts
    this.isLoadingSubject.next(true)

    // Create the URL and headers for the request
    const url = `${URL_SERVICES}admin/category/${id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this._authService.token}`
    });

    // Make the request and return the observable
    return this._http.post(url, category, { headers }).pipe(
      // Emit false when the request is completed
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }


  public deleteCategory(id: string): Observable<any>{
    // Emit true when the request starts
    this.isLoadingSubject.next(true)

    // Create the URL and headers for the request
    const url = `${URL_SERVICES}admin/category/${id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this._authService.token}`
    });

    // Make the request and return the observable
    return this._http.delete(url, { headers }).pipe(
      // Emit false when the request is completed
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }


  public listDepartmentsAndCategories(): Observable<any> {
    // Emit true when the request starts
    this.isLoadingSubject.next(true)

    // Create the URL and headers for the request
    const url = `${URL_SERVICES}admin/category/list-departments-categories`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this._authService.token}`
    });

    // Make the request and return the observable
    return this._http.get(url, { headers }).pipe(
      // Emit false when the request is completed
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }
}
