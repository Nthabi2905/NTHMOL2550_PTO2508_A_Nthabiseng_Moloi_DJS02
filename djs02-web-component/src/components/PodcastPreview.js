import { DateUtils } from "../utils/DateUtils.js";

/**
 * A reusable Web Component that displays a podcast preview card.
 *
 * Data can be passed through attributes or through the podcast property.
 * The component is stateless and emits a custom event when selected.
 *
 * @extends HTMLElement
 */
export class PodcastPreview extends HTMLElement {
  static get observedAttributes() {
    return ["podcast-id", "title", "image", "genres", "seasons", "updated"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._podcast = null;
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * Sets full podcast data using a JavaScript object.
   * @param {Object} podcast - Podcast object from the parent app.
   * @returns {void}
   */
  set podcast(podcast) {
    this._podcast = podcast;
    this.render();
  }

  /**
   * Gets the current podcast object or builds one from attributes.
   * @returns {Object} Podcast preview data.
   */
  get podcast() {
    return this._podcast || {
      id: this.getAttribute("podcast-id") || "",
      title: this.getAttribute("title") || "Untitled podcast",
      image: this.getAttribute("image") || "",
      genres: this.parseGenres(this.getAttribute("genres")),
      seasons: Number(this.getAttribute("seasons")) || 0,
      updated: this.getAttribute("updated") || "",
    };
  }

  /**
   * Runs when the element is added to the DOM.
   * @returns {void}
   */
  connectedCallback() {
    this.render();
    this.shadowRoot.addEventListener("click", this.handleClick);
    this.shadowRoot.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        this.handleClick();
      }
    });
  }

  /**
   * Runs when the element is removed from the DOM.
   * @returns {void}
   */
  disconnectedCallback() {
    this.shadowRoot.removeEventListener("click", this.handleClick);
  }

  /**
   * Re-renders the component when one of the watched attributes changes.
   * @returns {void}
   */
  attributeChangedCallback() {
    this.render();
  }

  /**
   * Converts genre data into an array of genre names.
   * @param {string|string[]} genres - Comma-separated string or array of names.
   * @returns {string[]} Array of genre names.
   */
  parseGenres(genres) {
    if (Array.isArray(genres)) return genres;
    if (!genres) return [];
    return genres.split(",").map((genre) => genre.trim()).filter(Boolean);
  }

  /**
   * Dispatches a custom event for the parent application.
   * @returns {void}
   */
  handleClick() {
    this.dispatchEvent(
      new CustomEvent("podcast-selected", {
        detail: this.podcast,
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Escapes text before injecting it into HTML.
   * @param {string|number} value - Value to escape.
   * @returns {string} Escaped string.
   */
  escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  /**
   * Renders the podcast preview card inside Shadow DOM.
   * @returns {void}
   */
  render() {
    if (!this.shadowRoot) return;

    const podcast = this.podcast;
    const genres = this.parseGenres(podcast.genres);
    const seasonLabel = `${podcast.seasons} season${Number(podcast.seasons) === 1 ? "" : "s"}`;
    const updatedLabel = podcast.updated ? DateUtils.format(podcast.updated) : "Updated date unavailable";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          height: 100%;
          font-family: "Inter", Arial, sans-serif;
        }

        .card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
          cursor: pointer;
          height: 100%;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .card:hover,
        .card:focus {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.14);
          outline: none;
        }

        img {
          aspect-ratio: 1 / 1;
          width: 100%;
          object-fit: cover;
          display: block;
        }

        .content {
          padding: 1rem;
        }

        h3 {
          color: #111827;
          font-size: 1rem;
          line-height: 1.3;
          margin: 0 0 0.5rem;
        }

        p {
          color: #4b5563;
          font-size: 0.85rem;
          margin: 0.35rem 0;
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin: 0.75rem 0;
        }

        .tag {
          background: #f3f4f6;
          border-radius: 999px;
          color: #374151;
          font-size: 0.75rem;
          padding: 0.25rem 0.6rem;
        }

        .updated {
          color: #6b7280;
          font-size: 0.78rem;
        }
      </style>

      <article class="card" tabindex="0" role="button" aria-label="View details for ${this.escapeHtml(podcast.title)}">
        <img src="${this.escapeHtml(podcast.image)}" alt="${this.escapeHtml(podcast.title)} cover" />
        <div class="content">
          <h3>${this.escapeHtml(podcast.title)}</h3>
          <p>${this.escapeHtml(seasonLabel)}</p>
          <div class="tags">
            ${genres.map((genre) => `<span class="tag">${this.escapeHtml(genre)}</span>`).join("")}
          </div>
          <p class="updated">${this.escapeHtml(updatedLabel)}</p>
        </div>
      </article>
    `;
  }
}

customElements.define("podcast-preview", PodcastPreview);
