let index, idcolorBox, subject, content, listGroupItemElement, copylistGroupItemElement;
let notes= [];
let editionOrAditionFlag = 0;

function defaultNotesLoad() {
  fetch('https://jsonplaceholder.typicode.com/comments?_start=5&_limit=5')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    notes = myJson.map(({ name, body }) => ({name, body}));
    notes.forEach(function(note) { 
      note.boxColor = "bg-dark"; 
    });
    verticalMenuNotes();
    includeActive(index);
    bigNoteContent();
  });
}

function verticalMenuNotes() {
  $('.defaulNotes').children().remove();
  for ([index,note] of notes.entries()) {
    $('.defaulNotes').append(`
    <a href="#" class="list-group-item list-group-item-action list-group-item-${index}" id="list-group-item-${index}" onclick="clickDefaultNotes(this)">`+
      `<div class="d-flex w-100 justify-content-between">`+
        `<h5 class="mb-1">${note.name}</h5>`+
      `</div>`+
      `<small class="mb-1">${note.body}</small>`+
    `</a>`);
  }
}

function clickDefaultNotes(nameClass) {
  index = Math.abs(parseInt(nameClass.className.slice(-2)));
  $(".defaulNotes > a.active").removeClass("active");
  includeActive(index);
  bigNoteContent();
}

function includeActive(index) {
  listGroupItemElement = document.getElementById("list-group-item-"+ index);
  copyListGroupItemElement = listGroupItemElement.className;
  listGroupItemElement.className = "";
  listGroupItemElement.className = "active " + copyListGroupItemElement;
}

function bigNoteContent() {
  $('.bigNote').children().remove();
  if (notes.length > 0) {
    $('.bigNote').append(
      `<div class="jumbotron jumbotron-fluid rounded mt-5 ml-3 mr-5 ${notes[index].boxColor}">`+
        `<div class="container">`+
          `<h1 class="display-4">${notes[index].name}</h1>`+
          `<p class="lead">${notes[index].body}</p>`+
        `</div>`+
      `</div>`
    );
  }
}

function clickEditionNotes() {
  document.getElementById("editionAditionForm").classList.remove("was-validated");
  editionOrAditionFlag = 2;
  subject = notes[index].name;
  content = notes[index].body;
  idcolorBox = notes[index].boxColor;
  let titlemsg = 'Edit Your Message';

  removeChildrenModalForm();
  addChildrenModalForm(titlemsg, subject, content);
  addChildrenModalFormEditionButton();
}

function editNote() {
  let indexEditNote;
  notes[index].name = document.getElementById("validationCustom01").value;
  notes[index].body = document.getElementById("messageText").value;
  notes[index].boxColor = idcolorBox;
  indexEditNote = index;
  bigNoteContent();
  verticalMenuNotes();
  index = indexEditNote;
  includeActive(index);
  $('#formModal').modal('hide');
}

function removeChildrenModalForm() {
  $('.titleEdition').children().remove();
  $('.subjectEdition').children().remove();
  $('.contentEdition').children().remove();
  $('.buttonEdition').children().remove();
  $('.colorBoxEdition').children().remove();
}

function addChildrenModalForm(titlemsg, subject, content) {
  $('.titleEdition').append(
    `<h5 class="modal-title" id="formModalLabel">${titlemsg}</h5>`+
    `<button type="button" class="close" data-dismiss="modal" aria-label="Close">`+
      `<span aria-hidden="true">&times;</span>`+
    `</button>`
  );
  $('.subjectEdition').append(
    `<label for="validationCustom01" class="col-form-label">Subject</label>`+
    `<input type="text" class="form-control" id="validationCustom01" value="${subject}" required>`+
    `<div class="invalid-feedback">Please write a subject.</div>`
  );
  $('.contentEdition').append(
    `<label for="messageText" class="col-form-label">Content</label>`+
    `<textarea class="form-control" id="messageText" required>${content}</textarea>`+
    `<div class="invalid-feedback">Please write a content.</div>`
  );
  $('.colorBoxEdition').append(
    `<h6>Pick a Color for Your message</h6>`+
    `<button type="button" class="btn btn-primary btn-sm mr-1" id="bg-primary" href="#" onclick="clickboxColorNote(this.id)">Blue</button>`+
    `<button type="button" class="btn btn-secondary btn-sm mr-1" id="bg-secondary" href="#" onclick="clickboxColorNote(this.id)">Grey</button>`+
    `<button type="button" class="btn btn-success btn-sm mr-1" id="bg-success" href="#" onclick="clickboxColorNote(this.id)">Green</button>`+
    `<button type="button" class="btn btn-danger btn-sm mr-1" id="bg-danger" href="#" onclick="clickboxColorNote(this.id)">Red</button>`+
    `<button type="button" class="btn btn-warning btn-sm mr-1" id="bg-warning" href="#" onclick="clickboxColorNote(this.id)">Yellow</button>`+
    `<button type="button" class="btn btn-info btn-sm mr-1" id="bg-info" href="#" onclick="clickboxColorNote(this.id)">Pelorous</button>`+
    `<button type="button" class="btn btn-dark btn-sm mr-1" id="bg-dark" href="#" onclick="clickboxColorNote(this.id)">Black</button>`
  );
}

(function() {
  'use strict';
  window.addEventListener('load', function() {
    var forms = document.getElementsByClassName('needs-validation');
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          if ( editionOrAditionFlag === 1 ){
            addNote();
          } else if ( editionOrAditionFlag === 2 ){
            editNote();
          }
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();


function addChildrenModalFormEditionButton() {
  $('.buttonEdition').append(
    `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`+
    `<button type="submit" class="btn btn-primary">Edit</button>`
  );
}


function clickAditionNotes() {
  document.getElementById("editionAditionForm").classList.remove("was-validated");
  editionOrAditionFlag = 1;
  subject="";
  content="";
  let titlemsg = 'Add Your Message';
  idcolorBox="bg-dark";

  removeChildrenModalForm();
  addChildrenModalForm(titlemsg, subject, content);
  addChildrenModalFormAditionButton();
}

function addChildrenModalFormAditionButton() {
  $('.buttonEdition').append(
    `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`+
    `<button type="submit" class="btn btn-primary">Add</button>`
  );
}

function addNote() {
  idcolorBox = (typeof idcolorBox === "undefined" ? 'bg-dark' : idcolorBox);
  notes.push({name: document.getElementById("validationCustom01").value, body: document.getElementById("messageText").value, boxColor: idcolorBox });
  verticalMenuNotes();
  bigNoteContent();
  includeActive(index);
  $('#formModal').modal('hide');
}

function deleteNote() {
  if (index > 0){
    let indexEditNote;
    notes.splice(index, 1);
    index >= notes.length ? indexEditNote = index -1:indexEditNote = index;
    index = indexEditNote;
    bigNoteContent();
    verticalMenuNotes();
    includeActive(index);
  }
  else if (index === 0) {
    notes.splice(index, 1);
    verticalMenuNotes();
    bigNoteContent();
    if (notes.length > 0) {
      includeActive(index);
    }
  }
  $('#alertDeleteModal').modal('hide');
}

function clickboxColorNote(idName) {
  idcolorBox = idName;
  bigNoteContent();
}

function clickDropDownBoxColorNote(idName) {
  notes[index].boxColor = idName;
  bigNoteContent();
}
