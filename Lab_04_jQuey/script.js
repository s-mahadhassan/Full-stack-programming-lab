$(document).ready(function () {

    /* =========================================
       SPA NAVIGATION LOGIC
       ========================================= */
    $(".menu-card").on("click", function() {
        const targetId = $(this).data("target");
        
        // Hide Menu with animation
        $("#menu-container").fadeOut(200, function() {
            // Hide all specific tasks, then show the requested one
            $(".task-card").hide();
            $("#" + targetId).show();
            
            // Show the Tasks Container
            $("#tasks-container").fadeIn(300);
        });
    });

    $("#back-btn").on("click", function() {
        // Go back to the main menu
        $("#tasks-container").fadeOut(200, function() {
            $("#menu-container").fadeIn(300);
        });
    });


    /* =========================================
       TASK 1: DYNAMIC LIST MANAGER
       ========================================= */
    const $itemInput = $("#item-input");
    const $addItemBtn = $("#add-item-btn");
    const $dynamicList = $("#dynamic-list");

    // Add item on button click
    $addItemBtn.on("click", function () {
        const itemText = $itemInput.val().trim();
        if (itemText === "") return;

        const $listItem = $(`
            <li>
                <span>${itemText}</span>
                <button class="btn-danger delete-btn">Delete</button>
            </li>
        `);

        $dynamicList.append($listItem);
        $itemInput.val("").focus(); // clear and focus
    });

    // Add item on Enter key press
    $itemInput.on("keypress", function (e) {
        if (e.which === 13) {
            $addItemBtn.click();
        }
    });

    // Delete item (Event delegation for dynamic elements)
    $dynamicList.on("click", ".delete-btn", function () {
        $(this).closest("li").fadeOut(300, function () {
            $(this).remove();
        });
    });


    /* =========================================
       TASK 3: INTERACTIVE FORM VALIDATION
       ========================================= */
    const $form = $("#validation-form");
    const $name = $("#name");
    const $email = $("#email");
    const $password = $("#password");

    // Helper functions
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    
    const showError = ($input, $errorMsg) => {
        $input.addClass("invalid");
        $errorMsg.slideDown(200);
    };
    
    const hideError = ($input, $errorMsg) => {
        $input.removeClass("invalid");
        $errorMsg.slideUp(200);
    };

    // Validate on blur
    $name.on("blur", function () {
        if ($(this).val().trim().length < 2) {
            showError($(this), $("#name-error"));
        } else {
            hideError($(this), $("#name-error"));
        }
    });

    $email.on("blur", function () {
        if (!isValidEmail($(this).val())) {
            showError($(this), $("#email-error"));
        } else {
            hideError($(this), $("#email-error"));
        }
    });

    $password.on("blur", function () {
        if ($(this).val().trim().length < 6) {
            showError($(this), $("#password-error"));
        } else {
            hideError($(this), $("#password-error"));
        }
    });

    // Form submission
    $form.on("submit", function (e) {
        e.preventDefault();

        // Trigger blurs to check validations
        $name.trigger("blur");
        $email.trigger("blur");
        $password.trigger("blur");

        // If no invalid classes exist, form is valid
        if ($form.find(".invalid").length === 0) {
            $("#form-success").slideDown().delay(3000).slideUp();
            $form[0].reset(); 
            // Ensures valid state style is removed immediately instead of waiting for next blur
            $form.find("input").removeClass("invalid");
        }
    });


    /* =========================================
       TASK 6: API DATA FETCHER
       ========================================= */
    const $fetchBtn = $("#fetch-data-btn");
    const $loadMoreBtn = $("#load-more-btn");
    const $loader = $("#loading-indicator");
    const $dataContainer = $("#data-container");

    let itemsLimit = 5;
    let allPosts = [];

    const renderPosts = (posts) => {
        posts.forEach(post => {
            const $card = $(`
                <div class="data-card">
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                </div>
            `);
            $dataContainer.append($card);
        });
    };

    $fetchBtn.on("click", function () {
        $fetchBtn.prop("disabled", true).text("Loading...");
        $loader.show();
        $dataContainer.empty();

        // jQuery AJAX Get
        $.get("https://jsonplaceholder.typicode.com/posts")
            .done(function (data) {
                allPosts = data;
                renderPosts(allPosts.slice(0, itemsLimit)); // Load first 5
                
                $fetchBtn.hide(); // Hide initial load button
                $loadMoreBtn.show(); // Show 'Load More'
            })
            .fail(function () {
                $dataContainer.html('<p style="color:red;">Error fetching data. Please try again.</p>');
                $fetchBtn.prop("disabled", false).text("Load Data");
            })
            .always(function () {
                $loader.hide();
            });
    });

    $loadMoreBtn.on("click", function () {
        $loader.show();
        
        // Simulating slight network delay before loading next batch
        setTimeout(() => {
            const nextBatch = allPosts.slice(itemsLimit, itemsLimit + 5);
            renderPosts(nextBatch);
            itemsLimit += 5;

            if (itemsLimit >= allPosts.length || itemsLimit >= 20) { // Limit to 20 for this lab
                $loadMoreBtn.hide();
            }
            $loader.hide();
        }, 500);
    });


    /* =========================================
       TASK 7: DRAG-AND-DROP SORTABLE LIST
       ========================================= */
    const $sortableList = $("#sortable-list");
    const $currentOrderSpan = $("#current-order");

    const updateOrderText = () => {
        const order = [];
        $sortableList.find("li").each(function () {
            order.push($(this).data("id"));
        });
        $currentOrderSpan.text(order.join(", ")).fadeOut(100).fadeIn(100); // Visual flash to indicate update
    };

    // Initialize jQuery UI Sortable
    $sortableList.sortable({
        handle: ".drag-handle",
        placeholder: "ui-sortable-placeholder",
        opacity: 0.8,
        update: function (event, ui) {
            updateOrderText();
        }
    });

    // Make text non-selectable while dragging
    $sortableList.disableSelection();

});
