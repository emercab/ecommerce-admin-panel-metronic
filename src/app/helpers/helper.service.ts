import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private _toastr: ToastrService) { }


  public toaster(message: string, title: string, type: string): void {
    switch (type) {
      case 'success':
        this._toastr.success(message, title);
        break;
      case 'error':
        this._toastr.error(message, title);
        break;
      case 'warning':
        this._toastr.warning(message, title);
        break;
      case 'info':
        this._toastr.info(message, title);
        break;
      default:
        this._toastr.success(message, title);
        break;
    }
  }


  public timer(callback: any, time: number): void {
    setTimeout(() => {
      callback();
    }, time);
  }
}
