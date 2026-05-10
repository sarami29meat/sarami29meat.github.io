// mobile nav
const burger = document.querySelector('.nav-burger');
const navLinks = document.querySelector('.nav-links');
if (burger && navLinks) {
  burger.addEventListener('click', () => navLinks.classList.toggle('open'));
}

function formatDate(str) {
  const d = new Date(str);
  return d.toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.');
}

// tools grid (index)
function renderTools() {
  const el = document.getElementById('tools-grid');
  if (!el || typeof TOOLS === 'undefined') return;
  el.innerHTML = TOOLS.map(t => `
    <div class="tool-card">
      <div class="tool-top">
        <span class="tool-icon-wrap">${t.icon}</span>
        <span class="tool-status">● live</span>
      </div>
      <div class="tool-name">${t.name}</div>
      <div class="tool-desc">${t.desc}</div>
      <div class="tool-foot">
        ${t.github ? `<a class="tool-a" href="${t.github}" target="_blank">GitHub</a>` : ''}
        ${t.download && t.download !== '#' ? `<a class="tool-a" href="${t.download}" target="_blank">Download</a>` : ''}
      </div>
    </div>
  `).join('');
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
    <div class="blog-row">
      <div class="blog-row-date">${formatDate(p.date)}</div>
      <div>
        <div class="blog-row-tag">${p.tag}</div>
        <div class="blog-row-title"><a href="../${p.file}">${p.title}</a></div>
        <div class="blog-row-excerpt">${p.excerpt}</div>
      </div>
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
