// Cursor effects
export const initCursorEffects = () => {
  const customCursor = document.querySelector('.custom-cursor');
  const cursorTrailContainer = document.getElementById('cursor-trail-container');
  
  if (!customCursor || !cursorTrailContainer) return;
  
  const trails = [];
  const maxTrails = 6; // Reduced from 10 for lighter effects
  
  // Create initial trails
  for (let i = 0; i < maxTrails; i++) {
    const trail = document.createElement('div');
    trail.classList.add('cursor-trail');
    trail.style.opacity = (1 - i / maxTrails).toString();
    trail.style.transform = 'scale(' + (1 - i / maxTrails) + ')';
    cursorTrailContainer.appendChild(trail);
    trails.push({
      element: trail,
      x: 0,
      y: 0
    });
  }
  
  // Update cursor position
  document.addEventListener('mousemove', (e) => {
    // Main cursor
    customCursor.style.left = e.clientX + 'px';
    customCursor.style.top = e.clientY + 'px';
    
    // Update the position of the first trail
    if (trails.length > 0) {
      trails[0].x = e.clientX;
      trails[0].y = e.clientY;
    }
  });
  
  // Cursor hover effect for interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .card-3d, .magnetic-btn, input, textarea, select');
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      customCursor.style.width = '40px';
      customCursor.style.height = '40px';
      customCursor.style.backgroundColor = 'rgba(79, 70, 229, 0.15)';
    });
    
    element.addEventListener('mouseleave', () => {
      customCursor.style.width = '20px';
      customCursor.style.height = '20px';
      customCursor.style.backgroundColor = 'rgba(79, 70, 229, 0.2)';
    });
  });
  
  // Update trail positions in animation frame
  function updateTrails() {
    for (let i = trails.length - 1; i > 0; i--) {
      trails[i].x = trails[i-1].x;
      trails[i].y = trails[i-1].y;
    }
    
    // Update trail DOM positions
    trails.forEach((trail) => {
      trail.element.style.left = trail.x + 'px';
      trail.element.style.top = trail.y + 'px';
    });
    
    requestAnimationFrame(updateTrails);
  }
  
  updateTrails();
};

// Scroll animations
export const initScrollAnimations = () => {
  const revealElements = document.querySelectorAll('.text-reveal, .stagger-children, .reveal-section');
  const navbar = document.querySelector('.navbar');
  const scrollProgress = document.querySelector('.scroll-progress');
  const sections = document.querySelectorAll('section[id]');
  
  // Implement smooth scrolling
  document.documentElement.style.scrollBehavior = 'smooth';
  
  function updateScroll() {
    if (scrollProgress) {
      // Update scroll progress bar
      const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      scrollProgress.style.width = scrollPercentage + '%';
    }
    
    // Sticky navbar effect with shadow
    if (navbar) {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
        navbar.classList.add('shadow-lg');
      } else {
        navbar.classList.remove('scrolled');
        navbar.classList.remove('shadow-lg');
      }
    }
    
    // Reveal elements on scroll with a smoother threshold
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      
      // Check if element is in viewport with a better offset for early activation
      if (elementTop < window.innerHeight - 150 && elementBottom > 0) {
        element.classList.add('active');
      }
    });
    
    // Parallax effect with reduced intensity
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
      const speed = element.getAttribute('data-speed') || 0.1; // Reduced from 0.2
      const yPos = -(window.scrollY * parseFloat(speed));
      element.style.transform = `translateY(${yPos}px)`;
    });
  }
  
  // Navigation highlight based on scroll position
  const navLinks = document.querySelectorAll('.nav-highlight');
  
  function highlightNavigation() {
    if (!sections.length || !navLinks.length) return;
    
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  // Check on load with a slight delay for better initialization
  window.addEventListener('load', () => {
    setTimeout(() => {
      updateScroll();
      highlightNavigation();
      
      // Activate initial animations
      const heroTextReveal = document.querySelector('#accueil .text-reveal');
      const heroStaggerChildren = document.querySelector('#accueil .stagger-children');
      
      if (heroTextReveal) heroTextReveal.classList.add('active');
      if (heroStaggerChildren) heroStaggerChildren.classList.add('active');
    }, 300);
  });
  
  // Check on scroll with throttling for better performance
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(() => {
        updateScroll();
        highlightNavigation();
        scrollTimeout = null;
      }, 10);
    }
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Using smooth behavior built into scrollIntoView
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }
    });
  });
};

// 3D card effect with reduced intensity
export const initCardEffects = () => {
  const cards = document.querySelectorAll('.card-3d');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const angleX = (y - centerY) / 20; // Reduced from 15
      const angleY = (centerX - x) / 20; // Reduced from 15
      
      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
      
      const cardContent = card.querySelector('.card-3d-content');
      if (cardContent) {
        cardContent.style.transform = 'translateZ(30px)'; // Reduced from 40px
      }
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      
      const cardContent = card.querySelector('.card-3d-content');
      if (cardContent) {
        cardContent.style.transform = 'translateZ(10px)'; // Reduced from 20px
      }
    });
  });
};

// Magnetic button effect with reduced intensity
export const initMagneticButtons = () => {
  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const strength = 15; // Increased from 10 for smoother effect
      btn.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
};

// Add slow bounce animation for scroll indicator
const addCustomAnimations = () => {
  // Add bounce slow animation if it doesn't exist
  if (!document.querySelector('.animate-bounce-slow')) {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes bounce-slow {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(15px); }
      }
      .animate-bounce-slow {
        animation: bounce-slow 2.5s infinite ease-in-out;
      }
    `;
    document.head.appendChild(style);
  }
};

// Initialize all animations
export const initAllAnimations = () => {
  addCustomAnimations();
  initCursorEffects();
  initScrollAnimations();
  initCardEffects();
  initMagneticButtons();
}; 