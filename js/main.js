// mobile nav
const burger = document.querySelector('.nav-burger');
const navLinks = document.querySelector('.nav-links');
if (burger && navLinks) {
  burger.addEventListener('click', () => navLinks.classList.toggle('open'));
}

function formatDate(str) {
  const d = new Date(str);
  return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
}

// tools grid
function renderTools() {
  const el = document.getElementById('tools-grid');
  if (!el || typeof TOOLS === 'undefined') return;
  el.innerHTML = TOOLS.map(t => {
    const href = t.download && t.download !== '#' ? t.download : (t.github || '#');
    const target = href !== '#' ? 'target="_blank"' : '';
    return `
    <a class="tool-card" href="${href}" ${target}>
      <div class="tool-top">
        <span class="tool-icon">${t.icon}</span>
        <span class="tool-live">公開中</span>
      </div>
      <div class="tool-name">${t.name}</div>
      <div class="tool-desc">${t.desc}</div>
      <div class="tool-foot">
        ${t.github ? `<span class="tool-link">GitHub →</span>` : ''}
        ${t.download && t.download !== '#' ? `<span class="tool-link">ダウンロード →</span>` : ''}
      </div>
    </a>
  `}).join('');
}

// recent posts (index)
function renderRecentPosts() {
  const el = document.getElementById('recent-posts');
  if (!el || typeof POSTS === 'undefined') return;
  el.innerHTML = POSTS.slice(0, 5).map(p => `
    <a class="post-row" href="${p.file}">
      <span class="post-row-title">${p.title}</span>
      <span class="post-row-date">${formatDate(p.date)}</span>
    </a>
  `).join('');
}

// blog list
function renderBlogList() {
  const el = document.getElementById('blog-grid');
  if (!el || typeof POSTS === 'undefined') return;
  el.innerHTML = POSTS.map(p => `
    <div class="blog-card">
      <span class="blog-card-tag">${p.tag}</span>
      <div class="blog-card-title"><a href="../${p.file}">${p.title}</a></div>
      <div class="blog-card-excerpt">${p.excerpt}</div>
      <div class="blog-card-date">${formatDate(p.date)}</div>
    </div>
  `).join('');
}

// contact form
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('.btn-send');
    btn.disabled = true;
    btn.textContent = '送信中...';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      btn.textContent = res.ok ? '送信しました！' : 'エラーが発生しました';
      if (res.ok) form.reset();
      else btn.disabled = false;
    } catch {
      btn.textContent = 'エラーが発生しました';
      btn.disabled = false;
    }
  });
}

renderTools();
renderRecentPosts();
renderBlogList();
