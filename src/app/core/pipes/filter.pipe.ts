import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any, filterString: string) {
    if (!value || value.length === 0 || !filterString) {
      return value;
    }
    filterString = filterString.toLowerCase(); // Convert filterString to lowercase for case-insensitive filtering
    return value.filter((user: any) =>
      user['companyName'].toLowerCase().includes(filterString)
    );
  }


}
export class UserSearchPipe extends FilterPipe{
  // @ts-ignore
  transform(value: any, filterString: string) {
    if (!value || value.length === 0 || !filterString) {
      return value;
    }
    filterString = filterString.toLowerCase(); // Convert filterString to lowercase for case-insensitive filtering
    return value.filter((user: any) =>
      user['userName'].toLowerCase().includes(filterString)
    );
  }
}
