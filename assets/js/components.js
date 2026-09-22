const componentNames = [
  "navbar",
  "hero",
  "about",
  "skills",
  "projects",
  "experience",
  "education",
  "contact",
  "footer",
  "utilities",
];

async function loadComponent(name) {
  const mount = document.querySelector(`[data-component="${name}"]`);
  if (!mount) {
    throw new Error(`Missing mount point for component: ${name}`);
  }

  const componentUrl = new URL(`components/${name}.html`, document.baseURI);
  const response = await fetch(componentUrl);
  if (!response.ok) {
    throw new Error(`Could not load component: ${name}`);
  }

  mount.outerHTML = await response.text();
}

async function loadPage() {
  await Promise.all(componentNames.map(loadComponent));

  if (window.lucide) {
    lucide.createIcons();
  }

  const script = document.createElement("script");
  script.src = "assets/js/main.js";
  document.body.appendChild(script);
}

loadPage().catch((error) => {
  console.error("Failed to load page components.", error);
  document.body.innerHTML = `
    <main style="max-width: 42rem; margin: 8rem auto; padding: 2rem; color: #f8fafc; font-family: sans-serif;">
      <h1>Portfolio could not load</h1>
      <p>Run this folder with VS Code Live Server or another local HTTP server. Opening index.html directly does not allow the browser to load HTML components.</p>
    </main>
  `;
});
