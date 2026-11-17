import * as THREE from "/vendor/three.module.js";

const root = document.documentElement;
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeLabel = document.querySelector("[data-theme-label]");
const themeIcon = document.querySelector("[data-theme-icon]");
const cursorOrb = document.querySelector(".cursor-orb");

function getInitialTheme() {
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  root.dataset.theme = theme;
  if (themeLabel)
    themeLabel.textContent = theme === "dark" ? "Obsidian" : "Neo";
  if (themeIcon) themeIcon.textContent = theme === "dark" ? "☾" : "☀";
  window.dispatchEvent(
    new CustomEvent("portfolio-theme-change", { detail: { theme } }),
  );
}

applyTheme(getInitialTheme());

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", nextTheme);
  applyTheme(nextTheme);
});

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function cleanText(value) {
  return String(value || "")
    .replace(/\*\*/g, "")
    .trim();
}

function linkMarkup(url, label, prefix = "") {
  if (!url) return "";
  const safeUrl = escapeHtml(url);
  const safeLabel = escapeHtml(label || url);
  return `<a class="contact-link" href="${safeUrl}" ${url.startsWith("http") ? 'target="_blank" rel="noreferrer"' : ""}><span>${escapeHtml(prefix || safeLabel)}</span><strong>${safeLabel}</strong></a>`;
}

function renderMetrics(data) {
  const metrics = [
    { label: "Location", value: data.location || "Korba, Chhattisgarh" },
    { label: "Education", value: "B.Tech CSE · KIIT" },
    { label: "Graduation", value: "Expected 2028" },
    {
      label: "Availability",
      value: data.availability || "Open to internships",
    },
  ];
  const target = document.querySelector("#hero-metrics");
  if (!target) return;
  target.innerHTML = metrics
    .map(
      (metric) => `
    <article class="metric-card">
      <p class="metric-label">${escapeHtml(metric.label)}</p>
      <p class="metric-value">${escapeHtml(metric.value)}</p>
    </article>
  `,
    )
    .join("");
}

function renderFacts(data) {
  const facts = [
    { label: "Phone", value: data.contact?.phone || "Available" },
    { label: "Email", value: data.contact?.email || "Available" },
    { label: "Preferred", value: "Pune onsite" },
    { label: "Duration", value: "2-3 months" },
  ];
  const target = document.querySelector("#quick-facts");
  if (!target) return;
  target.innerHTML = facts
    .map(
      (fact) =>
        `<div class="fact"><span>${escapeHtml(fact.label)}</span><strong>${escapeHtml(fact.value)}</strong></div>`,
    )
    .join("");
}

function renderAboutCards(data) {
  const cards = [
    {
      title: "Communication-first mindset",
      copy: "Interested in business communication, research, LinkedIn outreach, and professional networking.",
    },
    {
      title: "Technical foundation",
      copy: "Building fundamentals across C programming, HTML, CSS, Git, GitHub, and structured problem solving.",
    },
    {
      title: "Internship ready",
      copy:
        data.availability ||
        "Open to onsite internship opportunities for 2-3 months.",
    },
  ];
  const target = document.querySelector("#about-cards");
  if (!target) return;
  target.innerHTML = cards
    .map(
      (card) =>
        `<article class="mini-card"><h3>${escapeHtml(card.title)}</h3><p>${escapeHtml(card.copy)}</p></article>`,
    )
    .join("");
}

function renderSkills(data) {
  const skills = Array.isArray(data.skills) ? data.skills : [];
  const cloud = document.querySelector("#skill-cloud");
  if (cloud) {
    cloud.innerHTML = skills
      .map(
        (skill, index) =>
          `<span class="skill-chip" style="--i:${index}">${escapeHtml(cleanText(skill))}</span>`,
      )
      .join("");
  }

  const groups = Array.isArray(data.skillGroups) ? data.skillGroups : [];
  const groupTarget = document.querySelector("#skill-groups");
  if (groupTarget) {
    groupTarget.innerHTML = groups
      .map(
        (group) => `
      <article class="group-card">
        <h3>${escapeHtml(group.title)}</h3>
        <ul>${(group.items || []).map((item) => `<li>${escapeHtml(cleanText(item))}</li>`).join("")}</ul>
      </article>
    `,
      )
      .join("");
  }
}

function renderEducation(data) {
  const education = Array.isArray(data.education) ? data.education : [];
  const target = document.querySelector("#education-timeline");
  if (!target) return;
  target.innerHTML = education
    .map(
      (item) => `
    <article class="timeline-item">
      <h3>${escapeHtml(item.institution)}</h3>
      <p>${escapeHtml(item.program)}</p>
      <div class="timeline-meta">
        <span class="pill">${escapeHtml(item.period)}</span>
        <span class="pill">${escapeHtml(item.score)}</span>
      </div>
    </article>
  `,
    )
    .join("");
}

function renderDetails(data) {
  const sections = [
    { title: "Activities", items: data.activities || [] },
    { title: "Strengths", items: data.strengths || [] },
    {
      title: "Additional Info",
      items: [
        "Open to onsite internship opportunities in Pune",
        "Available for 2-3 month internship duration",
      ],
    },
  ];
  const target = document.querySelector("#detail-grid");
  if (!target) return;
  target.innerHTML = sections
    .map(
      (section) => `
    <article class="detail-card">
      <h3>${escapeHtml(section.title)}</h3>
      <ul>${section.items.map((item) => `<li>${escapeHtml(cleanText(item))}</li>`).join("")}</ul>
    </article>
  `,
    )
    .join("");
}

function renderContact(data) {
  const contact = data.contact || {};
  const socialLinks = Array.isArray(data.socialLinks) ? data.socialLinks : [];
  const links = [
    contact.email
      ? linkMarkup(`mailto:${contact.email}`, contact.email, "Email")
      : "",
    contact.phone
      ? linkMarkup(
          `tel:${String(contact.phone).replace(/[^+\d]/g, "")}`,
          contact.phone,
          "Phone",
        )
      : "",
    contact.linkedin ? linkMarkup(contact.linkedin, "LinkedIn", "Social") : "",
    contact.github ? linkMarkup(contact.github, "GitHub", "Code") : "",
    ...socialLinks
      .filter(
        (link) => link.url !== contact.linkedin && link.url !== contact.github,
      )
      .map((link) => linkMarkup(link.url, link.label, "Social")),
  ].filter(Boolean);
  const target = document.querySelector("#contact-links");
  if (target) target.innerHTML = links.join("");
}

function renderPortfolio(data) {
  document.title = `${data.name} | Portfolio`;
  document.querySelector("#name").textContent = data.name || "Prakash Swarnkar";
  document.querySelector("#role").textContent =
    data.designation || "B.Tech CSE student";
  document.querySelector("#hero-summary").textContent =
    data.summary || "Looking for practical industry exposure.";
  document.querySelector("#about-summary").textContent =
    data.summary || "Second-year B.Tech CSE student.";
  document.querySelector("#contact-copy").textContent =
    `Based in ${data.location || "Korba, Chhattisgarh"}. ${data.availability || "Open to internships."}`;
  renderMetrics(data);
  renderFacts(data);
  renderAboutCards(data);
  renderSkills(data);
  renderEducation(data);
  renderDetails(data);
  renderContact(data);
}

function setupMenu() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const links = document.querySelector("[data-nav-links]");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupSectionToggles() {
  document.querySelectorAll("[data-toggle-section]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-toggle-section");
      document.getElementById(id)?.classList.toggle("is-hidden");
    });
  });
}

function setupReveals() {
  const revealEls = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 },
  );
  revealEls.forEach((el) => observer.observe(el));
}

function setupCursorOrb() {
  if (!cursorOrb) return;
  window.addEventListener(
    "pointermove",
    (event) => {
      cursorOrb.style.transform = `translate3d(${event.clientX - 180}px, ${event.clientY - 180}px, 0)`;
    },
    { passive: true },
  );
}

function setupBackTop() {
  const btn = document.querySelector(".back-top");
  if (!btn) return;
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    try {
      history.replaceState(null, "", "#top");
    } catch (err) {
      // ignore history errors in older browsers
    }
  });
}

function startHeroScene() {
  const canvas = document.querySelector("#hero-canvas");
  if (!canvas || !window.WebGLRenderingContext) return;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight, false);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
  );
  camera.position.set(0, 0, 15);

  const rig = new THREE.Group();
  rig.position.set(4.2, -0.25, 0);
  scene.add(rig);

  const coreGeometry = new THREE.IcosahedronGeometry(2.6, 2);
  const coreMaterial = new THREE.MeshStandardMaterial({
    color: root.dataset.theme === "dark" ? 0x2563eb : 0x60a5fa,
    emissive: root.dataset.theme === "dark" ? 0x071932 : 0x0f4eb8,
    metalness: 0.68,
    roughness: 0.18,
    wireframe: true,
    transparent: true,
    opacity: 0.9,
  });
  const core = new THREE.Mesh(coreGeometry, coreMaterial);
  rig.add(core);

  const haloMaterial = new THREE.MeshBasicMaterial({
    color: 0x14b8a6,
    transparent: true,
    opacity: 0.55,
  });
  const haloA = new THREE.Mesh(
    new THREE.TorusGeometry(4.1, 0.055, 18, 180),
    haloMaterial,
  );
  const haloB = new THREE.Mesh(
    new THREE.TorusGeometry(5.15, 0.04, 18, 180),
    haloMaterial.clone(),
  );
  haloA.rotation.x = Math.PI / 2.4;
  haloB.rotation.y = Math.PI / 2.8;
  rig.add(haloA, haloB);

  const particleGeometry = new THREE.BufferGeometry();
  const count = 720;
  const positions = new Float32Array(count * 3);
  const speeds = new Float32Array(count);
  for (let i = 0; i < count; i += 1) {
    const radius = 5 + Math.random() * 12;
    const angle = Math.random() * Math.PI * 2;
    const y = (Math.random() - 0.5) * 10;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = Math.sin(angle) * radius;
    speeds[i] = 0.4 + Math.random() * 1.4;
  }
  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3),
  );
  const particleMaterial = new THREE.PointsMaterial({
    color: 0xe2e8f0,
    size: 0.035,
    transparent: true,
    opacity: 0.82,
  });
  const particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);

  const lightA = new THREE.DirectionalLight(0xffffff, 1.35);
  lightA.position.set(4, 6, 8);
  scene.add(lightA);
  const lightB = new THREE.PointLight(0x14b8a6, 2.2, 22);
  lightB.position.set(-5, -2, 5);
  scene.add(lightB);
  scene.add(new THREE.AmbientLight(0xffffff, 0.22));

  const pointer = { x: 0, y: 0 };
  window.addEventListener(
    "pointermove",
    (event) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    },
    { passive: true },
  );

  function syncTheme() {
    const dark = root.dataset.theme === "dark";
    coreMaterial.color.setHex(dark ? 0x2563eb : 0x60a5fa);
    coreMaterial.emissive.setHex(dark ? 0x06142c : 0x154ebf);
    haloMaterial.opacity = dark ? 0.62 : 0.42;
    haloMaterial.color.setHex(0x14b8a6);
    particleMaterial.color.setHex(dark ? 0xdbeafe : 0x0f172a);
    particleMaterial.opacity = dark ? 0.72 : 0.22;
  }
  window.addEventListener("portfolio-theme-change", syncTheme);
  syncTheme();

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    rig.position.x = width < 900 ? 0 : 4.2;
    rig.position.y = width < 900 ? -1.9 : -0.25;
  }
  window.addEventListener("resize", resize, { passive: true });
  resize();

  const clock = new THREE.Clock();
  function animate() {
    const elapsed = clock.getElapsedTime();
    rig.rotation.y = elapsed * 0.18 + pointer.x * 0.12;
    rig.rotation.x = pointer.y * 0.08;
    core.rotation.x = elapsed * 0.31;
    core.rotation.y = elapsed * 0.43;
    haloA.rotation.z = elapsed * 0.25;
    haloB.rotation.x = elapsed * 0.18;
    particles.rotation.y = elapsed * 0.018;

    const pos = particleGeometry.attributes.position.array;
    for (let i = 0; i < count; i += 1) {
      pos[i * 3 + 1] += Math.sin(elapsed * speeds[i] + i) * 0.0008;
    }
    particleGeometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
}

async function init() {
  document.querySelector("#year").textContent = new Date().getFullYear();
  setupMenu();
  setupSectionToggles();
  setupReveals();
  setupCursorOrb();
  setupBackTop();
  startHeroScene();

  try {
    const response = await fetch("/api/portfolio");
    const data = await response.json();
    renderPortfolio(data);
  } catch (error) {
    console.error("Unable to load portfolio data", error);
  }
}

init();
