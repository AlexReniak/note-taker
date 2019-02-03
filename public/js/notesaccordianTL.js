// Create accordian style menu for notes
const notesAccordian =
`<div class="accordion" id="accordion${noteID}" data-id="${noteID}>
<div class="card">
  <div class="card-header" id="heading${noteID}">
    <h2 class="mb-0">
      <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${noteID}" aria-expanded="true" aria-controls="collapse${noteID}">
        ${noteTitle}
      </button>
      <i class="far fa-trash-alt trash d-flex justify-content-end"></i>
    </h2>
  </div>
  <div id="collapse${noteID}" class="collapse show" aria-labelledby="heading${noteID}" data-parent="#accordion${noteID}">
    <div class="card-body">
      ${noteBody}
    </div>
  </div>
</div>
</div>`

module.exports = notesAccordian;
