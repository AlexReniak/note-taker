$(document).ready(function() {

  const renderNotes = () => {

    $("#note-side-view").empty();

    $.ajax({
      url: "/api/notes",
      method: "GET"
    }).then(function(noteData) {

      console.log(noteData);

      for (let i = 0; i < noteData.length; i++) {

        const listNote = $("<li>")

        listNote
          .addClass("list-group-item")
          .attr("data-id", noteData[i].id)
          .html(`<h5>${noteData[i].title}<h5>`)

        $("#note-side-view").append(listNote)

      };
    });
  };



  renderNotes();
});