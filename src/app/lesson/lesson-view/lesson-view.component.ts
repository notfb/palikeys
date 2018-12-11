import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {LessonService} from '../lesson.service';
import {KeyboardLayoutType} from '../_models/keyboard.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Score} from '../../score/_models/scroe.model';

@Component({
  selector: 'app-lesson-view',
  templateUrl: './lesson-view.component.html',
  styleUrls: ['./lesson-view.component.scss']
})
export class LessonViewComponent implements OnInit, OnChanges {

  @Input() score: Score;
  @Output() scoreChanged = new EventEmitter<number>();

  readonly MAX_LESSON = 20;

  lessonNumber = 1;
  lesson = '';
  cursorPos = 0;
  errorMessage = '';

  layoutType: KeyboardLayoutType = 'qwerty';
  layoutOptions: { name: string, value: KeyboardLayoutType }[] =
    [{name: 'QWERTY', value: 'qwerty'}, {name: 'Pali Meāt', value: 'paliMeat'}];

  realTimeScore = 0;
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

  ngOnChanges(changes: SimpleChanges) {
    if (this.score) {
      // TODO: maybe realTimeScore should just be the score of the current lesson and then add the score from network...
      this.realTimeScore = this.score.score;
    }
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
      this.realTimeScore += 100 * this.lessonNumber;
      this.scoreChanged.emit(this.realTimeScore);
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
    this.realTimeScore = this.realTimeScore > 10 ? this.realTimeScore - 10 : 0;
    this.scoreChanged.emit(this.realTimeScore);
  }

  private correctKey(textArea: HTMLTextAreaElement, key: string) {
    textArea.setSelectionRange(0, ++this.cursorPos);
    this.errorMessage = '';
    if (key !== ' ') {
      this.realTimeScore++;
    }
  }

}
