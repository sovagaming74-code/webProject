document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECT ELEMENTS
    const menu = document.querySelector('#mobile-menu');
    const menuLinks = document.querySelector('.navbar__menu');
    const modal = document.getElementById('setup-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-description');
    const setupForm = document.getElementById('feature-setup-form');
    const closeBtn = document.querySelector('.close-btn');
    const getStartedBtns = document.querySelectorAll('.get-started-btn');

    console.log("GoalGetter System Active. Found " + getStartedBtns.length + " buttons.");

    // 2. MOBILE MENU TOGGLE
    if (menu) {
        menu.addEventListener('click', () => {
            menu.classList.toggle('is-active');
            menuLinks.classList.toggle('active');
        });
    }

    // 3. THE "AWESOME" MODAL OPENER
    const openModal = (feature) => {
        setupForm.innerHTML = ''; 
        let targetHash = '';

        if (feature === 'Smart Scheduling') {
            modalTitle.textContent = 'Setup Smart Scheduling';
            modalDesc.textContent = 'Tell us your goal and we will find the time.';
            setupForm.innerHTML = `
                <div class="input-group">
                    <label style="color:#333; display:block; margin-bottom:5px;">Main Goal:</label>
                    <input type="text" id="goal-name" placeholder="e.g. Study Coding" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:8px;" required>
                </div>
                <button type="submit" class="form__submit--btn" style="margin-top:15px; background: linear-gradient(to right, #a8ff78, #78ffd6); color: #131313; width:100%; padding:15px; border:none; border-radius:10px; font-weight:700; cursor:pointer;">Generate Schedule</button>
            `;
            targetHash = 'scheduler';
        } else {
            // Fallback for other features
            modalTitle.textContent = feature;
            modalDesc.textContent = `Configure your ${feature} settings.`;
            setupForm.innerHTML = `
                <button type="submit" class="form__submit--btn" style="margin-top:15px; background: linear-gradient(to right, #a8ff78, #78ffd6); color: #131313; width:100%; padding:15px; border:none; border-radius:10px; font-weight:700; cursor:pointer;">Go to Dashboard</button>
            `;
            targetHash = feature.toLowerCase().replace(/\s+/g, '-'); // convert spaces to hyphens
        }

        modal.classList.remove('hidden');

        // REDIRECT ON FORM SUBMIT
        setupForm.onsubmit = (e) => {
            e.preventDefault();
            console.log("Redirecting to dashboard...");
            window.location.href = "dashboard.html#" + targetHash;
        };
    };

    // 4. ATTACH CLICK EVENTS TO "GET STARTED" BUTTONS
    getStartedBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = btn.closest('.services__card');  
            const feature = card.getAttribute('data-feature'); 
            openModal(feature);  
        });
    });

    // 5. CLOSE MODAL
    closeBtn?.addEventListener('click', () => modal.classList.add('hidden'));
    window.onclick = (event) => { if (event.target === modal) modal.classList.add('hidden'); };
});
