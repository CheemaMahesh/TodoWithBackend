var selectElement = document.getElementById("options");
var buttonElement = document.querySelector(".cat-btn");

selectElement.addEventListener("change", function() {
  var selectedOption = selectElement.value;
  console.log("Selected option: " + selectedOption);

  if (selectedOption === "Work") {
    buttonElement.style.backgroundColor = "red";
  } else {
    buttonElement.style.backgroundColor = "pink";
  }
});