export interface MessagesProps {
    userName: string,
    text: string,
    URL: string | undefined,
    createdAt: string
}

export interface User {
    id: string,
    userName: string,
    roomName: string
}