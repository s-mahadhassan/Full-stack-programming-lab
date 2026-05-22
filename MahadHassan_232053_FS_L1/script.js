$(document).ready(function () {

    // Intro Screen Logic
    $("#btn-start-signup").click(function () {
        $("#intro-screen").fadeOut(300, function () {
            $("#main-app").fadeIn(300);
        });
    });

    // Initialize Datepicker
    $(".datepicker").datepicker({
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true,
        yearRange: "-100:+0"
    });

    // Accordion Functionality
    $(".accordion-header").click(function () {
        // Toggle the content of the clicked header
        var content = $(this).next(".accordion-content");
        content.slideToggle(300);

        // Toggle Icon
        var icon = $(this).find(".icon-toggle");
        if (icon.text() === "+") {
            icon.text("-");
        } else {
            icon.text("+");
        }

        // Toggle Active Class
        $(this).toggleClass("active");

        // Optional: Close other sections? 
        // The user image shows one open. Standard accordion usually closes others.
        // Let's implement auto-close others for cleaner mobile UI.
        /*
        $(".accordion-content").not(content).slideUp(300);
        $(".accordion-header").not(this).removeClass("active");
        $(".accordion-header").not(this).find(".icon-toggle").text("+");
        */
    });

    // Form Submission Logic
    $("#membershipForm").on("submit", function (e) {
        e.preventDefault();

        // Simple client-side validation check (HTML5 'required' handles most)
        if (this.checkValidity()) {
            $("#main-app").fadeOut(300, function () {
                $("#success-screen").fadeIn(300);
            });
        } else {
            // Trigger browser validation UI
            this.reportValidity();
        }
    });

    // Back to Home Logic
    $("#btn-back-home").click(function () {
        $("#success-screen").fadeOut(300, function () {
            // Reset form
            $("#membershipForm")[0].reset();
            // Go back to Intro
            $("#intro-screen").fadeIn(300);
        });
    });

    // Form Validation Simulation (Visual Feedback)
    $("input, select").on("change keyup", function () {
        if ($(this).val() !== "" && $(this)[0].checkValidity()) {
            $(this).addClass("valid");
        } else {
            $(this).removeClass("valid");
        }
    });



});
