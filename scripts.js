// ========== Mobile Navigation Toggle ==========
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    if (navToggle && nav) {
        // Close menu when clicking on nav links
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                header.classList.remove('nav-open');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!header.contains(e.target)) {
                header.classList.remove('nav-open');
            }
        });
    }
});

// ========== Smooth Scrolling for Navigation ==========
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerOffset = 60;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== Contact Form Handling ==========
const contactForm = document.querySelector('form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data - matching your HTML structure
        const formData = {
            name: document.getElementById('name')?.value || '',
            email: document.getElementById('email')?.value || '',
            phone: document.getElementById('phone')?.value || '',
            servicesNeeded: document.getElementById('servicesNeeded')?.value || '',
            timestamp: new Date().toISOString()
        };
        
        // Validate form
        if (!validateForm(formData)) {
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual backend call)
        setTimeout(() => {
            // Store form submission in memory (for demo purposes)
            storeFormSubmission(formData);
            
            // Show success message
            showMessage('Thank you! Your service request has been received. We\'ll contact you soon!', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Log submission (you can see this in browser console with F12)
            console.log('=== SERVICE REQUEST SUBMITTED ===');
            console.log('Name:', formData.name);
            console.log('Email:', formData.email);
            console.log('Phone:', formData.phone);
            console.log('Services Needed:', formData.servicesNeeded);
            console.log('Timestamp:', formData.timestamp);
            console.log('================================');
        }, 1500);
    });
}

// ========== Form Validation ==========
function validateForm(data) {
    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        showMessage('Please enter a valid name (at least 2 characters).', 'error');
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        showMessage('Please enter a valid email address.', 'error');
        return false;
    }
    
    // Phone validation
    if (!data.phone || data.phone.trim().length < 10) {
        showMessage('Please enter a valid phone number (at least 10 digits).', 'error');
        return false;
    }
    
    // Services needed validation
    if (!data.servicesNeeded || data.servicesNeeded.trim().length < 10) {
        showMessage('Please describe the services you need (at least 10 characters).', 'error');
        return false;
    }
    
    return true;
}

// ========== Message Display ==========
function showMessage(text, type) {
    // Remove existing messages
    const existingMsg = document.querySelector('.form-message');
    if (existingMsg) {
        existingMsg.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = text;
    messageDiv.style.cssText = `
        padding: 12px 14px;
        margin: 12px 0;
        border-radius: 6px;
        font-size: 0.9rem;
        font-weight: 500;
        background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
        color: ${type === 'success' ? '#155724' : '#721c24'};
        border: 1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'};
        animation: slideIn 0.3s ease-out;
    `;
    
    // Insert message before the form
    const form = document.querySelector('form');
    if (form) {
        form.parentElement.insertBefore(messageDiv, form);
        
        // Auto-remove after 6 seconds
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            messageDiv.style.transition = 'opacity 0.5s';
            setTimeout(() => messageDiv.remove(), 500);
        }, 6000);
        
        // Scroll to message
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// ========== Store Form Submissions (In-Memory Storage) ==========
const formSubmissions = [];

function storeFormSubmission(data) {
    formSubmissions.push(data);
    console.log('✅ Form submission stored successfully!');
    console.log('📊 Total submissions:', formSubmissions.length);
}

function getFormSubmissions() {
    return formSubmissions;
}

// ========== Active Navigation Highlighting ==========
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.style.background = '';
            if (link.getAttribute('href') === `#${current}`) {
                link.style.background = 'rgba(255,255,255,0.2)';
            }
        });
    });
}

highlightActiveSection();

// ========== Gallery Image Loading (Placeholder Enhancement) ==========
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-grid div');
    
    galleryItems.forEach((item, index) => {
        item.style.cursor = 'pointer';
        item.style.transition = 'transform 0.3s, box-shadow 0.3s';
        
        // Hover effect
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
        
        // Click handler
        item.addEventListener('click', function() {
            const itemText = this.textContent;
            console.log(`Gallery item clicked: "${itemText}"`);
            alert(`Viewing: ${itemText}\n\n(You can replace this with a lightbox/modal to show full images)`);
        });
    });
}

initGallery();

// ========== Review Star Rating Display ==========
function initReviews() {
    const reviews = document.querySelectorAll('.review');
    
    reviews.forEach(review => {
        const rating = 5; // All reviews get 5 stars (you can make this dynamic)
        const stars = '⭐'.repeat(rating);
        
        const ratingDiv = document.createElement('div');
        ratingDiv.style.cssText = 'color: #ffa500; font-size: 0.85rem; margin-bottom: 4px;';
        ratingDiv.textContent = stars;
        
        const h3 = review.querySelector('h3');
        if (h3) {
            h3.insertAdjacentElement('afterend', ratingDiv);
        }
    });
}

initReviews();

// ========== CTA Button Tracking ==========
const ctaButtons = document.querySelectorAll('.btn');
ctaButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        const btnText = this.textContent.trim();
        console.log(`🔘 CTA Button clicked: "${btnText}"`);
    });
});

// ========== Service Item Interaction ==========
const serviceItems = document.querySelectorAll('.service-item');
serviceItems.forEach(item => {
    item.style.cursor = 'pointer';
    item.style.transition = 'transform 0.3s, box-shadow 0.3s';
    
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
        this.style.boxShadow = '0 6px 12px rgba(0,0,0,0.12)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
    });
    
    item.addEventListener('click', function() {
        const serviceName = this.querySelector('strong')?.textContent || 'this service';
        console.log(`🌿 Service clicked: "${serviceName}"`);
        
        // Scroll to signup form
        const signupSection = document.getElementById('signup');
        if (signupSection) {
            signupSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Pre-fill the services field
            setTimeout(() => {
                const servicesField = document.getElementById('servicesNeeded');
                if (servicesField && !servicesField.value) {
                    servicesField.value = `I'm interested in ${serviceName}. `;
                    servicesField.focus();
                }
            }, 800);
        }
    });
});

// ========== Email & Phone Link Tracking ==========
function trackContactLinks() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('📧 Email link clicked:', this.href);
        });
    });
    
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('📞 Phone link clicked:', this.href);
        });
    });
}

trackContactLinks();

// ========== Scroll-to-Top Button (Optional Enhancement) ==========
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background: #205b2b;
        color: white;
        border: none;
        font-size: 1.3rem;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        transition: all 0.3s;
    `;
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.background = '#1a4a23';
        scrollBtn.style.transform = 'scale(1.1)';
    });
    
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.background = '#205b2b';
        scrollBtn.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
}

createScrollToTopButton();

// ========== Page Load Analytics ==========
window.addEventListener('load', function() {
    console.log('🌿 Sundaw Lawn Care LLC - Website Loaded');
    console.log('📅 Load time:', new Date().toISOString());
    console.log('📱 Screen size:', `${window.innerWidth}x${window.innerHeight}`);
    console.log('🖥️  Device:', /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop');
});

// ========== Export API for Console Testing ==========
window.sundawAPI = {
    getFormSubmissions: getFormSubmissions,
    showMessage: showMessage,
    validateForm: validateForm,
    clearSubmissions: function() {
        formSubmissions.length = 0;
        console.log('✅ All submissions cleared');
    }
};

console.log('💡 TIP: Type "sundawAPI.getFormSubmissions()" in console to view all form submissions!');