import { ConnectionPositionPair } from '@angular/cdk/overlay';
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

/**
 * Theme Model
 */
export interface ThemeDesc {
    /**
     * Id of the theme used for data-theme attribute
     */
    id: string;

    /**
     * Name of the theme used for the chooser
     */
    name: string;

    /**
     * Color used for the theme to display in the theme picker
     */
    color: string;
}

interface SelectColorForm {
    selectedTheme: FormControl<string | null>;
}
/**
 * Component acting as a picker for the correct theme
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'theme-picker',
    templateUrl: './theme-picker.component.html',
    styleUrl: './theme-picker.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemePickerComponent implements OnInit {
    isOpen = false;
    dataThemeAttribute = 'data-theme';
    @Input()
    themes: ThemeDesc[] = [];

    positionPairs: ConnectionPositionPair[] = [
        {
            offsetY: 10,
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'bottom',
        },
    ];
    form: FormGroup<SelectColorForm>;

    constructor() {
        const fb = new FormBuilder();
        this.form = fb.group({
            selectedTheme: new FormControl<string>(''),
        });
        this.form.controls.selectedTheme.valueChanges.subscribe((value) => {
            this.onThemeSwitchChange(value);
        });
    }

    onThemeSwitchChange(value: string | null) {
        document.body.setAttribute(this.dataThemeAttribute, value as string);
    }

    ngOnInit(): void {
        this.form.controls.selectedTheme.setValue(
            document.body.getAttribute(this.dataThemeAttribute)
        );

        this.positionPairs[0].offsetY = 26 * this.themes.length + 26;
    }
}
