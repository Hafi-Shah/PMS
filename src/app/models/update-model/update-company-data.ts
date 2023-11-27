export class UpdateCompanyData{
  userId: number = 0;
  companyName: string = '';
  companyType:any;
  companyLocation: string ='';
  companyDescription: string = '';
  countryName: any;
  companyEmail: string = '';
  contactNum: string = '';
  profilePic: string = '';
  companyPassword: string = '';
  role: string = '';

  constructor() {
    const storedUserId = localStorage.getItem('userId');
    this.userId = storedUserId ? parseInt(storedUserId, 10) : 0;

    const storedRole = localStorage.getItem('role');
    this.role = storedRole ? storedRole : '';
  }
}
