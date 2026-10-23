document.addEventListener("DOMContentLoaded", function () {

    // ==============================
    // GET JOB DATA FROM URL
    // ==============================

    const params = new URLSearchParams(window.location.search);

    const jobId = params.get("id") || "";
    const title = params.get("title") || "Job";
    const company = params.get("company") || "Company";
    const location = params.get("location") || "India";
    const type = params.get("type") || "Full Time";
    const salary = params.get("salary") || "Not specified";


    // ==============================
    // SHOW JOB INFORMATION
    // ==============================

    const jobTitle = document.getElementById("jobTitle");
    const jobCompany = document.getElementById("jobCompany");
    const jobLocation = document.getElementById("jobLocation");
    const jobType = document.getElementById("jobType");
    const jobSalary = document.getElementById("jobSalary");


    if (jobTitle) {
        jobTitle.textContent = decodeURIComponent(title);
    }

    if (jobCompany) {
        jobCompany.textContent = decodeURIComponent(company);
    }

    if (jobLocation) {
        jobLocation.textContent = decodeURIComponent(location);
    }

    if (jobType) {
        jobType.textContent = decodeURIComponent(type);
    }

    if (jobSalary) {
        jobSalary.textContent = decodeURIComponent(salary);
    }


    // ==============================
    // FORM
    // ==============================

    const form = document.getElementById("applicationForm");


    if (!form) {
        return;
    }


    // ==============================
    // CANCEL BUTTON
    // ==============================

    const cancelButton = document.getElementById("cancelButton");


    if (cancelButton) {

        cancelButton.addEventListener("click", function () {

            window.location.href = "find-jobs.html";

        });

    }


    // ==============================
    // SUBMIT APPLICATION
    // ==============================

    form.addEventListener("submit", function (event) {

        event.preventDefault();


        // --------------------------
        // GET FORM VALUES
        // --------------------------

        const fullName =
            document.getElementById("fullName").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const city =
            document.getElementById("city").value.trim();

        const qualification =
            document.getElementById("qualification").value;

        const graduationYear =
            document.getElementById("graduationYear").value;

        const skills =
            document.getElementById("skills").value.trim();

        const resumeInput =
            document.getElementById("resume");

        const coverLetter =
            document.getElementById("coverLetter").value.trim();


        // ==============================
        // VALIDATION
        // ==============================

        if (!fullName) {

            alert("Please enter your full name.");

            return;
        }


        if (!email) {

            alert("Please enter your email address.");

            return;
        }


        if (!phone) {

            alert("Please enter your phone number.");

            return;
        }


        if (!qualification) {

            alert("Please select your highest qualification.");

            return;
        }


        if (!skills) {

            alert("Please enter your skills.");

            return;
        }


        if (
            !resumeInput.files ||
            resumeInput.files.length === 0
        ) {

            alert("Please upload your resume.");

            return;
        }


        // ==============================
        // RESUME INFORMATION
        // ==============================

        const resumeFile = resumeInput.files[0];


        const allowedExtensions = [
            "pdf",
            "doc",
            "docx"
        ];


        const fileName =
            resumeFile.name.toLowerCase();


        const extension =
            fileName.split(".").pop();


        if (!allowedExtensions.includes(extension)) {

            alert(
                "Please upload a PDF, DOC, or DOCX file."
            );

            return;
        }


        // ==============================
        // CREATE APPLICATION
        // ==============================

        const application = {

            id:
                Date.now().toString(),

            jobId:
                jobId,

            jobTitle:
                decodeURIComponent(title),

            company:
                decodeURIComponent(company),

            location:
                decodeURIComponent(location),

            jobType:
                decodeURIComponent(type),

            salary:
                decodeURIComponent(salary),

            applicant: {

                fullName:
                    fullName,

                email:
                    email,

                phone:
                    phone,

                city:
                    city,

                qualification:
                    qualification,

                graduationYear:
                    graduationYear,

                skills:
                    skills,

                coverLetter:
                    coverLetter

            },

            resume: {

                name:
                    resumeFile.name,

                type:
                    resumeFile.type,

                size:
                    resumeFile.size

            },

            status:
                "Applied",

            date:
                new Date().toLocaleDateString("en-IN"),

            timestamp:
                new Date().toISOString()

        };


        // ==============================
        // GET OLD APPLICATIONS
        // ==============================

        let applications = [];


        try {

            applications =
                JSON.parse(
                    localStorage.getItem("jobApplications")
                ) || [];

        } catch (error) {

            applications = [];

        }


        // ==============================
        // PREVENT DUPLICATE APPLICATION
        // ==============================

        const alreadyApplied =
            applications.some(function (item) {

                return (
                    item.jobId === jobId &&
                    item.applicant &&
                    item.applicant.email === email
                );

            });


        if (alreadyApplied) {

            alert(
                "You have already applied for this job with this email."
            );

            return;
        }


        // ==============================
        // SAVE APPLICATION
        // ==============================

        applications.push(application);


        localStorage.setItem(
            "jobApplications",
            JSON.stringify(applications)
        );


        // ==============================
        // SUCCESS
        // ==============================

        alert(
            "Application submitted successfully!"
        );


        // ==============================
        // OPEN APPLICATIONS
        // ==============================

        window.location.href =
            "applications.html";

    });

});