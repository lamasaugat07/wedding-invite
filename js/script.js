// OffCanvas
const offCanvas = document.querySelector(".offcanvas");
const stickyTop = document.querySelector(".sticky-top");

offCanvas.addEventListener("show.bs.offcanvas", function () {
  stickyTop.style.overflow = "visible";
});

offCanvas.addEventListener("hidden.bs.offcanvas", function () {
  stickyTop.style.overflow = "hidden";
});

document.getElementById('name').onchange = function(){
  if (this.value.trim() == "") {
    this.classList.remove('valid');
    this.classList.add('invalid');
  } else {
    this.classList.remove('invalid');
    this.classList.add('valid');
  }
}

document.getElementById('email').onchange = function(){
  var validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (this.value.trim().toLowerCase() == "" || !this.value.trim().toLowerCase().match(validEmailRegex)) {
    this.classList.remove('valid');
    this.classList.add('invalid');
  } else {
    this.classList.remove('invalid');
    this.classList.add('valid');
  }
}

document.getElementById('status').onchange = function(){
  if (this.value === "Choose one") {
    this.classList.remove('valid');
    this.classList.add('invalid');
  } else {
    this.classList.remove('invalid');
    this.classList.add('valid');
  }
}

document.getElementById('attend').onchange = function(){
  if (this.value === "" || this.value < 0) {
    this.classList.remove('valid');
    this.classList.add('invalid');
  } else {
    this.classList.remove('invalid');
    this.classList.add('valid');
  }
}

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
    var validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim().toLowerCase();
    var attend = document.getElementById('attend').value;
    var status = document.getElementById('status').value;

    if (name === "" || email == "" || !email.match(validEmailRegex) || attend === "" || status === "Choose one") {
      showCustomAlert("Please fill out all fields before submitting.");
    } else {
      data.forEach((value, key) => jsonData[key] = value);
      const action = 'https://script.google.com/macros/s/AKfycbw70phajQ7vX8cfkL1BPu97PbYv4hK86leWv5AGHUznDEG1rqUp3SzieRqX8m74BhB3/exec';
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
