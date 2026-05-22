/* ============================================================
   Rustik Plank – Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Simple Hero Slider ---------- */
  const slides = [
    {
      imgSrc: 'images/rustik_plant.jpg',
      text: 'This is Photoshop\'s version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit.',
      price: '129',
      cents: '99'
    },
    {
      imgSrc: 'images/rustik_plant.jpg',
      text: 'Premium handcrafted furniture made from reclaimed wood. Each piece is unique, sustainable, and built to last a lifetime of use and enjoyment.',
      price: '249',
      cents: '99'
    },
    {
      imgSrc: 'images/rustik_plant.jpg',
      text: 'Exclusive designer collection – modern meets rustic in our most popular range. Crafted by artisans with over 30 years of experience.',
      price: '189',
      cents: '50'
    }
  ];

  let currentSlide = 0;
  const heroImg     = document.getElementById('hero-product-img');
  const heroText    = document.getElementById('hero-text');
  const heroPrice   = document.getElementById('hero-price-main');
  const heroCents   = document.getElementById('hero-price-cents');

  function goToSlide(idx) {
    currentSlide = (idx + slides.length) % slides.length;
    const s = slides[currentSlide];
    if (heroImg)   heroImg.src = s.imgSrc;
    if (heroText)  heroText.textContent = s.text;
    if (heroPrice) heroPrice.textContent = s.price;
    if (heroCents) heroCents.textContent = '.' + s.cents;
  }

  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

  // Auto-advance
  setInterval(() => goToSlide(currentSlide + 1), 5000);

  /* ---------- Cart Counter ---------- */
  let cartCount = 0;
  const cartCountEls = document.querySelectorAll('.cart-count');

  document.querySelectorAll('.btn-add-cart, .btn-detail').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      cartCount++;
      cartCountEls.forEach(el => el.textContent = cartCount + ' item' + (cartCount !== 1 ? 's' : ''));
      showToast('Item added to cart!');
    });
  });

  /* ---------- Toast Notification ---------- */
  function showToast(msg) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.style.cssText = [
        'position:fixed', 'bottom:30px', 'right:30px',
        'background:#e87722', 'color:#fff',
        'padding:10px 20px', 'border-radius:3px',
        'font-size:13px', 'z-index:9999',
        'opacity:0', 'transition:opacity 0.3s',
        'pointer-events:none'
      ].join(';');
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    setTimeout(() => { toast.style.opacity = '0'; }, 2500);
  }

  /* ---------- Search ---------- */
  const searchForm = document.querySelector('.nav-search');
  if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const val = this.querySelector('input').value.trim();
      if (val) showToast('Searching for: ' + val);
    });
    const searchBtn = searchForm.querySelector('button');
    if (searchBtn) {
      searchBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const val = searchForm.querySelector('input').value.trim();
        if (val) showToast('Searching for: ' + val);
      });
    }
  }

  /* ---------- Smooth hover underline for nav ---------- */
  document.querySelectorAll('.primary-nav ul li a').forEach(link => {
    link.addEventListener('mouseenter', function () { this.style.transition = 'all 0.2s'; });
  });

});
