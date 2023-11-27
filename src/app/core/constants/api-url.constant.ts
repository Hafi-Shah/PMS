export class ApiPath {
  static readonly GET_COUNTRIES: string = '/api/Countries/GetCountries';
  static readonly GET_COMPANY_TYPES : string = '/api/CompanyRegistration/GetCompanyTypes';
  static readonly REGISTER_COMPANY : string = '/api/CompanyRegistration/RegisterCompany';
  static readonly GET_COMPANY_CARDS : string = '/api/CompanyCards/GetCompanyCards';
  static readonly VIEW_COMPANY_DETAILS : string = '/api/ViewCompanyDetails';
  static readonly LOGIN : string = '/api/login';
  static readonly LOGIN_BY_ROLE : string ='/api/UserDetailsByRole/GetDataByRole';
  static readonly GET_SKILLS : string = '/api/Skills/GetSkillsName';
  static readonly UPDATE_COMPANY_DATA : string = '/api/UpdateUserByRole/UpdateCompanyData';
}
