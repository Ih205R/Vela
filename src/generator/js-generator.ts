/**
 * JavaScript Generator for Vela
 * Generates minimal client-side JavaScript
 */

import * as AST from '../compiler/ast';

export class JSGenerator {
  generate(ast: AST.SiteNode): string {
    return `
/**
 * Vela Generated JavaScript
 * Site: ${ast.name}
 */

(function() {
  'use strict';

  // Smooth scroll for anchor links
  document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  });

  // Simple page analytics (stub for future extension)
  console.log('Vela site loaded: ${ast.name}');

  // Navigation handler for internal links
  function handleNavigation() {
    const navLinks = document.querySelectorAll('a[href^="/"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        console.log('Navigation to:', href);
        // Future: SPA routing can be added here
      });
    });
  }

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleNavigation);
  } else {
    handleNavigation();
  }

  // Add fade-in animation observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all cards and sections
  document.querySelectorAll('.card, .section').forEach(el => {
    observer.observe(el);
  });

})();
`.trim();
  }
}
