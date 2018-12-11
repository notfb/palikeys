import {Component, OnInit} from '@angular/core';
import {LessonService} from './lesson.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Error} from 'tslint/lib/error';
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
      }
    );
  }

  onKeyboardLayoutChange() {
    this.router.navigate(['lesson', this.layoutType, this.lessonNumber]);
  }

  // The text area needs to keep the focus to make sure key events are send to it.
  onTextAreaBlur(): void {
    this.getTextArea().focus();
  }

  onKey({key}: { key: string }) {
    const textArea = this.getTextArea();
    this.clearError();

    if (this.matchesLessonWithSpace(key, this.cursorPos)) {
      this.cursorPos++;
      textArea.setSelectionRange(0, ++this.cursorPos);
    } else if (this.matchesLesson(key, this.cursorPos)) {
      textArea.setSelectionRange(0, ++this.cursorPos);
    } else {
      this.resetAndDisplayError(textArea);
    }
  }

  private getTextArea() {
    // TODO: is there an angular way of getting the element?
    const textArea = document.getElementById('lessonTextArea') as (HTMLTextAreaElement | null);
    if (!textArea) {
      throw new Error('Failed to get lessonTextArea HTML element');
    }
    return textArea;
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

  private clearError() {
    this.errorMessage = '';
  }

}
