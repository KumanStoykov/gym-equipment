import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';


export function minLengthValidator(numLength: number): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return of({}).pipe(
            delay(500),
            map(() => {
                const valueLength =  control.value.length;
                return valueLength >= numLength ? null : { minLength: true }
            })
        );
    };
}
