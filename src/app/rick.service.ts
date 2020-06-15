import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Rick } from './rick';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class RickService {

  private ricksUrl = 'api/ricks';  // URL para a web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getRicks (): Observable<Rick[]> {
    return this.http.get<Rick[]>(this.ricksUrl)
      .pipe(
        tap(ricks => this.log('Procurando por Rick...')),
        catchError(this.handleError('getRicks', []))
      );
  }

  getRickNo404<Data>(id: number): Observable<Rick> {
    const url = `${this.ricksUrl}/?id=${id}`;
    return this.http.get<Rick[]>(url)
      .pipe(
        map(ricks => ricks[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} rick id=${id}`);
        }),
        catchError(this.handleError<Rick>(`getRick id=${id}`))
      );
  }

  getRick(id: number): Observable<Rick> {
    const url = `${this.ricksUrl}/${id}`;
    return this.http.get<Rick>(url).pipe(
      tap(_ => this.log(`Rick avistado no universo id=${id}`)),
      catchError(this.handleError<Rick>(`getRick id=${id}`))
    );
  }

  searchRicks(term: string): Observable<Rick[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Rick[]>(`${this.ricksUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`Encontradas ocorrências de Rick em "${term}"`)),
      catchError(this.handleError<Rick[]>('searchRicks', []))
    );
  }

  addRick (rick: Rick): Observable<Rick> {
    return this.http.post<Rick>(this.ricksUrl, rick, httpOptions).pipe(
      tap((rick: Rick) => this.log(`added rick w/ id=${rick.id}`)),
      catchError(this.handleError<Rick>('addRick'))
    );
  }

  deleteRick (rick: Rick | number): Observable<Rick> {
    const id = typeof rick === 'number' ? rick : rick.id;
    const url = `${this.ricksUrl}/${id}`;

    return this.http.delete<Rick>(url, httpOptions).pipe(
      tap(_ => this.log(`Log do universo excluído! id=${id}`)),
      catchError(this.handleError<Rick>('deleteRick'))
    );
  }

  updateRick (rick: Rick): Observable<any> {
    return this.http.put(this.ricksUrl, rick, httpOptions).pipe(
      tap(_ => this.log(`Universo de Rick atualizado! id=${rick.id}`)),
      catchError(this.handleError<any>('updateRick'))
    );
  }

  /**
   * @param operation
   * @param result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // console.error(error);

      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`RickService: ${message}`);
  }
}
