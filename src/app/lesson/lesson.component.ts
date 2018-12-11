import {Component, OnInit} from '@angular/core';
import {LessonService} from './lesson.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Error} from 'tslint/lib/error';
import {KeyboardLayoutType} from './_models/keyboard.model';


// TODO: if tab is activated make sure text area has focus again
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
  layout: KeyboardLayoutType = 'qwerty';
  errorMessage = '';

  constructor(private activatedRoute: ActivatedRoute,
              private lessonService: LessonService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.lessonNumber = parseInt(params['lessonNumber'], 10);
        this.lesson = this.lessonService.make(this.lessonNumber);
      }
    );
  }

  onKey({key}: { key: string }) {
    const textArea = document.getElementById('lessonTextArea') as (HTMLTextAreaElement | null);
    if (!textArea) {
      throw new Error('Failed to get lessonTextArea HTML element');
    }
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
