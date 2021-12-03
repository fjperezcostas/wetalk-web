export class Message {

    from: string;    
    date: Date;    
    content: string;
    
    constructor(from: string, content: string) {
        this.from = from;
        this.date = new Date();
        this.content = content;
    }

}