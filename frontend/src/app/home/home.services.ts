import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable} from "rxjs";



@Injectable()
export class StackService {
  private stack = [];
  private baseUrl: string = 'http://localhost:3000/';
  private http = inject(HttpClient);
  private headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }

  getStack(): Observable<any> {
    return this.http.get(this.baseUrl + 'stack').pipe(map((response: any) => {
        const stack = response.data;
        
        return stack;
      }),
    catchError((error: any) => this.errorHandler(error, 'getStack()'))
    )
  }
    errorHandler(error: any, arg1: string): any {
        throw new Error("Erro.");
    }
}
