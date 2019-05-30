import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Project } from './project';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })

export class ProjectsService {
  constructor(private http: HttpClient) { }

  private projectsUrl = 'api/projects';  // URL to web api

  /** GET projects from the server */
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl)
      .pipe(
        catchError(this.handleError<Project[]>('getProjects', []))
      );
  }

  getProject(id: number): Observable<Project> {
    const url = `${this.projectsUrl}/${id}`;
    return this.http.get<Project>(url).pipe(
      catchError(this.handleError<Project>(`getProject id=${id}`))
    );
  }

  /** POST: add a new project to the server */
  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.projectsUrl, project, httpOptions).pipe(
      catchError(this.handleError<Project>('addProject'))
    );
  }

  /** PUT: update the project on the server */
  updateProject(project: Project): Observable<any> {
    return this.http.put(this.projectsUrl, project, httpOptions).pipe(
      catchError(this.handleError<any>('updateProject'))
    );
  }

  /** DELETE: delete the project from the server */
  deleteProject(project: Project | number): Observable<Project> {
    const id = typeof project === 'number' ? project : project.id;
    const url = `${this.projectsUrl}/${id}`;

    return this.http.delete<Project>(url, httpOptions).pipe(
      catchError(this.handleError<Project>('deleteProject'))
    );
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}