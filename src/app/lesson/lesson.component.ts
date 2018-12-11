import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LessonService} from './lesson.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {KeyboardLayoutType} from './_models/keyboard.model';


@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {

  readonly MAX_LESSON = 20;

  lessonNumber = 1;
  lesson = '';
  cursorPos = 0;
  errorMessage = '';

  layoutType: KeyboardLayoutType = 'qwerty';
  layoutOptions: { name: string, value: KeyboardLayoutType }[] =
    [{name: 'QWERTY', value: 'qwerty'}, {name: 'Pali Meāt', value: 'paliMeat'}];

  score = 0;
  finished = false;

  @ViewChild('textArea') private textarea: ElementRef<HTMLTextAreaElement>;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private lessonService: LessonService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.lessonNumber = parseInt(params['lessonNumber'], 10);
        this.layoutType = params['layoutType'];
        this.lesson = this.lessonService.make(this.lessonNumber, this.layoutType);
        this.finished = false;
        this.cursorPos = 0;
        this.textarea.nativeElement.focus();
      }
    );
  }

  onKeyboardLayoutChange() {
    return this.router.navigate(['lesson', this.layoutType, this.lessonNumber]);
  }

  // The text area needs to keep the focus to make sure key events are send to it.
  onTextAreaBlur(): void {
    this.textarea.nativeElement.focus();

  }

  onKey({key}: { key: string }) {
    const textArea = this.textarea.nativeElement;

    if (this.finished) {
      // TODO: do something here to communicate that the lesson is finished
    } else if (this.matchesLessonWithSpace(key, this.cursorPos)) {
      this.cursorPos++;
      this.correctKey(textArea, key);
    } else if (this.matchesLesson(key, this.cursorPos)) {
      this.correctKey(textArea, key);
    } else {
      this.resetAndDisplayError(textArea);
    }

    if (!this.finished && this.cursorPos >= this.lesson.length) {
      this.finished = true;
      this.score += 100 * this.lessonNumber;
    }
  }

  makeLessonLink(offset = 0) {
    return `/lesson/${this.layoutType}/${this.lessonNumber + offset}`;
  }

  // if the user does not press the space button, that's fine
  private matchesLessonWithSpace(key: string, cursorPos: number) {
    return this.matchesLesson(' ', cursorPos) && this.matchesLesson(key, cursorPos + 1);
  }

  private matchesLesson(key: string, cursorPos: number) {
    return this.lesson.charAt(cursorPos) === key;
  }

  // we are strict about making errors -> generate new lesson and restart
  private resetAndDisplayError(textArea: HTMLTextAreaElement) {
    this.lesson = this.lessonService.make(this.lessonNumber);
    textArea.setSelectionRange(0, 0);
    this.cursorPos = 0;
    this.errorMessage = 'You missed a character, please start over!';
  }

  private correctKey(textArea: HTMLTextAreaElement, key: string) {
    textArea.setSelectionRange(0, ++this.cursorPos);
    this.errorMessage = '';
    if (key !== ' ') {
      this.score++;
    }
  }

}
