// Elementos do DOM
const sidebar = document.getElementById("sidebar")
const menuToggle = document.getElementById("menuToggle")
const closeSidebar = document.getElementById("closeSidebar")
const overlay = document.getElementById("overlay")
const navItems = document.querySelectorAll(".nav-item")
const cards = document.querySelectorAll(".card")
const toggleFundamentosBtn = document.getElementById("toggleFundamentos");
const toggleAplicacoesBtn = document.getElementById("toggleAplicacoes");
const fundamentosSection = document.getElementById("fundamentos");
const aplicacoesSection = document.getElementById("aplicacoes");

// Toggle do menu mobile
menuToggle.addEventListener("click", () => {
  sidebar.classList.add("active")
  overlay.classList.add("active")
  document.body.style.overflow = "hidden"
})

// Fechar sidebar
closeSidebar.addEventListener("click", closeSidebarMenu)
overlay.addEventListener("click", closeSidebarMenu)

function closeSidebarMenu() {
  sidebar.classList.remove("active")
  overlay.classList.remove("active")
  document.body.style.overflow = ""
}

// Fechar menu ao clicar em um item de navegação (mobile)
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (window.innerWidth <= 1024) {
      closeSidebarMenu()
    }
  })
})

// Highlight do item ativo no menu
function updateActiveNavItem() {
  const sections = document.querySelectorAll("section[id]")
  const scrollPosition = window.scrollY + 100

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navItems.forEach((item) => {
        item.classList.remove("active")
        if (item.getAttribute("href") === `#${sectionId}`) {
          item.style.background = "var(--color-surface-light)"
        } else {
          item.style.background = ""
        }
      })
    }
  })
}

window.addEventListener("scroll", updateActiveNavItem)

cards.forEach((card) => {
  const iconWrapper = card.querySelector(".card-icon-wrapper")

  // Expandir/recolher ao clicar no ícone
  if (iconWrapper) {
    iconWrapper.addEventListener("click", (e) => {
      e.stopPropagation()
      e.preventDefault()
      toggleCard(card)
    })
  }
})

function toggleCard(card) {
  const isExpanded = card.classList.contains("expanded")

  // Fechar todos os outros cards da mesma seção
  const section = card.closest(".section")
  if (section) {
    const sectionCards = section.querySelectorAll(".card")
    sectionCards.forEach((c) => {
      if (c !== card) {
        c.classList.remove("expanded")
      }
    })
  }

  // Toggle do card atual
  if (isExpanded) {
    card.classList.remove("expanded")
  } else {
    card.classList.add("expanded")
    // Scroll suave até o card expandido
    setTimeout(() => {
      card.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }, 100)
  }
}

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Animação de entrada dos cards ao fazer scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Aplicar animação inicial aos cards
cards.forEach((card, index) => {
  card.style.opacity = "0"
  card.style.transform = "translateY(20px)"
  card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`
  observer.observe(card)
})

function setupToggleView(button, section) {
  // Verifica se o botão e a seção existem na página
  if (button && section) {
    
    button.addEventListener("click", () => {
      // Adiciona ou remove a classe "view-expanded" da seção
      section.classList.toggle("view-expanded");
      
      const isExpandedView = section.classList.contains("view-expanded");
      
      // Muda o texto do botão
      if (isExpandedView) {
        button.innerText = "Modo Interativo";
      } else {
        button.innerText = "Expandir Todos";
      }
    });
  }
}

// Inicializa a função para as duas seções
setupToggleView(toggleFundamentosBtn, fundamentosSection);
setupToggleView(toggleAplicacoesBtn, aplicacoesSection);