// Portfolio Carousel with Auto-advance and Interactive Features
class PortfolioCarousel {
    constructor() {
        this.currentIndex = 0;
        this.cards = document.querySelectorAll('.portfolioCard');
        this.indicators = document.querySelectorAll('.indicator');
        this.progressFill = document.querySelector('.progress-fill');
        this.autoAdvanceInterval = null;
        this.progressInterval = null;
        this.autoAdvanceDelay = 9000; // 15 seconds
        this.isPaused = false;
        
        this.init();
    }
    
    init() {
        // Navigation buttons
        document.querySelector('.carousel-nav.prev').addEventListener('click', () => {
            this.goToPrevious();
        });
        
        document.querySelector('.carousel-nav.next').addEventListener('click', () => {
            this.goToNext();
        });
        
        // Indicator buttons
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
        
        // Video hover play/pause
        this.cards.forEach((card, index) => {
            const videoContainer = card.querySelector('.video-container');
            const video = card.querySelector('.portfolioVid');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                  if (entry.isIntersecting && index === this.currentIndex) {
                    video.play();
                  } else {
                    video.pause();
                    video.currentTime = 0;
                  }
                });
              }, { threshold: 0.6 }); // 60% visible before it starts playing
              
              observer.observe(videoContainer);
              
        });
        
        // Learn More / Close buttons
        this.cards.forEach((card) => {
            const learnMoreBtn = card.querySelector('.learn-more-btn');
            const closeBtn = card.querySelector('.close-details-btn');
            const textContainer = card.querySelector('.pTextContainer');
            
            learnMoreBtn.addEventListener('click', () => {
                textContainer.classList.add('expanded');
                this.pauseAutoAdvance();
            });
            
            closeBtn.addEventListener('click', () => {
                textContainer.classList.remove('expanded');
                this.resumeAutoAdvance();
            });
        });
        
        // Start auto-advance
        this.startAutoAdvance();
        
        // Pause on user interaction
        document.querySelector('.carousel-container').addEventListener('mouseenter', () => {
            // Only pause if details are not expanded
            const currentCard = this.cards[this.currentIndex];
            const isExpanded = currentCard.querySelector('.pTextContainer').classList.contains('expanded');
            if (!isExpanded) {
                this.tempPauseAutoAdvance();
            }
        });
        
        document.querySelector('.carousel-container').addEventListener('mouseleave', () => {
            const currentCard = this.cards[this.currentIndex];
            const isExpanded = currentCard.querySelector('.pTextContainer').classList.contains('expanded');
            if (!isExpanded) {
                this.resumeAutoAdvance();
            }
        });
    }
    
    goToSlide(index) {
        // Close any expanded details
        this.cards.forEach(card => {
            card.querySelector('.pTextContainer').classList.remove('expanded');
        });
        
        // Update cards
        this.cards[this.currentIndex].classList.remove('active');
        this.cards[this.currentIndex].classList.add('prev');
        
        setTimeout(() => {
            this.cards[this.currentIndex].classList.remove('prev');
        }, 600);
        
        this.currentIndex = index;
        this.cards[this.currentIndex].classList.add('active');
        
        // Update indicators
        this.indicators.forEach(ind => ind.classList.remove('active'));
        this.indicators[this.currentIndex].classList.add('active');
        
        // Reset progress
        this.resetProgress();
        this.resumeAutoAdvance();
    }
    
    goToNext() {
        const nextIndex = (this.currentIndex + 1) % this.cards.length;
        this.goToSlide(nextIndex);
    }
    
    goToPrevious() {
        const prevIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
        this.goToSlide(prevIndex);
    }
    
    startAutoAdvance() {
        this.resetProgress();
        this.startProgress();
        
        this.autoAdvanceInterval = setInterval(() => {
            this.goToNext();
        }, this.autoAdvanceDelay);
    }
    
    pauseAutoAdvance() {
        this.isPaused = true;
        if (this.autoAdvanceInterval) {
            clearInterval(this.autoAdvanceInterval);
            this.autoAdvanceInterval = null;
        }
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }
    }
    
    tempPauseAutoAdvance() {
        if (this.autoAdvanceInterval) {
            clearInterval(this.autoAdvanceInterval);
            this.autoAdvanceInterval = null;
        }
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }
    }
    
    resumeAutoAdvance() {
        if (!this.isPaused) {
            this.pauseAutoAdvance();
            this.startAutoAdvance();
        }
        this.isPaused = false;
    }
    
    startProgress() {
        let progress = 0;
        const increment = 100 / (this.autoAdvanceDelay / 100);
        
        this.progressInterval = setInterval(() => {
            progress += increment;
            if (progress >= 100) {
                progress = 100;
            }
            this.progressFill.style.width = progress + '%';
        }, 100);
    }
    
    resetProgress() {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
        }
        this.progressFill.style.width = '0%';
    }
}

// Initialize carousel when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PortfolioCarousel();
    });
} else {
    new PortfolioCarousel();
}