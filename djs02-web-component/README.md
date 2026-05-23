DJS02 – Web Component: Podcast Preview

A reusable and encapsulated Web Component built using native JavaScript, HTML, and CSS.
This project demonstrates how to create a custom HTML element for displaying podcast previews using the Web Components API.

The component is fully modular, uses Shadow DOM for style encapsulation, and communicates with the parent application using custom events.

Features
Custom reusable <podcast-preview> component
Uses customElements.define()
Encapsulated styles with Shadow DOM
Stateless component design
Accepts podcast data through JavaScript properties
Emits custom interaction events
Responsive card layout
Human-readable date formatting
Modular JavaScript architecture
No frameworks or libraries used
Project Structure
/src
│
├── /components
│ ├── PodcastPreview.js
│ ├── createModal.js
│
├── /utils
│ ├── DateUtils.js
│ └── GenreService.js
│
├── /views
│ └── createGrid.js
│
├── data.js
└── index.js
Technologies Used
HTML5
CSS3
JavaScript (ES6 Modules)
Web Components API
Shadow DOM
Custom Events
Web Component Overview

The application uses a custom HTML element:

<podcast-preview></podcast-preview>

This component:

Displays podcast information
Handles its own rendering
Encapsulates styles using Shadow DOM
Notifies the parent app when clicked
Registering the Component

The component is registered using:

customElements.define("podcast-preview", PodcastPreview);
Passing Data to the Component

Podcast data is passed through a JavaScript property:

const preview = document.createElement("podcast-preview");

preview.podcast = {
id: "10716",
title: "Something Was Wrong",
image: "image-url.jpg",
genres: [1, 2],
seasons: 14,
updated: "2022-11-03T07:00:00.000Z",
};
Listening for Events

The component emits a custom event when clicked:

preview.addEventListener("podcast-selected", (event) => {
console.log(event.detail);
});

The event contains the selected podcast object inside event.detail.

Example Usage
import "./components/PodcastPreview.js";

const preview = document.createElement("podcast-preview");

preview.podcast = podcastData;

preview.addEventListener("podcast-selected", (e) => {
console.log("Podcast selected:", e.detail);
});

document.body.appendChild(preview);
How the Application Works

1. Grid Rendering

createGrid.js creates and renders podcast preview components dynamically.

2. Podcast Preview Component

PodcastPreview.js:

Creates the Shadow DOM
Renders the podcast card UI
Handles click interaction
Dispatches custom events 3. Modal Controller

createModal.js handles:

Opening the modal
Closing the modal
Updating modal content dynamically 4. Utilities
DateUtils.js

Formats dates into human-readable text.

Example:

Updated November 3, 2022
GenreService.js

Converts genre IDs into readable genre names.

Design Principles Used
Single Responsibility Principle (SRP)

Each module has one responsibility:

File Responsibility
PodcastPreview.js Render podcast preview
createModal.js Handle modal logic
createGrid.js Render podcast grid
DateUtils.js Format dates
GenreService.js Resolve genre names
Encapsulation

The Web Component uses Shadow DOM to isolate:

HTML structure
CSS styling
Component logic

This prevents style conflicts with the rest of the app.

Reusability

The <podcast-preview> component can be reused anywhere in the application without duplicating code.

Responsive Design

The component is responsive and adapts to:

Desktop screens
Tablets
Mobile devices
How to Run the Project
Option 1 — Live Server (Recommended)
Open the project in VS Code
Install the Live Server extension
Right-click index.html
Select:
Open with Live Server
Option 2 — Open Directly

Simply open index.html in your browser.

Browser Compatibility

Compatible with modern browsers that support:

ES6 Modules
Web Components
Shadow DOM
Custom Events

Examples:

Google Chrome
Microsoft Edge
Firefox
Safari
Learning Outcomes

This project demonstrates:

Web Components
Custom Elements
Shadow DOM
Event-driven architecture
Modular JavaScript
Encapsulation
Reusable UI components
Author

Nthabiseng Moloi
