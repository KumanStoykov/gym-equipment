import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
    selector: '[appClickOutside]'
})

export class ClickOutsideDirective {

    constructor(
        private el: ElementRef
    ) { }

    @Output() public clickOutside = new EventEmitter();

    @HostListener('document:click', ['$event.target'])

    public onClick(target: HTMLElement) {
        const clickInside = this.el.nativeElement.contains(target);

        if (!clickInside) {
            this.clickOutside.emit(target);
        }
    }

}
