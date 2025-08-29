import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AzkarService } from '../../../../shared/services/azkar.service';
import { AzkarCardListComponent } from '../../../../shared/components/azkar-list-card.component';

@Component({
  selector: 'app-azkar-list',
  standalone: true,
  imports: [CommonModule,AzkarCardListComponent],
  templateUrl: './azkar-list.component.html',
})
export class AzkarListComponent {
  azkars: any[] = [];
  pageSize = 6;
  pageNumber = 1;
  hasNextPage = true;
  constructor(
    private azkarService: AzkarService,
  ) {}

  ngOnInit() {
    this.loadMore(false);
  }
  loadMore(flag: boolean) {
    if (flag) {
      this.pageNumber = 1;
      this.azkars = [];
    }
    this.azkarService
      .getAzkars()
      .subscribe({
        next: (data) => {
          this.azkars.push(...data.items);
          this.pageNumber += 1;
          this.hasNextPage = data.hasNextPage;
        },
        error: (err) => console.error(err),
      });
  }
  loadSubCategories(id: string) {
    this.azkarService.getSubCategories(id).subscribe({
      next: (data) => {
        this.azkars = [];
        this.azkars.push(...data.items);
        this.pageNumber += 1;
        this.hasNextPage = data.hasNextPage;
      },
      error: (err) => console.error(err),
    });
  }
}
