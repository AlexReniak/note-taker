// const notesAccordian = require("./notesaccordianTL")

$(document).ready(function () {

  const renderNotes = () => {

    $("#note-side-view").empty();

    $.ajax({
      url: "/api/notes",
      method: "GET"
    }).then(function (noteData) {

      console.log(noteData);

      for (let i = 0; i < noteData.length; i++) {

        let noteID = noteData[i].id;
        let noteTitle = noteData[i].title;
        let noteBody = noteData[i].note_body;
        let noteDate = noteData[i].created_at;

        const notesAccordian =
      `<div class="accordion" id="accordion${noteID}" data-id='${noteID}'>
      <div class="card">
        <div class="card-header" id="heading${noteID}">
          <h2 class="mb-0">
            <button class="btn" type="button" data-toggle="collapse" data-target="#collapse${noteID}" aria-expanded="true" aria-controls="collapse${noteID}">
              ${noteTitle}
            </button>
            <i class="far fa-trash-alt trash"></i>
          </h2>
        </div>
        <div id="collapse${noteID}" class="collapse show" aria-labelledby="heading${noteID}" data-parent="#accordion${noteID}">
          <div class="card-body">
            ${noteBody}
          </div>
          <div>Created on: ${noteDate}</div>
        </div>
      </div>
    </div>`

        $("#note-side-view").append(notesAccordian)

        console.log(noteID)

      };
    });
  };

  

  $(document).on("click", ".trash", function(e) {
    e.preventDefault();
    console.log("this is working")
    let accordianDiscard = ($(this)
      .parent()
      .parent()
      .parent()
      .attr("data-id")
    )
    console.log(accordianDiscard.attr("data-id"));
  
    $.ajax({
      url: "/api/notes",
      method: "DELETE",
    }).then(function() {
      $(`#accordian${accordianDiscard}`).remove();
    })
  });

  $(document).on("click", "#save-new-note", function(e) {
    e.preventDefault();

    let newNote = {
      title: $("#note-title-input").val(),
      note_body: $("#note-body-input").val()
    }
    // console.log(newNote.title, newNote.note_body);

      $.ajax({
        url: "/api/notes",
        method: "POST",
        data: newNote
      }).then(newNoteData, function() {
        console.log(newNoteData.id)
        console.log(newNoteData.title)
        console.log(newNoteData.note_body)
      });
  });

  renderNotes();
});