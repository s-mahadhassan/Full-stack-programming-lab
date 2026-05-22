const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Shared design system envelope - generates the premium dark mode glassmorphism UI
function renderPage(title, contentHtml) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | Mahad Hassan (232053)</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

    :root {
      --bg-dark: #0E0807;
      --card-bg: rgba(25, 18, 17, 0.78);
      --border-color: rgba(255, 255, 255, 0.07);
      --text-main: #FCF8F7;
      --text-muted: #A8A19E;
      --accent-purple: #EF4444; /* Represents Crimson Red in layout */
      --accent-cyan: #F97316; /* Represents Sunset Orange in layout */
      --accent-green: #F59E0B; /* Represents Golden Amber */
      --accent-pink: #EA580C; /* Represents Deep Orange-Red */
      --accent-gradient: linear-gradient(135deg, #EF4444 0%, #F97316 100%);
      --glow-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.45);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: var(--bg-dark);
      background-image: 
        radial-gradient(at 10% 20%, rgba(239, 68, 68, 0.09) 0px, transparent 50%),
        radial-gradient(at 90% 80%, rgba(249, 115, 22, 0.09) 0px, transparent 50%);
      background-attachment: fixed;
      color: var(--text-main);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      overflow-x: hidden;
      padding: 2rem 1rem;
    }

    /* Container Wrapper */
    .container {
      width: 100%;
      max-width: 850px;
      margin: auto;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    /* Glassmorphic Panel Card */
    .glass-card {
      background: var(--card-bg);
      backdrop-filter: blur(16px) saturate(180%);
      -webkit-backdrop-filter: blur(16px) saturate(180%);
      border: 1px solid var(--border-color);
      border-radius: 20px;
      padding: 2.5rem;
      box-shadow: var(--glow-shadow);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Top Identity Header Bar */
    .identity-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(255, 255, 255, 0.015);
      border: 1px solid rgba(255, 255, 255, 0.04);
      border-radius: 12px;
      padding: 0.75rem 1.5rem;
      font-size: 0.875rem;
      backdrop-filter: blur(8px);
    }

    .identity-badge {
      background: var(--accent-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 700;
      letter-spacing: 0.05em;
    }

    .class-badge {
      color: var(--accent-cyan);
      font-weight: 600;
    }

    /* Typography & Headers */
    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1.2;
      background: linear-gradient(to right, #FFFFFF, #E5E7EB);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 1rem;
    }

    .banner-title {
      font-size: 3rem;
      font-weight: 800;
      background: var(--accent-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-align: center;
      margin-bottom: 0.5rem;
      letter-spacing: -0.02em;
    }

    .subtitle {
      color: var(--text-muted);
      font-size: 1.1rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .text-center {
      text-align: center;
    }

    /* Interactive Grids & Action Cards */
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.25rem;
      margin-top: 1rem;
    }

    .action-card {
      background: rgba(255, 255, 255, 0.01);
      border: 1px solid rgba(255, 255, 255, 0.04);
      border-radius: 16px;
      padding: 1.5rem;
      text-decoration: none;
      color: var(--text-main);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .action-card:hover {
      background: rgba(255, 255, 255, 0.02);
      border-color: rgba(249, 115, 22, 0.3);
      transform: translateY(-4px);
      box-shadow: 0 10px 20px -10px rgba(249, 115, 22, 0.3);
    }

    .action-card h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-main);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .action-card:hover h3 {
      color: var(--accent-cyan);
    }

    .action-card p {
      font-size: 0.875rem;
      color: var(--text-muted);
      line-height: 1.4;
    }

    .action-badge {
      display: inline-block;
      align-self: flex-start;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.25rem 0.6rem;
      border-radius: 6px;
      background: rgba(239, 68, 68, 0.15);
      color: #FCA5A5;
      border: 1px solid rgba(239, 68, 68, 0.2);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .action-card:hover .action-badge {
      background: rgba(249, 115, 22, 0.15);
      color: #FDBA74;
      border-color: rgba(249, 115, 22, 0.25);
    }

    /* Task 1: Student List UI Styles */
    ul.student-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 1.5rem;
    }

    li.student-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.25rem 1.75rem;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.015);
      border: 1px solid rgba(255, 255, 255, 0.04);
      transition: all 0.2s ease;
    }

    li.student-item:hover {
      background: rgba(255, 255, 255, 0.03);
      border-color: rgba(255, 255, 255, 0.08);
    }

    li.student-item.primary-student {
      background: linear-gradient(90deg, rgba(239, 68, 68, 0.12) 0%, rgba(249, 115, 22, 0.04) 100%);
      border: 1px solid rgba(239, 68, 68, 0.35);
      position: relative;
      overflow: hidden;
    }

    li.student-item.primary-student::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 4px;
      background: var(--accent-gradient);
    }

    .student-info-left {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .student-name {
      font-size: 1.15rem;
      font-weight: 600;
      color: var(--text-main);
    }

    .student-class {
      font-size: 0.875rem;
      color: var(--text-muted);
    }

    .student-reg {
      font-family: monospace;
      font-size: 0.95rem;
      background: rgba(255, 255, 255, 0.05);
      padding: 0.3rem 0.6rem;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.07);
      color: var(--accent-cyan);
    }

    .primary-student .student-reg {
      background: rgba(239, 68, 68, 0.25);
      border-color: rgba(239, 68, 68, 0.35);
      color: #FEE2E2;
      font-weight: bold;
    }

    .role-tag {
      font-size: 0.7rem;
      font-weight: 700;
      padding: 0.15rem 0.4rem;
      border-radius: 4px;
      background: var(--accent-gradient);
      color: white;
      margin-left: 0.5rem;
      vertical-align: middle;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Button and Interactive Navigation Link Styling */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.8rem 1.6rem;
      border-radius: 12px;
      font-weight: 600;
      font-size: 0.95rem;
      text-decoration: none;
      transition: all 0.2s ease;
      cursor: pointer;
    }

    .btn-primary {
      background: var(--accent-gradient);
      color: white;
      border: none;
      box-shadow: 0 4px 15px rgba(239, 68, 68, 0.35);
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(239, 68, 68, 0.5);
    }

    .btn-secondary {
      background: rgba(255, 255, 255, 0.03);
      color: var(--text-main);
      border: 1px solid rgba(255, 255, 255, 0.07);
    }

    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.06);
      border-color: rgba(255, 255, 255, 0.12);
      transform: translateY(-1px);
    }

    .actions-row {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-top: 2rem;
    }

    /* Dynamic User Greeting Specific Styling */
    .greeting-box {
      background: radial-gradient(circle at top left, rgba(239, 68, 68, 0.15), transparent 40%);
      padding: 3rem 2rem;
      text-align: center;
      border-radius: 16px;
      border: 1px solid rgba(239, 68, 68, 0.2);
    }

    .greeting-avatar {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background: var(--accent-gradient);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.75rem;
      font-weight: 700;
      color: white;
      margin: 0 auto 1.5rem;
      box-shadow: 0 0 20px rgba(249, 115, 22, 0.4);
    }

    .greeting-box h2 {
      font-size: 2.25rem;
      margin-bottom: 0.75rem;
      color: var(--text-main);
    }

    /* Banner Specific Colors */
    .banner-panel {
      position: relative;
      overflow: hidden;
      border-left: 5px solid var(--accent-cyan);
    }

    .banner-panel.home {
      border-color: var(--accent-cyan);
      background: linear-gradient(135deg, rgba(249, 115, 22, 0.08) 0%, transparent 100%);
    }

    .banner-panel.about {
      border-color: var(--accent-purple);
      background: linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, transparent 100%);
    }

    .banner-panel.contact {
      border-color: var(--accent-pink);
      background: linear-gradient(135deg, rgba(234, 88, 12, 0.08) 0%, transparent 100%);
    }

    .svg-icon {
      width: 48px;
      height: 48px;
      margin-bottom: 1.5rem;
    }

    .svg-icon.cyan { stroke: var(--accent-cyan); fill: rgba(249, 115, 22, 0.1); }
    .svg-icon.purple { stroke: var(--accent-purple); fill: rgba(239, 68, 68, 0.1); }
    .svg-icon.pink { stroke: var(--accent-pink); fill: rgba(234, 88, 12, 0.1); }

    /* Footer */
    footer {
      width: 100%;
      text-align: center;
      font-size: 0.8rem;
      color: var(--text-muted);
      margin-top: 3rem;
      border-top: 1px solid rgba(255, 255, 255, 0.04);
      padding-top: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="identity-bar">
      <div>Developer console: <span class="identity-badge">MAHAD HASSAN</span></div>
      <div>Reg ID: <span class="class-badge">232053</span> | Class: <span class="class-badge">BSSE-6A</span></div>
    </div>

    ${contentHtml}

    <footer>
      <div>Developed for Node & Express.js Lab 10 | Instructor Evaluation Portal</div>
      <div>&copy; 2026 Mahad Hassan. All Rights Reserved.</div>
    </footer>
  </div>
</body>
</html>`;
}

// ==========================================
// TASK 4: Simple HTML Page Renderer (Base / Route)
// ==========================================
app.get('/', (req, res) => {
  const content = `
    <div class="glass-card">
      <h1>Mahad Hassan's Backend console</h1>
      <p class="subtitle">Welcome to the central assignment gateway control console. This project demonstrates modular, standard-compliant routing built from scratch using Node.js and Express.js, featuring optimized in-memory state models and fully responsive layouts.</p>
      
      <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 1.25rem; margin-bottom: 2rem;">
        <h4 style="color: var(--accent-cyan); font-weight: 600; margin-bottom: 0.5rem; font-size: 1rem; text-transform: uppercase; letter-spacing: 0.05em;">Console Specifications</h4>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; font-size: 0.875rem;">
          <div><strong>Runtime Environment:</strong> Node.js ${process.version}</div>
          <div><strong>Routing Module:</strong> Express v4.19.2</div>
          <div><strong>State Handler:</strong> Pure In-Memory Stores</div>
          <div><strong>Aesthetic Framework:</strong> Custom CSS Glassmorphism</div>
        </div>
      </div>

      <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem;">Assignment Routing Grid</h2>
      <p class="subtitle" style="font-size: 0.95rem;">Select any card component below to test active server-side page renders natively in your browser view.</p>
      
      <div class="grid">
        <!-- Task 1 -->
        <a href="/students" class="action-card">
          <div>
            <span class="action-badge">Task 1</span>
            <h3 style="margin-top: 0.5rem;">👨‍🎓 Student Registry</h3>
            <p>Renders student records retrieved from an in-memory structured array inside a semantic HTML unordered list structure.</p>
          </div>
          <span style="color: var(--accent-cyan); font-weight: 600; font-size: 0.875rem;">Launch Route &rarr;</span>
        </a>

        <!-- Task 2: Home -->
        <a href="/home" class="action-card">
          <div>
            <span class="action-badge">Task 2</span>
            <h3 style="margin-top: 0.5rem;">🏠 Home Banner</h3>
            <p>Access the stylized, responsive message banner representing the core website entry point routing endpoint.</p>
          </div>
          <span style="color: var(--accent-cyan); font-weight: 600; font-size: 0.875rem;">Launch Route &rarr;</span>
        </a>

        <!-- Task 2: About -->
        <a href="/about" class="action-card">
          <div>
            <span class="action-badge">Task 2</span>
            <h3 style="margin-top: 0.5rem;">ℹ️ About Banner</h3>
            <p>Access the stylized project information banner summarizing server characteristics and design specs.</p>
          </div>
          <span style="color: var(--accent-cyan); font-weight: 600; font-size: 0.875rem;">Launch Route &rarr;</span>
        </a>

        <!-- Task 2: Contact -->
        <a href="/contact" class="action-card">
          <div>
            <span class="action-badge">Task 2</span>
            <h3 style="margin-top: 0.5rem;">📞 Contact Banner</h3>
            <p>Renders the active developer feedback banner equipped with profile links and support coordinates.</p>
          </div>
          <span style="color: var(--accent-cyan); font-weight: 600; font-size: 0.875rem;">Launch Route &rarr;</span>
        </a>

        <!-- Task 3 -->
        <a href="/user/Mahad%20Hassan" class="action-card" style="grid-column: span 1;">
          <div>
            <span class="action-badge">Task 3</span>
            <h3 style="margin-top: 0.5rem;">⚡ Dynamic Path</h3>
            <p>Tests the dynamic routing sub-system by capturing path arguments and echoing them back into a live greeting.</p>
          </div>
          <span style="color: var(--accent-cyan); font-weight: 600; font-size: 0.875rem;">Test '/user/Mahad Hassan' &rarr;</span>
        </a>
      </div>
    </div>
  `;
  res.send(renderPage('Console Dashboard', content));
});

// ==========================================
// TASK 1: Student List Display (GET Only)
// ==========================================
app.get('/students', (req, res) => {
  // In-memory data store using array structure with primary student details
  const students = [
    { name: 'Mahad Hassan', regId: '232053', className: 'BSSE-6A', isPrimary: true },
    { name: 'Zain Ahmed', regId: '232040', className: 'BSSE-6A', isPrimary: false },
    { name: 'Ayesha Khan', regId: '232055', className: 'BSSE-6A', isPrimary: false }
  ];

  let listItems = '';
  students.forEach(student => {
    const roleTag = student.isPrimary ? '<span class="role-tag">Main Developer</span>' : '';
    const itemClass = student.isPrimary ? 'student-item primary-student' : 'student-item';
    listItems += `
      <li class="${itemClass}">
        <div class="student-info-left">
          <div class="student-name">
            ${student.name} ${roleTag}
          </div>
          <div class="student-class">${student.className}</div>
        </div>
        <div class="student-reg">${student.regId}</div>
      </li>
    `;
  });

  const content = `
    <div class="glass-card">
      <span class="action-badge">Task 1 Solution</span>
      <h1 style="margin-top: 0.5rem; margin-bottom: 0.5rem;">👨‍🎓 Active Student Registry</h1>
      <p class="subtitle">This registry is rendered directly to the screen using a semantically valid HTML unordered list structure (&lt;ul&gt;&lt;li&gt;&lt;/li&gt;&lt;/ul&gt;) dynamically hydrated from a robust in-memory array model.</p>
      
      <!-- Semantic UL list requested in task 1 instructions -->
      <ul class="student-list">
        ${listItems}
      </ul>

      <div class="actions-row">
        <a href="/" class="btn btn-secondary">&larr; Return to Dashboard</a>
      </div>
    </div>
  `;
  res.send(renderPage('Student Registry', content));
});

// ==========================================
// TASK 2: Simple Message Routes System
// ==========================================

// 1. /home Route
app.get('/home', (req, res) => {
  const content = `
    <div class="glass-card banner-panel home">
      <svg class="svg-icon cyan" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
      <span class="action-badge">Task 2 - Home Route</span>
      <h1 class="banner-title" style="text-align: left; margin-top: 0.5rem;">Welcome Home</h1>
      <p class="subtitle" style="font-size: 1.2rem; font-weight: 500; color: #E5E7EB; margin-bottom: 1rem;">
        Exploring modern web development architecture and responsive backend solutions.
      </p>
      <p class="subtitle" style="font-size: 0.95rem;">
        You have successfully requested the base home route. This view represents a clean, user-friendly HTML responsive banner template designed to give users a grand entrance to the application console.
      </p>
      <div class="actions-row" style="justify-content: flex-start;">
        <a href="/" class="btn btn-primary">Go to Dashboard</a>
        <a href="/about" class="btn btn-secondary">Visit About Page</a>
      </div>
    </div>
  `;
  res.send(renderPage('Home', content));
});

// 2. /about Route
app.get('/about', (req, res) => {
  const content = `
    <div class="glass-card banner-panel about">
      <svg class="svg-icon purple" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
      <span class="action-badge">Task 2 - About Route</span>
      <h1 class="banner-title" style="text-align: left; margin-top: 0.5rem;">About the System</h1>
      <p class="subtitle" style="font-size: 1.2rem; font-weight: 500; color: #E5E7EB; margin-bottom: 1rem;">
        Engineered natively using Node.js and Express.js for maximum performance.
      </p>
      <p class="subtitle" style="font-size: 0.95rem;">
        This application utilizes a custom-built shared layout template architecture. Every server response is wrapped in an interactive, responsive HTML5 layout skeleton that encapsulates high-contrast dark theme colors, elegant layout hierarchies, and absolute standards compliance.
      </p>
      <div class="actions-row" style="justify-content: flex-start;">
        <a href="/" class="btn btn-primary">Go to Dashboard</a>
        <a href="/contact" class="btn btn-secondary">Contact Developer</a>
      </div>
    </div>
  `;
  res.send(renderPage('About', content));
});

// 3. /contact Route
app.get('/contact', (req, res) => {
  const content = `
    <div class="glass-card banner-panel contact">
      <svg class="svg-icon pink" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
      <span class="action-badge">Task 2 - Contact Route</span>
      <h1 class="banner-title" style="text-align: left; margin-top: 0.5rem;">Contact Developer</h1>
      <p class="subtitle" style="font-size: 1.2rem; font-weight: 500; color: #E5E7EB; margin-bottom: 1rem;">
        Get in touch with Mahad Hassan for support, system audits, or collaboration.
      </p>
      <p class="subtitle" style="font-size: 0.95rem;">
        Please feel free to connect! You can reach the primary developer under standard institutional coordinates. All feedback regarding the Lab 10 application engine is welcome.
      </p>
      
      <div style="background: rgba(234, 88, 12, 0.05); border: 1px solid rgba(234, 88, 12, 0.15); border-radius: 12px; padding: 1.25rem; margin-top: 1rem; margin-bottom: 1.5rem;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; font-size: 0.9rem;">
          <div><strong>Developer:</strong> Mahad Hassan</div>
          <div><strong>Class:</strong> BSSE-6A</div>
          <div><strong>Registration ID:</strong> 232053</div>
          <div><strong>Email:</strong> mahad.hassan.232053@student.edu</div>
        </div>
      </div>

      <div class="actions-row" style="justify-content: flex-start;">
        <a href="/" class="btn btn-primary">Go to Dashboard</a>
        <a href="/home" class="btn btn-secondary">Visit Home</a>
      </div>
    </div>
  `;
  res.send(renderPage('Contact', content));
});

// ==========================================
// TASK 3: Dynamic User Page
// ==========================================
app.get('/user/:name', (req, res) => {
  // Capture the path parameter token dynamically using standard Express attributes
  const rawName = req.params.name;
  
  // Format the captured name nicely for display (HTML sanitization + Title Casing)
  const cleanName = rawName
    .replace(/[&<>"']/g, char => {
      const escape = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;' };
      return escape[char] || char;
    })
    .trim();

  // Pick first letter of name for the dynamic profile avatar
  const firstLetter = cleanName.charAt(0).toUpperCase();

  const content = `
    <div class="glass-card">
      <span class="action-badge">Task 3 Solution</span>
      <h1 style="margin-top: 0.5rem; margin-bottom: 1rem;">⚡ Dynamic Path Greeting</h1>
      <p class="subtitle">This route captures custom trailing values in the URL path segment (<code>req.params.name</code>) and injects the parsed data string safely inside an active HTML greeting layout.</p>
      
      <div class="greeting-box">
        <div class="greeting-avatar">${firstLetter}</div>
        <h2>Hello ${cleanName}!</h2>
        <p class="subtitle" style="font-size: 1rem; margin-bottom: 0;">Welcome to the dynamic routing sandbox. Your request parameter was parsed in real-time by the Express routing engine. Keep coding, keep building!</p>
      </div>

      <div class="actions-row">
        <a href="/" class="btn btn-secondary">&larr; Return to Dashboard</a>
      </div>
    </div>
  `;
  res.send(renderPage(`Hello ${cleanName}`, content));
});

// ==========================================
// PORT LISTENER INITIALIZATION
// ==========================================
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`⚡ Lab 10 Server is actively running!`);
  console.log(`🌐 Address: http://localhost:${PORT}`);
  console.log(`👨‍💻 Developer: Mahad Hassan (Reg ID: 232053, Class: BSSE-6A)`);
  console.log(`======================================================\n`);
});
