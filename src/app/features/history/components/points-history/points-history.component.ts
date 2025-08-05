import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { InvitationService } from '../../../../shared/services/invitation.service';
import { PointsHistoryCardComponent } from '../../../../shared/components/points-history-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-points-history',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    PointsHistoryCardComponent,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './points-history.component.html',
  styles: `
  .loadMore{
  background-color: rgba(0,102,167,1);
  color: white;
  }
  .full-width{
  width:30%
  }
  `,
})
export class PointsHistoryComponent {
  history: any[] = [];
  filteredDataSource: any[] = [];
  pageSize = 4;
  pageNumber = 1;
  hasNextPage = true;
  searchText: string = '';
  constructor(private invitationService: InvitationService) {
    this.filteredDataSource = [...this.history];
  }

  ngOnInit() {
    this.loadHistory(false);
  }
  loadHistory(flag: boolean = false, search: string = '') {
    if (flag) {
      this.pageNumber = 1;
      this.history = [];
    }
    this.invitationService
      .getPointsHistory(this.pageSize, this.pageNumber, search)
      .subscribe({
        next: (data) => {
          this.history.push(...data.items);
          this.pageNumber += 1;
          this.hasNextPage = data.hasNextPage;
        },
        error: (err) => console.error(err),
      });
  }

  onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.searchText = searchTerm;

    this.loadHistory(true, searchTerm);
  }
}
