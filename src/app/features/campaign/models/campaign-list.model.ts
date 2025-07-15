export interface Campaign {
  id: number;
  title: string;
  expiryDate: Date;
  totalReward: number;
  totalParticipants: number;
  isExpired: boolean;
  claimedCount: number;
}
export interface CampaignListResponse {
  items: Campaign[];
  page: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages: number;
}
