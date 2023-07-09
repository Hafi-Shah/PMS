import { Component } from '@angular/core';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent {
  public dataFields: Object = { text: 'Name', value: 'Id' };
  public locatData: Object[] = [
    { Name: 'Angular', Id: 'id1' },
    { Name: 'React', Id: 'id2' },
    { Name: 'Vue', Id: 'id3' },
    { Name: '.Net', Id: 'id4' },
    { Name: 'C#', Id: 'id5' },
    { Name: 'SpringBoot', Id: 'id6' },
    { Name: 'Java', Id: 'id7' },
  ];
}
