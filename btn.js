export let cursorToggle = false;

const toggleCursor = () => {
  cursorToggle = !cursorToggle;

  if (cursorToggle) {
    document.body.classList.add("crosshair");
  } else {
    document.body.classList.remove("crosshair");
  }
};

document.getElementById("rollImplicit-btn").addEventListener("click", () => {
  if (!cursorToggle) {
    toggleCursor();
  }
});

document.addEventListener("click", (event) => {
  if (event.target.id !== "rollImplicit-btn" && cursorToggle) {
    toggleCursor();
  }
});
