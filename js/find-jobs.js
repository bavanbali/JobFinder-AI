document.addEventListener("DOMContentLoaded", function () {

    const searchInput =
        document.getElementById("searchInput");

    const locationInput =
        document.getElementById("locationInput");

    const jobType =
        document.getElementById("jobType");

    const searchButton =
        document.getElementById("searchButton");


    const jobs = [

        {
            id: 1,
            title: "Software Developer",
            company: "Technology Company",
            location: "Chandigarh",
            type: "Full Time",
            salary: "₹4 - ₹8 LPA",
            match: "94%",
            skills: ["Java", "Python", "SQL"]
        },

        {
            id: 2,
            title: "Java Developer",
            company: "IT Solutions",
            location: "India",
            type: "Full Time",
            salary: "₹4 - ₹7 LPA",
            match: "91%",
            skills: ["Java", "Spring Boot", "MySQL"]
        },

        {
            id: 3,
            title: "Frontend Developer",
            company: "Digital Solutions",
            location: "Remote",
            type: "Full Time",
            salary: "₹3 - ₹6 LPA",
            match: "89%",
            skills: ["HTML", "CSS", "JavaScript"]
        },

        {
            id: 4,
            title: "Python Developer",
            company: "Tech Innovations",
            location: "Bangalore",
            type: "Full Time",
            salary: "₹5 - ₹10 LPA",
            match: "87%",
            skills: ["Python", "Django", "SQL"]
        },

        {
            id: 5,
            title: "Software Engineering Intern",
            company: "Startup India",
            location: "Remote",
            type: "Internship",
            salary: "₹15,000 - ₹30,000/month",
            match: "85%",
            skills: ["Python", "Git", "JavaScript"]
        }

    ];


    const jobsContainer =
        document.getElementById(
            "jobsContainer"
        );


    // -----------------------------
    // DISPLAY JOBS
    // -----------------------------

    function displayJobs(list) {

        jobsContainer.innerHTML = "";


        if (list.length === 0) {

            jobsContainer.innerHTML = `

                <div class="empty-applications">

                    <h2>
                        No Jobs Found
                    </h2>

                    <p>
                        Try changing your search.
                    </p>

                </div>

            `;

            return;
        }


        list.forEach(function (job) {

            const card =
                document.createElement("div");


            card.className = "job-card";


            const skillsHTML =
                job.skills.map(function (skill) {

                    return `
                        <span class="skill">
                            ${skill}
                        </span>
                    `;

                }).join("");


            card.innerHTML = `

                <div class="job-left">

                    <h2>
                        ${job.title}
                    </h2>

                    <p class="company">
                        ${job.company}
                    </p>

                    <div class="job-meta">

                        <span>
                            📍 ${job.location}
                        </span>

                        <span>
                            💼 ${job.type}
                        </span>

                    </div>


                    <div class="skills">

                        ${skillsHTML}

                    </div>

                </div>


                <div class="job-right">

                    <span class="match">
                        ${job.match} Match
                    </span>

                    <strong>
                        ${job.salary}
                    </strong>

                    <button
                        class="apply-btn"
                        data-id="${job.id}"
                    >
                        Apply Now →
                    </button>

                </div>

            `;


            jobsContainer.appendChild(card);

        });


        // -----------------------------
        // APPLY BUTTONS
        // -----------------------------

        document
            .querySelectorAll(".apply-btn")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const id =
                            Number(
                                button.dataset.id
                            );


                        const job =
                            jobs.find(
                                function (item) {

                                    return item.id === id;

                                }
                            );


                        if (!job) {
                            return;
                        }


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
                            "application.html?" +
                            params.toString();

                    }
                );

            });

    }


    // -----------------------------
    // SEARCH
    // -----------------------------

    function searchJobs() {

        const search =
            searchInput.value
                .trim()
                .toLowerCase();


        const location =
            locationInput.value
                .trim()
                .toLowerCase();


        const type =
            jobType.value;


        const filtered =
            jobs.filter(function (job) {

                const searchMatch =

                    !search ||

                    job.title
                        .toLowerCase()
                        .includes(search)

                    ||

                    job.company
                        .toLowerCase()
                        .includes(search)

                    ||

                    job.skills.some(
                        function (skill) {

                            return skill
                                .toLowerCase()
                                .includes(search);

                        }
                    );


                const locationMatch =

                    !location ||

                    job.location
                        .toLowerCase()
                        .includes(location);


                const typeMatch =

                    !type ||

                    job.type === type;


                return (
                    searchMatch &&
                    locationMatch &&
                    typeMatch
                );

            });


        displayJobs(filtered);

    }


    if (searchButton) {

        searchButton.addEventListener(
            "click",
            searchJobs
        );

    }


    if (searchInput) {

        searchInput.addEventListener(
            "keypress",
            function (event) {

                if (event.key === "Enter") {

                    searchJobs();

                }

            }
        );

    }


    // Initial jobs
    displayJobs(jobs);

});