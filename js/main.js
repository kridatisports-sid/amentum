/* ============================================================
   AMENTUM SPORTS — Main JavaScript
   Navigation · Scroll Reveal · Profile Preview · UI Interactions
   ============================================================ */

'use strict';

/* ── CUSTOM CURSOR ──────────────────────────────────────────── */
(function initCursor() {
  const cur = document.getElementById('cursor');
  if (!cur) return;

  document.addEventListener('mousemove', e => {
    cur.style.left = e.clientX + 'px';
    cur.style.top  = e.clientY + 'px';
  });

  document.querySelectorAll('button, a, [onclick], .prod-card, .ath-card, .ins-card').forEach(el => {
    el.addEventListener('mouseenter', () => cur.classList.add('big'));
    el.addEventListener('mouseleave', () => cur.classList.remove('big'));
  });
})();

/* ── SCROLL REVEAL ──────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

function initReveal() {
  document.querySelectorAll('.reveal, .reveal-slow, .reveal-scale').forEach(el => {
    el.classList.remove('in');
    revealObserver.observe(el);
  });
}

/* ── NAVIGATION ─────────────────────────────────────────────── */
function go(page) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(pg => pg.classList.remove('on'));

  // Deactivate nav links
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('on'));

  // Activate target page
  const target = document.getElementById('page-' + page);
  if (target) target.classList.add('on');

  // Activate nav link
  const navLink = document.getElementById('nl-' + page);
  if (navLink) navLink.classList.add('on');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Re-init scroll reveals after page switch
  setTimeout(initReveal, 80);

  // Close mobile menu if open
  closeMobileMenu();
}

/* ── MOBILE NAV ─────────────────────────────────────────────── */
function toggleNav() {
  const links = document.querySelector('.nav-links');
  if (!links) return;
  const isOpen = links.dataset.open === 'true';
  if (isOpen) {
    closeMobileMenu();
  } else {
    links.style.cssText = `
      display: flex; flex-direction: column; position: absolute;
      top: 56px; left: 0; right: 0;
      background: rgba(255,255,255,0.96); padding: 20px 24px;
      gap: 18px; border-bottom: 1px solid rgba(0,0,0,0.08);
      backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
      z-index: 499;
    `;
    links.dataset.open = 'true';
  }
}

function closeMobileMenu() {
  const links = document.querySelector('.nav-links');
  if (!links) return;
  if (window.innerWidth <= 900) {
    links.style.display = '';
  }
  links.dataset.open = 'false';
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    const links = document.querySelector('.nav-links');
    if (links) links.style.cssText = '';
  }
});

/* ── ARENA TABS ─────────────────────────────────────────────── */
function aTab(name, btn) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('on'));
  document.querySelectorAll('.a-tab').forEach(t => t.classList.remove('on'));
  const panel = document.getElementById('tab-' + name);
  if (panel) panel.classList.add('on');
  if (btn) btn.classList.add('on');
}

/* ── FILTER PILLS ───────────────────────────────────────────── */
document.addEventListener('click', e => {
  const pill = e.target.closest('.filter-pill');
  if (!pill) return;
  const container = pill.closest('.shop-filters, .arena-category-filters, .insights-filters, [data-filter-group]');
  const scope = container || pill.parentElement;
  scope.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('on'));
  pill.classList.add('on');
});

/* ── PROFILE LIVE PREVIEW ───────────────────────────────────── */
const pd = {}; // preview data store

function upPrev(el, key) {
  pd[key] = el.value;

  const fn = pd.fn || 'Athlete';
  const ln = pd.ln || 'Name';

  // Name
  const nameEl = document.getElementById('pv-name');
  if (nameEl) nameEl.textContent = fn + ' ' + ln;

  // Avatar initials
  const avEl = document.getElementById('pv-av');
  if (avEl) {
    const ini = ((fn[0] || '') + (ln[0] || '')).toUpperCase();
    avEl.textContent = ini || '🏃';
    avEl.style.fontSize = ini ? '16px' : '22px';
  }

  // Handle
  const handleEl = document.getElementById('pv-handle');
  if (handleEl) handleEl.textContent = pd.ig || '@handle';

  // Location
  const locEl = document.getElementById('pv-loc');
  if (locEl) locEl.textContent = (pd.st || 'State') + ' · ' + (pd.cat || 'Category');

  // Stats
  setText('pv-pb',   pd.pb   || '—');
  setText('pv-age',  pd.age  || '—');
  setText('pv-gear', pd.gear || 'Amentum Gear');
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

/* ── ENROLLMENT SUBMISSION ──────────────────────────────────── */
function doEnroll() {
  if (!pd.fn && !pd.ln) {
    showToast('Please enter your name to continue.');
    return;
  }
  if (!pd.ig) {
    showToast('Please enter your Instagram handle.');
    return;
  }
  showToast('Enrollment submitted! We\'ll verify your @amentum.sports follow and confirm within 48 hours.');
}

/* ── TOAST NOTIFICATION ─────────────────────────────────────── */
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = `
      position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%) translateY(80px);
      background: #0a0a0a; color: #fff; padding: 14px 24px; border-radius: 24px;
      font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
      z-index: 9000; opacity: 0; transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
      max-width: 420px; text-align: center; pointer-events: none;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(80px)';
  }, 3200);
}

/* ── INIT ON DOM READY ──────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
});
