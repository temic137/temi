import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.setupProjectFilters();
  }

  setupProjectFilters(): void {
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
  }
}
