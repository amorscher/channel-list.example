import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemePickerComponent } from './theme-picker/theme-picker.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { ReactiveFormsModule } from '@angular/forms';
import { MainLayoutComponent } from './main-layout/main-layout.component';

@NgModule({
    imports: [CommonModule, OverlayModule, ReactiveFormsModule],
    declarations: [ThemePickerComponent, MainLayoutComponent],
    exports: [ThemePickerComponent, MainLayoutComponent],
})
export class SharedUiBaseComponentsModule {}
