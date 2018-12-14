import {Injectable} from '@angular/core';
import {KeyboardLayoutType} from './_models/keyboard.model';
import {englishLong, paliLong} from './longTexts';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  // TODO: remove  this dirty hack and handle the focus issue properly
  keepFocus = true;

  static readonly MAX_LESSON = 25;
  static readonly LONG_LESSON_NUMBER = 23;

  private readonly qwerty = {
    numberRow: '§1234567890-='.split(''),
    topRow: 'qwertyuiop[]'.split(''),
    homeRow: 'asdfghjkl;\'\\'.split(''),
    bottomRow: '`zxcvbnm,./'.split(''),
    homeRowWords: ['add', 'alaska', 'as', 'ask', 'dad', 'fad', 'flagfalls', 'gag', 'gal', 'galagala', 'galahads', 'hadassahs',
      'haggadahs', 'hash', 'haskalah', 'lad', 'lag', 'saga', 'salad', 'salads', 'shakalshas', 'shall', 'slash'],
    texts: englishLong
  };

  private readonly paliMeat = {
    numberRow: '§1234567890-='.split(''),
    topRow: 'ūbokpvmurl[]'.split(''),
    homeRow: 'meātsnhai;\'\\'.split(''),
    bottomRow: '`ḍgcdjñy,./'.split(''),
    homeRowWords: ['a-hata', 'a-hita', 'a-hiṃsā', 'a-hāsa', 'a-nissita', 'a-sa', 'a-sacca', 'a-sahana', 'a-sahita', 'a-sat', 'a-sati',
      'a-satta', 'a-sattha', 'a-sesa', 'a-sita', 'a-sāhasa', 'a-sāta', 'a-tithi', 'a-titta', 'a-tittha', 'ahaha', 'ahaṃ',
      'ahaṃ', 'ahe', 'ahi', 'ahāsi', 'an-anta', 'an-attha', 'an-itthi', 'anamha', 'anantaṃ', 'anattattā', 'anattā', 'anna',
      'anna', 'annā', 'ant-antena', 'anta', 'anta', 'antati', 'ante', 'antena', 'anti', 'antānanta', 'asa', 'asanta', 'asanti',
      'asati', 'asati', 'asaṃ', 'asi', 'asita', 'asita', 'asma', 'assa', 'assasati', 'assasi', 'assattha', 'assita', 'assā',
      'assāseti', 'atha', 'ati', 'ati-santa', 'ati-sithila', 'att-attha', 'atta', 'atta', 'attanā', 'attha', 'atthata', 'atthaṃ',
      'atthe', 'atthi', 'atthi', 'aṃsa', 'aṃsa', 'aṃsi', 'aṃsā', 'ehi', 'ena', 'enta', 'esa', 'esana', 'esanā', 'esati', 'esi',
      'esā', 'eta', 'etaṃ', 'ete', 'eti', 'etta', 'ettha', 'etā', 'etāni', 'ha', 'hanta', 'hatthi', 'hatthinā', 'hatthā', 'hi',
      'iha', 'isi', 'isitta', 'issati', 'issattha', 'issita', 'issā', 'issāsa', 'ita', 'iti', 'itthatta', 'itthaṃ', 'itthi', 'lsata',
      'lseti', 'na', 'naṃ', 'netaṃ', 'nissinnā', 'nissitaṃ', 'nitthitaṃ', 'sa', 'saha', 'sahassa', 'sahasā', 'sahati', 'sahatthena',
      'sahatthā', 'sahita', 'sanantaṃ', 'santa', 'santasati', 'santasita', 'santataṃ', 'santati', 'santatta', 'santhana', 'santhata',
      'santhāna', 'santi', 'santāna', 'santāneti', 'santāsa', 'santāsin', 'sasa', 'sasati', 'sassa', 'sassata', 'sat', 'sata', 'satataṃ',
      'sataṃ', 'sati', 'satima', 'satimat', 'satta', 'sattama', 'sattati', 'satthā', 'saṃ', 'saṃhanana', 'saṃhanati', 'saṃhasati',
      'saṃhata', 'saṃhita', 'saṃsad', 'saṃsanna', 'saṃsati', 'saṃsatta', 'saṃsattha', 'saṃvihita', 'se', 'sehi', 'sena', 'senaṃ',
      'senā', 'senāsana', 'sesa', 'seseti', 'seta', 'seti', 'sevana', 'sevati', 'sevā', 'sineha', 'sinehana', 'sineheti', 'sinehita',
      'sinna', 'sissati', 'sita', 'sitta', 'sittha', 'siṃsā', 'sā', 'sāhasa', 'sāhasaṃ', 'sāhasena', 'sāsa', 'sāsana', 'sāsanā',
      'sāsava', 'ta', 'tahaṃ', 'tahiṃ', 'tassa', 'tatta', 'tattha', 'taṃ', 'te', 'tehi', 'tena', 'tenā', 'tesaṃ', 'theta', 'ti',
      'tini', 'tinta', 'tissa', 'tithi', 'titta', 'tittha', 'tiṃsa', 'tiṃsati', 'tā', 'tāhaṃ', 'tāni', 'tāsa', 'tāsaṃ', 'tāseti',
      'tāsita', 'tāta', 'āna', 'ānana', 'ānana', 'ānata', 'āneti', 'āsa', 'āsana', 'āsanna', 'āsannaṃ', 'āsanā', 'āsasāna', 'āsati',
      'āsatta', 'āsatta', 'āsatti', 'āsaṃ', 'āsaṃsa', 'āsaṃsati', 'āsaṃsā', 'āsbnn', 'āsi', 'āsimhā', 'āsisanā', 'āsisitattaṃ', 'āsita',
      'āsitta', 'āsittha', 'āsiṃ', 'āsiṃsanā', 'āsiṃsati', 'āsiṃsitattaṃ', 'āsā', 'ātata', 'ātatta'],
    texts: paliLong
  };

  private readonly layouts = {qwerty: this.qwerty, paliMeat: this.paliMeat};

  make(lessonNumber: number, layoutType: KeyboardLayoutType = 'qwerty', length: number = 10 * 50) {
    const layout = this.layouts[layoutType];
    if (!layout) {
      throw new Error(`Invalid keyboard layout type ${layoutType}`);
    }

    // rows with out special characters (on most layouts)
    const basicHomeRow = layout.homeRow.slice(0, 9);
    const basicTopRow = layout.topRow.slice(0, 10);
    const basicBottomRow = layout.bottomRow.slice(1, 8);
    const basicNumberRow = layout.numberRow.slice(1, 11);
    let chars: string[] = [];
    let words: string[] = [];
    switch (lessonNumber) {
      case 1:
        chars = [layout.homeRow[3], layout.homeRow[6]];
        break;
      case 2:
        chars = [layout.homeRow[2], layout.homeRow[3], layout.homeRow[6], layout.homeRow[7]];
        break;
      case 3:
        chars = [layout.homeRow[1], layout.homeRow[2], layout.homeRow[3], layout.homeRow[6], layout.homeRow[7], layout.homeRow[8]];
        break;
      case 4:
        chars = basicHomeRow;
        break;
      case 5:
        words = layout.homeRowWords.filter(word => !word.includes('-') && word.length < 5);
        break;
      case 6:
        words = layout.homeRowWords;
        break;
      case 7:
        chars = [...basicHomeRow, layout.topRow[3], layout.topRow[6]];
        break;
      case 8:
        chars = [...basicHomeRow, layout.topRow[2], layout.topRow[3], layout.topRow[6], layout.topRow[7]];
        break;
      case 9:
        chars = [...basicHomeRow, layout.topRow[1], layout.topRow[2], layout.topRow[3], layout.topRow[6], layout.topRow[7],
          layout.topRow[8]];
        break;
      case 10:
        chars = [...basicHomeRow, ...basicTopRow];
        break;
      case 11:
        chars = [...basicHomeRow, layout.bottomRow[3], layout.bottomRow[7]];
        break;
      case 12:
        chars = [...basicHomeRow, layout.bottomRow[3], layout.bottomRow[4], layout.bottomRow[6], layout.bottomRow[7]];
        break;
      case 13:
        chars = [...basicHomeRow, ...basicBottomRow];
        break;
      case 14:
        chars = [...basicHomeRow, ...basicBottomRow, layout.topRow[2], layout.topRow[3], layout.topRow[6], layout.topRow[7]];
        break;
      case 15:
        chars = [...basicHomeRow, ...basicTopRow, ...basicBottomRow];
        break;
      case 16:
        chars = [...layout.homeRow, ...basicTopRow, ...basicBottomRow];
        break;
      case 17:
        chars = [...layout.homeRow, ...layout.topRow, ...basicBottomRow];
        break;
      case 18:
        chars = [...layout.homeRow, ...basicTopRow, ...layout.bottomRow];
        break;
      case 19:
        chars = [...layout.homeRow, ...layout.topRow, ...layout.bottomRow];
        break;
      case 20:
        chars = [...basicHomeRow, ...basicTopRow, ...basicBottomRow, ...basicNumberRow];
        break;
      case 21:
        chars = [...layout.homeRow, ...layout.topRow, ...layout.bottomRow, ...basicNumberRow];
        break;
      case 22:
        chars = [...layout.homeRow, ...layout.topRow, ...layout.bottomRow, ...layout.numberRow];
        break;
      case 23:
        return layout.texts[0];
      case 24:
        return layout.texts[1];
      case 25:
        return layout.texts[2];

      default:
        throw new Error(`Invalid lesson number: ${lessonNumber}`);
    }

    if (words.length > 0) {
      return this.makeLessonFromWords(words, length);
    }
    return this.makeLessonFromChars(chars, length);
  }

  calcWordsPerMinute(timeStampStart: number, lesson: string, cursorPos: number): number {
    return Math.round(lesson.trim().slice(0, cursorPos).split(/\s/).length / ((Date.now() - timeStampStart) / 60000));
  }

  private makeLessonFromChars(chars: string[], length: number) {
    let lesson = '';
    for (let i = 1; i <= length; i++) {
      if (i % 5 !== 0) {
        lesson += chars[Math.floor(Math.random() * chars.length)];
      } else {
        lesson += ' ';
      }
    }
    return lesson.trim();
  }

  private makeLessonFromWords(words: string[], length: number) {
    function adjustToFitTextArea(len: number) {
      return len - (len * 0.1);
    }

    length = adjustToFitTextArea(length);
    let lesson = '';

    while (lesson.length <= length) {
      const word = words[Math.floor(Math.random() * words.length)];
      if ((lesson + word).length >= length) {
        return lesson.trim();
      }
      lesson += word + ' ';
    }
    return lesson.trim();
  }
}
