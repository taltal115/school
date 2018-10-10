import {Injectable} from '@angular/core';

@Injectable()
export class HelperService{

  constructor() {}

  downloadFile(data: any){
    let blob = new Blob([data], { type: 'text/csv' });
    let url= window.URL.createObjectURL(blob);
    window.open(url);
  }
}
