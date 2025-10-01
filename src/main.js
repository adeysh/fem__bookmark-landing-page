import { doc } from "prettier";
import "./style.css";

const toggleMenuBtn = document.getElementById("toggle-menu-btn");
const toggleMenuCloseBtn = document.getElementById("toggle-menu-close-btn");
const navLinks = document.getElementById("nav-links");
const form = document.getElementById("contact-form");
const tabLinks = document.querySelectorAll("[data-tab]");
const tabContentPanes = document.querySelectorAll("#tab-content-wrapper > div");
const accordionContainer = document.getElementById("accordion-collapse");
const accordionButtons = document.querySelectorAll("[data-accordion-target]");

toggleMenuBtn.addEventListener("click", (e) => {
    toggleMenuBtn.classList.toggle("hidden");
    navLinks.classList.toggle("flex");
    navLinks.classList.toggle("hidden");
});

toggleMenuCloseBtn.addEventListener("click", (e) => {
    toggleMenuBtn.classList.toggle("hidden");
    navLinks.classList.toggle("flex");
    navLinks.classList.toggle("hidden");
});

form.addEventListener("submit", (e) => {
    // Prevent the form from submitting immediately
    e.preventDefault();

    // Add the 'validated' class to the form
    form.classList.add("validated");

    // If the form is valid, you can proceed with submission
    if (form.checkValidity()) {
        // Your submission logic here (e.g., fetch request)
        window.location.reload();
    }
});

tabLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the default link behavior

        // Get the ID of the content pane to show from the data-tab attribute
        const targetId = link.dataset.tab;

        // Remove active classes from all links and add to the clicked one
        tabLinks.forEach((item) => {
            item.classList.remove(
                "active",
                "border-(--color-red-400)",
                "border-b-4",
                "text-(--color-950)",
            );
            item.classList.add(
                "border-transparent",
                "border-b-2",
                "hover:text-(--color-red-400)",
            );
        });
        link.classList.add(
            "active",
            "border-(--color-red-400)",
            "border-b-4",
            "text-(--color-950)",
        );
        link.classList.remove(
            "border-transparent",
            "border-b-2",
            "hover:text-(--color-red-400)",
        );

        // Hide all content panes and show the target one
        tabContentPanes.forEach((pane) => {
            pane.classList.remove(
                "opacity-100",
                "scale-100",
                "pointer-events-auto",
                "static",
            );
            pane.classList.add(
                "opacity-0",
                "scale-95",
                "pointer-events-none",
                "top-0",
                "left-0",
                "transition-all",
                "duration-300",
                "ease-in-out",
                "absolute",
            );
        });
        const targetPane = document.getElementById(targetId);
        targetPane.classList.remove(
            "opacity-0",
            "scale-95",
            "pointer-events-none",
            "absolute",
            "top-0",
            "left-0",
            "transition-all",
            "duration-300",
            "ease-in-out",
        );
        targetPane.classList.add(
            "opacity-100",
            "scale-100",
            "pointer-events-auto",
            "is-active",
            "static",
            "transition-all",
            "duration-300",
            "ease-in-out",
        );
    });
});

accordionButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const targetId = button.getAttribute("data-accordion-target");
        const targetBody = document.querySelector(targetId);
        const isExpanded = button.getAttribute("aria-expanded") === "true";

        const svgIcon = button.querySelector("svg");

        if (accordionContainer.getAttribute("data-accordion") === "collapse") {
            accordionButtons.forEach((otherButton) => {
                const otherTargetId = otherButton.getAttribute(
                    "data-accordion-target",
                );
                const otherTargetBody = document.querySelector(otherTargetId);
                if (otherTargetBody !== targetBody) {
                    otherTargetBody.classList.remove("max-h-[500px]");
                    otherButton.setAttribute("aria-expanded", "false");
                    otherButton
                        .querySelector("svg")
                        .classList.remove(
                            "rotate-180",
                            "text-(--color-red-400)",
                        );
                    otherButton
                        .querySelector("svg")
                        .classList.add("text-(--color-blue-600)");
                }
            });
        }

        targetBody.classList.toggle("max-h-[500px]");
        button.setAttribute("aria-expanded", !isExpanded);

        svgIcon.classList.toggle("rotate-180");
        svgIcon.classList.toggle("text-(--color-red-400)");
        svgIcon.classList.toggle("text-(--color-blue-600)");
    });
});
