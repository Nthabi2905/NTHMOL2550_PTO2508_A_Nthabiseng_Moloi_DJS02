# DJS02 – Web Component: Podcast Preview

This project uses a reusable native Web Component called `<podcast-preview>` to display podcast cards. The component uses `customElements.define()`, Shadow DOM, and custom events.

## Project Structure

```text
/src
├── /components
│   ├── PodcastPreview.js
│   └── createModal.js
├── /utils
│   ├── DateUtils.js
│   └── GenreService.js
├── /views
│   └── createGrid.js
├── data.js
└── index.js
index.html
styles.css
README.md
```

## How to Run

Use a local server because the project uses ES modules.

In VS Code:

1. Install the Live Server extension.
2. Right-click `index.html`.
3. Select **Open with Live Server**.

## How to Register the Component

Import the component once in your JavaScript:

```js
import "./components/PodcastPreview.js";
```

The component registers itself with:

```js
customElements.define("podcast-preview", PodcastPreview);
```

## How to Pass Data

### Option 1: Pass a JavaScript object

```js
const preview = document.createElement("podcast-preview");
preview.podcast = {
  id: "10716",
  title: "Something Was Wrong",
  image: "cover-image-url.jpg",
  genres: ["Personal Growth", "Investigative Journalism"],
  seasons: 14,
  updated: "2022-11-03T07:00:00.000Z",
};
```

### Option 2: Use HTML attributes

```html
<podcast-preview
  podcast-id="10716"
  title="Something Was Wrong"
  image="cover-image-url.jpg"
  genres="Personal Growth, Investigative Journalism"
  seasons="14"
  updated="2022-11-03T07:00:00.000Z"
></podcast-preview>
```

## How to Listen for Interaction Events

The component emits a `podcast-selected` event when clicked.

```js
document.addEventListener("podcast-selected", (event) => {
  console.log(event.detail);
});
```

In this app, the parent listens for the event and opens the modal without the component needing to know anything about the modal.

## Web Component Features

- Uses native JavaScript only.
- Uses `customElements.define()`.
- Uses Shadow DOM for style and markup encapsulation.
- Accepts data through attributes or a property.
- Emits a custom event for parent communication.
- Responsive card layout.
- Includes JSDoc comments for major functions.
