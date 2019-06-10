// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
document.addEventListener("turbolinks:load", () => {
  initialLoadFav();
  sortTable();
  rowStripe();
});

function initialLoadFav() {
  const table_rows = document.querySelector("table").rows;
  if (table_rows[0].cells[4]) {
    let favourite_films = getStorage();
    for (let i = 0; i < table_rows.length; i++) {
      let title = table_rows[i].cells[1].textContent;
      if (favourite_films.includes(title)) {
        let button = table_rows[i].cells[4].childNodes[0];
        let preference = "Favourite";
        button.innerText = "Unfavourite";
        button.style.backgroundColor = "#b92f2f";
        moveRow(table_rows[i], preference);
      }
    }
  }
}

(function handleClick() {
  document.addEventListener("click", function(e) {
    const { className, innerHTML, style, id } = e.target;
    const red = "#b92f2f";
    const green = "#4caf50";
    let favourite_films = getStorage();
    if (className === "favourite") {
      let row = e.path[2];
      let title = row.cells[1].textContent;
      let preference = innerHTML;
      if (preference === "Favourite") {
        style.backgroundColor = red;
        e.target.innerHTML = "Unfavourite";
      } else {
        style.backgroundColor = green;
        e.target.innerHTML = "Favourite";
      }
      favourite(row, favourite_films, title, preference);
    } else if (className === "cell") {
      changeRoute(e.path[1].cells[0].textContent);
    } else if (id === "search") {
      handleSearch();
    }
  });
})();
//handle row movement and local storage
function favourite(row, favourite_films, title, preference) {
  moveRow(row, preference);
  if (preference === "Favourite") {
    toggleModal();
    favourite_films.push(title);
    return localStorage.setItem(
      "favourite_films",
      JSON.stringify(favourite_films)
    );
  }
  let index = favourite_films.indexOf(title);
  favourite_films.splice(index, 1);
  localStorage.setItem("favourite_films", JSON.stringify(favourite_films));
  sortTable();
  rowStripe();
}

//If row is favourited move to top of list, when unfavourited move to bottom
function moveRow(row, preference) {
  if (preference === "Favourite") {
    row.parentNode.removeChild(row);
    return table.insertBefore(row, table.childNodes[1]);
  }
  row.parentNode.removeChild(row);
  table.appendChild(row);
}

function rowStripe() {
  rows = document.querySelector("table").rows;
  for (let i = 0; i < rows.length; i += 2) {
    rows[i].style.background = "#2c2c2c";
    rows[i + 1].style.background = "#000000";
  }
}

function handleSearch() {
  search = document.getElementById("search");
  table = document.querySelector("table");
  table_rows = table.rows;
  search.addEventListener("keyup", function(e) {
    for (let i = 1; i < table_rows.length; i++) {
      title = table_rows[i].cells[1].textContent.toUpperCase();
      value = e.path[0].value.toUpperCase();
      if (title.includes(value)) {
        table_rows[i].style.display = "";
      } else {
        table_rows[i].style.display = "none";
      }
    }
  });
}

function toggleModal(e) {
  let modal = document.querySelector(".modal");
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
function dynamicModalText() {
  let table_rows = document.querySelector("table").rows;
  let title = table_rows[1].cells[1].textContent;
  let p = document.createElement("P");
  p.innerText = ` ✅ Added ${title} to Favourites`;
  document.querySelector(".modal_content").appendChild(p);
  p.setAttribute("id", "title");
}
function removeModalText() {
  let title = document.getElementById("title");
  title.parentNode.removeChild(title);
}

function getStorage() {
  return JSON.parse(localStorage.getItem("favourite_films")) || [];
}

function changeRoute(id) {
  let num;
  id = +id;
  if (id <= 3) {
    num = 3;
  } else if (id > 3 && id < 7) {
    num = -3;
  } else {
    num = 0;
  }
  window.location = `/films/${id + num}`;
}

function sortTable() {
  const table = document.querySelector("#table");
  if (table) {
    let rows, switching, i, shouldSwitch;
    switching = true;
    rows = table.rows;
    while (switching) {
      switching = false;
      for (i = 1; i < rows.length - 1; i++) {
        shouldSwitch = false;
        episode_num = rows[i].cells[0].innerText;
        next_episode_num = rows[i + 1].cells[0].innerText;
        preference = rows[i].cells[4].innerText;
        if (episode_num > next_episode_num && preference === "Favourite") {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }
}
