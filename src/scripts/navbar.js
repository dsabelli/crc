async function loadModule() {
  const module = await import("./simpleLogo.js");
}

loadModule().catch((error) => console.error("Failed to load module:", error));

// Combine fetching CSS and HTML into a single promise chain
(async () => {
  try {
    // Load the external CSS file
    const cssResponse = await fetch("../styles/output.css");
    const cssText = await cssResponse.text();
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(cssText);

    // Load the navbar HTML content
    const htmlComponent = "../components/navbar.html";
    const htmlResponse = await fetch(htmlComponent);
    const htmlContent = await htmlResponse.text();
    const template = document.createElement("template");
    template.innerHTML = htmlContent;

    // Define the custom element
    class NavbarElement extends HTMLElement {
      constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.adoptedStyleSheets = [styleSheet];
        shadowRoot.appendChild(template.content.cloneNode(true));

        const logo = shadowRoot.getElementById("logo-nav");
        logo.innerHTML = `<app-logo></app-logo>`;
      }
    }
    // Define the custom element
    customElements.define("app-navbar", NavbarElement);
  } catch (error) {
    console.error("Initialization failed:", error);
  }
})();
