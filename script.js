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

document.querySelectorAll(".navigation a, .hero-button, .about-button, .footer-form button").forEach((link) => {
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

// about - left column p and h2 tags

const aboutContent = document.querySelector(".about-content");

if (aboutContent) {
    const animatedElements = [
        aboutContent.querySelector(".about-label"),
        aboutContent.querySelector("h2")
    ];

    let wordIndex = 0;

    animatedElements.forEach((element) => {
        const textNodes = [];
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT
        );

        while (walker.nextNode()) {
            textNodes.push(walker.currentNode);
        }

        textNodes.forEach((textNode) => {
            const fragment = document.createDocumentFragment();
            const parts = textNode.textContent.split(/(\s+)/);

            parts.forEach((part) => {
                if (!part || /^\s+$/.test(part)) {
                    fragment.appendChild(document.createTextNode(part));
                    return;
                }

                const word = document.createElement("span");
                word.className = "about-word";
                word.textContent = part;
                word.style.setProperty("--word", wordIndex++);

                fragment.appendChild(word);
            });

            textNode.replaceWith(fragment);
        });
    });

    const aboutContentObserver = new IntersectionObserver(
        ([entry], observer) => {
            if (entry.isIntersecting) {
                aboutContent.classList.add("about-content-visible");
                observer.unobserve(aboutContent);
            }
        },
        {
            threshold: 0.2
        }
    );

    aboutContentObserver.observe(aboutContent);
}


// Mission, Vision and Experties

const sharedAboutTabContent = {
    mission: `To simplify and modernize how carriers operate across the USA
              by replacing manual processes with intelligent, automated
              workflows—enabling faster decisions, better efficiency and
              consistent growth.`,

    vision: `To create a smarter and more connected trucking industry where
             carriers can reduce manual work, manage operations efficiently
             and grow with confidence.`,

    expertise: `We specialize in logistics automation, load management,
                route optimization, carrier support and intelligent tools
                designed for modern fleet operations.`
};

document.querySelectorAll(".about-tabs").forEach((tabGroup) => {
    const section = tabGroup.closest(
        ".about-content, .about-overview-content"
    );

    const text = section?.querySelector("#about-tab-text");
    const buttons = tabGroup.querySelectorAll(".about-tab");

    if (!text || !buttons.length) return;

    tabGroup.classList.add("shared-tabs");
    text.classList.add("shared-tab-text");

    const observer = new IntersectionObserver(
        ([entry], currentObserver) => {
            if (entry.isIntersecting) {
                tabGroup.classList.add("tabs-visible");
                text.classList.add("tab-text-visible");
                currentObserver.unobserve(tabGroup);
            }
        },
        {
            threshold: 0.25
        }
    );

    observer.observe(tabGroup);

    let switchingTimer;

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            if (button.classList.contains("active")) return;

            buttons.forEach((tab) => tab.classList.remove("active"));
            button.classList.add("active");

            text.classList.add("tab-text-switching");

            clearTimeout(switchingTimer);

            switchingTimer = setTimeout(() => {
                text.textContent =
                    sharedAboutTabContent[button.dataset.tab];

                text.classList.remove("tab-text-switching");
            }, 250);
        });
    });
});

// features heading

const featuresHeading = document.querySelector(".features-heading");

if (featuresHeading) {
    const animatedElements = [
        featuresHeading.querySelector(".features-label"),
        featuresHeading.querySelector("h2")
    ];

    let featureWordIndex = 0;

    animatedElements.forEach((element) => {
        const textNodes = [];
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT
        );

        while (walker.nextNode()) {
            textNodes.push(walker.currentNode);
        }

        textNodes.forEach((textNode) => {
            const fragment = document.createDocumentFragment();
            const parts = textNode.textContent.split(/(\s+)/);

            parts.forEach((part) => {
                if (!part || /^\s+$/.test(part)) {
                    fragment.appendChild(document.createTextNode(part));
                    return;
                }

                const word = document.createElement("span");
                word.className = "features-heading-word";
                word.textContent = part;
                word.style.setProperty(
                    "--word",
                    featureWordIndex++
                );

                fragment.appendChild(word);
            });

            textNode.replaceWith(fragment);
        });
    });

    const featuresHeadingObserver = new IntersectionObserver(
        ([entry], observer) => {
            if (entry.isIntersecting) {
                featuresHeading.classList.add(
                    "features-heading-visible"
                );
                observer.unobserve(featuresHeading);
            }
        },
        {
            threshold: 0.3
        }
    );

    featuresHeadingObserver.observe(featuresHeading);
}

// feature card

const featureGrid = document.querySelector(".feature-grid");

if (featureGrid) {
    const featureGridObserver = new IntersectionObserver(
        ([entry], observer) => {
            if (entry.isIntersecting) {
                featureGrid.classList.add("feature-cards-visible");
                observer.unobserve(featureGrid);
            }
        },
        {
            threshold: 0.15
        }
    );

    featureGridObserver.observe(featureGrid);
}

document.querySelectorAll(".feature-card").forEach((card) => {
    const link = card.querySelector(".feature-link");

    if (!link) {
        return;
    }

    card.setAttribute("role", "link");
    card.setAttribute("tabindex", "0");

    card.addEventListener("click", (event) => {
        if (event.target.closest(".feature-link")) {
            return;
        }

        window.location.href = link.href;
    });

    card.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            window.location.href = link.href;
        }
    });
});

// feature stats

const featureStats = document.querySelector(".feature-stats");

if (featureStats) {
    function startCounter(element) {
        const target = Number(element.dataset.target);
        const suffix = element.dataset.suffix;
        const duration = 1400;
        let startingTime = null;

        function updateCounter(timestamp) {
            if (!startingTime) {
                startingTime = timestamp;
            }

            const progress = Math.min(
                (timestamp - startingTime) / duration,
                1
            );

            const easedProgress =
                1 - Math.pow(1 - progress, 3);

            const currentValue = Math.floor(
                target * easedProgress
            );

            element.textContent = currentValue + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        requestAnimationFrame(updateCounter);
    }

    const statsObserver = new IntersectionObserver(
        ([entry], observer) => {
            if (entry.isIntersecting) {
                featureStats.classList.add("stats-visible");

                featureStats
                    .querySelectorAll("strong[data-target]")
                    .forEach(startCounter);

                observer.unobserve(featureStats);
            }
        },
        {
            threshold: 0.3
        }
    );

    statsObserver.observe(featureStats);
}

// testimonial left

const testimonialsLeft =
    document.querySelector(".testimonials-left");

if (testimonialsLeft) {
    const animatedElements = [
        testimonialsLeft.querySelector(".testimonials-label"),
        testimonialsLeft.querySelector("h2")
    ];

    let testimonialWordIndex = 0;

    animatedElements.forEach((element) => {
        const textNodes = [];
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT
        );

        while (walker.nextNode()) {
            textNodes.push(walker.currentNode);
        }

        textNodes.forEach((textNode) => {
            const fragment = document.createDocumentFragment();
            const parts = textNode.textContent.split(/(\s+)/);

            parts.forEach((part) => {
                if (!part || /^\s+$/.test(part)) {
                    fragment.appendChild(
                        document.createTextNode(part)
                    );
                    return;
                }

                const word = document.createElement("span");
                word.className = "testimonial-word";
                word.textContent = part;
                word.style.setProperty(
                    "--word",
                    testimonialWordIndex++
                );

                fragment.appendChild(word);
            });

            textNode.replaceWith(fragment);
        });
    });

    const testimonialsObserver = new IntersectionObserver(
        ([entry], observer) => {
            if (entry.isIntersecting) {
                testimonialsLeft.classList.add(
                    "testimonials-visible"
                );
                observer.unobserve(testimonialsLeft);
            }
        },
        {
            threshold: 0.25
        }
    );

    testimonialsObserver.observe(testimonialsLeft);
}

// testimonial customer

const happyCustomerCount =
    document.querySelector("#happy-customer-count");

if (happyCustomerCount) {
    const customerCountObserver = new IntersectionObserver(
        ([entry], observer) => {
            if (!entry.isIntersecting) {
                return;
            }

            setTimeout(() => {
                const target = Number(
                    happyCustomerCount.dataset.target
                );

                const duration = 1200;
                let startingTime = null;

                function updateCustomerCount(timestamp) {
                    if (!startingTime) {
                        startingTime = timestamp;
                    }

                    const progress = Math.min(
                        (timestamp - startingTime) / duration,
                        1
                    );

                    const currentValue = Math.floor(
                        target * progress
                    );

                    happyCustomerCount.textContent =
                        currentValue + "K+";

                    if (progress < 1) {
                        requestAnimationFrame(
                            updateCustomerCount
                        );
                    }
                }

                requestAnimationFrame(updateCustomerCount);
            }, 700);

            observer.unobserve(happyCustomerCount);
        },
        {
            threshold: 0.5
        }
    );

    customerCountObserver.observe(happyCustomerCount);
}

// testimonial card

const testimonialList =
    document.querySelector(".testimonial-list");

if (testimonialList) {
    const testimonialListObserver = new IntersectionObserver(
        ([entry], observer) => {
            if (entry.isIntersecting) {
                testimonialList.classList.add(
                    "testimonial-list-visible"
                );

                setTimeout(() => {
                    testimonialList.classList.add("cards-ready");
                }, 1200);

                observer.unobserve(testimonialList);
            }
        },
        {
            threshold: 0.15
        }
    );

    testimonialListObserver.observe(testimonialList);
}

// text-ticker 

const textTicker = document.querySelector(".text-ticker");

if (textTicker) {
    const tickerObserver = new IntersectionObserver(
        ([entry], observer) => {
            if (entry.isIntersecting) {
                textTicker.classList.add("ticker-visible");
                observer.unobserve(textTicker);
            }
        },
        {
            threshold: 0.25
        }
    );

    tickerObserver.observe(textTicker);
}

// footer logo and divider

const footerInformation = document.querySelector(".footer-information");

if (footerInformation) {
    const footerObserver = new IntersectionObserver(([entry], observer) => {
        if (entry.isIntersecting) {
            footerInformation.classList.add("footer-visible");

            observer.unobserve(footerInformation);
        }
    }, {
        threshold: 0.2
    });

    const footerHeading = document.querySelector(".footer-information > h2");

    if (footerHeading) {
        let wordIndex = 0;

        const walker = document.createTreeWalker(
            footerHeading,
            NodeFilter.SHOW_TEXT
        );

        const textNodes = [];

        while (walker.nextNode()) {
            textNodes.push(walker.currentNode);
        }

        textNodes.forEach((node) => {
            const fragment = document.createDocumentFragment();

            node.textContent.split(/(\s+)/).forEach((part) => {
                if (!part.trim()) {
                    fragment.append(part);
                    return;
                }

                const span = document.createElement("span");
                span.className = "footer-heading-word";
                span.style.setProperty("--word", wordIndex++);
                span.textContent = part;
                fragment.append(span);
            });

            node.replaceWith(fragment);
        });
    }

    footerObserver.observe(footerInformation);

    const footerBottom = document.querySelector(".footer-bottom");

    if (footerBottom) {
        const footerBottomObserver = new IntersectionObserver(([entry], observer) => {
            if (entry.isIntersecting) {
                footerBottom.animate(
                    [
                        { opacity: 0, transform: "translateY(30px)" },
                        { opacity: 1, transform: "translateY(0)" }
                    ],
                    {
                        duration: 650,
                        easing: "ease",
                        fill: "both"
                    }
                );

                observer.unobserve(footerBottom);
            }
        }, {
            threshold: 0.2
        });

        footerBottomObserver.observe(footerBottom);
    }
}

// Responsiveness home page

const menuToggle = document.querySelector(".menu-toggle");
const mobileNavigation = document.querySelector(".navigation");

menuToggle?.addEventListener("click", () => {
    const isOpen = mobileNavigation.classList.toggle("menu-open");

    menuToggle.classList.toggle("menu-active", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen);
});

mobileNavigation?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        mobileNavigation.classList.remove("menu-open");
        menuToggle.classList.remove("menu-active");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

// About hero title

const aboutHeroTitle = document.querySelector(".about-hero h1");

if (aboutHeroTitle) {
    let wordIndex = 0;

    const walker = document.createTreeWalker(
        aboutHeroTitle,
        NodeFilter.SHOW_TEXT
    );

    const textNodes = [];

    while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
    }

    textNodes.forEach((node) => {
        const fragment = document.createDocumentFragment();

        node.textContent.split(/(\s+)/).forEach((part) => {
            if (!part.trim()) {
                fragment.append(part);
                return;
            }

            const span = document.createElement("span");
            span.className = "about-hero-word";
            span.style.setProperty("--word", wordIndex++);
            span.textContent = part;
            fragment.append(span);
        });

        node.replaceWith(fragment);
    });

    requestAnimationFrame(() => {
        aboutHeroTitle.classList.add("about-hero-title-visible");
    });
}

// About hero image

async function initializeAboutLiquidImage() {
    const holder = document.querySelector(".about-hero-image");

    if (!holder || !window.PIXI) return;

    const app = new PIXI.Application();

    await app.init({
        resizeTo: holder,
        backgroundAlpha: 0,
        antialias: true
    });

    holder.appendChild(app.canvas);

    const imagePath = holder.dataset.image;

    const [imageTexture, displacementTexture] = await Promise.all([
        PIXI.Assets.load(imagePath),
        PIXI.Assets.load(
            "https://pixijs.com/assets/pixi-filters/displacement_map_repeat.jpg"
        )
    ]);

    displacementTexture.source.addressMode = "repeat";

    const image = new PIXI.Sprite(imageTexture);
    const imageLayer = new PIXI.Container();
    const displacement = new PIXI.Sprite(displacementTexture);

    imageLayer.addChild(image);
    app.stage.addChild(displacement);
    app.stage.addChild(imageLayer);

    const filter = new PIXI.DisplacementFilter(displacement);
    filter.scale.set(50, 50);
    imageLayer.filters = [filter];

    displacement.alpha = 0.1;
    displacement.scale.set(2);

    function coverImage() {
        const width = holder.clientWidth;
        const height = holder.clientHeight;
        const scale = Math.max(
            width / imageTexture.width,
            height / imageTexture.height
        );

        image.scale.set(scale);
        image.position.set(
            (width - image.width) / 2,
            (height - image.height) / 2
        );
    }

    coverImage();

    new ResizeObserver(coverImage).observe(holder);

    let targetStrength = 50;

    holder.addEventListener("mouseenter", () => {
        targetStrength = 125;
    });

    holder.addEventListener("mouseleave", () => {
        targetStrength = 50;
    });

    app.ticker.add((ticker) => {
        displacement.x += 2.75 * ticker.deltaTime;
        displacement.y += 2.45 * ticker.deltaTime;

        filter.scale.x +=
            (targetStrength - filter.scale.x) * 0.06;

        filter.scale.y +=
            (targetStrength - filter.scale.y) * 0.06;
    });
}

initializeAboutLiquidImage();

// About overview

const aboutOverview = document.querySelector(".about-overview");
const aboutOverviewHeading = document.querySelector(
    ".about-overview-content h2"
);

if (aboutOverview && aboutOverviewHeading) {
    let wordIndex = 0;

    const walker = document.createTreeWalker(
        aboutOverviewHeading,
        NodeFilter.SHOW_TEXT
    );

    const textNodes = [];

    while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
    }

    textNodes.forEach((node) => {
        const fragment = document.createDocumentFragment();

        node.textContent.split(/(\s+)/).forEach((part) => {
            if (!part.trim()) {
                fragment.append(part);
                return;
            }

            const span = document.createElement("span");
            span.className = "about-overview-word";
            span.style.setProperty("--word", wordIndex++);
            span.textContent = part;
            fragment.append(span);
        });

        node.replaceWith(fragment);
    });

    const overviewObserver = new IntersectionObserver(
        ([entry], observer) => {
            if (entry.isIntersecting) {
                aboutOverview.classList.add("overview-visible");
                observer.unobserve(aboutOverview);
            }
        },
        {
            threshold: 0.2
        }
    );

    overviewObserver.observe(aboutOverview);
}