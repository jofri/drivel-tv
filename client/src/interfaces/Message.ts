export interface MessageRaw {
  sender: string,
  msg: string,
  room: string
}

export interface Message extends MessageRaw {
  __v: number,
  _id: string,
  createdAt: string
}
