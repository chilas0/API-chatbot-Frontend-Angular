import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http:HttpClient) { }

  //Send message to chatBot in Python 
  sendMessage(sendingMessage: any):Observable<any>{
    return this.http.post<any>(" http://127.0.0.1:8000/send", {"message":sendingMessage.message});
  }
}
