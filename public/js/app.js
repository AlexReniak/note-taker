$(document).ready(function() {

  $(".enter-btn").on("click", function {
    
    event.preventDefault();
    
    $.ajax({
      url: "/api/notes",
      method: "GET"
    }).then(function(noteData) {

      console.log(tableData);

      for (let i = 0; i < noteData.length; i++) {

        const noteSideView = $("#note-side-view");

        
        
      }
    });
  });
});