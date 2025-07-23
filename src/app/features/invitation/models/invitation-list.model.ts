export interface Invitation {
  id: number;
  title: string;
  expiryDate: Date;
  totalReward: number;
  createdBy: string;
  rewardTypeName: string;
  isClaimed: boolean;
  isExpired: boolean;
  claimedCount: number;
}
export interface InvitationListResponse {
  items: Invitation[];
  page: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages: number;
}
