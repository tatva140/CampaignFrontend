export interface NotificationsModel {
  id: number;
  participantId: number;
  title: string;
  content: string;
  markAsRead: boolean;
  createdDate: Date;
}
