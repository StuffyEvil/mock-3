import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToSpaces'
})
export class ConvertToSpacesPipe implements PipeTransform
{
  transform(value: string, character: string): string
  {
    // Replace character with spaces
    return value.replace(character, ' ');
  }
}
