import { Injectable } from '@angular/core';

import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, Subscribable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {
baseUrl:string="http://localhost:3030";
  
 
  constructor(private http:HttpClient) { }

  upload(file: File):Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('image', file,file.name);
   
    const req =  new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
           reportProgress: true,
           responseType: 'json',
         
         });
    
    return this.http.request(req);

   }


   displayFile(name:String):Observable<any>{
   
     return this.http.get<any>(`${this.baseUrl}/upload/${name}`);
   }
}
