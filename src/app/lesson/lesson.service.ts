import {Injectable} from '@angular/core';
import {Error} from 'tslint/lib/error';
import {KeyboardLayoutType} from './_models/keyboard.model';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  readonly qwerty = {
    numberRow: '§1234567890-='.split(''),
    topRow: 'qwertyuiop[]'.split(''),
    homeRow: 'asdfghjkl;\'\\'.split(''),
    bottomRow: '`zxcvbnm,./'.split('')
  };

  readonly paliMeat = {
    numberRow: '§1234567890-='.split(''),
    topRow: 'ūbokpvmurl[]'.split(''),
    homeRow: 'meātsnhai;\'\\'.split(''),
    bottomRow: '`ḍgcdjñy,./'.split('')
  };

  readonly layouts = {qwerty: this.qwerty, paliMeat: this.paliMeat};


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
        chars = [...basicHomeRow, layout.topRow[3], layout.topRow[6]];
        break;
      case 6:
        chars = [...basicHomeRow, layout.topRow[2], layout.topRow[3], layout.topRow[6], layout.topRow[7]];
        break;
      case 7:
        chars = [...basicHomeRow, layout.topRow[1], layout.topRow[2], layout.topRow[3], layout.topRow[6], layout.topRow[7],
          layout.topRow[8]];
        break;
      case 8:
        chars = [...basicHomeRow, ...basicTopRow];
        break;
      case 9:
        chars = [...basicHomeRow, layout.bottomRow[3], layout.bottomRow[7]];
        break;
      case 10:
        chars = [...basicHomeRow, layout.bottomRow[3], layout.bottomRow[4], layout.bottomRow[6], layout.bottomRow[7]];
        break;
      case 11:
        chars = [...basicHomeRow, ...basicBottomRow];
        break;
      case 12:
        chars = [...basicHomeRow, ...basicBottomRow, layout.topRow[2], layout.topRow[3], layout.topRow[6], layout.topRow[7]];
        break;
      case 13:
        chars = [...basicHomeRow, ...basicTopRow, ...basicBottomRow];
        break;
      case 14:
        chars = [...layout.homeRow, ...basicTopRow, ...basicBottomRow];
        break;
      case 15:
        chars = [...layout.homeRow, ...layout.topRow, ...basicBottomRow];
        break;
      case 16:
        chars = [...layout.homeRow, ...basicTopRow, ...layout.bottomRow];
        break;
      case 17:
        chars = [...layout.homeRow, ...layout.topRow, ...layout.bottomRow];
        break;
      case 18:
        chars = [...basicHomeRow, ...basicTopRow, ...basicBottomRow, ...basicNumberRow];
        break;
      case 19:
        chars = [...layout.homeRow, ...layout.topRow, ...layout.bottomRow, ...basicNumberRow];
        break;
      case 20:
        chars = [...layout.homeRow, ...layout.topRow, ...layout.bottomRow, ...layout.numberRow];
        break;

      default:
        throw new Error(`Invalid lesson number: ${lessonNumber}`);
    }

    return this.makeLessonFromChars(chars, length);
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
    return lesson;
  }
}
