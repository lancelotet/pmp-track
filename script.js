document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.task-list input[type="checkbox"]');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const resetButton = document.getElementById('resetButton');
    const totalTasks = checkboxes.length;

    function updateProgress() {
        const checkedTasks = document.querySelectorAll('.task-list input[type="checkbox"]:checked').length;
        const progressPercentage = totalTasks > 0 ? (checkedTasks / totalTasks) * 100 : 0;

        progressBar.style.width = `${progressPercentage}%`;
        progressText.textContent = `${Math.round(progressPercentage)}% Complete`;

        checkboxes.forEach(checkbox => {
            const listItem = checkbox.parentElement;
            if (checkbox.checked) {
                listItem.classList.add('completed');
            } else {
                listItem.classList.remove('completed');
            }
        });

        saveProgress();
    }

    function saveProgress() {
        const progress = {};
        checkboxes.forEach(checkbox => {
            progress[checkbox.id] = checkbox.checked;
        });
        localStorage.setItem('pmpProgress', JSON.stringify(progress));
    }

    function loadProgress() {
        const savedProgress = localStorage.getItem('pmpProgress');
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            checkboxes.forEach(checkbox => {
                if (progress[checkbox.id]) {
                    checkbox.checked = true;
                }
            });
        }
        updateProgress();
    }

    function resetProgress() {
        if (confirm('Are you sure you want to reset your progress? This cannot be undone.')) {
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            localStorage.removeItem('pmpProgress');
            updateProgress();
        }
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateProgress);
    });

    resetButton.addEventListener('click', resetProgress);

    loadProgress();
});
