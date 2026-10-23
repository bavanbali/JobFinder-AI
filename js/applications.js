document.addEventListener("DOMContentLoaded", function () {

    loadApplications();

});


function loadApplications() {

    const applications =
        JSON.parse(
            localStorage.getItem("jobApplications")
        ) || [];


    // -----------------------------
    // STATS
    // -----------------------------

    const total =
        document.getElementById(
            "totalApplications"
        );

    const pending =
        document.getElementById(
            "pendingApplications"
        );

    const selected =
        document.getElementById(
            "selectedApplications"
        );


    total.textContent =
        applications.length;


    pending.textContent =
        applications.filter(function (app) {

            return (
                app.status === "Applied" ||
                app.status === "Pending"
            );

        }).length;


    selected.textContent =
        applications.filter(function (app) {

            return app.status === "Selected";

        }).length;


    // -----------------------------
    // CONTAINER
    // -----------------------------

    const container =
        document.getElementById(
            "applicationsContainer"
        );


    // -----------------------------
    // NO APPLICATION
    // -----------------------------

    if (applications.length === 0) {

        container.innerHTML = `

            <div class="empty-applications">

                <div style="font-size:55px;">
                    📭
                </div>

                <h2>
                    No Applications Yet
                </h2>

                <p>
                    You haven't applied for any jobs yet.
                </p>

                <a href="find-jobs.html">
                    🔎 Find Jobs
                </a>

            </div>

        `;

        return;
    }


    // -----------------------------
    // SHOW APPLICATIONS
    // -----------------------------

    container.innerHTML = "";


    applications
        .slice()
        .reverse()
        .forEach(function (app) {

            const card =
                document.createElement("div");


            card.className =
                "application-card";


            card.innerHTML = `

                <div class="application-header">

                    <div>

                        <h2>
                            ${safe(app.jobTitle)}
                        </h2>

                        <p>
                            ${safe(app.company)}
                        </p>

                    </div>

                    <span class="status">
                        ⏳ ${safe(app.status)}
                    </span>

                </div>


                <div class="application-info">

                    <span>
                        📍 ${safe(app.location)}
                    </span>

                    <span>
                        💼 ${safe(app.jobType)}
                    </span>

                    <span>
                        💰 ${safe(app.salary)}
                    </span>

                    <span>
                        📅 ${safe(app.appliedDate)}
                    </span>

                </div>


                <div class="applicant-info">

                    <strong>
                        Applicant:
                    </strong>

                    <span>
                        ${safe(app.fullName)}
                    </span>

                    <span>
                        ${safe(app.email)}
                    </span>

                    <span>
                        📄 ${safe(app.resumeName)}
                    </span>

                </div>


                <button
                    class="delete-application"
                    data-id="${app.id}"
                    title="Delete application"
                >
                    🗑️
                </button>

            `;


            container.appendChild(card);

        });


    // -----------------------------
    // DELETE
    // -----------------------------

    document
        .querySelectorAll(".delete-application")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const id =
                        Number(
                            button.dataset.id
                        );


                    const confirmDelete =
                        confirm(
                            "Delete this application?"
                        );


                    if (!confirmDelete) {
                        return;
                    }


                    const updated =
                        applications.filter(
                            function (app) {

                                return app.id !== id;

                            }
                        );


                    localStorage.setItem(
                        "jobApplications",
                        JSON.stringify(updated)
                    );


                    loadApplications();

                }
            );

        });

}


// -----------------------------
// HTML SAFETY
// -----------------------------

function safe(value) {

    if (
        value === undefined ||
        value === null
    ) {
        return "";
    }


    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");
}