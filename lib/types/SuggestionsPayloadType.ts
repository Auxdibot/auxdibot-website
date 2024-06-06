export interface SuggestionsPayloadType {
    suggestionID: number
    messageID?: string
    creatorID: string
    status: 'WAITING' | 'APPROVED' | 'DENIED' | 'ADDED' | 'CONSIDERED'
    date_unix: number
    content: string
    handlerID?: string
    handled_reason?: string
}