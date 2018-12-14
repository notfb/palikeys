import {TestBed} from '@angular/core/testing';

import {KeyboardMappingService} from './keyboard-mapping.service';

describe('KeyboardMappingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should translate asdf to meat', () => {
    const service: KeyboardMappingService = TestBed.get(KeyboardMappingService);
    expect(service.translate('a')).toBe('ṃ');
    expect(service.translate('s')).toBe('e');
    expect(service.translate('d')).toBe('ā');
    expect(service.translate('f')).toBe('t');
  });

  it('should translate ASDF to MEAT', () => {
    const service: KeyboardMappingService = TestBed.get(KeyboardMappingService);
    expect(service.translate('A')).toBe('Ṃ');
    expect(service.translate('S')).toBe('E');
    expect(service.translate('D')).toBe('Ā');
    expect(service.translate('F')).toBe('T');
  });

  it('should translate asdf to meat for qwertz', () => {
    const service: KeyboardMappingService = TestBed.get(KeyboardMappingService);
    expect(service.translate('a', 'qwertzToPaliMeat')).toBe('ṃ');
    expect(service.translate('s', 'qwertzToPaliMeat')).toBe('e');
    expect(service.translate('d', 'qwertzToPaliMeat')).toBe('ā');
    expect(service.translate('f', 'qwertzToPaliMeat')).toBe('t');
  });

  it('should translate ASDF to MEAT for qwertz', () => {
    const service: KeyboardMappingService = TestBed.get(KeyboardMappingService);
    expect(service.translate('A', 'qwertzToPaliMeat')).toBe('Ṃ');
    expect(service.translate('S', 'qwertzToPaliMeat')).toBe('E');
    expect(service.translate('D', 'qwertzToPaliMeat')).toBe('Ā');
    expect(service.translate('F', 'qwertzToPaliMeat')).toBe('T');
  });

  it('should translate yz to meat for qwertz', () => {
    const service: KeyboardMappingService = TestBed.get(KeyboardMappingService);
    expect(service.translate('y', 'qwertzToPaliMeat')).toBe('ḍ');
    expect(service.translate('z', 'qwertzToPaliMeat')).toBe('v');
  });

  it('should translate yz to meat for qwerty', () => {
    const service: KeyboardMappingService = TestBed.get(KeyboardMappingService);
    expect(service.translate('y', 'qwertyToPaliMeat')).toBe('v');
    expect(service.translate('z', 'qwertyToPaliMeat')).toBe('ḍ');
  });
});
