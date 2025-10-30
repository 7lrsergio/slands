// Services Section JavaScript

(function() {
    'use strict';

    // Service data
    const servicesData = {
        1: {
            tier: 'Tier 1',
            title: 'Basic Website',
            price: '$1,500',
            icon: '',
            description: 'Give your business a professional digital presence with a clean, responsive website.',
            features: [
                '1-3 page website (Home, About, Contact)',
                'Mobile responsive design',
                'Contact form → email or WhatsApp integration',
                'Google Maps embedded + social media links',
                'Fully responsive across all devices'
            ],
            upsells: [
                'Add analytics for +$200',
                'Blog integration for +$250',
                'Photo gallery for +$300'
            ],
            bestFor: [
                {
                    type: 'Roofing, Demolition, Handyman',
                    reason: 'Need to show proof of work + contact info'
                },
                {
                    type: 'Local Cleaning Companies',
                    reason: 'Clients search on Google and need fast contact'
                },
                {
                    type: 'Food Trucks / Local Cafés',
                    reason: 'Menus and locations change often, no time for complex sites'
                },
                {
                    type: 'Freelancers / Tutors / Local Artists',
                    reason: 'Need something simple and professional'
                }
            ]
        },
        2: {
            tier: 'Tier 2',
            title: 'Advanced Website + Maintenance',
            price: '$2,000 setup + $100-250/mo',
            icon: '',
            description: 'Everything in Tier 1 plus ongoing updates, monitoring, and security protection.',
            highlight: 'Security monitoring with SSL & Cloudflare protection included!',
            features: [
                'Everything in Tier 1',
                'CMS (update your own content)',
                'Monthly analytics + SEO reports',
                'Backups, updates, and bug fixes',
                'Security monitoring (SSL, Cloudflare)',
                'Minor monthly edits (photos, hours, content)'
            ],
            bestFor: [
                {
                    type: 'Real Estate Agents / Property Managers',
                    reason: 'Update listings often, need reliable site'
                },
                {
                    type: 'Restaurants / Cafés',
                    reason: 'Need menu changes and event updates'
                },
                {
                    type: 'Dental Clinics / Small Law Firms',
                    reason: 'Need secure, polished presence'
                },
                {
                    type: 'Gyms / Salons / Spas',
                    reason: 'Frequent promos, class schedules, booking updates'
                }
            ]
        },
        3: {
            tier: 'Tier 3',
            title: 'Custom Software / Automation',
            price: '$2,500 - $5,000+',
            icon: '',
            description: 'Custom tools and automation that eliminate manual work and save hours every week.',
            features: [
                'Inventory tracking systems',
                'Order calculators (material estimators)',
                'Booking & scheduling systems',
                'Expense tracking dashboards',
                'Customer form → auto PDF invoices',
                'Custom workflows for your business'
            ],
            bestFor: [
                {
                    type: 'Construction / Supply Stores',
                    reason: 'Track inventory or calculate materials'
                },
                {
                    type: 'Auto Repair Shops',
                    reason: 'Track appointments + parts orders'
                },
                {
                    type: 'Rental Businesses',
                    reason: 'Manage bookings and availability (chairs, tools, inflatables)'
                },
                {
                    type: 'Local Shops / Boutiques',
                    reason: 'Inventory and sales tracking'
                }
            ]
        },
        4: {
            tier: 'Tier 4',
            title: 'AI Assistant / Chatbot',
            price: '$1,500 - $3,000 + monthly',
            icon: '',
            description: 'An AI-powered assistant that answers questions, books appointments, and handles customer inquiries 24/7.',
            features: [
                'AI answering common DMs (hours, menu, pricing)',
                'Appointment scheduling via chat',
                'Order tracking assistant',
                'Email autoresponder trained on your business',
                '24/7 customer support automation',
                'Multi-channel integration (website, WhatsApp, Instagram)'
            ],
            bestFor: [
                {
                    type: 'Restaurants / Coffee Shops',
                    reason: 'Constant customer questions about menu, hours'
                },
                {
                    type: 'Real Estate / Rental Agents',
                    reason: 'Can answer property questions 24/7'
                },
                {
                    type: 'Beauty / Fitness Studios',
                    reason: 'Can handle scheduling + FAQs automatically'
                },
                {
                    type: 'Small Clinics / Services',
                    reason: 'Automate booking and reminders'
                }
            ]
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        const cards = document.querySelectorAll('.services-section__card');
        const modal = document.getElementById('services-modal');
        const modalClose = document.getElementById('modal-close');
        const modalOverlay = modal ? modal.querySelector('.services-section__modal-overlay') : null;

        // Add click handlers to cards
        cards.forEach(card => {
            card.addEventListener('click', function() {
                const serviceId = this.getAttribute('data-service');
                openModal(serviceId);
            });
        });

        // Close modal handlers
        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        if (modalOverlay) {
            modalOverlay.addEventListener('click', closeModal);
        }

        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    function openModal(serviceId) {
        const modal = document.getElementById('services-modal');
        const modalBody = document.getElementById('modal-body');
        const service = servicesData[serviceId];

        if (!service || !modal || !modalBody) return;

        // Build modal content
        const content = buildModalContent(service);
        modalBody.innerHTML = content;

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        const modal = document.getElementById('services-modal');
        if (!modal) return;

        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function buildModalContent(service) {
        let html = `
            <div class="services-section__modal-header">
                <div class="services-section__modal-header-content">
                    <div class="services-section__modal-icon">${service.icon}</div>
                    <div class="services-section__modal-info">
                        <span class="services-section__modal-tier">${service.tier}</span>
                        <h2 class="services-section__modal-title">${service.title}</h2>
                        <p class="services-section__modal-price">${service.price}</p>
                        <p class="services-section__modal-description">${service.description}</p>
                    </div>
                </div>
            </div>
            <div class="services-section__modal-body">
        `;

        // Highlight section
        if (service.highlight) {
            html += `
                <div class="services-section__highlight">
                    <p>${service.highlight}</p>
                </div>
            `;
        }

        // Features section
        html += `
            <div class="services-section__modal-section">
                <h3 class="services-section__section-title">
                    <span class="services-section__section-accent"></span>
                    What's Included
                </h3>
                <div class="services-section__features">
        `;

        service.features.forEach(feature => {
            html += `
                <div class="services-section__feature">
                    <svg class="services-section__check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span class="services-section__feature-text">${feature}</span>
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;

        // Upsells section
        if (service.upsells) {
            html += `
                <div class="services-section__modal-section">
                    <h3 class="services-section__section-title">
                        <span class="services-section__section-accent" style="background: linear-gradient(180deg, var(--ss-accent), var(--ss-secondary));"></span>
                        Add-Ons Available
                    </h3>
                    <div class="services-section__upsells">
            `;

            service.upsells.forEach(upsell => {
                html += `
                    <div class="services-section__upsell">
                        <p>${upsell}</p>
                    </div>
                `;
            });

            html += `
                    </div>
                </div>
            `;
        }

        // Best For section
        html += `
            <div class="services-section__modal-section">
                <h3 class="services-section__section-title">
                    <span class="services-section__section-accent" style="background: linear-gradient(180deg, var(--ss-secondary), var(--ss-primary));"></span>
                    Perfect For
                </h3>
                <div class="services-section__best-for">
        `;

        service.bestFor.forEach(item => {
            html += `
                <div class="services-section__business-type">
                    <h4 class="services-section__business-name">${item.type}</h4>
                    <p class="services-section__business-reason">${item.reason}</p>
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;

        // CTA Footer
        html += `
            <div class="services-section__modal-footer">
                <button class="services-section__cta-btn">
                    Get Started with ${service.title}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>
        `;

        html += `</div>`; // Close modal-body

        return html;
    }

})();