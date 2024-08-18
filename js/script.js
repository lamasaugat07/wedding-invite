// OffCanvas
const offCanvas = document.querySelector(".offcanvas");
const stickyTop = document.querySelector(".sticky-top");

offCanvas.addEventListener("show.bs.offcanvas", function () {
  stickyTop.style.overflow = "visible";
});

offCanvas.addEventListener("hidden.bs.offcanvas", function () {
  stickyTop.style.overflow = "hidden";
});

function showCustomAlert(message) {
  var modal = document.getElementById("customAlert");
  var messageElem = document.getElementById("alertMessage");
  var closeBtn = document.getElementsByClassName("close-btn")[0];
  var okBtn = document.getElementById("alertOkBtn");

  messageElem.textContent = message;
  modal.style.display = "block";

  closeBtn.onclick = function() {
    modal.style.display = "none";
  }

  okBtn.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

// Confirmation Form
window.addEventListener("load", function () {
  const form = document.getElementById("confirmation-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    
    const data = new FormData(form);
    var jsonData = {};
    var name = document.getElementById('name').value.trim();
    var attend = document.getElementById('attend').value;
    var status = document.getElementById('status').value;

    if (name === "" || attend === "" || status === "Choose one") {
      showCustomAlert("Please fill out all fields before submitting.");
    } else {
      data.forEach((value, key) => jsonData[key] = value);
      const action = 'https://script.google.com/macros/s/AKfycbzyJvd38PR3ywm0KiYr55LmafqcRlX7nJID8UQFHxpohVfx5dLzaPeR2OkeHmn8oJ4/exec';
      fetch(action, {
        method: "POST",
        body: JSON.stringify(jsonData),  
      }).then(response => {
        showCustomAlert("RSVP submitted successfully!");
      }).catch(error => {
        showCustomAlert("There was an error submitting your RSVP.");
      });
    }
    
  });
});
