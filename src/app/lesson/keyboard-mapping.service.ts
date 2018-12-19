import {Injectable} from '@angular/core';

interface KeyboardMappingMap {
  [_: string]: string;
}

export type KeyboardMapping = 'qwertyToPaliMeat' | 'qwertzToPaliMeat';

@Injectable({
  providedIn: 'root'
})
export class KeyboardMappingService {

  private qwertyToPaliMeat: KeyboardMappingMap = {
    'q': 'ū',
    'w': 'b',
    'e': 'o',
    'r': 'k',
    't': 'p',
    'y': 'v',
    'u': 'm',
    'i': 'u',
    'o': 'r',
    'p': 'l',
    'a': 'ṃ',
    's': 'e',
    'd': 'ā',
    'f': 't',
    'g': 's',
    'h': 'n',
    'j': 'h',
    'k': 'a',
    'l': 'i',
    'z': 'ḍ',
    'x': 'g',
    'c': 'c',
    'v': 'd',
    'b': 'j',
    'n': 'ñ',
    'm': 'y',

    // special mappings with ALT key
    // TODO: implement
    '!h': 'ṇ',
    '!n': 'ṅ',
    '!f': 'ṭ',
    '!p': 'ḷ'

  };

  private qwertyToQwpr: KeyboardMappingMap = {
    'q': 'q',
    'w': 'w',
    'e': 'p',
    'r': 'r',
    't': 'f',
    'y': 'y',
    'u': 'u',
    'i': 'k',
    'o': 'l',
    'p': ':',

    'a': 'a',
    's': 's',
    'd': 'd',
    'f': 't',
    'g': 'g',
    'h': 'h',
    'j': 'n',
    'k': 'i',
    'l': 'o',

    'z': 'z',
    'x': 'x',
    'c': 'c',
    'v': 'v',
    'b': 'b',
    'n': 'j',
    'm': 'm',
  };

  private mappings = {
    qwertyToPaliMeat: this.qwertyToPaliMeat,
    qwertyToQwpr: this.qwertyToQwpr,
    qwertzToPaliMeat: this.swapYwithZ(this.qwertyToPaliMeat),
    qwertzToQwpr: this.swapYwithZ(this.qwertyToQwpr)
  };

  constructor() {
    this.addUpperCase(this.mappings.qwertyToPaliMeat);
    this.addUpperCase(this.mappings.qwertzToPaliMeat);
  }

  translate(key: string, mapping: KeyboardMapping = 'qwertyToPaliMeat'): string {
    return this.mappings[mapping][key] || key;
  }

  private addUpperCase(mapping: KeyboardMappingMap) {
    return Object.keys(mapping).forEach(key => mapping[key.toUpperCase()] = mapping[key].toUpperCase());
  }

  private swapYwithZ(mapping: KeyboardMappingMap): KeyboardMappingMap {
    const swapped = Object.assign({}, mapping);
    const zMapping = mapping['z'];
    swapped['z'] = mapping['y'];
    swapped['y'] = zMapping;
    return swapped;
  }


}
