export interface ScratchDetailModel {
  id: number;
  isExpired: boolean;
  isDeleted: boolean;
  canClaimReward: boolean;
  expiryDate: Date;
  claimRewards: ScratchParticiantsModel[];

}
export interface ScratchParticiantsModel {
  rewardAmount: number;
  isClaimed: boolean;
  isCurrentUser: boolean;
}
