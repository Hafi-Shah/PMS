export class AnnouncementModel {
  userId: number = 0;
  skillId: number[] = [];  // Change this to an array of numbers
  exp: string = '';
  jd: string = '';
  isAutoApply: boolean = false;
  role: string = '';

  constructor() {
    const storedUserId = localStorage.getItem('userId');
    const storedRole = localStorage.getItem('role');

    this.userId = storedUserId ? parseInt(storedUserId, 10) : 0;
    this.role = storedRole || '';

    this.skillId = [];
  }
}
