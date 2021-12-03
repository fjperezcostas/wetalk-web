import { Pipe, PipeTransform } from '@angular/core';
import { Chat } from 'src/app/model/chat';
import { ChatType } from 'src/app/model/chat-type';

@Pipe({
  name: 'filterChatByType',
  pure: false
})
export class FilterChatByTypePipe implements PipeTransform {

  transform(chats: Chat[], type: ChatType): Chat[] {
    return chats.filter(x => x.type === type);
  }
  
}
