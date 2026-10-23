/* =========================================
   JOBFINDER AI - AI MATCHES
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    loadProfile();
    loadAIMatches();
    setupLogout();

});


/* =========================================
   JOB DATA
========================================= */

const jobs = [

    {
        id: 1,
        title: "Software Developer",
        company: "Technology Company",
        location: "Chandigarh",
        type: "Full Time",
        salary: "₹4 - ₹8 LPA",
        skills: ["Java", "Python", "SQL"],
        icon: "💻"
    },

    {
        id: 2,
        title: "Java Developer",
        company: "IT Solutions",
        location: "India",
        type: "Full Time",
        salary: "₹4 - ₹7 LPA",
        skills: ["Java", "Spring Boot", "MySQL"],
        icon: "☕"
    },

    {
        id: 3,
        title: "Frontend Developer",
        company: "Digital Solutions",
        location: "Remote",
        type: "Full Time",
        salary: "₹3 - ₹6 LPA",
        skills: ["HTML", "CSS", "JavaScript"],
        icon: "🌐"
    },

    {
        id: 4,
        title: "Python Developer",
        company: "AI Technologies",
        location: "Bangalore",
        type: "Full Time",
        salary: "₹5 - ₹10 LPA",
        skills: ["Python", "Django", "SQL"],
        icon: "🐍"
    },

    {
        id: 5,
        title: "Web Development Intern",
        company: "Startup India",
        location: "Remote",
        type: "Internship",
        salary: "₹15,000 - ₹30,000/month",
        skills: ["HTML", "CSS", "JavaScript"],
        icon: "🚀"
    },

    {
        id: 6,
        title: "Data Analyst",
        company: "DataWorks",
        location: "Delhi",
        type: "Full Time",
        salary: "₹4 - ₹8 LPA",
        skills: ["Python", "SQL", "Excel"],
        icon: "📊"
    }

];


/* =========================================
   LOAD USER PROFILE
========================================= */

function loadProfile() {

    let profile = null;

    try {

        profile = JSON.parse(
            localStorage.getItem("jobfinderProfile")
        );

    } catch (error) {

        profile = null;

    }


    const nameElement =
        document.getElementById("profileName");

    const roleElement =
        document.getElementById("profileRole");

    const skillsElement =
        document.getElementById("profileSkills");


    if (!profile) {

        nameElement.textContent = "Your Profile";

        roleElement.textContent =
            "Add your skills to get better AI matches.";

        return;

    }


    if (profile.name) {

        nameElement.textContent =
            profile.name;

    }


    if (profile.role) {

        roleElement.textContent =
            profile.role;

    } else if (profile.qualification) {

        roleElement.textContent =
            profile.qualification;

    }


    if (profile.skills) {

        let skills = profile.skills;

        if (typeof skills === "string") {

            skills = skills
                .split(",")
                .map(skill => skill.trim())
                .filter(skill => skill);

        }


        if (Array.isArray(skills) && skills.length > 0) {

            skillsElement.innerHTML = "";

            skills.forEach(skill => {

                const span =
                    document.createElement("span");

                span.className = "skill";

                span.textContent = skill;

                skillsElement.appendChild(span);

            });

        }

    }

}


/* =========================================
   GET USER SKILLS
========================================= */

function getUserSkills() {

    let profile = null;

    try {

        profile = JSON.parse(
            localStorage.getItem("jobfinderProfile")
        );

    } catch (error) {

        profile = null;

    }


    if (!profile || !profile.skills) {

        return [
            "Java",
            "Python",
            "SQL"
        ];

    }


    let skills = profile.skills;


    if (typeof skills === "string") {

        skills = skills
            .split(",")
            .map(skill => skill.trim())
            .filter(skill => skill);

    }


    if (!Array.isArray(skills)) {

        return [
            "Java",
            "Python",
            "SQL"
        ];

    }


    return skills;

}


/* =========================================
   CALCULATE MATCH
========================================= */

function calculateMatch(jobSkills, userSkills) {

    if (!jobSkills || jobSkills.length === 0) {

        return 0;

    }


    if (!userSkills || userSkills.length === 0) {

        return 50;

    }


    const userSkillList =
        userSkills.map(skill =>
            skill.toLowerCase().trim()
        );


    let matched = 0;


    jobSkills.forEach(jobSkill => {

        const skill =
            jobSkill.toLowerCase().trim();


        if (userSkillList.includes(skill)) {

            matched++;

        }

    });


    const percentage =
        Math.round(
            (matched / jobSkills.length) * 100
        );


    /*
       Minimum visual score so that
       new users still see recommendations.
    */

    if (percentage === 0) {

        return 65;

    }


    return Math.min(99, percentage + 50);

}


/* =========================================
   LOAD AI MATCHES
========================================= */

function loadAIMatches() {

    const container =
        document.getElementById(
            "matchesContainer"
        );


    const userSkills =
        getUserSkills();


    const matchedJobs =
        jobs.map(job => {

            const match =
                calculateMatch(
                    job.skills,
                    userSkills
                );

            return {
                ...job,
                match: match
            };

        });


    /*
       Highest match first
    */

    matchedJobs.sort(
        (a, b) => b.match - a.match
    );


    updateSummary(matchedJobs);


    container.innerHTML = "";


    matchedJobs.forEach(job => {

        const card =
            createJobCard(job);

        container.appendChild(card);

    });

}


/* =========================================
   UPDATE SUMMARY
========================================= */

function updateSummary(jobsList) {

    const total =
        jobsList.length;


    const strong =
        jobsList.filter(
            job => job.match >= 80
        ).length;


    let average = 0;


    if (total > 0) {

        const sum =
            jobsList.reduce(
                (total, job) =>
                    total + job.match,
                0
            );

        average =
            Math.round(sum / total);

    }


    document.getElementById(
        "totalMatches"
    ).textContent = total;


    document.getElementById(
        "strongMatches"
    ).textContent = strong;


    document.getElementById(
        "averageMatch"
    ).textContent = average + "%";

}


/* =========================================
   CREATE JOB CARD
========================================= */

function createJobCard(job) {

    const card =
        document.createElement("div");

    card.className =
        "match-card";


    const skillsHTML =
        job.skills.map(skill => {

            return `
                <span class="job-skill">
                    ${escapeHTML(skill)}
                </span>
            `;

        }).join("");


    const reason =
        getMatchReason(job);


    card.innerHTML = `

        <div class="match-top">

            <div class="job-info">

                <div class="job-icon">
                    ${job.icon}
                </div>

                <div>

                    <h3>
                        ${escapeHTML(job.title)}
                    </h3>

                    <div class="company">
                        ${escapeHTML(job.company)}
                    </div>

                </div>

            </div>


            <div class="match-percent">
                ${job.match}% Match
            </div>

        </div>


        <div class="job-details">

            <span>
                📍 ${escapeHTML(job.location)}
            </span>

            <span>
                💼 ${escapeHTML(job.type)}
            </span>

            <span>
                💰 ${escapeHTML(job.salary)}
            </span>

        </div>


        <div class="job-skills">

            ${skillsHTML}

        </div>


        <div class="match-reason">

            🤖 <strong>Why this job?</strong>

            ${reason}

        </div>


        <div class="match-actions">

            <button
                class="apply-btn"
                onclick="applyForJob(${job.id})">

                Apply Now →

            </button>


            <button
                class="save-btn"
                onclick="saveJob(${job.id}, this)">

                💗 Save Job

            </button>

        </div>

    `;


    return card;

}


/* =========================================
   MATCH REASON
========================================= */

function getMatchReason(job) {

    const userSkills =
        getUserSkills()
            .map(skill =>
                skill.toLowerCase()
            );


    const matchingSkills =
        job.skills.filter(skill =>
            userSkills.includes(
                skill.toLowerCase()
            )
        );


    if (matchingSkills.length > 0) {

        return `
            Your profile matches
            <strong>
                ${matchingSkills.join(", ")}
            </strong>
            for this role.
        `;

    }


    return `
        This role may help you explore
        opportunities related to your profile.
    `;

}


/* =========================================
   APPLY FOR JOB
========================================= */

function applyForJob(jobId) {

    const job =
        jobs.find(
            item => item.id === jobId
        );


    if (!job) {

        alert("Job not found.");

        return;

    }


    /*
       IMPORTANT:
       Do NOT directly create an application.

       Open application form first.
    */

    const params =
        new URLSearchParams({

            id: job.id,
            title: job.title,
            company: job.company,
            location: job.location,
            type: job.type,
            salary: job.salary

        });


    window.location.href =
        "application-form.html?" +
        params.toString();

}


/* =========================================
   SAVE JOB
========================================= */

function saveJob(jobId, button) {

    const job =
        jobs.find(
            item => item.id === jobId
        );


    if (!job) {

        return;

    }


    let savedJobs = [];


    try {

        savedJobs =
            JSON.parse(
                localStorage.getItem(
                    "jobfinderSavedJobs"
                )
            ) || [];

    } catch (error) {

        savedJobs = [];

    }


    const alreadySaved =
        savedJobs.some(
            item => item.id === job.id
        );


    if (alreadySaved) {

        alert("This job is already saved.");

        return;

    }


    savedJobs.push(job);


    localStorage.setItem(
        "jobfinderSavedJobs",
        JSON.stringify(savedJobs)
    );


    button.textContent =
        "❤️ Saved";


    button.disabled = true;


    alert(
        job.title +
        " has been saved successfully."
    );

}


/* =========================================
   LOGOUT
========================================= */

function setupLogout() {

    const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );


    if (!logoutBtn) {

        return;

    }


    logoutBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            const confirmLogout =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (!confirmLogout) {

                return;

            }


            /*
               Only remove login session.
               Profile/application data stays.
            */

            localStorage.removeItem(
                "jobfinderLoggedIn"
            );


            localStorage.removeItem(
                "currentUser"
            );


            window.location.href =
                "index.html";

        }
    );

}


/* =========================================
   SAFE HTML
========================================= */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}