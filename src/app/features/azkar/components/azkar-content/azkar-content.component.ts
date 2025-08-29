import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { AzkarService } from '../../../../shared/services/azkar.service';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslationApiService } from '../../../../shared/services/translate.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-azkar-content',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatBadgeModule, MatProgressBarModule, MatSidenavModule, MatListModule],
  templateUrl: './azkar-content.component.html',
  styleUrl: './azkar-content.component.css',
})
export class AzkarContentComponent {
  content: any[] = [];
  Id: string = '';
  pageSize = 1;
  pageNumber = 1;
  hasNextPage = true;
  repeatTrack: number = 0;
  spinnerValue: number = 40;
  language: string = 'en';
  bookmarked: boolean = false;

  private currentAudio: HTMLAudioElement | null = null;
  private currentPlayingId: string | null = null;

  constructor(
    private azkarService: AzkarService,
    private translationApiService: TranslationApiService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.Id = this.route.snapshot.paramMap.get('id')!;
    this.loadMore(0);
  }

  loadMore(count: number) {
    if (count != this.repeatTrack && count != 0) {
      this.repeatTrack++;
      return;
    }
    if (!this.hasNextPage) this.goBack();

    this.azkarService.getAzkarContent(this.Id, this.pageNumber, this.pageSize).subscribe({
      next: async (data) => {
        this.content = [];
        this.bookmarked = data.items[0].isBookmarked;

        try {
          const audioObj = JSON.parse(data.items[0].audioUrl);
          data.items[0].audioUrl = audioObj.audioUrl;
        } catch {}

        this.content.push(...data.items);
        await this.translate(this.language);
        this.pageNumber += 1;
        this.hasNextPage = data.hasNextPage;
      },
      error: (err) => console.error(err),
    });

    this.repeatTrack = 0;
  }

  goBack(): void {
    this.location.back();
  }

  async translate(lang: string) {
    this.language = lang;
    if (this.content.length > 0) {
      this.content[0].translatedText = await this.translationApiService.translateText(
        this.content[0].description,
        lang
      );
    }
  }

  bookmark(contentId: string) {
    this.azkarService.bookmarkAzkar(contentId).subscribe({
      next: () => (this.bookmarked = !this.bookmarked),
      error: (err) => console.error(err),
    });
  }

  toggleAudio(c: any) {
    if (this.currentPlayingId === c.id && this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
      this.currentPlayingId = null;
      return;
    }

    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }

    this.currentAudio = new Audio(c.audioUrl);
    this.currentPlayingId = c.id;
    this.currentAudio.play().catch(err => console.error("Audio play failed:", err));

    this.currentAudio.onended = () => {
      this.currentPlayingId = null;
      this.currentAudio = null;
    };
  }

  isPlaying(c: any): boolean {
    return this.currentPlayingId === c.id && this.currentAudio !== null;
  }
}
