
/* =========================================
   AHMAD SHAH PORTFOLIO
   SDD: Organized JavaScript
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  console.log("Ahmad Shah portfolio is ready.");

  // Mark JavaScript as ready for reveal animations.
  document.documentElement.classList.add("js-ready");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* =========================================
     MOBILE NAVIGATION
     ========================================= */

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".nav");

  if (menuButton && navigation) {
    menuButton.setAttribute("aria-expanded", "false");

    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");

      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.textContent = isOpen ? "✕" : "☰";
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("open");

        menuButton.setAttribute("aria-expanded", "false");
        menuButton.textContent = "☰";
      });
    });

    // Close mobile navigation when returning to desktop width.
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        navigation.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.textContent = "☰";
      }
    });
  }

  /* =========================================
     THEME TOGGLE
     ========================================= */

  
let themeButton = document.getElementById("theme-toggle");

if (!themeButton) {
  themeButton = document.createElement("button");
  themeButton.id = "theme-toggle";
  themeButton.type = "button";

  const nav = document.querySelector(
    ".nav, .nav-links, .navbar, nav"
  );

  if (nav) {
    nav.appendChild(themeButton);
  }
}

if (themeButton) {
  // Create the Purple Theme button beside the existing theme button
  let purpleButton = document.getElementById("purple-theme-toggle");

  if (!purpleButton) {
    purpleButton = document.createElement("button");
    purpleButton.id = "purple-theme-toggle";
    purpleButton.type = "button";
    purpleButton.textContent = "💜 Purple Theme";
    purpleButton.setAttribute("aria-label", "Switch to purple theme");

    themeButton.insertAdjacentElement("afterend", purpleButton);
  }

  const updateThemeButtons = () => {
    const greenEnabled = document.body.classList.contains("green-theme");
    const purpleEnabled = document.body.classList.contains("purple-theme");

    themeButton.textContent = greenEnabled
      ? "🌙 Dark Theme"
      : "💚 Green Theme";

    themeButton.setAttribute(
      "aria-label",
      greenEnabled ? "Switch to dark blue theme" : "Switch to dark green theme"
    );

    themeButton.setAttribute("aria-pressed", String(greenEnabled));

    purpleButton.textContent = purpleEnabled
      ? "🌙 Dark Theme"
      : "💜 Purple Theme";

    purpleButton.setAttribute("aria-pressed", String(purpleEnabled));
  };

  themeButton.addEventListener("click", () => {
    const greenEnabled = document.body.classList.contains("green-theme");
    const purpleEnabled = document.body.classList.contains("purple-theme");

    if (greenEnabled) {
      document.body.classList.remove("green-theme");
    } else if (purpleEnabled) {
      document.body.classList.remove("purple-theme");
    } else {
      document.body.classList.add("green-theme");
    }

    updateThemeButtons();
  });

  purpleButton.addEventListener("click", () => {
    const purpleEnabled = document.body.classList.contains("purple-theme");
    document.body.classList.remove("green-theme");

    if (purpleEnabled) {
      document.body.classList.remove("purple-theme");
    } else {
      document.body.classList.add("purple-theme");
    }

    updateThemeButtons();
  });

  updateThemeButtons();
}

  /* =========================================
     SECTION SCROLL REVEAL
     ========================================= */

  const revealSections = document.querySelectorAll(
    ".section-reveal"
  );

  if (
    !reducedMotion &&
    "IntersectionObserver" in window
  ) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08
      }
    );

    revealSections.forEach((section) => {
      revealObserver.observe(section);
    });
  } else {
    revealSections.forEach((section) => {
      section.classList.add("in-view");
    });
  }

  /* =========================================
     FOOTER YEAR
     ========================================= */

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* =========================================
     ACTIVE NAVIGATION LINKS
     ========================================= */

  const pageSections = document.querySelectorAll(
    "main section[id]"
  );

  const navLinks = document.querySelectorAll(
    ".nav a[href^='#']"
  );

  if (
    "IntersectionObserver" in window &&
    pageSections.length &&
    navLinks.length
  ) {
    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navLinks.forEach((link) => {
            const isActive =
              link.getAttribute("href") ===
              "#" + entry.target.id;

            link.classList.toggle("active", isActive);
          });
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px"
      }
    );

    pageSections.forEach((section) => {
      activeObserver.observe(section);
    });
  }

  /* =========================================
     SKILL AND PROJECT CARD ANIMATIONS
     ========================================= */

  const cards = document.querySelectorAll(
    ".skill-card, .project-card, " +
    ".skills .card, .projects .card, " +
    ".skills-container > *, .projects-container > *, " +
    "#skills .grid > *, #projects .grid > *"
  );

  if (
    !reducedMotion &&
    "IntersectionObserver" in window
  ) {
    const cardObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("motion-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    cards.forEach((card, index) => {
      card.classList.add("motion-card");

      card.style.setProperty(
        "--card-delay",
        `${(index % 5) * 100}ms`
      );

      cardObserver.observe(card);
    });
  } else {
    cards.forEach((card) => {
      card.classList.add(
        "motion-card",
        "motion-visible"
      );
    });
  }

  /* =========================================
     GENTLE DESKTOP 3D CARD MOVEMENT
     ========================================= */

  const desktopPointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  );

  if (!reducedMotion && desktopPointer.matches) {
    cards.forEach((card) => {
      card.addEventListener("mousemove", (event) => {
        const rect = card.getBoundingClientRect();

        if (!rect.width || !rect.height) return;

        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        const rotateY = (x - 0.5) * 5;
        const rotateX = (0.5 - y) * 5;

        card.style.setProperty(
          "--tilt-x",
          `${rotateX}deg`
        );

        card.style.setProperty(
          "--tilt-y",
          `${rotateY}deg`
        );

        card.classList.add("motion-tilting");
      });

      card.addEventListener("mouseleave", () => {
        card.classList.remove("motion-tilting");

        card.style.removeProperty("--tilt-x");
        card.style.removeProperty("--tilt-y");
      });
    });
  }

  /* =========================================
     WATER BUBBLE BACKGROUND
     ========================================= */

  if (
    !reducedMotion &&
    !document.getElementById("water-bubble-layer")
  ) {
    const bubbleLayer = document.createElement("div");

    bubbleLayer.id = "water-bubble-layer";
    bubbleLayer.setAttribute("aria-hidden", "true");

    document.body.prepend(bubbleLayer);

    const bubbleCount =
      window.innerWidth < 600 ? 9 : 17;

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < bubbleCount; i++) {
      const bubble = document.createElement("span");

      bubble.className = "water-bubble";

      const size = 8 + Math.random() * 25;
      const duration = 12 + Math.random() * 16;
      const delay = -(Math.random() * duration);

      bubble.style.setProperty(
        "--bubble-left",
        `${Math.random() * 100}%`
      );

      bubble.style.setProperty(
        "--bubble-size",
        `${size}px`
      );

      bubble.style.setProperty(
        "--bubble-duration",
        `${duration}s`
      );

      bubble.style.setProperty(
        "--bubble-delay",
        `${delay}s`
      );

      fragment.appendChild(bubble);
    }

    bubbleLayer.appendChild(fragment);
  }

  console.log(
    "Theme, navigation, animations and bubbles initialized."
  );
});
