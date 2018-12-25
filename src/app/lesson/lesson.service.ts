import {Injectable} from '@angular/core';
import {KeyboardLayout, KeyboardLayoutType, LessonInput} from './_models/keyboard.model';
import {englishLong, paliLong} from './longTexts';
import {Error} from 'tslint/lib/error';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  // TODO: remove  this dirty hack and handle the focus issue properly
  keepFocus = true;

  // TODO: calc this value
  static readonly MAX_LESSON = 38;

  static readonly LONG_LESSON_NUMBER = 23;

  private readonly qwerty = {
    numberRow: '§1234567890-='.split(''),
    topRow: 'qwertyuiop[]'.split(''),
    homeRow: 'asdfghjkl;\'\\'.split(''),
    bottomRow: '`zxcvbnm,./'.split(''),
    homeRowWords: ['add', 'alaska', 'as', 'ask', 'dad', 'fad', 'flagfalls', 'gag', 'gal', 'galagala', 'galahads', 'hadassahs',
      'haggadahs', 'hash', 'haskalah', 'lad', 'lag', 'saga', 'salad', 'salads', 'shakalshas', 'shall', 'slash', 'jfk'],
    texts: englishLong
  };

  private readonly qwqr = {
    // TODO: first key on number row is Tab, how to map that?
    numberRow: '§1234567890-='.split(''),
    topRow: 'qwprfyukl:[]'.split(''),
    homeRow: 'asdtghnioe\''.split(''),
    bottomRow: '`zxcvbjm,./'.split(''),
    homeRowWords: ['add', 'add', 'again', 'against', 'age', 'agent', 'ago', 'ahead', 'and', 'as', 'at', 'attention',
      'dad', 'data', 'dead', 'death', 'design', 'die', 'disease', 'do', 'dog', 'east', 'eat', 'edge', 'eight', 'end',
      'gag', 'gas', 'get', 'go', 'good', 'hadassahs', 'haggadahs', 'hand', 'hang', 'hash', 'he', 'head', 'heat', 'high',
      'his', 'hit', 'hot', 'idea', 'in', 'indeed', 'inside', 'instead', 'into', 'it', 'its', 'nation', 'need', 'night', 'no',
      'none', 'not', 'note', 'nothing', 'oh', 'on', 'one', 'onto', 'saga', 'sangha', 'sea', 'season', 'seat', 'see', 'seed',
      'send', 'sense', 'sense', 'set', 'she', 'shoot', 'shot', 'side', 'sign', 'sing', 'sit', 'site', 'so', 'son', 'song',
      'sonnet', 'soon', 'stage', 'stand', 'state', 'station', 'ten', 'tend', 'test', 'than', 'that', 'the', 'then'],
    texts: englishLong
  };


  private readonly paliMeat = {
    numberRow: '§1234567890-='.split(''),
    topRow: 'ūbokpvmurl[]'.split(''),
    homeRow: 'ṃeātsnhai;\'\\'.split(''),
    bottomRow: '`ḍgcdjñy,./'.split(''),
    homeRowWords: ['ahata', 'ahita', 'ahiṃsā', 'ahāsa', 'anissita', 'asa', 'asahana', 'asahita', 'asat', 'asati',
      'asatta', 'asattha', 'asesa', 'asita', 'asāhasa', 'asāta', 'atithi', 'atitta', 'atittha', 'ahaha', 'ahaṃ',
      'ahaṃ', 'ahe', 'ahi', 'ahāsi', 'ananta', 'anattha', 'anitthi', 'anantaṃ', 'anattattā', 'anattā', 'anna', 'anna', 'annā',
      'antantena', 'anta', 'anta', 'antati', 'ante', 'antena', 'anti', 'antānanta', 'asa', 'asanta', 'asanti', 'asati', 'asati',
      'asaṃ', 'asi', 'asita', 'asita', 'assa', 'assasati', 'assasi', 'assattha', 'assita', 'assā', 'assāseti', 'atha', 'ati',
      'atisanta', 'attattha', 'atta', 'atta', 'attanā', 'attha', 'atthata', 'atthaṃ', 'atthe', 'atthi', 'atthi', 'aṃsa',
      'aṃsa', 'aṃsi', 'aṃsā', 'ehi', 'ena', 'enta', 'esa', 'esana', 'esanā', 'esati', 'esi', 'esā', 'eta', 'etaṃ', 'ete', 'eti',
      'etta', 'ettha', 'etā', 'etāni', 'ha', 'hanta', 'hatthi', 'hatthinā', 'hatthā', 'hi', 'iha', 'isi', 'isitta', 'issati', 'issattha',
      'issita', 'issā', 'issāsa', 'ita', 'iti', 'itthatta', 'itthaṃ', 'itthi', 'na', 'naṃ', 'netaṃ', 'nissinnā', 'nissitaṃ',
      'nitthitaṃ', 'sa', 'saha', 'sahassa', 'sahasā', 'sahati', 'sahatthena', 'sahatthā', 'sahita', 'sanantaṃ', 'santa',
      'santasati', 'santasita', 'santataṃ', 'santati', 'santatta', 'santhana', 'santhata', 'santhāna', 'santi', 'santāna', 'santāneti',
      'santāsa', 'santāsin', 'sasa', 'sasati', 'sassa', 'sassata', 'sat', 'sata', 'satataṃ', 'sataṃ', 'sati', 'satta', 'sattati',
      'satthā', 'saṃ', 'saṃhanana', 'saṃhanati', 'saṃhasati', 'saṃhata', 'saṃhita', 'saṃsanna', 'saṃsati', 'saṃsatta',
      'saṃsattha', 'se', 'sehi', 'sena', 'senaṃ', 'senā', 'senāsana', 'sesa', 'seseti', 'seta', 'seti', 'sineha', 'sinehana', 'sineheti',
      'sinehita', 'sinna', 'sissati', 'sita', 'sitta', 'sittha', 'siṃsā', 'sā', 'sāhasa', 'sāhasaṃ', 'sāhasena', 'sāsa', 'sāsana',
      'sāsanā', 'ta', 'tahaṃ', 'tahiṃ', 'tassa', 'tatta', 'tattha', 'taṃ', 'te', 'tehi', 'tena', 'tenā', 'tesaṃ', 'theta', 'ti',
      'tini', 'tinta', 'tissa', 'tithi', 'titta', 'tittha', 'tiṃsa', 'tiṃsati', 'tā', 'tāhaṃ', 'tāni', 'tāsa', 'tāsaṃ', 'tāseti',
      'tāsita', 'tāta', 'āna', 'ānana', 'ānana', 'ānata', 'āneti', 'āsa', 'āsana', 'āsanna', 'āsannaṃ', 'āsanā', 'āsasāna', 'āsati',
      'āsatta', 'āsatta', 'āsatti', 'āsaṃ', 'āsaṃsa', 'āsaṃsati', 'āsaṃsā', 'āsi', 'āsisanā', 'āsisitattaṃ', 'āsita', 'āsitta',
      'āsittha', 'āsiṃ', 'āsiṃsanā', 'āsiṃsati', 'āsiṃsitattaṃ', 'āsā', 'ātata', 'ātatta'],
    texts: paliLong
  };

  private readonly layouts = {qwerty: this.qwerty, qwpr: this.qwqr, paliMeat: this.paliMeat};

  layout(layoutType: KeyboardLayoutType): KeyboardLayout {
    const layout = this.layouts[layoutType];
    if (!layout) {
      throw new Error(`Invalid keyboard layout type ${layoutType}`);
    }
    return {
      topRow: [...layout.topRow],
      homeRow: [...layout.homeRow],
      bottomRow: [...layout.bottomRow],
    };
  }

  make(lessonNumber: number, layoutType: KeyboardLayoutType = 'qwerty', length: number = 10 * 50) {
    const {chars, words, text}: LessonInput = this.makeLessonInput(lessonNumber, layoutType);

    if (text) {
      return text;
    }
    if (words.length > 0) {
      return this.makeLessonFromWords(words, length);
    }
    return this.makeLessonFromChars(chars, length);
  }

  makeLessonInput(lessonNumber: number, layoutType: KeyboardLayoutType): LessonInput {
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
    let text = '';
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
      default:
        if (lessonNumber - LessonService.LONG_LESSON_NUMBER < layout.texts.length) {
          text = layout.texts[lessonNumber - LessonService.LONG_LESSON_NUMBER];
        } else {
          throw new Error(`Invalid lesson number: ${lessonNumber}`);
        }
    }
    return {chars, words, text};
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
