import { Component, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-view-user-profile',
  templateUrl: './view-user-profile.component.html',
  styleUrls: ['./view-user-profile.component.css']
})
export class ViewUserProfileComponent {

  img: string = ''; // declare 64-bit code for the cover image from the DB

  activeSection: string | null = null;

  sections = [
    { id: 'me', label: 'Me' },
    { id: 'about', label: 'About' },
    { id: 'bio', label: 'Bio' },
    { id: 'skills', label: 'Skills' },
  ];

  constructor(private el: ElementRef) {}

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollPosition = window.pageYOffset;

    for (const section of this.sections) {
      const sectionElement = this.el.nativeElement.querySelector(`#${section.id}`);
      if (sectionElement) {
        const offsetTop = sectionElement.offsetTop;
        const offsetBottom = offsetTop + sectionElement.clientHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
          this.activeSection = section.id;
        }
      }
    }
  }

  scrollTo(sectionId: string) {
    const sectionElement = this.el.nativeElement.querySelector(`#${sectionId}`);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
      this.activeSection = sectionId;
    }
  }
}
