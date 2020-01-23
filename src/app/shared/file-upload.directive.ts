import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appFileUpload]'
})
export class FileUploadDirective {

  constructor() { }

  @HostListener('click', ['$event'])
  clickEvent(event) {
    // event.preventDefault();
    // event.stopPropagation();
  }

}
