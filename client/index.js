async function fetchModules(level = 'All') {
    const moduleList = document.querySelector('#moduleList');


    moduleList.innerHTML = '<p class="loading">Loading...</p>';

    try {
        const response = await fetch(`/api/courses`);
        if (!response.ok) {
            throw new Error('Failed to fetch courses');
        }
        const modules = await response.json();

        if (modules.length === 0) {
            moduleList.innerHTML = '<p>No modules found.</p>';
            return;
        }

        let html = '<h2>Modules</h2>';
        modules.forEach(module => {
            if (level === 'All' || module.level === level) {
                html += `
                    <div class="module-item">
                        <button>${module.name}</button>
                    </div>
                `;
            }
        });
        moduleList.innerHTML = html;

        // Attach event listeners after DOM is updated
        attachModuleListeners(modules);

    } catch (error) {
        moduleList.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
};

function attachModuleListeners(modules) {
    const buttons = document.querySelectorAll('#moduleList button');
    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            loadModuleTemplate(modules[index]);
        });
    });
}

function loadModuleTemplate(module) {
    const template = `
        <div class="module-page">
            <button class="btn-back" onclick="fetchModules()">← Back to Modules</button>
            <h1>${module.name}</h1>
            <p><strong>Code:</strong> ${module.code || 'N/A'}</p>
            <p><strong>Credits:</strong> ${module.credits || 'N/A'}</p>
            <p><strong>Description:</strong> ${module.description || 'No description available'}</p>
            <h2>Study Materials</h2>
            <ul>
                <li><a href="/notes-${module.id}">Lecture Notes</a></li>
                <li><a href="/assignments-${module.id}">Assignments</a></li>
                <li><a href="/resources-${module.id}">Resources</a></li>
            </ul>
        </div >
        `;

    document.querySelector('#moduleList').innerHTML = template;
}