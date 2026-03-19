async function loadNotes() {
    const contentEl = document.querySelector("#notes-content");
    const titleEl = document.querySelector("#notes-title");
    const moduleCodeEl = document.querySelector("#module-code");
    const pathname = window.location.pathname;

    // supports /notes/1 and /notes-1
    const match = pathname.match(/\/notes[-\/](\w+)/);
    const moduleCode = match ? match[1] : null;

    if (!moduleCode) {
        contentEl.textContent = `Invalid module URL: ${pathname}`;
        return;
    }

    const res = await fetch(`/api/notes/${moduleCode}`);
    if (!res.ok) {
        contentEl.textContent = `Failed to load notes (${res.status})`;
        return;
    }

    const data = await res.json();
    titleEl.textContent = data.title;
    contentEl.textContent = data.content;
    if (moduleCodeEl) moduleCodeEl.textContent = `Module Code: ${data.moduleCode}`;
}

loadNotes().catch((err) => {
    const contentEl = document.querySelector("#notes-content");
    if (contentEl) contentEl.textContent = `Error: ${err.message}`;
});