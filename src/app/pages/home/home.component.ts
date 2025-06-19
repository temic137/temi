import { Component, OnInit } from '@angular/core';

interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  contactData: ContactData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  constructor() {}

  ngOnInit(): void {
    this.setupProjectFilters();
  }

  setupProjectFilters(): void {
    setTimeout(() => {
      const filterBtns = document.querySelectorAll('.filter-btn');
      const projectCards = document.querySelectorAll('.project-card');

      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          // Remove active class from all buttons
          filterBtns.forEach(b => b.classList.remove('active'));
          
          // Add active class to clicked button
          btn.classList.add('active');
          
          // Get filter value
          const filterValue = btn.getAttribute('data-filter');
          
          // Filter projects
          projectCards.forEach(card => {
            const htmlCard = card as HTMLElement;
            if (filterValue === 'all') {
              htmlCard.style.display = 'block';
            } else {
              if (card.getAttribute('data-category') === filterValue) {
                htmlCard.style.display = 'block';
              } else {
                htmlCard.style.display = 'none';
              }
            }
          });
        });
      });
    }, 100); // Small delay to ensure DOM is fully loaded
  }

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
