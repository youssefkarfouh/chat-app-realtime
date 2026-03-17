export interface IRoom {
    _id: string;
    name: string;
}


export interface IMessage {
    _id: string;
    roomId: string;
    senderId: string;
    username: string;
    text: string;
    createdAt: string;
}

