// ===== VIVEIRO CÍTRICO — script.js =====

// Número do WhatsApp (só os dígitos, com código do país)
const WHATSAPP_NUMBER = '5547996726863'; // Substitua pelo número real

// Mensagem padrão ao clicar no botão de WhatsApp
const WPP_MESSAGE = 'Olá! Vi o site do Viveiro Yuri Bini e gostaria de saber mais sobre as mudas disponíveis.';

// ===== WHATSAPP =====
function abrirWhatsApp(mensagem = WPP_MESSAGE) {
  const texto = encodeURIComponent(mensagem);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`;
  window.open(url, '_blank');
}

document.querySelectorAll('.wpp-btn, .wpp-big').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    abrirWhatsApp();
  });
});

document.querySelectorAll('.prod-cta').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const nomeProduto = e.target.closest('.prod-card').querySelector('.prod-name').textContent;
    abrirWhatsApp(`Olá! Gostaria de saber o preço e disponibilidade da muda de *${nomeProduto}*.`);
  });
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Fechar ao clicar num link do menu
  mobileMenu.querySelectorAll('a').forEach(link => {
    if (!link.classList.contains('wpp-btn')) {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
      });
    }
  });

  // Fechar ao clicar fora
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    }
  });
}

// ===== NAVBAR sombra ao rolar =====
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  if (window.scrollY > 10) {
    nav.style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)';
  } else {
    nav.style.boxShadow = 'none';
  }
});

// ===== ANIMAÇÃO de entrada nos cards (Intersection Observer) =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.cat-card, .prod-card, .test-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(16px)';
  card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  observer.observe(card);
});