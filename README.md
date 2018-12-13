# Palikeys

Small Angular PWA to learn custom keyboard layouts.
For example layouts generated using [Carpalx](http://mkweb.bcgsc.ca/carpalx/).

A custom [Pali](https://en.wikipedia.org/wiki/Pali) layout can be found in the layout directory (including an auto hot key file).

The firebase functions are in the [palikeys-serverless](https://github.com/notfb/palikeys-serverless) repository.

This project is primarily offered as a gift to the Buddhist Monastic Community
([Shangika](https://en.wikipedia.org/wiki/Sangha) [Dāna](https://en.wikipedia.org/wiki/Dāna#Buddhism)).
You are welcome to use it under the BSD 3-clause License as you see fit.
I kindly request you do not use this software to harm yourself or others.
If you need this code licensed under an other open source license let me know.

See LICENSE.txt for legal information.

This is an [MVP](https://en.wikipedia.org/wiki/Minimum_viable_product), it barely works.
The focus is on creating customer value, not having great test coverage, architecture etc.

This Project was made possible by [Leanovate](https://www.leanovate.de/).
They actually let me to do it on company time, which is very awesome!

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## ToDo / Opportunities for Contribution

- Display an image of the keyboard layout below the text
- Support mapping from QWERTY / QWERTZ Layout to Pali Layout via the webapp (just map the keys via typescript, instead of having the user install a custom keymap)

- Write unit tests
- enforce test coverage of at least 80%
- Write e2e tests
- Setup Continuous Integration Server

- Remove the dirty LessonService.keepFocus hack
- The way the lesson.component handles score creation is a bit messy

- Support offline updates and creation of scores (cache and sent later)

There are more TODOs and FIXMEs in the code.
