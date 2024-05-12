import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environments";
import { catchError, map, Observable, throwError } from "rxjs";

export interface Form {
  name: string;
  fields: Record<string, any>;
}

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private readonly baseUrl: string = environment.apiUrl;
  private http = inject(HttpClient);


  /**
   * Create a new form and associate it with a user.
   * @param name The name of the form.
   * @param fields The fields of the form in a key-value format.
   * @param adminId The ID of the admin user associated with the form.
   */
  createForm(name: string, fields: Record<string, any>, adminId: string): Observable<any> {
    const url = `${this.baseUrl}/form?adminId=${adminId}`;
    const body = { name, fields };

    return this.http.post<Form>(url, body).pipe(
      map(response => response),
      catchError(err => throwError(() => new Error(err.message)))
    );
  }
}
