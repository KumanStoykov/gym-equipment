import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AdminNavComponent } from './admin-nav.component';



describe('AdminNavComponent', () => {
    let component: AdminNavComponent;
    let fixture: ComponentFixture<AdminNavComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AdminNavComponent],
            imports: [
                ReactiveFormsModule,
                RouterTestingModule,
                HttpClientModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AdminNavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
