const dialog = document.getElementsByTagName("dialog")[0];

dialog.addEventListener("click", (event) => {
  if (event.target?.nodeName === "DIALOG") {
    dialog.close();
  }
});
