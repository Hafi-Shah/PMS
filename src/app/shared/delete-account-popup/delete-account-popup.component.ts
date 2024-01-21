import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DeleteService } from "../../../services/delete.service";
import { ToastrService } from "ngx-toastr";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-delete-account-popup',
  templateUrl: './delete-account-popup.component.html',
  styleUrls: ['./delete-account-popup.component.css']
})
export class DeleteAccountPopupComponent {
  userId: number = 0;
  role: string = '';
  password: string = '';

  deleteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private deleteService: DeleteService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<DeleteAccountPopupComponent>,
  ) {
    const storedUserId = localStorage.getItem('userId');
    const storedRole = localStorage.getItem('role');

    this.userId = storedUserId ? parseInt(storedUserId, 10) : 0;
    this.role = storedRole ? storedRole : '';

    this.deleteForm = this.fb.group({
      companyPassword: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });
  }

  onDelete() {
    const password = this.deleteForm.get('companyPassword')?.value;
    this.deleteService.onDelete(this.userId, this.role, password).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.success === true && password === localStorage.getItem('password')) {
          this.dialogRef.close({ success: true });
          this.deleteService.onPageReload();
        } else {
          this.toastr.warning('Invalid Credential. Please try again.');
          this.dialogRef.close({ success: false });
        }
      },
      error: (error) => {
        console.error('API Error:', error);
        this.toastr.warning('Server Error');
        this.dialogRef.close({ success: false });
      },
    });
  }

  cancel(){
    this.toastr.info('Delete Cancelled','', {timeOut:1500});
  }
}
