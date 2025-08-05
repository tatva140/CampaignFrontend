import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RewardDialogComponent } from '../../../../shared/components/reward-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { InvitationService } from '../../../../shared/services/invitation.service';

@Component({
  selector: 'app-scratch-cards',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule],
  templateUrl: './scratch-card.component.html',
  styleUrls: ['./scratch-card.component.css'],
})
export class ScratchCardComponent implements OnInit {
  cards: { id: string; isClaimed: boolean; rewardText: string }[] = [];
  scratchText: { isClaimed: boolean; rewardAmount: string }[] = [];
  id: number = 0;
  curUserReward: string = '0';
  canClaimReward: boolean = false;
  isExpired: boolean = false;
  isDeleted: boolean = false;
  campaignId: number = 0;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private location: Location,
    private invitationService: InvitationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id') || '0');
    this.invitationService.getScratchCardDetails(this.id).subscribe({
      next: (invitations) => {
        this.campaignId = invitations.id;
        this.canClaimReward = invitations.canClaimReward;
        this.isExpired = invitations.isExpired;
        this.isDeleted = invitations.isDeleted;
        if (invitations.isExpired || invitations.isDeleted) {
          return;
        }
        if (!invitations.canClaimReward) {
          this.router.navigate(['/invitation']);
          return;
        }

        if (invitations?.claimRewards) {
          for (const invitation of invitations.claimRewards) {
            if (invitation.isCurrentUser)
              this.curUserReward = invitation.rewardAmount.toString();
            if (!invitation.isCurrentUser && invitation.isClaimed) {
              this.scratchText.push({
                isClaimed: invitation.isClaimed,
                rewardAmount: invitation.rewardAmount.toString(),
              });
            }
          }
        }
        if (this.scratchText.length !== 9) {
          this.scratchText.push(
            ...Array(9 - this.scratchText.length).fill({
              isClaimed: false,
              rewardAmount: this.curUserReward,
            })
          );
        }
        this.setup();
      },
      error: (error) => {
        console.error('Error fetching invitations:', error);
        this.router.navigate(['/invitation']);
      },
    });
  }

  private async setup(): Promise<void> {
    this.generateCards();
    await this.initScratchCards();
  }

  generateCards(): void {
    const shuffled = this.shuffleArray(this.scratchText);
    this.cards = shuffled.map((val, index) => ({
      id: `scratch-card-${index}`,
      rewardText: val.rewardAmount,
      isClaimed: val.isClaimed,
    }));
  }

  private async initScratchCards(): Promise<void> {
    const { ScratchCard, SCRATCH_TYPE } = await import('scratchcard-js');

    this.cards.forEach((card) => {
      if (!card.isClaimed) {
        const sc = new ScratchCard(`#${card.id}`, {
          scratchType: SCRATCH_TYPE.CIRCLE,
          containerWidth: 120,
          containerHeight: 120,
          imageForwardSrc: `/scratch.webp`,
          htmlBackground: `<div></div>`,
          clearZoneRadius: 25,
          pointSize: 4,
          nPoints: 30,
          percentToFinish: 30,
          imageBackgroundSrc: '/scratch.webp',
          brushSrc: '/scratch.webp',
          enabledPercentUpdate: true,
          callback: () => {
            if (card.isClaimed) return;
            this.invitationService.claimReward(this.campaignId).subscribe({
              next: () => {
                console.log(`Reward claimed: ${card.rewardText}`);
              },
              error: (error) => {
                console.error('Error claiming reward:', error);
              },
            });
            this.router.navigate(['/invitation']);
            this.dialog.open(RewardDialogComponent, {
              data: { rewardText: card.rewardText },
            });
          },
        });
        sc.init().catch((err: any) => console.error(err));
      }
    });
  }

  private shuffleArray(
    array: { isClaimed: boolean; rewardAmount: string }[]
  ): { isClaimed: boolean; rewardAmount: string }[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  goBack(): void {
    this.location.back();
  }
}
