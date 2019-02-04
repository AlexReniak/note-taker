
$(document).ready(function () {

  // Generates notes to page
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
      `<div class="accordion" id="accordion${noteID}" data-id="${noteID}">
      <div class="card">
        <div class="card-header" id="heading${noteID}">
          <h2 class="mb-0">
            <button class="btn" type="button" data-toggle="collapse" data-target="#collapse${noteID}" aria-expanded="true" aria-controls="collapse${noteID}">
              ${noteTitle}
            </button>
            <i class="far fa-trash-alt trash-icon"></i>
            <i class="far fa-edit edit-icon"></i>
          </h2>
        </div>
        <div id="collapse${noteID}" class="collapse show" aria-labelledby="heading${noteID}" data-parent="#accordion${noteID}">
          <div class="card-body">
            ${noteBody}
          </div>
          <div class="border-top">Created on: ${noteDate}</div>
        </div>
      </div>
    </div>`

        $("#note-side-view").append(notesAccordian)

        console.log(noteID)

      };
    });
  };

  // const updateNote = () => {

  //   let updateNote = {
  //     id:
  //     title: $("#update-title-input").val(),
  //     note_body: $("#update-body-input").val()
  //   }

  //   $.ajax({
  //     url: "/apli/notes",
  //     method: "POST",
  //     data: updateNote,
  //     success: renderNotes()
  //   })
  // }

  // Delete notes function
  const deleteNote = () => {
    
    if(confirm("Are you sure you want to delete this note?") === true) {
      $.ajax({
        url: "/api/notes",
        method: "DELETE",
        data: accordianDiscard
      }).then(function() {
        renderNotes();
        $(`#accordian${accordianDiscard}`).remove();
      })
    }
    else {
      return false;
    }
  }

  // On click event to remove notes
  $(document).on("click", ".trash-icon", function(e) {
    e.preventDefault();
    console.log("this is working")
    let accordianDiscard = $(this)
      .parent()
      .parent()
      .parent()
      .parent()
      .data().id
    
    deleteID = {
      id: accordianDiscard
    }

    if(confirm("Are you sure you want to delete this note?") === true) {
      $.ajax({
        url: "/api/notes",
        method: "DELETE",
        data: deleteID
      }).then(function() {
        renderNotes();
        $(`#accordian${accordianDiscard}`).remove();
      })
    }
    else {
      return false;
    }

  });

  // on click event to save new notes
  $(document).on("click", "#save-new-note", function(e) {
    e.preventDefault();

    let newNote = {
      title: $("#note-title-input").val(),
      note_body: $("#note-body-input").val()
    }

      $.ajax({
        url: "/api/notes",
        method: "POST",
        data: newNote,
        success: renderNotes()
      
      });
  });

  renderNotes();
});