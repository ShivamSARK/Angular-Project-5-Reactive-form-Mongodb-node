import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact'
import { RouterModule } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contacts: Contact[];
  contactForm: FormGroup;
  newId: any = null;

  constructor(private _contactservice: ContactService) { }

  ngOnInit(): void {
    this.fetchData();

  }
  fetchData() {
    this.contactForm = new FormGroup({
      'fname': new FormControl(null, Validators.required),
      'lname': new FormControl(null, Validators.required),
      'age': new FormControl(null, Validators.required),
      'mobile': new FormControl(null, Validators.required),
      'skills': new FormArray([
        new FormControl(null, Validators.required)
      ])

    })

    this._contactservice.getData().subscribe(
      (response) => {
        const data = JSON.stringify(response)
        this.contacts = JSON.parse(data)
      },
      (err) => console.log(err)
    )
  }


  onSubmit() {
    //Adding Data
    if (this.newId == null) {
      const newContact = {
        fname: this.contactForm.get('fname').value,
        lname: this.contactForm.get('lname').value,
        age: this.contactForm.get('age').value,
        mobile: this.contactForm.get('mobile').value,
        skills: this.contactForm.get('skills').value
      }
      this._contactservice.addContacts(newContact).subscribe(response => {
        const data = JSON.stringify(response)
        this.contacts.push(JSON.parse(data));
      })
      this.contactForm.reset();
    }
    //Updating Data
    else {
      const updatedContact = {
        fname: this.contactForm.get('fname').value,
        lname: this.contactForm.get('lname').value,
        age: this.contactForm.get('age').value,
        mobile: this.contactForm.get('mobile').value,
        skills: this.contactForm.get('skills').value
      }
     
      this._contactservice.updateContact(updatedContact, this.newId).subscribe(res => {

      })
      this.newId = null;
      this.fetchData();
      this.fetchData();

    }
   

  }
  addSkills() {
    (<FormArray>this.contactForm.get('skills')).push(new FormControl(null, Validators.required)
    )

  }
  removeSkills(index: number) {
    (<FormArray>this.contactForm.get('skills')).removeAt(index);

  }
  removeData(id: any) {
    this._contactservice.deleteContact(id).subscribe(res => {
      this.ngOnInit();
    })
  }

  editData(contact: Contact, id) {
    this.newId = id;

    this.contactForm = new FormGroup({
      'fname': new FormControl(contact.fname, Validators.required),
      'lname': new FormControl(contact.lname, Validators.required),
      'age': new FormControl(contact.age, Validators.required),
      'mobile': new FormControl(contact.mobile, Validators.required),
      'skills': new FormArray([
        new FormControl(contact.skills, Validators.required)
      ])

    })
  }




}
