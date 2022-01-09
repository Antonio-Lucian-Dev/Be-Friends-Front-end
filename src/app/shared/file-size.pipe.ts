import { Pipe, PipeTransform } from '@angular/core';

var humanFormat = require('human-format');

@Pipe({
  name: 'fileSize',
  pure: true
})
export class FileSizePipe implements PipeTransform {

  transform(value: any): string {
    if(value === null || value === undefined || value === '') return '0 B';
    return humanFormat(value, {
      scale: 'binary',
      unit: 'B'
    });
  }

}
