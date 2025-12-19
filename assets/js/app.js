    // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Smooth Scrolling for Navigation Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    mobileMenu.classList.add('hidden');
                }
            });
        });

        // Contact Form Handler
        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.message) {
                alert('Mohon lengkapi semua field yang wajib diisi.');
                return;
            }
            
            // Show success message (in real implementation, this would send to a server)
            alert('Terima kasih! Pesan Anda telah kami terima. Kami akan segera menghubungi Anda.');
            
            // Reset form
            this.reset();
        });

        // WhatsApp Button Handler
        document.getElementById('whatsapp-btn').addEventListener('click', function() {
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // Validation
            if (!name || !email || !message) {
                alert('Mohon lengkapi nama, email, dan pesan terlebih dahulu.');
                return;
            }
            
            // Format service text
            const serviceText = service ? `Layanan: ${getServiceLabel(service)}` : '';
            
            // Create WhatsApp message
            const whatsappMessage = `Halo TuankuDev! 👋\n\n` +
                `Saya tertarik dengan layanan Anda.\n\n` +
                `📝 *Data Diri:*\n` +
                `Nama: ${name}\n` +
                `Email: ${email}\n` +
                `${serviceText ? `${serviceText}\n` : ''}\n\n` +
                `💬 *Pesan:*\n${message}\n\n` +
                `Mohon informasi lebih lanjut. Terima kasih! 😊`;
            
            // WhatsApp phone number (use Indonesian format)
            const phoneNumber = '6285771272179'; // Replace with actual WhatsApp number
            
            // Create WhatsApp URL
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
            
            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
        });
        
        // Function to get service label
        function getServiceLabel(value) {
            const labels = {
                'desain': 'Desain Canva',
                'video': 'Video Editing', 
                'content': 'Creative Content',
                'lainnya': 'Lainnya'
            };
            return labels[value] || value;
        }

        // Add fade-in animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.classList.add('shadow-lg');
            } else {
                header.classList.remove('shadow-lg');
            }
        });

        // Active navigation highlighting
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= (sectionTop - 100)) {
                    current = section.getAttribute('id');
                }
            });

            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('text-accent');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('text-accent');
                }
            });
        });