
$(document).ready(function () {

  // Generates notes to page
  const renderNotes = () => {

    $("#note-side-view").empty();

    $.ajax({
      url: "/api/notes",
      method: "GET"
    }).then(function (noteData) {

      let noteList = []
      console.log(noteData);

      for (let i = 0; i < noteData.length; i++) {

        let noteID = noteData[i].id;
        let noteTitle = noteData[i].title;
        let noteBody = noteData[i].note_body;
        let noteDate = moment(noteData[i].created_at).format("MM/DD/YYYY");

        const notesAccordian =
      `<div class="accordion" id="accordion${noteID}" data-id="${noteID}" data-title="${noteTitle}" data-body="${noteBody}" data-date="${noteDate}">
      <div class="card">
        <div class="card-header" id="heading${noteID}">
          <h2 class="mb-0 d-flex justify-content-center note-title">
            <button class="btn mx-3 note-btn" type="button" data-toggle="collapse" data-target="#collapse${noteID}" aria-expanded="true" aria-controls="collapse${noteID}">
              ${noteTitle}
            </button>
            <i class="far fa-trash-alt trash-icon d-flex justify-content-end my-1 mx-1"></i>
          </h2>
        </div>
        <div id="collapse${noteID}" class="collapse show" aria-labelledby="heading${noteID}" data-parent="#accordion${noteID}">
          <div class="card-body text-center">
            ${noteBody}
          </div>
          <div class="border-top d-flex justify-content-center">Created on: ${noteDate}</div>
        </div>
      </div>
    </div>`

        noteList.push(notesAccordian);
      };

      $("#note-side-view").append(noteList);
    });
  };

  // Delete notes
  $(document).on("click", ".trash-icon", function() {

    let deleteID = $(this).parents(".accordion").data().id

    console.log(deleteID);
    
    if(confirm("Are you sure you want to delete this note?") === true) {
      $.ajax({
        url: "/api/notes/" + deleteID,
        method: "DELETE",
      }).then(function() {
        renderNotes();
        $(`#accordion${deleteID}`).remove();
      });
    }
    else {
      return false;
    };
  });

  // Add new notes
  $(document).on("click", "#save-new-note", function(e) {
    e.preventDefault();

    let newNote = {
      title: $("#note-title-input").val(),
      note_body: $("#note-body-input").val()
    };

    $("#note-title-input").val("");
    $("#note-body-input").val("");

      $.ajax({
        url: "/api/notes",
        method: "POST",
        data: newNote,
        success: renderNotes()
      });
  });

  renderNotes();
});