import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {  MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-azkar-card-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule, MatDialogModule],
  templateUrl: './azkar-list-card.component.html',
  styleUrl: './azkar-list-card.component.css',
})
export class AzkarCardListComponent {
  @Input() items: any[] = [];
  @Output() moreAzkars = new EventEmitter<string>();

  constructor(private router: Router) { }
  loadContent(id : string, hasSubCategories: boolean)
  {
    if (hasSubCategories)
      this.moreAzkars.emit(id);
    else
    this.router.navigate(['/islamic/azkar/content', id]);
  }
}
