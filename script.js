async function getProjects() {
  const response = await fetch(
    `https://api.github.com/users/icarobteles/repos`
  );
  const data = await response.json();
  return data;
}

function renderProjects(projects) {
  const list = document.getElementById("projects-list");
  projects.forEach((project) => {
    const item = document.createElement("li");
    let title = project.name.replaceAll("-", " ");
    title = title.replaceAll("_", " ");
    title = title
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
    item.innerHTML = `
      <a class="projects--card--link" href=${project.homepage}>
        <img
          class="projects--card--image"
          src="./assets/projects/${project.name}.png"
          alt=${title}
        />
        <section class="projects--card--info">
          <h3>
            <span>Clique aqui para visitar</span>
            ${title}
          </h3>
          <i aria-label="Visitar Projeto"></i>
        </section>
      </a>
    `;
    list.appendChild(item);
  });
}

function submitContactForm(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = {};
  for (const [key, value] of formData) {
    data[key] = value;
  }
  alert("Mensagem enviada com sucesso!");
  event.target.reset();
}

document.addEventListener("DOMContentLoaded", async () => {
  const projects = await getProjects();
  const projectsToBeRenderized = projects.filter(
    (project) => !!project.homepage
  );

  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", submitContactForm);

  const hambBtn = document.getElementById("hamb-btn");
  const hambMenu = document.getElementById("hamb-menu");
  hambBtn.addEventListener("click", () => {
    hambMenu.classList.toggle("hidden");
  });

  renderProjects(projectsToBeRenderized.slice(0, 4));
});
