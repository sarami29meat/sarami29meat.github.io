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

// ===== 管理者モード設定 =====
(function checkAdminParam() {
  const params = new URLSearchParams(location.search);
  if (params.get('sarami_secret') === 'owner2929') {
    localStorage.setItem('sarami_admin', '1');
    // パラメータを消してリダイレクト
    history.replaceState(null, '', location.pathname);
  }
})();

// ===== 訪問者カウンター & キリ番 =====
(async function initCounter() {
  const el = document.getElementById('visitor-count');
  if (!el) return;

  const KIRIBAN = [10, 50, 100, 200, 300, 500, 1000, 2000, 3000, 5000, 10000, 20000, 50000, 100000];
  const KIRIBAN_MSGS = {
    ja: [
      '初めまして！あなたが最初の訪問者です。記念すべき1人目、ありがとうございます🥹',
      'ついに50人突破！こんなサイトに来てくれてありがとうございます。',
      '100人目おめでとうございます！キリ番ゲットですね。何か買って飲んでください☕',
      '200人突破。もはや同窓会できそうな人数です。',
      '300人。ちょっとした学校のクラスですね。ありがとうございます。',
      '500人！ライブハウス満員くらいの人数が来てくれました🎸',
      '1000人突破！！！感謝しかないです。コーヒー1杯分奢ってもらえると本当に泣きます☕',
      '2000人！もうちょっとした小さな町ですよ。ありがとうございます！',
      '3000人！！ありがとうございます。サイト作って本当によかった。',
      '5000人！！！ここまで来てくれるとは思ってなかった。本当にありがとうございます🙏',
      '1万人突破！！！信じられない。本当にありがとうございます。泣いてます。',
      '2万人！！もう言葉がない。ありがとう。',
      '5万人！！伝説です。',
      '10万人！！！もうこれは歴史です。',
    ],
    en: [
      "You're the very first visitor. Thank you for being here 🥹",
      "50 visitors! Thanks for stopping by this little corner of the internet.",
      "100th visitor! You hit the jackpot. Go treat yourself to something nice ☕",
      "200 visitors. We could almost have a party.",
      "300 visitors. That's a whole classroom. Thank you.",
      "500 visitors! A packed small venue's worth of people 🎸",
      "1,000 visitors!! I genuinely can't thank you enough. If you buy me a coffee I will cry ☕",
      "2,000 visitors! That's a small neighborhood. Thank you!!",
      "3,000 visitors!! So glad I made this site.",
      "5,000 visitors!!! I never expected this. Thank you so much 🙏",
      "10,000 visitors!!! I'm actually crying. Thank you.",
      "20,000 visitors!! Words fail me. Thank you.",
      "50,000 visitors!! This is legendary.",
      "100,000 visitors!!! This is history.",
    ],
  };

  try {
    const isAdmin = localStorage.getItem('sarami_admin') === '1';
    const lastVisit = parseInt(localStorage.getItem('sarami_last_visit') || '0', 10);
    const now = Date.now();
    const cooldown = 24 * 60 * 60 * 1000; // 24時間

    // 管理人 or 24時間以内の再訪問はカウントしない（GETのみ）
    const shouldCount = !isAdmin && (now - lastVisit > cooldown);
    const endpoint = shouldCount
      ? 'https://api.counterapi.dev/v1/sarami29meat/visits/up'
      : 'https://api.counterapi.dev/v1/sarami29meat/visits';

    const res = await fetch(endpoint);
    if (!res.ok) throw new Error();
    if (shouldCount) localStorage.setItem('sarami_last_visit', String(now));
    const data = await res.json();
    const count = data.value;
    animateSlotCounter(count);

    const idx = KIRIBAN.indexOf(count);
    if (idx !== -1) {
      const lang = localStorage.getItem('sarami_lang') || 'ja';
      const msgs = lang === 'en' ? KIRIBAN_MSGS.en : KIRIBAN_MSGS.ja;
      const msg = msgs[idx] || `${count.toLocaleString()}人目の訪問者です！🎉`;
      const emojis = ['🎉','🥳','🎊','✨','🎸','☕','🙏','🏆'];
      const emoji = emojis[idx % emojis.length];

      const overlay = document.getElementById('kiriban-overlay');
      document.getElementById('kiriban-emoji').textContent = emoji;
      document.getElementById('kiriban-msg').innerHTML =
        `<strong>${count.toLocaleString()}人目</strong>の訪問者です！<br><br>${msg}`;
      overlay.style.display = 'flex';
      document.getElementById('kiriban-close').onclick = () => overlay.style.display = 'none';
    }
  } catch {
    // APIエラー時は"---"のまま
  }
})();

function animateSlotCounter(count) {
  const display = document.getElementById('digit-display');
  if (!display) return;
  display.innerHTML = '';

  const H = 76; // digit-boxの高さ(px)
  // 必ず3桁ゼロ埋め
  const padded = String(count).padStart(3, '0').split('');

  padded.forEach((digit, i) => {
    const box = document.createElement('div');
    box.className = 'digit-box';

    const reel = document.createElement('div');
    reel.className = 'digit-reel';

    const target = parseInt(digit);

    // 9から始まり3回転して target で止まるリール
    // 順序: 9,8,7,6,5,4,3,2,1,0 を3周 → 9からtargetまで下降
    const items = [];
    for (let cycle = 0; cycle < 3; cycle++) {
      for (let n = 9; n >= 0; n--) items.push(n);
    }
    // 最終: 9 → target（降順）
    for (let n = 9; n >= target; n--) items.push(n);

    items.forEach(n => {
      const span = document.createElement('span');
      span.textContent = n;
      reel.appendChild(span);
    });

    box.appendChild(reel);
    display.appendChild(box);

    // アニメーション: 各桁を少しずらしてスタート、0.5秒で止まる
    const totalOffset = (items.length - 1) * H;
    const delay = 60 + i * 80; // 左→右に順番に止まる
    setTimeout(() => {
      reel.style.transition = `transform 0.5s cubic-bezier(0.2, 0.8, 0.3, 1)`;
      reel.style.transform = `translateY(-${totalOffset}px)`;
    }, delay);
  });
}
