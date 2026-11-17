This repository already contains a starter scaffold.
Patch the existing files in place instead of generating everything from zero.

Create a complete responsive portfolio website from the extracted resume text below.

Target repository/site name: prakash-swarnkar-portfolio-<available-number-from-1-to-10000>
Portfolio owner name: Prakash Swarnkar

Implementation requirements:
- Build the portfolio as a Node.js + Express app.
- Use Vanilla HTML/CSS/JavaScript for the frontend.
- Use JavaScript ES modules in the browser.
- Use Three.js for a premium hero background or animated 3D treatment.
- Do not use React, Next.js, Vite, Webpack, Parcel, or any frontend bundler.
- Do not create a static-only Python-served site.
- Do not require a frontend build step.
- Use one process and one port for the Express server, static frontend, JSON data, resume download, and rendered resume content.

Required structure:
- Root: server.js, package.json, README.md, .gitignore
- data/data.json and data/resume.pdf when available
- public/index.html, public/styles.css, public/script.js, and optional public/404.html

Backend requirements:
- server.js must use Express.
- Serve public/ as static assets.
- Expose /data/data.json and /api/portfolio.
- Serve the resume through an explicit GET /resume Express route that sends path.join(__dirname, 'data', 'resume.pdf') or res.download(path.join(__dirname, 'data', 'resume.pdf')).
- The frontend resume button must point to /resume and must not link directly to data/resume.pdf in the browser.
- Ensure the resume PDF is committed to data/resume.pdf so the /resume route works in production.
- Keep the app Vercel-safe and route requests through server.js.

Frontend requirements:
- The site should start directly with the name and designation hero animation.
- Do not add an intro gate, ready page, or video intro.
- Include one light theme and one dark theme.
- The theme switch must be functional, not decorative: provide a visible toggle control, switch a root data-theme attribute or theme class on click, persist the selected theme in localStorage, and restore it on page load.
- The default theme should respect the user's saved preference first and fall back to prefers-color-scheme when no saved preference exists.
- The same page components must visibly react to the theme change; do not fake the toggle with static styling or separate duplicate pages.
- Keep the output premium and motion-led, with a 3D animated hero, polished cards, and rich spacing instead of a plain text resume page.
- Include responsive desktop, tablet, and mobile layouts.
- Include navigation, mobile menu, scroll interactions, optional section hiding, and deployment-ready instructions.
- Include a download resume button, a polished footer, and a back-to-top link.
- Build this as a template-first implementation: start from a shared starter scaffold and patch the reusable files in place instead of rebuilding every file from zero.
- Keep the shared app shell, routing, resume download route, and reusable UI structure intact.
- Only touch theme, palette, font, animation, section order, and content files unless a structural fix is absolutely necessary to keep the app working.
- Do not render raw resume text in the final UI.
- Render all available resume data that was extracted into data/data.json, including contact details, summary, skills, experience, projects, education, certifications, awards, and any other parsed sections.
- Keep the Three.js hero baseline and refine it into a premium motion-led presentation rather than replacing it with a plain static page.
- Do not rewrite server bootstrap, package metadata, or deployment config unless you must repair a real breakage.

Selected sections: Hero, About, Skills, Education, Contact
Selected light theme: Neo-Brutalist
Selected dark theme: Obsidian
Selected palette: Executive Blue (#f8fafc, #0f172a, #2563eb, #14b8a6, #e2e8f0)
Selected font: JetBrains Mono
Animation level: Rich

Extracted resume text:
```markdown
Prakash Swarnkar
Korba, Chhattisgarh | 7240245401 | prakashswarnkar.work@gmail.com
GitHub: Prakashx10 | LinkedIn: Prakash Swarnkar

### EDUCATION
*   **Kalinga Institute of Industrial Technology (KIIT)**
    *   B.Tech in Computer Science & Engineering
    *   Expected Graduation: 2028 | CGPA: 7.6
*   **Class XII**
    *   75.2%
*   **Class X**
    *   93.2%

### SKILLS
*   C Programming
*   HTML & CSS
*   Git & GitHub
*   Basic Excel
*   Internet Research
*   Communication Skills
*   LinkedIn Outreach
*   Problem Solving

### PROFILE SUMMARY
Second-year B.Tech CSE student with interest in business communication, research, and professional networking. Looking for practical industry exposure and opportunities to develop real-world communication and outreach skills.

### ACTIVITIES
*   Participated in technical recruitment tasks at college level
*   Exploring web development and programming fundamentals

### STRENGTHS
*   Quick learner
*   Comfortable with online research
*   Consistent and disciplined
*   Willing to work in fast-paced environments

### ADDITIONAL INFORMATION
*   Open to onsite internship opportunities in Pune
*   Available for 2-3 month internship duration
```

Return only the final implementation prompt text.

Final implementation instructions:
- Do not run npm install; dependencies are already expected to be available.
- After making the changes, push the work to the main branch. main must be the one and only branch.
