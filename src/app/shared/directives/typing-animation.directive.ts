import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[typingAnimation]'
})
export class TypingAnimationDirective implements OnInit {
  @Input() typingSpeed: number = 50; // milliseconds per character
  @Input() typingDelay: number = 0; // delay before starting animation
  @Input() showCursor: boolean = true; // whether to show cursor
  
  private originalText: string = '';
  
  constructor(private el: ElementRef) {}
  
  ngOnInit() {
    // Store the original text
    this.originalText = this.el.nativeElement.innerHTML;
    // Clear the text initially
    this.el.nativeElement.innerHTML = '';
    
    // Add cursor style if needed
    if (this.showCursor) {
      this.el.nativeElement.style.position = 'relative';
      this.el.nativeElement.classList.add('typing-animation');
    }
    
    // Start the typing animation after the specified delay
    setTimeout(() => {
      this.typeText();
    }, this.typingDelay);
  }
  
  private typeText() {
    const element = this.el.nativeElement;
    let i = 0;
    
    // Create typing interval
    const interval = setInterval(() => {
      if (i < this.originalText.length) {
        element.innerHTML += this.originalText.charAt(i);
        i++;
      } else {
        clearInterval(interval);
        // Remove cursor class when typing is complete
        if (this.showCursor) {
          setTimeout(() => {
            element.classList.remove('typing-animation');
            element.classList.add('typing-complete');
          }, 500);
        }
      }
    }, this.typingSpeed);
  }
} 