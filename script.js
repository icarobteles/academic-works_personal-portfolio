async function getProjects(page, perPage) {
  const response = await fetch(
    `https://api.github.com/users/icarobteles/repos?per_page=${perPage}&page=${page}`
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
      <a class="projects--card--link" href=${project.html_url}>
        <img
          class="projects--card--image"
          src="./assets/project1.jpg"
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

document.addEventListener("DOMContentLoaded", async () => {
  const projects = await getProjects(1, 2);
  renderProjects(projects);
});
