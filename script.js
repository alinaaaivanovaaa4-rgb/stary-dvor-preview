const siteHeader = document.querySelector(".site-header");
const burger = document.querySelector("#burger");
const mobileNav = document.querySelector("#mobileNav");
const mobileCta = document.querySelector(".mobile-cta");
const menuSearch = document.querySelector("#menuSearch");
const menuContent = document.querySelector("#menuContent");
const noResults = document.querySelector("#noResults");
const bookingButton = document.querySelector("#bookingButton");
const formStatus = document.querySelector("#formStatus");
const guestDate = document.querySelector("#guestDate");
const guestTime = document.querySelector("#guestTime");
const guestCount = document.querySelector("#guestCount");
const guestComment = document.querySelector("#guestComment");

const setHeaderState = () => {
  if (!siteHeader) return;

  const isScrolled = window.scrollY > 12;
  siteHeader.classList.toggle("is-scrolled", isScrolled);

  if (mobileCta) {
    mobileCta.classList.toggle("is-visible", window.scrollY > 420);
  }
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

if (burger && mobileNav && siteHeader) {
  const closeNav = () => {
    burger.classList.remove("is-open");
    mobileNav.classList.remove("is-open");
    siteHeader.classList.remove("nav-active");
    document.body.classList.remove("nav-open");
    burger.setAttribute("aria-expanded", "false");
  };

  burger.addEventListener("click", () => {
    const isOpen = !mobileNav.classList.contains("is-open");
    burger.classList.toggle("is-open", isOpen);
    mobileNav.classList.toggle("is-open", isOpen);
    siteHeader.classList.toggle("nav-active", isOpen);
    document.body.classList.toggle("nav-open", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
  });

  mobileNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      closeNav();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNav();
    }
  });
}

const tabLinks = [...document.querySelectorAll(".menu-tabs a")];
const menuSections = tabLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (menuSearch && menuContent && noResults) {
  const categories = [...menuContent.querySelectorAll(".menu-category")];
  const items = [...menuContent.querySelectorAll(".menu-item")];

  const filterMenu = () => {
    const query = menuSearch.value.trim().toLowerCase();
    let visibleItems = 0;

    categories.forEach((category) => {
      const categoryTitle = `${category.dataset.category || ""} ${category.querySelector("h3")?.textContent || ""}`.toLowerCase();
      const categoryMatches = query.length > 0 && categoryTitle.includes(query);
      const categoryItems = [...category.querySelectorAll(".menu-item")];

      categoryItems.forEach((item) => {
        const text = item.textContent.toLowerCase();
        const isVisible = !query || categoryMatches || text.includes(query);
        item.hidden = !isVisible;
        if (isVisible) visibleItems += 1;
      });

      category.hidden = query.length > 0 && !categoryItems.some((item) => !item.hidden);
    });

    noResults.hidden = visibleItems > 0;
  };

  menuSearch.addEventListener("input", filterMenu);

  items.forEach((item) => {
    item.setAttribute("tabindex", "0");
  });
}

if ("IntersectionObserver" in window && menuSections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const activeEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!activeEntry) return;

      tabLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${activeEntry.target.id}`;
        link.classList.toggle("is-active", isActive);
        if (isActive) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    },
    {
      rootMargin: "-24% 0px -58% 0px",
      threshold: [0.1, 0.35, 0.7]
    }
  );

  menuSections.forEach((section) => sectionObserver.observe(section));
}

const revealTargets = [...document.querySelectorAll(".reveal")];
const shouldAnimate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (shouldAnimate && "IntersectionObserver" in window && revealTargets.length) {
  revealTargets.forEach((target) => target.classList.add("will-reveal"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.14
    }
  );

  revealTargets.forEach((target) => revealObserver.observe(target));
}

if (guestDate) {
  const now = new Date();
  const localToday = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  guestDate.min = localToday;
}

if (bookingButton && formStatus) {
  bookingButton.addEventListener("click", () => {
    const name = document.querySelector("#guestName")?.value.trim() || "";
    const phone = document.querySelector("#guestPhone")?.value.trim() || "";
    const date = guestDate?.value || "";
    const time = guestTime?.value || "";
    const guests = Number(guestCount?.value || 0);
    const comment = guestComment?.value.trim() || "";

    formStatus.classList.remove("is-error", "is-success");

    if (name.length < 2) {
      formStatus.textContent = "Укажите имя для брони.";
      formStatus.classList.add("is-error");
      return;
    }

    if (phone.replace(/\D/g, "").length < 10) {
      formStatus.textContent = "Укажите телефон для подтверждения.";
      formStatus.classList.add("is-error");
      return;
    }

    if (!date) {
      formStatus.textContent = "Выберите дату визита.";
      formStatus.classList.add("is-error");
      return;
    }

    if (!time) {
      formStatus.textContent = "Выберите время визита.";
      formStatus.classList.add("is-error");
      return;
    }

    if (!Number.isInteger(guests) || guests < 1 || guests > 40) {
      formStatus.textContent = "Количество гостей должно быть от 1 до 40.";
      formStatus.classList.add("is-error");
      return;
    }

    const messageParts = [
      "Здравствуйте! Хочу забронировать стол в кафе «Старый Двор».",
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      `Дата и время: ${date} ${time}`,
      `Гостей: ${guests}`
    ];

    if (comment) {
      messageParts.push(`Комментарий: ${comment}`);
    }

    const whatsappUrl = `https://wa.me/79038033131?text=${encodeURIComponent(messageParts.join("\n"))}`;
    formStatus.innerHTML = `Данные готовы. <a href="${whatsappUrl}" target="_blank" rel="noopener">Отправить в WhatsApp</a>`;
    formStatus.classList.add("is-success");
  });
}
