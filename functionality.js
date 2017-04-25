$(document).ready(function(){
  
  //jquery ui bounce effect for hover over random article
  $("#randarticle").mouseover(function () {
        $(this).effect("bounce", { distance: 5, times: 4 }, "slow");
  });
  
  $("#wikisearch").keypress(function(e){ //function for enter in input
    if(e.keyCode === 13){ //match keypress to enter key
      if ($("#wikisearch").val().length != 0){ //check for input
        $(".search-results").html(""); //clear out div
        var searchText = $("#wikisearch").val(); //get input value
        var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ searchText +"&format=json&callback=?";

        $.ajax({
          url: url,
          type: 'GET',
          contentType: "application/json; charset=utf-8",
          async: false,
          dataType: "json",
          success: function(data, status, jqXHR){

            //loop through json data and create new div for each result
            for (var i = 0; i < data[1].length; i++){
              $(".search-results").prepend("<div class='result'><a href="+data[3][i]+" target='_blank'><h3>"+data[1][i]+"</h3></a><p>"+data[2][i]+"</p></div>");
            }

          } //end success:

        }); //end .ajax
        
      } else {
        $(".search-results").html(""); //clear out div
        $(".search-results").prepend("<p class='errormessage'><i class='fa fa-exclamation-triangle' aria-hidden='true'></i>&nbsp;The search box is empty</p>"); //error message if no user input when enter is pressed
      }
      
    } //end if .keycode

  }); //end .keypress
  
}); //end .ready