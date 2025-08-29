import { Injectable } from '@angular/core';
import translate from 'translate';

@Injectable({ providedIn: 'root' })
export class TranslationApiService {
  constructor() {
    translate.engine = 'google';
  }

  async translateText(text: string, targetLang: string): Promise<string> {
    return await translate(text, { to: targetLang });
  }
}
