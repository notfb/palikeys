import {Injectable} from '@angular/core';
import {Error} from 'tslint/lib/error';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  // TODO: make configureable
  readonly qwertyLayout = {
    numberRow: '§1234567890-='.split(''),
    topRow: 'qwertyuiop[]'.split(''),
    homeRow: 'asdfghjkl;\'\\'.split(''),
    lowerRow: '`zxcvbnm,./'.split('')
  };

  readonly meatLayout = {
    numberRow: '§1234567890-='.split(''),
    topRow: 'ūbokpvmurl[]'.split(''),
    homeRow: 'meātsnhai;\'\\'.split(''),
    lowerRow: '`ḍgcdjñy,./'.split('')
  };

  // TODO: do special characters in later lessons?
  make(lessonNumber: number, length: number = 10 * 50) {
    const layout = this.meatLayout;
    let chars: string[] = [];
    switch (lessonNumber) {
      case 1:
        chars = [layout.homeRow[3], layout.homeRow[6]];
        break;
      case 2:
        chars = [layout.homeRow[3], layout.homeRow[2], layout.homeRow[6], layout.homeRow[7]];
        break;
      case 3:
        chars = [layout.homeRow[3], layout.homeRow[2], layout.homeRow[1], layout.homeRow[6], layout.homeRow[7], layout.homeRow[8]];
        break;
      case 4:
        chars = layout.homeRow;
        break;
      case 5:
        chars = [...layout.homeRow, layout.topRow[3], layout.topRow[6]];
        break;
      case 6:
        chars = [...layout.homeRow, layout.topRow[3], layout.topRow[2], layout.topRow[6], layout.topRow[7]];
        break;
      case 7:
        chars = [...layout.homeRow, layout.topRow[3], layout.topRow[2], layout.topRow[1], layout.topRow[6], layout.topRow[7],
          layout.topRow[8]];
        break;
      case 8:
        chars = [...layout.homeRow, ...layout.topRow];
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
