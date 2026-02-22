const root = document.documentElement;
const motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const applyTheme = (theme) => {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('pcn-theme', theme);
};
const saved = localStorage.getItem('pcn-theme');
if (saved) applyTheme(saved);
else applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

const toggleTheme = () => applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
document.getElementById('theme-toggle-mobile')?.addEventListener('click', toggleTheme);

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: motionOK ? 'smooth' : 'auto', block: 'start' });
  });
});

const gatePanel = document.getElementById('gate-panel');
const ctaButtons = [...document.querySelectorAll('[data-purchase-cta="true"]')];
const pricingCards = [...document.querySelectorAll('.pricing-card')];
let gateState = null;

const setGate = (state) => {
  gateState = state;
  document.getElementById('segment-council').setAttribute('aria-selected', state === 'council');
  document.getElementById('segment-private').setAttribute('aria-selected', state === 'private');

  if (state === 'council') {
    gatePanel.innerHTML = 'This looks like a council Penalty Charge Notice, which we do not support. Please use <a class="underline" href="{{CITIZENS_ADVICE_LINK}}">Citizens Advice guidance</a>. If unsure, start with a Sanity Check.';
    pricingCards.forEach((card) => card.setAttribute('aria-disabled', 'true'));
    ctaButtons.forEach((btn) => btn.classList.add('opacity-50', 'pointer-events-none'));
  } else if (state === 'private') {
    gatePanel.textContent = 'You’re in the right place. Select a plan and continue.';
    pricingCards.forEach((card) => card.setAttribute('aria-disabled', 'false'));
    ctaButtons.forEach((btn) => btn.classList.remove('opacity-50', 'pointer-events-none'));
  }
};

document.getElementById('segment-council')?.addEventListener('click', () => setGate('council'));
document.getElementById('segment-private')?.addEventListener('click', () => setGate('private'));
document.getElementById('not-sure')?.addEventListener('click', () => {
  selectPlan('sanity');
  document.getElementById('pricing').scrollIntoView({ behavior: motionOK ? 'smooth' : 'auto' });
});

const continueBtn = document.getElementById('continue-cta');
const selectionCopy = document.getElementById('selection-copy');
let selectedPlan = '';

const selectPlan = (plan) => {
  selectedPlan = plan;
  pricingCards.forEach((card) => {
    const selected = card.dataset.plan === plan;
    card.classList.toggle('selected', selected);
    card.setAttribute('aria-pressed', selected);
    if (selected) {
      continueBtn.href = card.dataset.checkout;
      selectionCopy.textContent = `Selected: ${card.querySelector('h3')?.textContent || plan}`;
    }
  });
};

pricingCards.forEach((card) => {
  const activate = () => selectPlan(card.dataset.plan);
  card.addEventListener('click', activate);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      activate();
    }
  });
});

document.querySelectorAll('[data-select-plan]').forEach((btn) => {
  btn.addEventListener('click', () => selectPlan(btn.dataset.selectPlan));
});

const mobileBar = document.getElementById('mobile-bar');
window.addEventListener('scroll', () => {
  if (!mobileBar) return;
  const show = window.scrollY > 280;
  mobileBar.classList.toggle('show', show);
  mobileBar.setAttribute('aria-hidden', String(!show));
});

const faqTriggers = [...document.querySelectorAll('.faq-trigger')];
faqTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const item = trigger.closest('.faq-item');
    const open = item.classList.toggle('open');
    trigger.setAttribute('aria-expanded', String(open));
  });
});

const form = document.getElementById('intake-form');
const formMessage = document.getElementById('form-message');
form?.addEventListener('submit', (e) => {
  const endpoint = form.getAttribute('action') || '';
  if (!form.checkValidity()) {
    e.preventDefault();
    formMessage.textContent = 'Please complete the required fields before submitting.';
    formMessage.style.color = 'var(--muted)';
    return;
  }
  if (!document.getElementById('consent').checked) {
    e.preventDefault();
    formMessage.textContent = 'Please confirm consent so we can process your request.';
    return;
  }
  if (!endpoint || endpoint.includes('{{')) {
    e.preventDefault();
    formMessage.textContent = 'Endpoint not configured yet. Replace {{INTAKE_ENDPOINT}} or email {{SUPPORT_EMAIL}} to proceed.';
    return;
  }
  formMessage.textContent = 'Submitting securely...';
});

document.getElementById('hero-upload')?.addEventListener('click', () => {
  setGate('private');
});
