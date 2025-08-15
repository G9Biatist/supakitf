fetch('data/ebooks.json')
  .then(res => res.json())
  .then(data => {
    const brand = data.useFallback ? data.brandFallback : data.brandPrimary;
    document.getElementById('site-title').textContent = brand;
    document.getElementById('brand-name').textContent = brand;
    document.getElementById('brand-name-footer').textContent = brand;
    document.getElementById('year').textContent = new Date().getFullYear();

    // Social links
    const nav = document.getElementById('social-links');
    Object.entries(data.links).forEach(([key, url]) => {
      if (url) {
        const a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        a.textContent = key;
        nav.appendChild(a);
      }
    });

    // Hero section
    if (data.products.length > 0) {
      const hero = document.getElementById('hero');
      const p = data.products[0];
      hero.innerHTML = `
        <div style="text-align:center;padding:1rem;background:#fff;margin-bottom:1rem;">
          <h2>${p.title}</h2>
          <p>${p.tagline}</p>
          <a href="${p.gumroad}" class="buy-btn" target="_blank">ซื้อเลย (${p.price})</a>
        </div>
      `;
    }

    // Product grid
    const productsDiv = document.getElementById('products');
    data.products.forEach(prod => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${prod.image}" alt="${prod.title}">
        <div class="content">
          <h3>${prod.title}</h3>
          <p>${prod.tagline}</p>
          <p><strong>${prod.price}</strong></p>
          <a href="${prod.gumroad}" class="buy-btn" target="_blank">ซื้อเลย</a>
          ${prod.sample ? `<p><a href="${prod.sample}" target="_blank">ดูตัวอย่าง</a></p>` : ''}
        </div>
      `;
      productsDiv.appendChild(card);
    });
  });
