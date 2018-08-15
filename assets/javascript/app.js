
//array of animals
var animals = ["Dog", "Rhino", "Tiger", "Elephant"];

//function for unique name and removing spaces
function setButton(){
    let uniqueNames = [];
    $.each(animals, function(i, el){
        el=el.toUpperCase().trim();
        if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
    });
    animals=uniqueNames;
    $(".btnclass").html("");
    for(var i=0;i<animals.length;i++){
     //   $(".btnclass").append("<button onClick='showImage();' id='"+animals[i]+"'>"+animals[i]+"</button>");
     btn = $('<input />', {
        type  : 'button',
        value : animals[i],
        id    : animals[i],
        on    : {
           click: function() {
               showImage(this.value);
           }
        }
    });
    $(".btnclass").append(btn);
    }

}

//onclick submit function
$("#submit").click(function() {
    let value=$("#userinput").val();
    if(value){
       //  alert("not blank");
        animals.push(value);
        setButton();
    }
    else {
        alert("Please type an animal name")
    }
   // console.log($("#userinput").val());
  });

//working with image 
function showImage(img){
      $("#giffydiv").html("");
     // console.log(img);
     
  

   // Constructing a URL to search Giphy 
   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
   img + "&api_key=Wj9NBGBXLp1a73G8xbDhSvYDeoona1hK&limit=10";
   // "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5"
   // Performing our AJAX GET request
    $.ajax({
    url: queryURL,
    method: "GET"
    })
   // After the data comes back from the API
   .then(function(response) {
     // Storing an array of results in the results variable
     var results = response.data;
     console.log(results);

     // Looping over every result item
     for (var i = 0; i < results.length; i++) {

       // Only taking action if the photo has an appropriate rating
       if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            // Creating a div with the class "item" and using bootstrap to get two image in a row
            var gifDiv = $("<div class='item col-md-5'>");

            // Storing the result item's rating
            var rating = results[i].rating;

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);

            // Creating an image tag
            var animalImage = $("<img>");

            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            animalImage.attr("data-animate", results[i].images.original.url);
            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            animalImage.attr("data-state", "still");
            animalImage.attr("src", results[i].images.fixed_height_still.url);
            // console.log(animalImage);
            
            
        
            // Appending the paragraph and animalImage we created to the "gifDiv" div we created
            gifDiv.append(p);
            gifDiv.append(animalImage);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#giffydiv").prepend(gifDiv); 
       }
     }     
   }); 
}

$("#giffydiv").on('click', "img", function(){
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

//document.reday function
$( document ).ready(function() {
    setButton();
});