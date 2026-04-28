const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".nav-list a");
const bottomNavLinks = document.querySelectorAll(".mobile-bottom-nav-link");
const header = document.querySelector(".site-header");

function closeMobileNav() {
  if (!menuToggle || !siteNav) return;
  siteNav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });

  navLinks.forEach((link) => link.addEventListener("click", closeMobileNav));

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1120) closeMobileNav();
  });
}

const pathStages = [
  {
    title: "Entry",
    subtitle: "Starting with stability, orientation, and a clear baseline.",
    purpose: "Create an immediate starting point where residents can stabilize, get oriented, and begin engaging with the structure of the program.",
    structure: "Highest level of structure and guidance to establish baseline stability and consistency.",
    expectations: "Learn the system, follow initial expectations, communicate clearly, and begin building a reliable routine.",
    support: "Orientation, clear communication, practical guidance, and access to foundational supports that reduce chaos during early reentry.",
    outcome: "A stable starting point with a clearer understanding of what progress looks like inside the program."
  },
  {
    title: "A",
    subtitle: "Building routine, consistency, and early accountability.",
    purpose: "Help residents establish dependable habits and begin moving forward with a stronger daily foundation.",
    structure: "High structure with consistent expectations and close accountability.",
    expectations: "Show up consistently, follow rules, maintain communication, and begin demonstrating dependable behavior.",
    support: "Staff support, practical direction, and structured accountability tied to daily life and early progress.",
    outcome: "Residents begin to show reliability and develop the consistency needed for advancement."
  },
  {
    title: "B",
    subtitle: "Strengthening responsibility and forward movement.",
    purpose: "Build on early momentum by increasing responsibility while reinforcing stable habits and communication.",
    structure: "Moderate-to-high structure with room for increased ownership and demonstrated progress.",
    expectations: "Maintain consistency, meet responsibilities, communicate proactively, and continue building life stability.",
    support: "Ongoing staff connection, support infrastructure, and practical help related to progress and daily coordination.",
    outcome: "Residents demonstrate stronger personal responsibility and readiness for deeper progression."
  },
  {
    title: "C",
    subtitle: "Developing greater ownership and readiness.",
    purpose: "Shift more responsibility onto the resident while continuing to support progress toward long-term stability.",
    structure: "Moderate structure with increasing emphasis on self-management and accountability.",
    expectations: "Demonstrate follow-through, maintain progress, stay engaged with expectations, and operate with greater independence.",
    support: "Targeted support, communication tools, and practical resources that help residents keep moving without losing structure.",
    outcome: "Residents build confidence, stronger habits, and better readiness for more independent living."
  },
  {
    title: "D",
    subtitle: "Preparing for transition beyond program structure.",
    purpose: "Help residents operate with more independence while staying aligned with the final expectations needed for transition.",
    structure: "Lower structure than early stages, with strong emphasis on self-direction and readiness.",
    expectations: "Sustain reliability, manage responsibilities well, communicate clearly, and demonstrate readiness for the next step.",
    support: "Continued access to support, guidance, and coordination while focusing on long-term transition planning.",
    outcome: "Residents become better prepared for independent living with stronger personal systems in place."
  },
  {
    title: "Independent Living",
    subtitle: "Transitioning forward with stronger systems and momentum.",
    purpose: "Move beyond the housing path with improved stability, clearer direction, and practical tools for maintaining progress.",
    structure: "Independent living with the benefit of the structure, support, and habits built through the program.",
    expectations: "Apply what was built in the system, maintain accountability, and continue moving forward outside the staged housing path.",
    support: "The long-term value of the program’s structure, relationships, and progress-building systems.",
    outcome: "Greater independence supported by real experience, stronger habits, and a clearer path ahead."
  }
];

const stageDisplayTitle = document.getElementById("stageDisplayTitle");
const stageDisplaySubtitle = document.getElementById("stageDisplaySubtitle");
const infoTitle = document.getElementById("infoTitle");
const infoPurpose = document.getElementById("infoPurpose");
const infoStructure = document.getElementById("infoStructure");
const infoExpectations = document.getElementById("infoExpectations");
const infoSupport = document.getElementById("infoSupport");
const infoOutcome = document.getElementById("infoOutcome");
const stageButtons = document.querySelectorAll(".stage-dot");
const prevButton = document.querySelector(".stage-prev");
const nextButton = document.querySelector(".stage-next");
const stageProgressFill = document.getElementById("stageProgressFill");

let currentStage = 0;

function renderStage(index) {
  const stage = pathStages[index];
  if (!stage) return;

  currentStage = index;

  stageDisplayTitle.textContent = stage.title;
  stageDisplaySubtitle.textContent = stage.subtitle;
  infoTitle.textContent = stage.title;
  infoPurpose.textContent = stage.purpose;
  infoStructure.textContent = stage.structure;
  infoExpectations.textContent = stage.expectations;
  infoSupport.textContent = stage.support;
  infoOutcome.textContent = stage.outcome;

  stageButtons.forEach((button, buttonIndex) => {
    const isActive = buttonIndex === index;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
    button.tabIndex = isActive ? 0 : -1;
  });

  if (prevButton) prevButton.disabled = currentStage === 0;
  if (nextButton) nextButton.disabled = currentStage === pathStages.length - 1;

  if (stageProgressFill) {
    const progress = ((index + 1) / pathStages.length) * 100;
    stageProgressFill.style.width = `${progress}%`;
  }
}

stageButtons.forEach((button, index) => {
  button.addEventListener("click", () => renderStage(index));
});

if (prevButton) {
  prevButton.addEventListener("click", () => {
    if (currentStage > 0) renderStage(currentStage - 1);
  });
}

if (nextButton) {
  nextButton.addEventListener("click", () => {
    if (currentStage < pathStages.length - 1) renderStage(currentStage + 1);
  });
}

renderStage(0);

function pulseStageButton(stageIndex) {
  const targetDot = stageButtons[stageIndex];

  if (!targetDot) return;

  targetDot.classList.remove("pulse");
  void targetDot.offsetWidth;
  targetDot.classList.add("pulse");

  setTimeout(() => {
    targetDot.classList.remove("pulse");
  }, 700);
}

const flowSteps = document.querySelectorAll(".flow-step");
const flowPanelContents = document.querySelectorAll(".flow-panel-content");

function openFlowStep(stepNumber) {
  flowSteps.forEach((step) => {
    const isActive = step.dataset.step === stepNumber;
    step.classList.toggle("active", isActive);
    step.setAttribute("aria-expanded", String(isActive));
  });

  flowPanelContents.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.step === stepNumber);
  });

  const stageIndex = Number(stepNumber) - 1;

  if (!Number.isNaN(stageIndex) && typeof renderStage === "function") {
    renderStage(stageIndex);
  }
}

flowSteps.forEach((step) => {
  step.addEventListener("click", () => openFlowStep(step.dataset.step));
});


const flowPanelCtas = document.querySelectorAll(".flow-panel-cta");

flowPanelCtas.forEach((cta) => {
  cta.addEventListener("click", () => {
    const stageIndex = Number(cta.dataset.stage);

    if (!Number.isNaN(stageIndex) && typeof renderStage === "function") {
      renderStage(stageIndex);
      pulseStageButton(stageIndex);
    }
  });
});


const contactTabs = document.querySelectorAll(".contact-tab");
const contactPanels = document.querySelectorAll(".contact-panel");
const contactLinks = document.querySelectorAll("[data-contact-target]");

function openContactPanel(panelName) {
  contactTabs.forEach((tab) => {
    const isMatch = tab.dataset.contactTab === panelName;
    tab.classList.toggle("is-active", isMatch);
    tab.setAttribute("aria-selected", String(isMatch));
  });

  contactPanels.forEach((panel) => {
    const isMatch = panel.dataset.contactPanel === panelName;
    panel.classList.toggle("is-active", isMatch);
    panel.hidden = !isMatch;
  });
}

contactTabs.forEach((tab) => {
  tab.addEventListener("click", () => openContactPanel(tab.dataset.contactTab));
});

contactLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const target = link.dataset.contactTarget;
    if (target) openContactPanel(target);
  });
});

const sections = document.querySelectorAll("main section[id]");
const navMap = [...navLinks];
const bottomNavMap = [...bottomNavLinks];

const bottomNavSectionIds = bottomNavMap
  .map((link) => link.getAttribute("href")?.replace("#", ""))
  .filter(Boolean);

const bottomNavSections = bottomNavSectionIds
  .map((id) => document.getElementById(id))
  .filter(Boolean);

let isProgrammaticScroll = false;
let scrollUnlockTimer = null;

function setActiveLinkGroup(links, activeId) {
  links.forEach((link) => {
    const linkTarget = link.getAttribute("href")?.replace("#", "");

    if (linkTarget === activeId) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function getNavActiveId(destinationId) {
  return destinationId === "contact" ? "support-services" : destinationId;
}

function setActiveDestination(destinationId) {
  const activeId = getNavActiveId(destinationId);

  setActiveLinkGroup(navMap, activeId);

  if (bottomNavSectionIds.includes(activeId)) {
    setActiveLinkGroup(bottomNavMap, activeId);
  }
}

function handleProgrammaticNavClick(event) {
  const href = event.currentTarget.getAttribute("href");

  if (!href || !href.startsWith("#")) return;

  const destinationId = href.replace("#", "");
  const destination = document.getElementById(destinationId);

  if (!destination) return;

  isProgrammaticScroll = true;
  setActiveDestination(destinationId);

  window.clearTimeout(scrollUnlockTimer);
  scrollUnlockTimer = window.setTimeout(() => {
    isProgrammaticScroll = false;
    setActiveNav();
  }, 850);
}

[...navMap, ...bottomNavMap].forEach((link) => {
  link.addEventListener("click", handleProgrammaticNavClick);
});

function getActiveSectionId(sectionList, activationLine, fallbackId = "") {
  let activeId = fallbackId;

  sectionList.forEach((section) => {
    const rect = section.getBoundingClientRect();

    if (rect.top <= activationLine) {
      activeId = section.id;
    }

    if (rect.top <= activationLine && rect.bottom > 0) {
      activeId = section.id;
    }
  });

  return activeId;
}

function getActiveBottomNavId(activationLine) {
  const activeVisibleBottomSection = bottomNavSections.find((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top <= activationLine && rect.bottom > 0;
  });

  if (activeVisibleBottomSection) {
    return activeVisibleBottomSection.id;
  }

  return getActiveSectionId(bottomNavSections, activationLine, bottomNavSectionIds[0] || "");
}

function setActiveNav() {
  if (isProgrammaticScroll) return;

  const headerOffset = header ? header.offsetHeight : 90;
  const activationLine = headerOffset + window.innerHeight * 0.32;
  const currentId = getActiveSectionId(sections, activationLine, sections[0] ? sections[0].id : "");
  const currentBottomId = getActiveBottomNavId(activationLine);

  setActiveLinkGroup(navMap, currentId);
  setActiveLinkGroup(bottomNavMap, currentBottomId);
}

window.addEventListener("scroll", setActiveNav, { passive: true });
window.addEventListener("resize", setActiveNav);
window.addEventListener("load", setActiveNav);
setActiveNav();

const izardShowcaseButtons = document.querySelectorAll(".izard-showcase-button");
const izardFeaturedImage = document.getElementById("izardFeaturedImage");
const izardFeaturedCaption = document.getElementById("izardFeaturedCaption");

izardShowcaseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const imageSrc = button.dataset.img;
    const imageAlt = button.dataset.alt;
    const imageCaption = button.dataset.caption;

    izardShowcaseButtons.forEach((control) => {
      const isActive = control === button;
      control.classList.toggle("is-active", isActive);
      control.setAttribute("aria-selected", String(isActive));
    });

    if (izardFeaturedImage && imageSrc && imageAlt) {
      izardFeaturedImage.src = imageSrc;
      izardFeaturedImage.alt = imageAlt;
    }

    if (izardFeaturedCaption && imageCaption) {
      izardFeaturedCaption.textContent = imageCaption;
    }
  });
});

