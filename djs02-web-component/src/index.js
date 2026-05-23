import { podcasts } from "./data.js";
import { createModal } from "./components/createModal.js";
import { createGrid } from "./views/createGrid.js";

/**
 * Initializes the podcast application.
 *
 * Registers event listeners and renders the podcast preview Web Components.
 * @returns {void}
 */
function init() {
  const closeButton = document.getElementById("closeModal");
  const gridContainer = document.getElementById("podcastGrid");

  closeButton.addEventListener("click", createModal.close);

  gridContainer.addEventListener("podcast-selected", (event) => {
    const selectedPodcast = podcasts.find(
      (podcast) => podcast.id === event.detail.id
    );

    createModal.open(selectedPodcast || event.detail);
  });

  const grid = createGrid();
  grid.render(podcasts);
}

init();
