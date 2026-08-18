// testimonials script

const testimonials = [
    {
        text: "TruckerzApp has made managing our daily fleet operations much easier.",
        name: "Michael Roberts",
        role: "Fleet Manager"
    },
    {
        text: "We reduced manual work and gained better control over our loads.",
        name: "Sarah Williams",
        role: "Operations Manager"
    },
    {
        text: "The platform is simple, fast and useful for our growing business.",
        name: "David Miller",
        role: "Carrier Owner"
    }
];

let currentTestimonial = 0;

const testimonialText = document.querySelector("#testimonial-text");
const customerName = document.querySelector("#customer-name");
const customerRole = document.querySelector("#customer-role");
const previousButton = document.querySelector("#previous-button");
const nextButton = document.querySelector("#next-button");

function displayTestimonial() {
    const testimonial = testimonials[currentTestimonial];

    testimonialText.textContent = `“${testimonial.text}”`;
    customerName.textContent = testimonial.name;
    customerRole.textContent = testimonial.role;
}

nextButton.addEventListener("click", function () {
    currentTestimonial++;

    if (currentTestimonial === testimonials.length) {
        currentTestimonial = 0;
    }

    displayTestimonial();
});

previousButton.addEventListener("click", function () {
    currentTestimonial--;

    if (currentTestimonial < 0) {
        currentTestimonial = testimonials.length - 1;
    }

    displayTestimonial();
});

// signup script

const signupForm = document.querySelector("#signup-form");
const userName = document.querySelector("#user-name");
const userEmail = document.querySelector("#user-email");
const userMessage = document.querySelector("#user-message");
const formMessage = document.querySelector("#form-message");

signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (
        userName.value.trim() === "" ||
        userEmail.value.trim() === "" ||
        userMessage.value.trim() === ""
    ) {
        formMessage.textContent = "Please complete all fields.";
        formMessage.style.color = "red";
        return;
    }

    formMessage.textContent = "Thank you! Your form is complete.";
    formMessage.style.color = "green";

    signupForm.reset();
});

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

