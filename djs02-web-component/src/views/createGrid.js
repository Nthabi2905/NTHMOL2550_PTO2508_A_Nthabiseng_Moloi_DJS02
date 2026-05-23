import "../components/PodcastPreview.js";
import { GenreService } from "../utils/GenreService.js";

/**
 * Grid Renderer - Responsible for rendering podcast-preview components.
 *
 * @returns {{render: function(Object[]): void}}
 */
export const createGrid = () => {
  const container = document.getElementById("podcastGrid");

  return {
    /**
     * Renders a list of podcast web components into the grid.
     * @param {Object[]} podcastList - Array of podcast objects.
     * @returns {void}
     */
    render(podcastList) {
      container.innerHTML = "";

      podcastList.forEach((podcast) => {
        const preview = document.createElement("podcast-preview");

        preview.podcast = {
          ...podcast,
          genres: GenreService.getNames(podcast.genres),
        };

        container.appendChild(preview);
      });
    },
  };
};
