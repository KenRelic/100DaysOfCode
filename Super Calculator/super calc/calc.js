let direction_pad = document.getElementById("direction-pad");
let calc_direction_pad = direction_pad;
let inner_pad = document.querySelector("#direction-pad > div");
direction_pad = Array.from(direction_pad.children);

direction_pad.forEach(direction => {
  direction.addEventListener("click", () => {
    // console.log(direction.id);
    switch (direction.id) {
      case "up-btn":
        calc_direction_pad.style.boxShadow = "0 3px 0 1px #2f2f2f";
        inner_pad.style.boxShadow =
          "inset 0 2px 0 2px #1f1f1f, 0 0 20px 1px black";
        setTimeout(() => {
          calc_direction_pad.style.boxShadow = "";
          inner_pad.style.boxShadow = "0 0 20px 1px black";
        }, 300);
        break;
      case "right-btn":
        calc_direction_pad.style.boxShadow = "-3px 0 0 1px #2f2f2f";
        inner_pad.style.boxShadow =
          "inset -2px 0 0 2px #1f1f1f, 0 0 20px 1px black";
        setTimeout(() => {
          calc_direction_pad.style.boxShadow = "";
          inner_pad.style.boxShadow = "0 0 20px 1px black";
        }, 300);
        break;
      case "down-btn":
        calc_direction_pad.style.boxShadow = "0 -3px 0 1px #2f2f2f";
        inner_pad.style.boxShadow =
          "inset 0 -2px 0 2px #1f1f1f, 0 0 20px 1px black";
        setTimeout(() => {
          calc_direction_pad.style.boxShadow = "";
          inner_pad.style.boxShadow = "0 0 20px 1px black";
        }, 300);
        break;
      case "left-btn":
        calc_direction_pad.style.boxShadow = "3px 0 0 1px #2f2f2f";
        inner_pad.style.boxShadow =
          "inset 2px 0 0 2px #1f1f1f, 0 0 20px 1px black";
        setTimeout(() => {
          calc_direction_pad.style.boxShadow = "";
          inner_pad.style.boxShadow = "0 0 20px 1px black";
        }, 300);
        break;
      default:
        break;
    }
  });
});

//BUTTONS ON CLICK ANIMATION//
let keys = document.querySelectorAll(".key");
keys = Array.from(keys);

keys.forEach(key => button_effect(key));

function button_effect(e) {
  e.addEventListener("click", () => {
    e.style.animation = "button 0.3s linear running infinite";
    setTimeout(() => {
      e.style.animationPlayState = "paused";
    }, 300);
  });
}

//POWER BUTTON CODE//
//turns on if on and turns off is on
//clear everything on the screen and reset the mode to NUM
//change the screen color to dark grey.

//set the power state to OFF on load.
window.onload = function() {
  let localStorage = window.localStorage;
  localStorage.setItem("power_state", "OFF");

  //set screen default values to off.
  screenVariables().get_input_area().innerHTML = "";
  screenVariables().get_result_area().style.visibility = "hidden";
  screenVariables().get_calc_screen().style.backgroundColor = "#333";
  screenVariables().get_calc_screen().style.boxShadow =
    "inset 0 2px 10px 1px #111";
  screenVariables().get_top_screen().style.visibility = "hidden";
  screenVariables().get_cursor().style.visibility = "hidden";

  //listen for keypress and pass it into the input area//
  key_press_active();
  mode_switch();
};

//add a power toggle event to the power btn
const power_btn = document.getElementById("power-btn");

power_btn.addEventListener("click", () => {
  localStorage.power_state = localStorage.power_state == "OFF" ? "ON" : "OFF";
  let state_data = { ON: ["visible", "aqua"], OFF: ["hidden", "#333"] };

  screenVariables().get_input_area().innerHTML = "";
  screenVariables().get_result_area().style.visibility = "hidden";
  screenVariables().get_calc_screen().style.backgroundColor =
    state_data[localStorage.power_state][1];
  screenVariables().get_top_screen().style.visibility =
    state_data[localStorage.power_state][0];
  screenVariables().get_cursor().style.visibility =
    state_data[localStorage.power_state][0];
});

//SCREEN VARIABLES //
function screenVariables() {
  let input_area = document.getElementById("input-area");
  let result_area = document.getElementById("result");
  let calc_screen = document.getElementById("screen");
  let top_screen_area = document.getElementById("top-screen");
  let cursor = document.getElementById("blinking-cursor");
  let conversion_mode = document.getElementById("coversion-mode");
  let calc_mode = document.getElementById("calc-mode");

  return {
    get_input_area: () => {
      return input_area;
    },
    get_result_area: () => {
      return result_area;
    },
    get_calc_screen: () => {
      return calc_screen;
    },
    get_top_screen: () => {
      return top_screen_area;
    },
    get_cursor: () => {
      return cursor;
    },
    get_conv_mode: () => {
      return conversion_mode;
    },
    get_calc_mode: () => {
      return calc_mode;
    }
  };
}

//COLOR MODES CODE///////
//get the root element and pass the values for the selected mode
// default mode is dark-mode.. on click of the color-mode btn
//the id is checked for the previous and pushes the data of the other then
//they are pushed into the css
let current_color_mode = "dark";
let color_mode_props = [
  "--bg-color",
  "--calc-body-color",
  "--text-color-keys",
  "--screen-color",
  "--screen-box-shadow",
  "--button-color",
  "--mode-label-color"
];
let color_modes_data = {
  dark: [
    "#000",
    "linear-gradient(180deg, #0e0e0e, #333333)",
    "#000",
    "aqua",
    " inset 0 2px 10px 1px #018874",
    "#fff",
    "#1b1b1b"
  ],
  light: [
    "#fff",
    "linear-gradient(180deg, #999, #ccc)",
    "#fff",
    "#fff",
    " inset 0 2px 10px 1px #222",
    "#000",
    "#aaa9a9"
  ]
};
const color_mode_toggle_btn = document.getElementById("color-mode");
color_mode_toggle_btn.addEventListener("click", () => {
  current_color_mode = current_color_mode == "dark" ? "light" : "dark";
  let i;
  for (i = 0; i < color_mode_props.length; i += 1) {
    document.documentElement.style.setProperty(
      `${color_mode_props[i]}`,
      color_modes_data[current_color_mode][i]
    );
  }
});

function key_press_active() {
  let button = document.getElementById("other-keys");
  button.onclick = function(event) {
    let el = event.target;
    // console.log(localStorage.power_state);
    if (localStorage.power_state == "ON") {
      // console.log(el.dataset.value);
      if (el.dataset.value) {
        if (el.dataset.value == "Backspace") erase_input();
        else if (el.dataset.value == "equal") {
        } else {
          screenVariables().get_input_area().innerHTML += el.dataset.value;
        }
      }
    }
  };
}

//CLEAR TEXT ON CLICK OF BACKSPACE BUTTON
// ON click of the button, the last innerHTML is removed and put back

function erase_input() {
  let displayed_text = screenVariables().get_input_area().innerHTML;
  return (screenVariables().get_input_area().innerHTML = displayed_text.slice(
    0,
    displayed_text.length - 1
  ));
}

//CLEAR EVERYTHING BUTTON CODE
//Clears  all input data and any previous result still displayed
let clear_all_btn = document.getElementById("cancel");
clear_all_btn.addEventListener("click", clear_all);
function clear_all() {
  screenVariables().get_input_area().innerHTML = "";
  screenVariables().get_result_area().innerHTML = "";
}

//Display calculation mode//
function mode_switch() {
  let conv_units = ["length", "mass", "volume", "energy", "area"];
  let count = 0;
  let mode_area = document.getElementById("modes");
  mode_area.addEventListener("click", click_check);
  function click_check(event) {
    let el = event.target;
    if (localStorage.power_state == "ON") {
      if (el.dataset.value) {
        screenVariables().get_calc_mode().innerHTML = el.dataset.value;
        if (el.dataset.value == "conv") {
          screenVariables().get_conv_mode().innerHTML = conv_units[count];
          screenVariables().get_conv_mode().style.visibility = "visible";
          count === conv_units.length - 1 ? (count = 0) : (count += 1);
        } else {
          count = 0;
          screenVariables().get_conv_mode().style.visibility = "hidden";
        }
      }
    }
  }
}

//clear recent input
let clear_btn = document.getElementById("clear-recent-input");
clear_btn.addEventListener("click", clear);
function clear() {
  let operators = ["-", "+", "/", "×", "(", ")"];
  let inputed_data = screenVariables().get_input_area().innerHTML;
  let last_operator;

  last_operator = operators.reduce((last, op) => {
    return (last =
      inputed_data.lastIndexOf(last) > inputed_data.lastIndexOf(op)
        ? last
        : op);
  });
  if (inputed_data.lastIndexOf(last_operator) !== -1) {
    let start_index = inputed_data.lastIndexOf(last_operator);
    return (screenVariables().get_input_area().innerHTML = inputed_data.slice(
      0,
      start_index + 1
    ));
  }
}

