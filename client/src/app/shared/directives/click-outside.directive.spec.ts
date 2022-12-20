import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ClickOutsideDirective } from './click-outside.directive';

@Component({
    template: `<ul id="nav" appClickOutside>
        <li>nav</li>
    </ul>`
})

class TestOutsideDirective {

}
describe('ClickOutsideDirective', () => {
    let fixture: ComponentFixture<TestOutsideDirective>;
    let htmlEl: DebugElement

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ClickOutsideDirective, TestOutsideDirective]
        }).compileComponents();

        fixture = TestBed.createComponent(TestOutsideDirective);
        fixture.detectChanges();
    })
    it('should create an instance', () => {
        htmlEl = fixture.debugElement.query(By.css('#nav'));
        const directive = new ClickOutsideDirective(htmlEl);
        expect(directive).toBeTruthy();
    });
});
