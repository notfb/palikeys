import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {LessonService} from '../lesson.service';
import {KeyboardLayout, LessonInput} from '../_models/keyboard.model';

@Component({
  selector: 'app-layout-picture',
  templateUrl: './layout-picture.component.html',
  styleUrls: ['./layout-picture.component.scss']
})
export class LayoutPictureComponent implements OnInit {
  layout: KeyboardLayout = this.lessonService.layout('qwerty');
  activeChars: string[] = [];
  show = true;

  constructor(private activatedRoute: ActivatedRoute,
              private lessonService: LessonService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        const lessonNumber = parseInt(params['lessonNumber'], 10);
        const layoutType = params['layoutType'];
        if (layoutType && lessonNumber) {
          this.layout = this.lessonService.layout(layoutType);
          const {chars, words, text}: LessonInput = this.lessonService.makeLessonInput(lessonNumber, layoutType);
          this.activeChars = chars.length ? chars : LayoutPictureComponent.uniqe(text || words.join(''));
        }
      }
    );
  }

  private static uniqe(text: string): string[] {
    return text.split('').filter((elem, pos, arr) => {
      return arr.indexOf(elem) === pos;
    });
  }

}
