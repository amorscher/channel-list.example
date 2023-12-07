import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemePickerComponent } from './theme-picker.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';

describe('ThemePickerComponent', () => {
    let component: ThemePickerComponent;
    let fixture: ComponentFixture<ThemePickerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule, OverlayModule, ReactiveFormsModule],
            declarations: [ThemePickerComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ThemePickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
