import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ChatService} from "../../services/Chat/chat.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/Auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['chat.component.scss']
})

export class ChatComponent implements OnChanges, OnInit, OnDestroy {
  chatForm: FormGroup;
  email: string;
  lastName: string;
  firstName: string;
  userEmail: string;
  private messageSubscription: Subscription = new Subscription();
  messages: any[] = [{text: '', fromMe: false, timestamp: '' }];
  @Input() currentFriend: any;

  constructor(private fb: FormBuilder, private chatService: ChatService, private auth: AuthService) {
    let usr = this.auth.getData();
    this.userEmail = '';
    if (usr) {
      this.userEmail = usr.email;
    }
    this.firstName = '';
    this.lastName = '';
    this.email = '';

    this.chatForm = this.fb.group({
      message: ['', [Validators.required, Validators.maxLength(450)]],
      file: ['']
    });

    this.messages = []


  }

  ngOnChanges(changes: SimpleChanges): void {
    this.messages = []
    if (changes['currentFriend']) {
      if(this.currentFriend)
      {
        this.firstName = this.currentFriend['firstName'];
        this.email = this.currentFriend['email'];
        this.lastName = this.currentFriend['lastName'];

        this.chatService.connectToFriendsRooms();


        let msgs = this.chatService.getMessagesFromLocalStorage(this.email)

        if(msgs){
          // console.log(msgs)
          this.messages = msgs.messages
        }
        this.updateMessageSubscription();
      }
    }
  }

  ngOnInit(): void {
    this.chatService.connectToFriendsRooms();

    this.messages = []
    let msgs = this.chatService.getMessagesFromLocalStorage(this.email)

    // @ts-ignore
    if(msgs != []){
      // console.log(msgs)
      // console.log(msgs.messages)
      console.log(msgs)
      this.messages = msgs.messages
    }
    this.updateMessageSubscription();



  }

  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
  }



  updateMessageSubscription(): void {
    this.chatService.connectToFriendsRooms();
    this.messageSubscription.unsubscribe();
    this.messageSubscription = this.chatService.getEncryptedMessages().subscribe((data: any) => {
      let date = new Date();
      let curDate = date.toLocaleString()
      let parsedData = JSON.parse(data)


      if(Array.isArray(this.messages) && this.email == parsedData['email']){
        console.log('this user')
        this.messages.push({ text: parsedData['decryptedMessage'], fromMe: false, timestamp: curDate });
        this.chatService.saveMessagesToLocalStorage(this.email, { text: parsedData['decryptedMessage'], fromMe: false, timestamp: curDate });
      }
      else{
        console.log('not this user')
        console.log(parsedData['decryptedMessage'])
        this.chatService.saveMessagesToLocalStorage(parsedData['email'], {text: parsedData['decryptedMessage'], fromMe: false, timestamp: curDate});
      }
    });
  }

  onSubmit(): void {
    if (this.chatForm.valid && this.currentFriend) {
      const message = this.chatForm.value.message;
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString();

      let file = this.chatForm.value.file;
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64String = reader.result?.toString() || '';
          this.chatService.sendMessage(base64String, this.currentFriend.email, formattedDate);
          this.messages.push({ text: base64String, fromMe: true, timestamp: formattedDate });
          this.chatForm.reset();
          this.chatService.saveMessagesToLocalStorage(this.email, {text: base64String, fromMe: true, timestamp: formattedDate});
        };
      } else {
        this.chatService.sendMessage(message, this.currentFriend.email, formattedDate);
        this.messages.push({ text: message, fromMe: true, timestamp: formattedDate });
        this.chatService.saveMessagesToLocalStorage(this.email, {text: message, fromMe: true, timestamp: formattedDate});
        this.chatForm.reset();
      }
    }
  }

  isBase64Image(str: string): boolean {
    return str.startsWith('data:image/');
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.chatForm.patchValue({
      file: file
    });
  }

}
