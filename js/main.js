// ===== i18n =====
const i18n = {
  ja: {
    'nav-home':          'ホーム',
    'nav-blog':          'ブログ',
    'nav-contact':       'お問い合わせ',
    'hero-eyebrow':      '個人開発',
    'hero-title':        '気になったら、<br>つくる。',
    'hero-body':         '「こういうのあればな」と思ったものを作って公開してます。<br>使ってみて何か思ったらフィードバックください。',
    'hero-btn-tools':    'ツールを見る',
    'tools-label':       'Tools',
    'tools-title':       '公開中のツール',
    'blog-label':        'Blog',
    'blog-title':        '最近の記事',
    'more-link':         'もっと見る →',
    'cta-title':         'バグ・要望・感想',
    'cta-sub':           '気になることがあれば気軽に送ってください。もし使えたと思ったら、コーヒー一杯分でも支援してもらえると泣いて喜びます。',
    'cta-btn-contact':   'お問い合わせ',
    'cta-btn-coffee':    '☕ Buy me a coffee',
    'tool-live':         '公開中',
    'blog-page-title':   'ブログ',
    'blog-page-sub':     '作ったものの裏話や、気づいたことなど。',
    'contact-page-title':'お問い合わせ',
    'contact-page-sub':  'バグ・要望・感想、なんでもどうぞ。',
    'contact-form-title':'メッセージ',
    'contact-form-sub':  '動かない、こんな機能がほしい、使ってみた感想など気軽にどうぞ。',
    'contact-name-label':'名前（任意）',
    'contact-email-label':'メールアドレス ＊',
    'contact-msg-label': 'メッセージ ＊',
    'contact-submit':    '送信する',
    'donate-title':      '開発を支援する',
    'donate-sub':        '気に入ったツールがあれば、コーヒー1杯分だけ投げてもらえると次の開発の励みになります。',
  },
  en: {
    'nav-home':          'Home',
    'nav-blog':          'Blog',
    'nav-contact':       'Contact',
    'hero-eyebrow':      'Indie Developer',
    'hero-title':        "If it doesn't exist,<br>build it.",
    'hero-body':         "I build things I wish existed and share them.<br>Try something out and let me know what you think.",
    'hero-btn-tools':    'See Tools',
    'tools-label':       'Tools',
    'tools-title':       'Available Tools',
    'blog-label':        'Blog',
    'blog-title':        'Recent Posts',
    'more-link':         'See all →',
    'cta-title':         'Bugs, Requests & Feedback',
    'cta-sub':           "Got something on your mind? Feel free to reach out. And if something I built actually helped you — buying me a coffee would honestly make my day.",
    'cta-btn-contact':   'Contact',
    'cta-btn-coffee':    '☕ Buy me a coffee',
    'tool-live':         'Live',
    'blog-page-title':   'Blog',
    'blog-page-sub':     'Behind the scenes of what I build.',
    'contact-page-title':'Contact',
    'contact-page-sub':  'Bugs, requests, or just saying hi — all welcome.',
    'contact-form-title':'Send a Message',
    'contact-form-sub':  "Broken, missing a feature, or just a thought — feel free to send anything.",
    'contact-name-label':'Name (optional)',
    'contact-email-label':'Email *',
    'contact-msg-label': 'Message *',
    'contact-submit':    'Send',
    'donate-title':      'Support the Work',
    'donate-sub':        "If something's been useful, buying me a coffee helps keep the next project going.",
  },
};

const LANG_KEY = 'sarami_lang';
let currentLang = localStorage.getItem(LANG_KEY) || 'ja';

function t(key) { return i18n[currentLang][key] || i18n.ja[key] || key; }

function applyLang() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = t(key);
    if (val.includes('<br>') || val.includes('<')) el.innerHTML = val;
    else el.textContent = val;
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPh);
  });
  const btn = document.getElementById('lang-toggle');
  if (btn) btn.textContent = currentLang === 'ja' ? 'EN' : 'JP';
  document.documentElement.lang = currentLang === 'ja' ? 'ja' : 'en';
  renderTools();
  renderRecentPosts();
  renderBlogList();
}

function toggleLang() {
  currentLang = currentLang === 'ja' ? 'en' : 'ja';
  localStorage.setItem(LANG_KEY, currentLang);
  applyLang();
}

// ===== Mobile nav =====
const burger = document.querySelector('.nav-burger');
const navLinks = document.querySelector('.nav-links');
if (burger && navLinks) {
  burger.addEventListener('click', () => navLinks.classList.toggle('open'));
}

const langBtn = document.getElementById('lang-toggle');
if (langBtn) langBtn.addEventListener('click', toggleLang);

// ===== Helpers =====
function formatDate(str) {
  const d = new Date(str);
  if (currentLang === 'en') {
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }
  return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
}

// ===== Tools grid =====
function renderTools() {
  const el = document.getElementById('tools-grid');
  if (!el || typeof TOOLS === 'undefined') return;
  el.innerHTML = TOOLS.map(t2 => {
    const href = t2.download && t2.download !== '#' ? t2.download : (t2.github || '#');
    const target = href !== '#' ? 'target="_blank"' : '';
    const desc = currentLang === 'en' ? (t2.descEn || t2.desc) : t2.desc;
    return `
    <a class="tool-card" href="${href}" ${target}>
      <div class="tool-top">
        <span class="tool-icon">${t2.icon}</span>
        <span class="tool-live">${t('tool-live')}</span>
      </div>
      <div class="tool-name">${t2.name}</div>
      <div class="tool-desc">${desc}</div>
      <div class="tool-foot">
        ${t2.github ? `<span class="tool-link">GitHub →</span>` : ''}
      </div>
    </a>`;
  }).join('');
}

// ===== Recent posts (index) =====
function renderRecentPosts() {
  const el = document.getElementById('recent-posts');
  if (!el || typeof POSTS === 'undefined') return;
  el.innerHTML = POSTS.slice(0, 5).map(p => {
    const title = currentLang === 'en' ? (p.titleEn || p.title) : p.title;
    return `
    <a class="post-row" href="${p.file}">
      <span class="post-row-title">${title}</span>
      <span class="post-row-date">${formatDate(p.date)}</span>
    </a>`;
  }).join('');
}

// ===== Blog list =====
function renderBlogList() {
  const el = document.getElementById('blog-grid');
  if (!el || typeof POSTS === 'undefined') return;
  el.innerHTML = POSTS.map(p => {
    const title   = currentLang === 'en' ? (p.titleEn   || p.title)   : p.title;
    const excerpt = currentLang === 'en' ? (p.excerptEn || p.excerpt) : p.excerpt;
    const tag     = currentLang === 'en' ? (p.tagEn     || p.tag)     : p.tag;
    return `
    <div class="blog-card">
      <span class="blog-card-tag">${tag}</span>
      <div class="blog-card-title"><a href="../${p.file}">${title}</a></div>
      <div class="blog-card-excerpt">${excerpt}</div>
      <div class="blog-card-date">${formatDate(p.date)}</div>
    </div>`;
  }).join('');
}

// ===== Contact form =====
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('[data-i18n="contact-submit"]');
    btn.disabled = true;
    btn.textContent = currentLang === 'en' ? 'Sending...' : '送信中...';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      btn.textContent = res.ok
        ? (currentLang === 'en' ? 'Sent!' : '送信しました！')
        : (currentLang === 'en' ? 'Error. Try again.' : 'エラーが発生しました');
      if (res.ok) form.reset();
      else btn.disabled = false;
    } catch {
      btn.textContent = currentLang === 'en' ? 'Error. Try again.' : 'エラーが発生しました';
      btn.disabled = false;
    }
  });
}

// ===== Init =====
applyLang();
