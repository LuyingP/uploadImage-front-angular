import { Injectable } from '@angular/core';

import { HttpClient, HttpRequest, HttpEvent, HttpHeaders, HttpEventType, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError, } from 'rxjs';
import { catchError, last, map, mapTo, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {
  // baseUrl: string = "http://localhost:3030";
  baseUrl: string = "https://uploadimagenode.herokuapp.com";
  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);
    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
      //  headers: this._headers 
    });
    return this.http.request(req).pipe(
      catchError(this.errorMgmt)
    );
  }
  private errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Message: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }


  displayFile(name: String): Observable<any> {

    return this.http.get<any>(`${this.baseUrl}/upload/${name}`);
  }


  private getEventMessage(event: HttpEvent<any>, file: File) {
    switch (event.type) {
      case HttpEventType.Sent:
        return `Uploading file "${file.name}" of size ${file.size}.`;

      case HttpEventType.UploadProgress:
        // Compute and show the % done:
        const percentDone = Math.round(100 * event.loaded / event.total);
        return `File "${file.name}" is ${percentDone}% uploaded.`;

      case HttpEventType.Response:
        return `File "${file.name}" was completely uploaded!`;

      default:
        return `File "${file.name}" surprising upload event: ${event.type}.`;
    }
  }

  private handleError(file: File) {
    const userMessage = `${file.name} upload failed.`;

    return (error: HttpErrorResponse) => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      const message = (error.error instanceof Error) ?
        error.error.message :
        `server returned code ${error.status} with body "${error.error}"`;

      // this.messenger.add(`${userMessage} ${message}`);

      // Let app keep running but indicate failure.
      return of(userMessage);
    };
  }
 

}
