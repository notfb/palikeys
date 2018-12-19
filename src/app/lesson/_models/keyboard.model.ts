export type KeyboardLayoutType = 'qwerty' | 'qwpr' | 'paliMeat';

export interface KeyboardLayout {
  topRow: string[];
  homeRow: string[];
  bottomRow: string[];
}

export interface LessonInput {
  chars: string[];
  words: string[];
  text: string;
}

