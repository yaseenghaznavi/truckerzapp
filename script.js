// nav bar disapperaing effect

const siteHeader = document.querySelector(".site-header");
let previousScrollPosition = window.scrollY;

window.addEventListener(
    "scroll",
    () => {
        const currentScrollPosition = window.scrollY;
        const movement = currentScrollPosition - previousScrollPosition;

        if (currentScrollPosition <= 80) {
            siteHeader.classList.remove("nav-hidden", "nav-scrolled");
        } else {
            siteHeader.classList.add("nav-scrolled");

            if (movement > 5) {
                siteHeader.classList.add("nav-hidden");
                document.body.classList.remove("nav-is-visible");
            } else if (movement < -5) {
                siteHeader.classList.remove("nav-hidden");
            }
        }

        previousScrollPosition = currentScrollPosition;
    },
    { passive: true }
);

// nav bar links effect

document.querySelectorAll(".navigation a, .hero-button").forEach((link) => {
    function setNearestCorner(event) {
        const bounds = link.getBoundingClientRect();

        const horizontal =
            event.clientX - bounds.left < bounds.width / 2 ? "0%" : "100%";

        const vertical =
            event.clientY - bounds.top < bounds.height / 2 ? "0%" : "100%";

        link.style.setProperty("--hover-x", horizontal);
        link.style.setProperty("--hover-y", vertical);
    }

    link.addEventListener("mouseenter", setNearestCorner);
    link.addEventListener("mouseleave", setNearestCorner);
});

// about logo and information effect

const aboutLeft = document.querySelector(".about-left");

if (aboutLeft) {
    const aboutObserver = new IntersectionObserver(
        ([entry], observer) => {
            if (entry.isIntersecting) {
                aboutLeft.classList.add("about-visible");
                observer.unobserve(aboutLeft);
            }
        },
        {
            threshold: 0.25
        }
    );

    aboutObserver.observe(aboutLeft);
}

// Mission, Vision and Experties

const aboutTabText = {
    mission:
        "To simplify and modernize how carriers operate across the USA by replacing manual processes with intelligent, automated workflows—enabling faster decisions, better efficiency, and consistent growth.",

    vision:
        "To become the leading digital platform for carrier operations, where every aspect of the business — from load handling to documentation — is managed seamlessly in one place.",

    expertise:
        "Built by the team behind Truckerz App, with hands-on experience supporting carriers and managing real-world logistics operations at scale. We understand the challenges — and we’ve engineered solutions that solve them."
};

document.querySelectorAll(".about-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
        document.querySelector(".about-tab.active")?.classList.remove("active");
        tab.classList.add("active");

        document.querySelector("#about-tab-text").textContent =
            aboutTabText[tab.dataset.tab];
    });
});

