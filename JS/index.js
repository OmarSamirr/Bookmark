var siteNameInput = document.getElementById("siteName");
var siteLinkInput = document.getElementById("siteLink");
var bookmarksList = [];

if (localStorage.getItem("data") != null) {
  bookmarksList = JSON.parse(localStorage.getItem("data"));
  displayData();
}

function addBookmark() {
  if (validate(siteNameInput) && validate(siteLinkInput)) {
    var newBookmark = {
      name: siteNameInput.value,
      link: siteLinkInput.value,
    };
    if (!newBookmark.link.includes("https://")) {
      newBookmark.link = `https://${newBookmark.link}`
    }

    bookmarksList.push(newBookmark);
    displayData();
    clearInputs();
    localStorage.setItem("data", JSON.stringify(bookmarksList));
  } else {
    showPopup();
  }
}
function clearInputs() {
  siteNameInput.value = "";
  siteLinkInput.value = "";
  siteNameInput.classList.remove("is-valid");
  siteLinkInput.classList.remove("is-valid");
}
function displayData() {
  var cartona = "";
  for (var i = 0; i < bookmarksList.length; i++) {
    cartona += `
        <tr>
              <td>${i + 1}</td>
              <td>${bookmarksList[i].name}</td>
              <td><a target="_blank" href="${
                bookmarksList[i].link
              }"><button class="p-2 btn visit"><i class="fa-solid fa-eye"></i> Visit</button></a></td>
              <td><button onclick="deleteItem(${i})" class="p-2 btn delete"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
            </tr>
        `;
  }
  document.getElementById("tableData").innerHTML = cartona;
}
function deleteItem(index) {
  bookmarksList.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(bookmarksList));
  displayData();
}
function validate(element) {
  var text = element.value;
  var regex = {
    siteName: /\w{3,}/,
    siteLink:
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
  };

  if (regex[element.id].test(text)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}
function removePopup() {
  document.getElementById("popup").classList.add("d-none");
  document.getElementById("popup").classList.remove("d-flex");
}
function showPopup() {
  document.getElementById("popup").classList.remove("d-none");
  document.getElementById("popup").classList.add("d-flex");
}
