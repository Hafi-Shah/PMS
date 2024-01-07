import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any, filterString: string, fields: string[] = []) {
    if (!value || value.length === 0 || !filterString) {
      return value;
    }

    filterString = filterString.toLowerCase();

    return value.filter((item: any) => {
      return fields.some(field => {
        const fieldValue = item[field];
        return fieldValue && fieldValue.toString().toLowerCase().includes(filterString);
      });
    });
  }
}
