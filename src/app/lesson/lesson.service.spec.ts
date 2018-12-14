import {TestBed} from '@angular/core/testing';

import {LessonService} from './lesson.service';

describe('LessonService', () => {
  const lesson = 'word '.repeat(100);

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be calc words per second', () => {
    const service: LessonService = TestBed.get(LessonService);
    expect(service.calcWordsPerMinute(Date.now() - 1000 * 60, lesson, lesson.length)).toBe(100);
  });

  it('should be calc words per second - 2', () => {
    const service: LessonService = TestBed.get(LessonService);
    expect(service.calcWordsPerMinute(Date.now() - 10000 * 60, lesson, lesson.length)).toBe(10);
  });

  it('should be calc words per second for cursorPos 0', () => {
    const service: LessonService = TestBed.get(LessonService);
    expect(service.calcWordsPerMinute(Date.now() - 10000 * 60, lesson, 0)).toBe(0);
  });

  it('should be calc words per second for cursorPos 100', () => {
    const service: LessonService = TestBed.get(LessonService);
    expect(service.calcWordsPerMinute(Date.now() - 10000 * 60, lesson, 100)).toBe(2);
  });
});
