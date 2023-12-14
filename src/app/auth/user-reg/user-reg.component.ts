import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ToastrService} from "ngx-toastr";
import Compressor from 'compressorjs';
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-user-reg',
    templateUrl: './user-reg.component.html',
    styleUrls: ['./user-reg.component.css']
})
export class UserRegComponent implements OnInit {

    userRegForm: FormGroup | any;
    userRegFormSubmitted = false;

    skillsList: any[] = [
        { id: 1, name: 'Angular' },
        { id: 2, name: 'React' },
        { id: 3, name: '.NET' },
    ];

    constructor(
        private builder: FormBuilder,
        private toastr: ToastrService,
        private datePipe: DatePipe
    ) {
    }

    userRegFormValid() {
        this.userRegForm = this.builder.group({
            firstName: this.builder.control('', Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(10),
                Validators.pattern("[a-zA-z].*"),
            ])),
            lastName: this.builder.control('', Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(10),
                Validators.pattern("[a-zA-z].*"),
            ])),
            email: this.builder.control('', Validators.compose([
                Validators.required,
                Validators.email,
                Validators.pattern("^[\\w.%+-]+@gmail\\.com$")
            ])),
            password: this.builder.control('', Validators.compose([
                Validators.required,
                Validators.minLength(6),
            ])),
            yearlyExp: this.builder.control('', Validators.compose([
                Validators.required,
                Validators.pattern(/^\d{1,2}$/),
            ])),
            about: this.builder.control('', Validators.compose([
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(400),
                Validators.pattern(/^[a-zA-Z][a-zA-Z0-9\s().,]*[a-zA-Z0-9\s.]$/),
            ])),
            contact:this.builder.control('', Validators.compose([
                Validators.required,
                Validators.minLength(11),
                Validators.maxLength(15),
                Validators.pattern("[0-9]*"),
            ])),

            jobTitle:this.builder.control('', Validators.required),
            gender:this.builder.control('', Validators.required),
            status: this.builder.control('', Validators.required),
            skills: this.builder.control('', Validators.required),
            dob: this.builder.control('', Validators.required),
            profilePic: this.builder.control('', Validators.required),
            coverImg: this.builder.control('', Validators.required),
        });
    }
    onFileChange(event: any, fileType: string) {
        const file = event.target.files[0];
        if (file) {
            new Compressor(file, {
                quality: 0.1,
                success: (result: File | Blob) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const base64String = reader.result as string;
                        this.userRegForm.get(fileType).setValue(base64String);
                    };
                    reader.readAsDataURL(result);
                },
            });
        }
    }
    onSubmit() {
        this.userRegFormSubmitted = true;
        if (this.userRegForm.valid) {
            const formData = this.userRegForm.value;
            const formattedDob = this.datePipe.transform(formData.dob, 'dd/MM/yyyy');
            const requestBody = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                yearlyExp: formData.yearlyExp,
                about: formData.about,
                status: formData.status,
                skills: formData.skills,
                dob: formattedDob,
                gender: formData.gender,
                jobTitle: formData.jobTitle,
                contact: formData.contact,
                profilePic: formData.profilePic,
                coverImg: formData.coverImg
            };
            console.log('Request Body:', requestBody);
            this.toastr.success('User Registered Successfully');
        }
        else {
            this.toastr.warning('Complete Your Form Fields First');
        }
    }
    ngOnInit() {
        this.userRegFormValid();
    }

}
