import {Component, OnInit} from '@angular/core';
import {LessonService} from './lesson.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Error} from 'tslint/lib/error';

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

  onKey(event: { key: string }) {
    const textArea = document.getElementById('lessonTextArea') as (HTMLTextAreaElement | null);
    if (!textArea) {
      throw new Error('Failed to get lessonTextArea HTML element');
    }
    this.errorMessage = '';

    // if the user does not press the space button, that's fine
    if (this.lesson.charAt(this.cursorPos) === ' ' && this.lesson.charAt(this.cursorPos + 1) === event.key) {
      this.cursorPos++;
      textArea.setSelectionRange(0, ++this.cursorPos);
    } else if (this.lesson.charAt(this.cursorPos) === event.key) {
      textArea.setSelectionRange(0, ++this.cursorPos);
    } else {
      // we are strict about making errors -> generate new lesson and restart
      this.lesson = this.lessonService.make(this.lessonNumber);
      textArea.setSelectionRange(0, 0);
      this.cursorPos = 0;
      this.errorMessage = 'You missed a character, please start over!';
    }
  }

}
