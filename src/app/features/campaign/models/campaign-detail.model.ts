export interface CampaignDetailModel {
  title: string;
  expiryDate: Date;
  totalReward: number;
  totalParticipants: number;
  distributionType: string;
  rewardTypeName: string;
  id: number;
  participants: ParticipantListModel[];
}
export interface ParticipantListModel {
  email: string;
  isClaimed: boolean;
  isRegistered: boolean;
  rewardAmount: number;
}
