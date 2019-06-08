// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
window.onload = function() {
  initialLoadFav();
  handleFavouriteClick();
};

function initialLoadFav() {
  let favourite_films = getStorage();
  const table_rows = document.querySelector("table").rows;
  for (let i = 0; i < table_rows.length; i++) {
    let title = formatCell(table_rows[i].cells[0].outerHTML);
    if (favourite_films.includes(title)) {
      let button = table_rows[i].cells[3].childNodes[0];
      preference = "Favourite";
      button.innerText = "Unfavourite";
      button.style.backgroundColor = "#b92f2f";
      moveRow(table_rows[i], preference);
    }
  }
}

const handleFavouriteClick = () => {
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
