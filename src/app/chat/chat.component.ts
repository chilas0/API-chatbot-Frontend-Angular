import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChatService } from '../shared/chat.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  
})
export class ChatComponent implements AfterViewChecked {

  
  formChat: FormGroup;
  messages: any[] = [];
  loggedInUserName = 'user';
  @ViewChild('scrollMe') private scrollContainer!: ElementRef;

  constructor(
    private fb: FormBuilder, 
    private serviceChat: ChatService,
    private router: Router){
    this.formChat = this.fb.group({
      message: ['', Validators.required]
    });
  }

  //Has a control to scroll on chat 
  ngAfterViewChecked(): void {
    this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
  }

  //Show the welcome message 
  ngOnInit():void{
    const nuevoMensaje = {
      message: "Hello, I am Markia and I can help you in some question about our store.",
      user: "sam",
    };
    this.messages.push(nuevoMensaje);
  }

  //Recibe a user message and send to service chat and subscribe to observable 
  public onFormSubmit(){
    const nuevoMensaje = {
      message: this.formChat.value.message,
      user: "user",
    };
    this.messages.push(nuevoMensaje);
    this.serviceChat.sendMessage(this.formChat.value).subscribe(
      (res:any) => {
        const nuevoMensajeResponse = {
          message: res.response,
          user: "sam",
        };
        this.formChat.reset();
        return this.messages.push(nuevoMensajeResponse);
      },
      (err: any) => {
        alert("Connection error");
      },
    )
  }

  //Leave the chat and remove token 
  leaveChat(){
    localStorage.removeItem('token_');
    this.router.navigate(['/login']);

  }
}
