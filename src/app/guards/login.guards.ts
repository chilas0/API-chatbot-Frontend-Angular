import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { ChatService } from "../shared/chat.service";
import { HttpHeaders } from "@angular/common/http";

export const loginGuard = () =>{

    const router = inject(Router);
    const chatService = inject(ChatService);
    let token = localStorage.getItem('token_');
    //header: 'Authorization'+ `Bearer ${token}`;
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',`Bearer ${token}`);
    if(localStorage.getItem('token_')){
        chatService.sendMessage(headers).subscribe({
            next: ((res: any) => {
                console.log(res);
            }),
            error: (err: any) => {
              console.log(err);
            }
        })
        return true;
    } else {
        router.navigate(['/login']);
        return false;
    }
}