import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactData: ContactData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  onSubmit(): void {
    // In a real application, you would send this data to a server
    console.log('Form submitted:', this.contactData);
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset the form
    this.contactData = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}
