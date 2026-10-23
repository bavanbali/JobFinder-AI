document.addEventListener("DOMContentLoaded", function () {

    const container = document.getElementById("savedJobsContainer");
    const countElement = document.getElementById("savedCount");

    let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];

    renderSavedJobs();


    // =========================
    // RENDER SAVED JOBS
    // =========================

    function renderSavedJobs() {

        container.innerHTML = "";

        countElement.textContent = savedJobs.length;

        // No saved jobs
        if (savedJobs.length === 0) {

            container.innerHTML = `
                <div class="empty-state">

                    <div class="empty-icon">💔</div>

                    <h2>No Saved Jobs Yet</h2>

                    <p>
                        Save jobs you're interested in and they will appear here.
                    </p>

                    <a href="find-jobs.html" class="find-btn">
                        🔎 Find Jobs →
                    </a>

                </div>
            `;

            return;
        }


        // Create cards
        savedJobs.forEach(function (job, index) {

            const skills = Array.isArray(job.skills)
                ? job.skills
                : [];

            const skillHTML = skills.map(function (skill) {

                return `
                    <span class="skill">
                        ${escapeHTML(skill)}
                    </span>
                `;

            }).join("");


            const card = document.createElement("div");

            card.className = "job-card";

            card.innerHTML = `

                <div class="job-top">

                    <div class="job-info">

                        <h2>
                            💼 ${escapeHTML(job.title || "Job Position")}
                        </h2>

                        <div class="company">
                            ${escapeHTML(job.company || "Company")}
                        </div>

                    </div>

                    <div class="match">
                        ${escapeHTML(job.match || "90%")} Match
                    </div>

                </div>


                <div class="job-details">

                    <span>
                        📍 ${escapeHTML(job.location || "India")}
                    </span>

                    <span>
                        💼 ${escapeHTML(job.type || "Full Time")}
                    </span>

                    <span>
                        💰 ${escapeHTML(job.salary || "Salary not specified")}
                    </span>

                </div>


                <div class="skills">
                    ${skillHTML}
                </div>


                <div class="job-actions">

                    <button
                        class="remove-btn"
                        onclick="removeSavedJob(${index})">
                        🗑️ Remove
                    </button>

                    <button
                        class="apply-btn"
                        onclick="applyForSavedJob(${index})">
                        Apply Now →
                    </button>

                </div>
            `;

            container.appendChild(card);

        });

    }


    // =========================
    // REMOVE JOB
    // =========================

    window.removeSavedJob = function (index) {

        if (!savedJobs[index]) {
            return;
        }

        const jobTitle =
            savedJobs[index].title || "this job";

        const confirmRemove = confirm(
            `Remove "${jobTitle}" from Saved Jobs?`
        );

        if (!confirmRemove) {
            return;
        }

        savedJobs.splice(index, 1);

        localStorage.setItem(
            "savedJobs",
            JSON.stringify(savedJobs)
        );

        renderSavedJobs();

    };


    // =========================
    // APPLY JOB
    // =========================

    window.applyForSavedJob = function (index) {

        const job = savedJobs[index];

        if (!job) {
            return;
        }

        const params = new URLSearchParams({

            id: job.id || index,

            title: job.title || "",

            company: job.company || "",

            location: job.location || "",

            type: job.type || "",

            salary: job.salary || "",

            match: job.match || "",

            skills: Array.isArray(job.skills)
                ? job.skills.join(", ")
                : ""

        });

        window.location.href =
            `application-form.html?${params.toString()}`;

    };


    // =========================
    // HTML ESCAPE
    // =========================

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }

});