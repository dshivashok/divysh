// Configuration loader and main initialization
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Add timestamp to prevent caching
        const timestamp = new Date().getTime();
        
        // Load all data files with cache-busting
        const [config, experience, projects, publications, skills] = await Promise.all([
            fetch(`data/config.json?v=${timestamp}`).then(r => r.json()),
            fetch(`data/experience.json?v=${timestamp}`).then(r => r.json()),
            fetch(`data/projects.json?v=${timestamp}`).then(r => r.json()),
            fetch(`data/publications.json?v=${timestamp}`).then(r => r.json()),
            fetch(`data/skills.json?v=${timestamp}`).then(r => r.json())
        ]);

        // Load About Section
        loadAboutSection(config.about);

        // Load Experience Timeline
        console.log('Loading experience:', experience);
        loadExperience(experience);

        // Load Publications
        loadPublications(publications);

        // Load Projects
        console.log('Loading projects:', projects);
        loadProjects(projects);

        // Load Skills
        loadSkills(skills);

        // Load Contact Info
        loadContact(config.contact);

        // Initialize UI interactions
        initializeUI();

        // Initialize animations after content is loaded
        setTimeout(() => {
            initializeAnimations();
        }, 100);

    } catch (error) {
        console.error('Error loading data:', error);
        // Hide loader even if there's an error
        document.querySelector('.loader').classList.add('loaded');
    }
});

// Load About Section
function loadAboutSection(aboutData) {
    console.log('Loading about section...');
    const aboutText = document.querySelector('.about-text');
    const aboutStats = document.querySelector('.about-stats');

    // Load about text
    aboutText.innerHTML = aboutData.paragraphs.map(p => `<p>${p}</p>`).join('');

    // Load stats
    aboutStats.innerHTML = aboutData.stats.map(stat => `
        <div class="stat-card">
            <div class="stat-number">${stat.number}</div>
            <div class="stat-label">${stat.label}</div>
        </div>
    `).join('');
}

// Load Experience Timeline
function loadExperience(experiences) {
    console.log('loadExperience called with:', experiences);
    const timeline = document.getElementById('experience-timeline');
    
    if (!timeline) {
        console.error('Timeline element not found');
        return;
    }
    
    timeline.innerHTML = experiences.map((exp, index) => `
        <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <h3>${exp.title}</h3>
                <p class="company">${exp.company}</p>
                <p class="date">${exp.date}</p>
                ${exp.points ? `<ul>${exp.points.map(point => `<li>${point}</li>`).join('')}</ul>` : ''}
            </div>
        </div>
    `).join('');
    
    console.log('Experience timeline updated');
}

// Load Publications
function loadPublications(publications) {
    const container = document.getElementById('publications-container');
    
    container.innerHTML = publications.map(pub => `
        <div class="publication-showcase">
            <div class="publication-badge">${pub.venue}</div>
            <h3 class="publication-title">${pub.title}</h3>
            <div class="publication-venue">${pub.fullVenue}</div>
            <div class="venue-stats">
                ${pub.stats.map(stat => `
                    <span class="venue-stat"><strong>${stat.value}</strong> ${stat.label}</span>
                `).join('')}
            </div>
            <p class="publication-authors">
                ${pub.authors.map(author => 
                    author.isMe ? `<span class="me">${author.name}</span>` : author.name
                ).join(', ')}
            </p>
            ${pub.abstract ? `
                <div class="publication-abstract">
                    <h4>Abstract</h4>
                    <p>${pub.abstract}</p>
                </div>
            ` : ''}
            ${pub.link ? `
                <div class="publication-actions">
                    <a href="${pub.link}" target="_blank" class="publication-link">
                        <i class="fas fa-external-link-alt"></i>
                         View Demo
                    </a>
                </div>
            ` : ''}
        </div>
    `).join('');
}

// Load Projects
function loadProjects(projects) {
    console.log('loadProjects called with:', projects);
    const grid = document.getElementById('projects-grid');
    
    if (!grid) {
        console.error('Projects grid element not found');
        return;
    }
    
    grid.innerHTML = projects.map((project, index) => {
        // Check if the description is an array or a plain string
        const descriptionHtml = Array.isArray(project.description)
            ? `<ul class="project-description-list">${project.description.map(point => `<li>${point}</li>`).join('')}</ul>`
            : `<p class="project-description">${project.description}</p>`;

        return `
        <div class="project-card">
            <div class="project-content">
                <div class="project-number">0${index + 1}</div>
                <h3 class="project-title">${project.title}</h3>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                ${descriptionHtml}
                ${project.link ? `<a href="${project.link}" target="_blank" class="project-link">View Project</a>` : ''}
            </div>
        </div>`;
    }).join('');
    
    console.log('Projects grid updated');
}

// Load Skills
function loadSkills(skillCategories) {
    const grid = document.getElementById('skills-grid');
    
    grid.innerHTML = skillCategories.map(category => `
        <div class="skill-category">
            <h3>${category.category}</h3>
            <div class="skill-list">
                ${category.skills.map(skill => `<span class="skill-item">${skill}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

// Load Contact Info
function loadContact(contactData) {
    const contactText = document.getElementById('contact-text');
    const contactLinks = document.getElementById('contact-links');

    contactText.textContent = contactData.text;

    contactLinks.innerHTML = contactData.links.map(link => `
        <a href="${link.href}" ${link.target ? `target="${link.target}"` : ''} class="contact-link">
            <div class="contact-icon">${link.icon}</div>
            <span class="contact-label">${link.label}</span>
        </a>
    `).join('');
}

// Initialize UI interactions
function initializeUI() {
    // Hide Loading Screen after a delay
    setTimeout(() => {
        document.querySelector('.loader').classList.add('loaded');
    }, 1500);

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu
    const menuBtn = document.querySelector('.menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Back to Top
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Scroll Progress
    window.addEventListener('scroll', () => {
        const scrollProgress = document.querySelector('.scroll-progress-bar');
        const scrollDistance = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollDistance / documentHeight) * 100;
        scrollProgress.style.width = scrollPercentage + '%';
    });

    // Smooth scroll for navigation links
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
                navMenu.classList.remove('active');
                menuBtn.classList.remove('active');
            }
        });
    });

    // Typing effect for hero subtitle
    const subtitle = document.querySelector('.hero-subtitle');
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    // Start typing after loader
    setTimeout(typeWriter, 2500);
}