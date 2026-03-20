async function fetchModules(level = 'All') {
    const moduleList = document.querySelector('#moduleList');
    moduleList.innerHTML = '<p class="loading">Loading...</p>';

    try {
        const response = await fetch('/api/courses');
        if (!response.ok) throw new Error('Failed to fetch courses');

        const modules = await response.json();
        if (modules.length === 0) {
            moduleList.innerHTML = '<p>No modules found.</p>';
            return;
        }

        const filteredModules =
            level === 'All' ? modules : modules.filter(m => m.level === level);

        let html = '<h2>Modules</h2>';
        filteredModules.forEach(module => {
            html += `
                <div class="module-item">
                    <button>${module.name}</button>
                </div>
            `;
        });

        moduleList.innerHTML = html;
        attachModuleListeners(filteredModules); // use filtered, not full modules
    } catch (error) {
        moduleList.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
}

function attachModuleListeners(modules) {
    const buttons = document.querySelectorAll('#moduleList .module-item button');
    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            loadModuleTemplate(modules[index]);
        });
    });
}

function loadModuleTemplate(module) {
    const template = `
        <div class="module-page">
            <button class="btn-back" onclick="fetchModules(${module.level})">← Back to Modules</button>
            <h1>${module.name}</h1>
            <p><strong>Code:</strong> ${module.code || 'N/A'}</p>
            <p><strong>Credits:</strong> ${module.credits || 'N/A'}</p>
            <p><strong>Description:</strong> ${module.description || 'No description available'}</p>
            <h2>Study Materials</h2>
            <ul>
                <li><a href="/notes/${module.code}">Lecture Notes</a></li>
                <li><a href="/assignments/${module.code}">Assignments</a></li>
                <li><a href="/resources/${module.code}">Resources</a></li>
            </ul>
        </div >
        `;

    document.querySelector('#moduleList').innerHTML = template;
}