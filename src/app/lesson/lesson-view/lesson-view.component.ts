import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {LessonService} from '../lesson.service';
import {KeyboardLayoutType} from '../_models/keyboard.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Score} from '../../score/_models/scroe.model';

@Component({
  selector: 'app-lesson-view',
  templateUrl: './lesson-view.component.html',
  styleUrls: ['./lesson-view.component.scss']
})
export class LessonViewComponent implements OnInit {

  @Input() score: Score;
  @Output() scoreIncrement = new EventEmitter<number>();

  readonly MAX_LESSON = LessonService.MAX_LESSON;
  readonly LONG_LESSON_NUMBER = LessonService.LONG_LESSON_NUMBER;

  lessonNumber = 1;
  lesson = '';
  cursorPos = 0;

  errorMessage = '';
  finishedMessage = '';
  lessonScore = 0;

  layoutType: KeyboardLayoutType = 'qwerty';
  layoutOptions: { name: string, value: KeyboardLayoutType }[] =
    [{name: 'QWERTY', value: 'qwerty'}, {name: 'Pali Meāt', value: 'paliMeat'}];


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
        this.finishedMessage = '';
        this.errorMessage = '';
        this.lessonScore = 0;
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
    if (this.lessonService.keepFocus) {
      this.textarea.nativeElement.focus();
    }
  }

  onKey(event: { key: string }) {
    const textArea = this.textarea.nativeElement;
    let key = event.key;

    // ignore windows \r ...
    if (key === '\r') {
      return;
    } else if (key.toLowerCase() === 'enter') {
      key = '\n';
    }

    if (this.finishedMessage) {
      // TODO: do something here to communicate that the lesson is finished (shake animation for the textArea?)
    } else if (this.matchesLessonWithSpace(key, this.cursorPos)) {
      this.cursorPos++;
      this.correctKey(textArea, key);
    } else if (this.matchesLesson(key, this.cursorPos)) {
      this.correctKey(textArea, key);
    } else {
      this.resetAndDisplayError(textArea);
    }

    if (!this.finishedMessage && this.cursorPos >= this.lesson.length) {
      this.lessonScore += 100 * this.lessonNumber;
      this.finishedMessage = `Lesson completed! High score +${this.lessonScore} 🙌`;
      this.scoreIncrement.emit(this.lessonScore);
      this.lessonScore = 0;
    }
  }

  makeLessonLink(offset = 0) {
    return `/lesson/${this.layoutType}/${this.lessonNumber + offset}`;
  }

  // if the user does not press the space / return button, that's fine
  private matchesLessonWithSpace(key: string, cursorPos: number) {
    return this.matchesLesson(' ', cursorPos) &&
      this.matchesLesson(key, cursorPos + 1);
  }

  private matchesLesson(key: string, cursorPos: number) {
    return this.lesson.charAt(cursorPos) === key;
  }

  // we are strict about making errors -> generate new lesson and restart
  private resetAndDisplayError(textArea: HTMLTextAreaElement) {
    this.lesson = this.lessonService.make(this.lessonNumber, this.layoutType);
    textArea.setSelectionRange(0, 0);
    this.cursorPos = 0;
    this.errorMessage = 'You missed a character, please start over!';
    this.lessonScore = this.lessonScore > 20 ? this.lessonScore - 20 : 0;
    if (this.lessonScore > 0) {
      this.scoreIncrement.emit(this.lessonScore);
      this.errorMessage += ` High score +${this.lessonScore}`;
    }
    this.lessonScore = 0;
  }

  private correctKey(textArea: HTMLTextAreaElement, key: string) {
    textArea.setSelectionRange(0, ++this.cursorPos);
    this.errorMessage = '';
    if (key !== ' ') {
      this.lessonScore++;
    }
  }

}
