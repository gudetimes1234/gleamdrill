// Algo Drill App
// State management
let state = {
    currentView: 'menu',
    selectedCategory: null,
    selectedSubcategory: null,
    selectedProblems: [],
    currentProblemIndex: 0,
    iterationCount: 3,
    currentIteration: 1
};

// Load state from localStorage with error handling
function loadState() {
    try {
        const saved = localStorage.getItem('algoDrillState');
        if (saved) {
            const parsed = JSON.parse(saved);
            state = { ...state, ...parsed };
        }
    } catch (error) {
        console.error('Failed to load state:', error);
        localStorage.removeItem('algoDrillState');
    }
}

// Save state to localStorage with error handling
function saveState() {
    try {
        localStorage.setItem('algoDrillState', JSON.stringify(state));
    } catch (error) {
        console.error('Failed to save state:', error);
    }
}

function resetDrill() {
    state.currentView = 'menu';
    state.currentProblemIndex = 0;
    state.currentIteration = 1;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    renderView();
});

function renderView() {
    const app = document.getElementById('app');
    if (state.currentView === 'drill' && state.selectedProblems.length > 0) {
        renderDrill(app);
    } else {
        state.currentView = 'menu';
        renderMenu(app);
    }
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// ---------- Menu ----------
function renderMenu(container) {
    const categories = Object.keys(window.PROBLEMS);
    const subcategories = state.selectedCategory
        ? Object.keys(window.PROBLEMS[state.selectedCategory] || {})
        : [];
    const problems = (state.selectedCategory && state.selectedSubcategory)
        ? (window.PROBLEMS[state.selectedCategory][state.selectedSubcategory] || [])
        : [];

    const crumbs = ['Categories'];
    if (state.selectedCategory) crumbs.push(state.selectedCategory);
    if (state.selectedSubcategory) crumbs.push(state.selectedSubcategory);

    container.innerHTML = `
        <div class="menu-container">
            <div class="breadcrumbs">
                ${crumbs.map((c, i) =>
                    i === crumbs.length - 1
                        ? `<span class="breadcrumb">${escapeHtml(c)}</span>`
                        : `<span class="breadcrumb clickable" data-crumb="${i}">${escapeHtml(c)}</span> <span class="breadcrumb">/</span>`
                ).join(' ')}
            </div>

            <div class="panes-container">
                <div class="pane">
                    <h3>Category</h3>
                    <div class="pane-list">
                        ${categories.map(c => `
                            <div class="pane-item ${state.selectedCategory === c ? 'selected' : ''}"
                                 tabindex="0" data-type="category" data-value="${escapeHtml(c)}">${escapeHtml(c)}</div>
                        `).join('')}
                    </div>
                </div>

                <div class="pane">
                    <h3>Subcategory</h3>
                    <div class="pane-list">
                        ${subcategories.length ? subcategories.map(s => `
                            <div class="pane-item ${state.selectedSubcategory === s ? 'selected' : ''}"
                                 tabindex="0" data-type="subcategory" data-value="${escapeHtml(s)}">${escapeHtml(s)}</div>
                        `).join('') : '<div class="pane-empty">Pick a category first</div>'}
                    </div>
                </div>

                <div class="pane">
                    <h3>Problems</h3>
                    <div class="pane-list">
                        ${problems.length ? problems.map((p, i) => `
                            <div class="pane-item ${state.selectedProblems.some(sp => sp.title === p.title) ? 'selected' : ''}"
                                 tabindex="0" data-type="problem" data-index="${i}">${escapeHtml(p.title)}</div>
                        `).join('') : '<div class="pane-empty">Pick a subcategory first</div>'}
                    </div>
                </div>
            </div>

            <div class="iteration-control">
                <label for="iterations">Repetitions per problem</label>
                <input type="number" id="iterations" min="1" max="20" value="${state.iterationCount}">
                <span class="progress-text">${state.selectedProblems.length} selected</span>
            </div>

            <button id="startDrill" class="btn-primary" ${state.selectedProblems.length ? '' : 'disabled'}>Start drill</button>
            <button id="selectAll" class="btn-secondary" ${problems.length ? '' : 'disabled'}>Select all in subcategory</button>
            <button id="clearSelection" class="btn-secondary">Clear selection</button>
        </div>
    `;

    // Breadcrumb navigation
    container.querySelectorAll('[data-crumb]').forEach(el => {
        el.addEventListener('click', () => {
            const level = parseInt(el.dataset.crumb, 10);
            if (level === 0) {
                state.selectedCategory = null;
                state.selectedSubcategory = null;
            } else if (level === 1) {
                state.selectedSubcategory = null;
            }
            saveState();
            renderView();
        });
    });

    // Pane selection
    container.querySelectorAll('.pane-item').forEach(el => {
        const activate = () => {
            const type = el.dataset.type;
            if (type === 'category') {
                state.selectedCategory = el.dataset.value;
                state.selectedSubcategory = null;
            } else if (type === 'subcategory') {
                state.selectedSubcategory = el.dataset.value;
            } else if (type === 'problem') {
                const p = problems[parseInt(el.dataset.index, 10)];
                const existing = state.selectedProblems.findIndex(sp => sp.title === p.title);
                if (existing >= 0) {
                    state.selectedProblems.splice(existing, 1);
                } else {
                    state.selectedProblems.push({
                        ...p,
                        subcategory: state.selectedSubcategory,
                        category: state.selectedCategory
                    });
                }
            }
            saveState();
            renderView();
        };
        el.addEventListener('click', activate);
        el.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                activate();
            }
        });
    });

    document.getElementById('iterations').addEventListener('change', e => {
        const val = parseInt(e.target.value, 10);
        state.iterationCount = (Number.isFinite(val) && val > 0) ? val : 1;
        e.target.value = state.iterationCount;
        saveState();
    });

    document.getElementById('selectAll').addEventListener('click', () => {
        problems.forEach(p => {
            if (!state.selectedProblems.some(sp => sp.title === p.title)) {
                state.selectedProblems.push({
                    ...p,
                    subcategory: state.selectedSubcategory,
                    category: state.selectedCategory
                });
            }
        });
        saveState();
        renderView();
    });

    document.getElementById('clearSelection').addEventListener('click', () => {
        state.selectedProblems = [];
        saveState();
        renderView();
    });

    document.getElementById('startDrill').addEventListener('click', () => {
        if (!state.selectedProblems.length) return;
        state.currentView = 'drill';
        state.currentProblemIndex = 0;
        state.currentIteration = 1;
        saveState();
        renderView();
    });
}

// ---------- Drill ----------
function renderDrill(container) {
    const problem = state.selectedProblems[state.currentProblemIndex];
    if (!problem) {
        resetDrill();
        saveState();
        renderView();
        return;
    }

    const progress = `Problem ${state.currentProblemIndex + 1}/${state.selectedProblems.length} | Iteration ${state.currentIteration}/${state.iterationCount}`;

    container.innerHTML = `
        <div class="drill-container">
            <div class="drill-header">
                <button id="exitDrill" class="btn-secondary">Exit drill</button>
                <div class="progress-text">${progress}</div>
            </div>
            <div class="problem-section">
                <h2>${escapeHtml(problem.title)}</h2>
                <div class="problem-category">${escapeHtml(problem.category || '')} &rsaquo; ${escapeHtml(problem.subcategory || '')}</div>
                <div class="problem-prompt">${escapeHtml(problem.prompt)}</div>
            </div>
            <div class="code-section">
                <textarea id="codeEditor"
                          placeholder="Write your solution here..."
                          spellcheck="false"></textarea>
            </div>
            <div class="answer-section">
                <button id="toggleAnswer" class="btn-secondary">Show answer</button>
                <div id="answerContent" class="answer-content hidden">
                    <pre><code>${escapeHtml(problem.solution)}</code></pre>
                </div>
            </div>
            <div class="drill-footer">
                <button id="nextProblem" class="btn-primary">Next</button>
            </div>
        </div>
    `;

    // Tab inserts spaces instead of leaving the editor
    const editor = document.getElementById('codeEditor');
    editor.addEventListener('keydown', e => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = editor.selectionStart;
            const end = editor.selectionEnd;
            editor.value = editor.value.slice(0, start) + '    ' + editor.value.slice(end);
            editor.selectionStart = editor.selectionEnd = start + 4;
        }
    });

    document.getElementById('exitDrill').addEventListener('click', () => {
        if (confirm('Exit the drill? Your typed code will be lost.')) {
            resetDrill();
            saveState();
            renderView();
        }
    });

    document.getElementById('toggleAnswer').addEventListener('click', () => {
        const answerEl = document.getElementById('answerContent');
        const btn = document.getElementById('toggleAnswer');
        answerEl.classList.toggle('hidden');
        btn.textContent = answerEl.classList.contains('hidden') ? 'Show answer' : 'Hide answer';
    });

    document.getElementById('nextProblem').addEventListener('click', () => {
        if (state.currentIteration < state.iterationCount) {
            state.currentIteration++;
        } else {
            state.currentIteration = 1;
            state.currentProblemIndex++;
        }

        if (state.currentProblemIndex >= state.selectedProblems.length) {
            alert('Drill complete.');
            resetDrill();
        }

        saveState();
        renderView();
    });
}
