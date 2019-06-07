// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
window.onload = function() {
  handleFavouriteClick();
};

const handleFavouriteClick = () => {
  document.addEventListener("click", function(e) {
    const { className, innerText } = e.target;
    const red = "#b92f2f";
    const green = "#4caf50";
    if (className === "favourite" && innerText === "Favourite") {
      e.target.style.backgroundColor = red;
      e.target.innerHTML = "Unfavourite";
      moveToTop(e.path[2]);
    } else if (className === "favourite") {
      e.target.style.backgroundColor = green;
      e.target.innerHTML = "Favourite";
      moveToBottom(e.path[2]);
    }
  });
};

function moveToTop(row) {
  let table_body = document.querySelector("table");
  row.parentNode.removeChild(row);
  table.insertBefore(row, table.childNodes[1]);
}

function moveToBottom(row) {
  let table_body = document.querySelector("table");
  row.parentNode.removeChild(row);
  table.appendChild(row);
}
