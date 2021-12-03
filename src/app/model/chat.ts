import { Message } from './message';
import { ChatType } from './chat-type';

export class Chat {

    name: string;    
    type: ChatType;    
    messages: Message[];    
    pendingToRead: number;    
    online: boolean;

    constructor(name: string = '', type: ChatType = ChatType.CHANNEL) {
        this.name = name;
        this.type = type;
        this.messages = [];
        this.pendingToRead = 0;
        this.online = true;
    }
    
}