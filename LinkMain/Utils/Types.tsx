// types/Message.ts
export interface Reaction {
  message_id: number;
  reaction_type: 'like' | 'love' | 'laugh' | 'angry';
  reacted_by_user_id: number;
  reacted_by_username: string;
  reactor_Pic: string;
}

export interface Message {
  message_id: number;
  content: string;
  sent_at: string;
  deleted_at: string;
  is_deleted: 'Y' | 'N';
  deleter_id: number | null;
  reply_to_message_id: number | null;
  sender_id: number;
  sender_username: string;
  sender_Pic: string;
  status: 'seen' | 'sent' | 'delivered';
  status_updated_at: string;
  replayed_Message: string | null;
  reactions: Reaction[];
}
