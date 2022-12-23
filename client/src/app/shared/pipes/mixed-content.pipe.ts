import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mixedContent'
})
export class MixedContentPipe implements PipeTransform {

    transform(image: string): string {
        return image.startsWith('https')
            ? image
            : image.replace('http', 'https');
    }

}
