var topics = ["Rugrats", "Gargoyles", "Daria", "Doug", "Hey Arnold", "The Tick", "Pinky and the Brain", "Arthur", "Recess", "Rocko's Modern Life", "The Wild Thornberry's", "The Magic School Bus", "Animaniacs", "Aaahh!!! Real Monsters", "Futurama", "Family Guy", "South Park"];
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10";

function renderButtons() {
    $("#buttonsContainer").empty();
    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.addClass("cartoon");
        button.attr("data-name", topics[i]);
        button.text(topics[i]);
        $("#buttonsContainer").append(button);
    }
}

$("#addCartoon").on("click", function(event) {
    event.preventDefault();
    var cartoon = $("#cartoonInput").val().trim();
    cartoons.push(cartoon);
    renderButtons();
});

$("#imagesContainer").on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

$("#buttonsContainer").on("click", ".cartoon", function() {
    $.ajax({
        url: `${queryURL}&q=${$(this).attr("data-name")}`,
        method: "GET"
    }).then(function(response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                var cartoonDiv = $("<div>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var cartoons = $("<img>");
                cartoons.attr("src", results[i].images.fixed_height_still.url);
                cartoons.attr("data-state", "still");
                cartoons.attr("data-still", results[i].images.fixed_height_still.url);
                cartoons.attr("data-animate", results[i].images.fixed_height.url);
                cartoons.attr("class", "gif");
                cartoonDiv.append(p);
                cartoonDiv.append(cartoons);
                $("#imagesContainer").prepend(cartoonDiv);
            }
        }
    });
});

renderButtons();