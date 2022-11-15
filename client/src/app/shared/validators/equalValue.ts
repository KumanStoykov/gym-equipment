import { AbstractControl, ValidationErrors } from '@angular/forms';
import { delay, map, Observable, of, Subscription, takeUntil } from 'rxjs';


export function equalValueAsFactory(getTargetControl: () => AbstractControl | null, killSubscription: Observable<any>) {
    let subscription: Subscription | null = null;

    return (control: AbstractControl): Observable<ValidationErrors | null> => {

        return of({}).pipe(
            delay(500),
            map(() => {

                if (subscription) { subscription.unsubscribe(); subscription = null; }
                const targetControl = getTargetControl();

                if (!targetControl) { return null; }

                subscription = targetControl.valueChanges
                    .pipe(
                        takeUntil(killSubscription),
                        delay(500)
                    ).subscribe({
                        next: () => { control.updateValueAndValidity(); },
                        complete: () => { subscription = null }
                    });

                return targetControl?.value === control?.value ? null : { equalValue: true };
            })
        )
    };
}
