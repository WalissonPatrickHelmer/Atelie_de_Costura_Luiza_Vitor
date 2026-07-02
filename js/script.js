document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Ano automático no footer ---------- */
  var anoEl = document.getElementById('ano');
  if (anoEl) anoEl.textContent = new Date().getFullYear();

  /* ---------- Header muda de fundo ao rolar ---------- */
  var header = document.getElementById('header');
  function atualizarHeader() {
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
  atualizarHeader();
  window.addEventListener('scroll', atualizarHeader, { passive: true });

  /* ---------- Menu mobile ---------- */
  var menuToggle = document.getElementById('menuToggle');
  var nav = document.getElementById('nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      var aberto = nav.classList.toggle('is-open');
      menuToggle.classList.toggle('is-active', aberto);
      menuToggle.setAttribute('aria-expanded', aberto ? 'true' : 'false');
    });

    nav.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        menuToggle.classList.remove('is-active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Parallax leve na imagem do hero ---------- */
  var heroImg = document.getElementById('heroImg');
  if (heroImg) {
    window.addEventListener('scroll', function () {
      var deslocamento = window.scrollY * 0.28;
      heroImg.style.transform = 'translateY(' + deslocamento + 'px) scale(1.08)';
    }, { passive: true });
  }

  /* ---------- Animação ao entrar na tela (scroll reveal) ---------- */
  var elementosRevelados = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada, index) {
        if (entrada.isIntersecting) {
          setTimeout(function () {
            entrada.target.classList.add('is-visible');
          }, (index % 3) * 90);
          observador.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    elementosRevelados.forEach(function (el) { observador.observe(el); });
  } else {
    elementosRevelados.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Modal da galeria ---------- */
  var modal = document.getElementById('modal');
  var modalImg = document.getElementById('modalImg');
  var modalClose = document.getElementById('modalClose');
  var itensGaleria = document.querySelectorAll('.galeria__item');

  function abrirModal(src, alt) {
    modalImg.src = src;
    modalImg.alt = alt || '';
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function fecharModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  itensGaleria.forEach(function (item) {
    item.addEventListener('click', function () {
      var img = item.querySelector('img');
      abrirModal(item.getAttribute('data-full'), img ? img.alt : '');
    });
  });

  if (modalClose) modalClose.addEventListener('click', fecharModal);
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) fecharModal();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') fecharModal();
  });

});
