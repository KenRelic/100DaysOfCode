let direction_pad = document.getElementById("direction-pad");
let calc_direction_pad = direction_pad;
let inner_pad = document.querySelector("#direction-pad > div");
direction_pad = Array.from(direction_pad.children);

direction_pad.forEach(direction => {
  direction.addEventListener("click", () => {
    console.log(direction.id);
    switch (direction.id) {
      case "up-btn":
        calc_direction_pad.style.boxShadow = "0 3px 0 1px #2f2f2f";
        inner_pad.style.boxShadow = "inset 0 -2px 0 2px #1f1f1f, 0 0 20px 1px black;";
        break;
      case "right-btn":
        calc_direction_pad.style.boxShadow = "-3px 0 0 1px #2f2f2f";
        inner_pad.style.boxShadow = "inset 2px 0 0 2px #1f1f1f, 0 0 20px 1px black;";
        break;
      case "down-btn":
        calc_direction_pad.style.boxShadow = "0 -3px 0 1px #2f2f2f";
        inner_pad.style.boxShadow = "inset 0 2px 0 2px #1f1f1f, 0 0 20px 1px black;";
        break;
      case "left-btn":
        calc_direction_pad.style.boxShadow = "3px 0 0 1px #2f2f2f";
        inner_pad.style.boxShadow = "inset -2px 0 0 2px #1f1f1f, 0 0 20px 1px black;";
        break;
      default:
        break;
    }
  });
});
