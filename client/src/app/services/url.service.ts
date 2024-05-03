import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private http: HttpClient) { }

  public apiUrl: string = "http://localhost:8000";

  public shortUrl(url: string): Observable<any> {
    return this.http.post(this.apiUrl + "/post_url", { url: url }).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: HttpErrorResponse) {
    let errorMessage = "An error Occured";
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
