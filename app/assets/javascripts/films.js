// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
window.onload = function() {
  initialLoadFav();
  handleClick();
  customModalAlert();
};

function initialLoadFav() {
  let favourite_films = getStorage();
  const table_rows = document.querySelector("table").rows;
  for (let i = 0; i < table_rows.length; i++) {
    let title = formatCell(table_rows[i].cells[0].outerHTML);
    if (favourite_films.includes(title)) {
      let button = table_rows[i].cells[4].childNodes[0];
      let preference = "Favourite";
      button.innerText = "Unfavourite";
      button.style.backgroundColor = "#b92f2f";
      moveRow(table_rows[i], preference);
    }
  }
}

function customModalAlert() {
  let modal = document.querySelector(".modal");
  function toggleModal(e) {
    if (modal.style.display === "none") {
      modal.style.display = "block";
      dynamicModalText();
      modal.addEventListener("click", toggleModal);
    } else {
      modal.style.display = "none";
      removeModalText();
      modal.removeEventListener("click", toggleModal);
    }
  }
  document.addEventListener("click", function(e) {
    if (e.target.innerHTML === "Unfavourite") {
      e.path[0].addEventListener("click", toggleModal(e));
    }
  });
}

function dynamicModalText() {
  let table_rows = document.querySelector("table").rows;
  let title = formatCell(table_rows[1].cells[1].outerHTML);
  let p = document.createElement("P");
  p.innerText = ` ✅ Added ${title} to Favourites`;
  document.querySelector(".modal_content").appendChild(p);
  p.setAttribute("id", "title");
}
function removeModalText() {
  let title = document.getElementById("title");
  title.parentNode.removeChild(title);
}

const handleClick = () => {
  document.addEventListener("click", function(e) {
    const { className, innerHTML, style } = e.target;
    const red = "#b92f2f";
    const green = "#4caf50";
    let favourite_films = getStorage();
    if (className === "favourite") {
      let row = e.path[2];
      let title = formatCell(row.cells[0].outerHTML);
      let preference = innerHTML;
      if (innerHTML === "Favourite") {
        style.backgroundColor = red;
        e.target.innerHTML = "Unfavourite";
      } else {
        style.backgroundColor = green;
        e.target.innerHTML = "Favourite";
      }
      favourite(row, favourite_films, title, preference);
    } else if (className === "cell") {
      changeRoute(formatCell(e.path[1].cells[0].outerHTML));
    }
  });
};

//handle row movement and local storage
function favourite(row, favourite_films, title, preference) {
  moveRow(row, preference);
  if (preference === "Favourite") {
    favourite_films.push(title);
    return localStorage.setItem(
      "favourite_films",
      JSON.stringify(favourite_films)
    );
  }
  let index = favourite_films.indexOf(title);
  favourite_films.splice(index, 1);
  localStorage.setItem("favourite_films", JSON.stringify(favourite_films));
}

//If row is favourited move to top of list, when unfavourited move to bottom
function moveRow(row, preference) {
  let table_body = document.querySelector("table");
  if (preference === "Favourite") {
    row.parentNode.removeChild(row);
    return table.insertBefore(row, table.childNodes[1]);
  }
  row.parentNode.removeChild(row);
  table.appendChild(row);
}

//Regex to remove HTML tags from cell content
function formatCell(cell) {
  return cell.replace(/<[^>]*>/g, "");
}

function getStorage() {
  return JSON.parse(localStorage.getItem("favourite_films")) || [];
}

function changeRoute(id) {
  let num;
  if (+id <= 3) {
    num = 3;
  } else if (+id > 3 && +id < 7) {
    num = -3;
  } else {
    num = 0;
  }
  window.location = `/films/${+id + num}`;
}
