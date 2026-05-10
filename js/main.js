// ===== Mobile nav =====
const burger = document.querySelector('.nav-burger');
const navLinks = document.querySelector('.nav-links');
if (burger && navLinks) {
  burger.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// ===== Active nav link =====
(function () {
  const path = location.pathname;
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (
      (href === 'index.html' && (path.endsWith('/') || path.endsWith('index.html'))) ||
      (href !== 'index.html' && path.includes(href))
    ) a.classList.add('active');
  });
})();

// ===== Render tools (index.html) =====
function renderTools() {
  const grid = document.getElementById('tools-grid');
  if (!grid || typeof TOOLS === 'undefined') return;
  grid.innerHTML = TOOLS.map(t => `
    <div class="tool-card">
      <div class="tool-icon">${t.icon}</div>
      <div class="tool-name">${t.name}</div>
      <div class="tool-desc">${t.desc}</div>
      <div class="tool-footer">
        <span class="tool-badge ${t.badge}">${t.badgeText}</span>
        <div class="tool-links">
          ${t.github ? `<a class="tool-link" href="${t.github}" target="_blank">GitHub</a>` : ''}
          ${t.download && t.download !== '#' ? `<a class="tool-link" href="${t.download}" target="_blank">DL</a>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

// ===== Render recent posts (index.html) =====
function renderRecentPosts() {
  const list = document.getElementById('recent-posts');
  if (!list || typeof POSTS === 'undefined') return;
  const recent = POSTS.slice(0, 5);
  list.innerHTML = recent.map(p => `
    <div class="post-item">
      <div class="post-item-left">
        <a class="post-title" href="${p.file}">${p.title}</a>
        <div class="post-meta">${formatDate(p.date)}</div>
      </div>
      <span class="post-tag">${p.tag}</span>
    </div>
  `).join('');
}

// ===== Render blog list (blog/index.html) =====
function renderBlogList() {
  const grid = document.getElementById('blog-grid');
  if (!grid || typeof POSTS === 'undefined') return;
  grid.innerHTML = POSTS.map(p => `
    <div class="blog-card">
      <div class="blog-card-tag">${p.tag}</div>
      <div class="blog-card-title"><a href="../${p.file}">${p.title}</a></div>
      <div class="blog-card-excerpt">${p.excerpt}</div>
      <div class="blog-card-meta">${formatDate(p.date)}</div>
    </div>
  `).join('');
}

function formatDate(str) {
  const d = new Date(str);
  return d.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
}

// ===== Contact form =====
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-submit');
    btn.disabled = true;
    btn.textContent = '送信中...';
    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' },
      });
      if (res.ok) {
        btn.textContent = '送信しました！';
        contactForm.reset();
      } else {
        btn.textContent = 'エラーが発生しました';
        btn.disabled = false;
      }
    } catch {
      btn.textContent = 'エラーが発生しました';
      btn.disabled = false;
    }
  });
}

renderTools();
renderRecentPosts();
renderBlogList();
