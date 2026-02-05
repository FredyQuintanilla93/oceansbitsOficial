/**
 * Plan Switcher - Maneja la animación y cambio de planes de facturación
 * Características:
 * - Animación suave del indicador
 * - Cambio de tarjetas con transición
 * - Soporte keyboard accesible
 * - Responsive: hover en desktop, click en mobile
 */

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".plan-btn");
  const cards = document.querySelectorAll(".plan-card");
  const indicator = document.getElementById("indicator");
  
  if (!buttons.length || !cards.length || !indicator) {
    console.warn("Plan switcher: Elementos necesarios no encontrados");
    return;
  }

  let activeBtn = buttons[0];
  const MOBILE_BREAKPOINT = 768;
  const HIDDEN_CLASSES = ["hidden", "opacity-0", "scale-95", "pointer-events-none"];
  const VISIBLE_CLASSES = ["opacity-100", "scale-100", "shadow-2xl", "ring-2", "ring-primary/40"];

  /**
   * Anima el indicador para que siga el botón activo
   */
  function moveIndicator(btn) {
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const parentRect = btn.parentElement.getBoundingClientRect();

    indicator.style.width = `${rect.width}px`;
    indicator.style.transform = `translateX(${rect.left - parentRect.left}px)`;
  }

  /**
   * Activa un plan específico y actualiza UI
   */
  function activatePlan(btn) {
    const plan = btn.dataset.plan;
    if (!plan) return;

    // Actualizar estilos de botones
    buttons.forEach(b => {
      b.classList.remove("text-white");
      b.classList.add("text-gray-500", "dark:text-gray-400");
    });
    
    btn.classList.add("text-white");
    btn.classList.remove("text-gray-500", "dark:text-gray-400");

    // Actualizar indicador
    moveIndicator(btn);
    activeBtn = btn;

    // Ocultar todas las tarjetas
    cards.forEach(card => {
      card.classList.add(...HIDDEN_CLASSES);
      card.classList.remove(...VISIBLE_CLASSES);
    });

    // Mostrar tarjeta activa
    const activeCard = document.querySelector(`.plan-card[data-plan="${plan}"]`);
    if (activeCard) {
      activeCard.classList.remove(...HIDDEN_CLASSES);
      activeCard.classList.add(...VISIBLE_CLASSES);
    }
  }

  // Event listeners para los botones
  buttons.forEach(btn => {
    // Hover en desktop (md: 768px)
    btn.addEventListener("mouseenter", () => {
      if (window.innerWidth >= MOBILE_BREAKPOINT) {
        activatePlan(btn);
      }
    });

    // Click en todos los tamaños
    btn.addEventListener("click", () => activatePlan(btn));

    // Accesibilidad: teclado
    btn.setAttribute("tabindex", "0");
    btn.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activatePlan(btn);
      }
    });
  });

  // Inicializar
  requestAnimationFrame(() => {
    moveIndicator(activeBtn);
    activatePlan(activeBtn);
  });

  // Ajustar indicador al cambiar tamaño de ventana
  window.addEventListener("resize", () => {
    if (activeBtn) moveIndicator(activeBtn);
  });
});
