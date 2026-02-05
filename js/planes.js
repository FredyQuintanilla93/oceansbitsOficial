document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".plan-btn");
  const cards = document.querySelectorAll(".plan-card");
  const indicator = document.getElementById("indicator");
  let activeBtn = buttons[0];

  function moveIndicator(btn) {
    const rect = btn.getBoundingClientRect();
    const parentRect = btn.parentElement.getBoundingClientRect();

    indicator.style.width = `${rect.width}px`;
    indicator.style.transform = `translateX(${rect.left - parentRect.left}px)`;
  }

  function activatePlan(btn) {
    const plan = btn.dataset.plan;

    // Botones
    buttons.forEach(b => {
      b.classList.remove("text-white");
      b.classList.add("text-gray-500", "dark:text-gray-400");
    });

    btn.classList.add("text-white");
    btn.classList.remove("text-gray-500", "dark:text-gray-400");

    // Indicador
    moveIndicator(btn);
    activeBtn = btn;

    // Cards
    cards.forEach(card => {
      card.classList.add(
        "hidden",
        "opacity-0",
        "scale-95",
        "pointer-events-none"
      );
      card.classList.remove(
        "opacity-100",
        "scale-100",
        "shadow-2xl",
        "ring-2",
        "ring-primary/40"
      );
    });

    const activeCard = document.querySelector(
      `.plan-card[data-plan="${plan}"]`
    );

    activeCard.classList.remove(
      "hidden",
      "opacity-0",
      "scale-95",
      "pointer-events-none"
    );
    activeCard.classList.add(
      "opacity-100",
      "scale-100",
      "shadow-2xl",
      "ring-2",
      "ring-primary/40"
    );
  }

  buttons.forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      if (window.innerWidth >= 768) activatePlan(btn);
    });

    btn.addEventListener("click", () => activatePlan(btn));

    btn.setAttribute("tabindex", "0");
    btn.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") activatePlan(btn);
    });
  });

  // Init brutal
  requestAnimationFrame(() => {
    moveIndicator(activeBtn);
    activatePlan(activeBtn);
  });

  // Resize fix
  window.addEventListener("resize", () => moveIndicator(activeBtn));
});
