import { ChangeDetectionStrategy, Component } from '@angular/core';
/**
 * Provides a layout with a header main and footer section:
 *
 * -------------------------------------------------------------
 * | left-header        |header                 | right-header |
 * |-----------------------------------------------------------|
 * |                         content                           |
 * |                                                           |
 * |                                                           |
 * |                                                           |
 * |-----------------------------------------------------------|
 * |                        footer                             |
 * -------------------------------------------------------------
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'main-layout',
    templateUrl: './main-layout.component.html',
    styleUrl: './main-layout.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {}
