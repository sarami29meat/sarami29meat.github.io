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
  const display = document.getElementById('digit-display');
  if (!display) return;


  const KIRIBAN = [10, 50, 100, 200, 300, 500, 1000, 2000, 3000, 5000, 10000, 20000, 50000, 100000];
  const KIRIBAN_MSGS = {
    ja: [
      'キリ番ＧＥＴおめでとうございます！！<br>あなたがこのサイトの記念すべき１人目のお客様です☆<br>本当にありがとうございます＼(^o^)／',
      'ついに５０人突破ー！！！<br>こんなサイトに来てくれてありがとうございます★<br>これからもよろしくお願いします(^▽^)',
      'ついに１００人突破ーーー！！(゜▽゜)<br>こんなマイナーなサイトまで来てくれて本当にありがとう★<br>ゆっくりしていってください(^▽^)',
      '２００人目ＧＥＴ！！おめでとうございます★<br>もはや同窓会できそうな人数ですｗ<br>ありがとうございます(≧▽≦)',
      '３００人突破きたー！！！<br>ちょっとした学校のクラスくらいの人数です笑<br>本当にありがとうございます☆',
      '５００人目おめでとうございます！！！<br>ライブハウス満員くらいの人が来てくれました(゜▽゜)<br>感謝感謝です★☆★',
      '１０００人突破ーーー！！！<br>信じられない(T▽T)ありがとうございます！！！<br>コーヒー１杯分でも応援してもらえたら本気で泣きます笑',
      '２０００人！！おめでとうございます★<br>もうちょっとした小さな町ですよ笑<br>本当にありがとうございますm(_ _)m',
      '３０００人突破！！！<br>サイト作ってほんとうによかった(T▽T)☆<br>これからもよろしくお願いします！',
      '５０００人！！！キリ番おめでとうございます！！！<br>こんなに来てくれるとは思ってなかった(゜▽゜)<br>本当にありがとうございます🙏',
      '１万人突破ーーー！！！！！<br>信じられません(T▽T)本当にありがとうございます！！<br>泣いてます。マジで泣いてます。',
      '２万人！！もう言葉がないです(T▽T)<br>本当にありがとうございます★☆★',
      '５万人！！伝説じゃないですか！！！<br>信じられません(゜▽゜)ありがとうございます！',
      '１０万人突破！！！もうこれは歴史です！！！<br>本当にありがとうございます(T▽T)☆彡',
    ],
    en: [
      "Congratulations!! You're visitor No.1!!\nThank you so much for visiting (^o^)/",
      "50 visitors!! Thank you★\nSo glad you stopped by(^▽^)",
      "100th visitor GET!!\nTreat yourself to something nice☆",
      "200 visitors!! Almost party time(≧▽≦)\nThank you!!",
      "300 visitors!! That's a whole classroom lol\nThank you so much☆",
      "500th visitor!!\nA full live house worth of people(゜▽゜)★☆★",
      "1,000 visitors!!!!!\nI can't believe it(T▽T) Thank you!!!\nA coffee would make me cry lol",
      "2,000 visitors!! That's a small town lol\nThank you so much m(_ _)m",
      "3,000 visitors!!\nSo glad I made this site(T▽T)☆",
      "5,000 visitors!!!\nI never expected this(゜▽゜)\nThank you so much 🙏",
      "10,000 visitors!!!!!\nActually crying right now(T▽T)\nThank you so much!!",
      "20,000!! Words fail me(T▽T)★☆★\nThank you!!",
      "50,000!! This is legendary!!\nI can't believe it(゜▽゜)",
      "100,000 visitors!!! This is HISTORY!!\nThank you(T▽T)☆彡",
    ],
  };

  try {
    if (new URLSearchParams(location.search).get('admin') === '1') {
      localStorage.setItem('sarami_admin', '1');
    }
    const isAdmin = localStorage.getItem('sarami_admin') === '1';
    const lastVisit = parseInt(localStorage.getItem('sarami_last_visit') || '0', 10);
    const now = Date.now();
    const cooldown = 24 * 60 * 60 * 1000;
    const shouldCount = !isAdmin && (now - lastVisit > cooldown);

    // API1: counterapi.dev
    const apis = shouldCount ? [
      'https://api.counterapi.dev/v1/sarami29meat/visits/up',
    ] : [
      'https://api.counterapi.dev/v1/sarami29meat/visits/',
    ];

    let count = null;
    for (const url of apis) {
      try {
        const r = await fetch(url);
        if (!r.ok) continue;
        const d = await r.json();
        count = d.value ?? d.count ?? null;
        if (count !== null) break;
      } catch(_) {}
    }
    if (count === null) throw new Error('all apis failed');
    if (shouldCount) localStorage.setItem('sarami_last_visit', String(now));

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
      document.getElementById('kiriban-num').textContent = `${count.toLocaleString()} 人目！！`;
      document.getElementById('kiriban-msg').innerHTML = msg;

      // お祝いページへのリンクを生成
      const link = document.getElementById('kiriban-link');
      const oiwaiUrl = `oiwai.html?n=${count}&m=${encodeURIComponent(msg)}`;
      link.href = oiwaiUrl;
      link.style.display = 'inline-block';

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

  const H = 72; // digit-boxの高さ(px) ← CSSのheightと必ず合わせる
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

    // 左が最初に止まり、右が最後に止まる
    // 全桁同時にスタート → 各桁のdurationが違うので左から順に止まる
    const durations = [0.55, 0.85, 1.15]; // 左: 速い, 右: 遅い
    const totalOffset = (items.length - 1) * H;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        reel.style.transition = `transform ${durations[i] || 1.15}s cubic-bezier(0.05, 0.7, 0.1, 1.0)`;
        reel.style.transform = `translateY(-${totalOffset}px)`;
      });
    });
  });
}
