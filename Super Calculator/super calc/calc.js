//NUMBER METHOD TO CHECK NEGATIVE NUMBERS//
Number.prototype.isNegative = e => (/^\-/).test(e.toString());

let direction_pad = document.getElementById("direction-pad");
let calc_direction_pad = direction_pad;
let inner_pad = document.querySelector("#direction-pad > div");
direction_pad = Array.from(direction_pad.children);
let date_conv_interval = undefined;

direction_pad.forEach(direction => {
  direction.addEventListener("click", () => {
    // this code is responisble for the display of the shadow from each direction
    //button pressed on the direction keypad.//
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
    if (e.innerHTML !== '=' && e.id !== "color-mode") {
    window.clearInterval(date_conv_interval);
  }
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
window.onload = function () {
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
  screenVariables().get_result_area().style.visibility = "visible";
  screenVariables().get_result_area().innerHTML = 0;
  screenVariables().get_calc_screen().style.backgroundColor =
    state_data[localStorage.power_state][1];
  screenVariables().get_top_screen().style.visibility =
    state_data[localStorage.power_state][0];
  screenVariables().get_cursor().style.visibility =
    state_data[localStorage.power_state][0];
  screenVariables().get_result_area().style.visibility =
    state_data[localStorage.power_state][0];

  if (localStorage.power_state == 'OFF') {
    screenVariables().get_conv_mode().style.visibility = 'hidden';
    screenVariables().get_calc_mode().innerHTML = 'num';

  }
  window.clearInterval(date_conv_interval);
});

//SCREEN VARIABLES //
function screenVariables() {
  let input_area = document.getElementById("input-area");
  let result_area = document.querySelector("#result>p");
  let calc_screen = document.getElementById("screen");
  let top_screen_area = document.getElementById("top-screen");
  let cursor = document.getElementById("blinking-cursor");
  let conversion_mode = document.getElementById("conversion-mode");
  let calc_mode = document.getElementById("calc-mode");

  return {
    get_input_area: () => input_area,
    get_result_area: () => result_area,
    get_calc_screen: () => calc_screen,
    get_top_screen: () => top_screen_area,
    get_cursor: () => cursor,
    get_conv_mode: () => conversion_mode,
    get_calc_mode: () => calc_mode
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
  button.onclick = function (event) {
    let el = event.target;
    if (localStorage.power_state == "ON") {
      if (el.dataset.value) {
        if (el.dataset.value == "Backspace") erase_input();
        else if (el.dataset.value == "equal") {
        } else {
          screenVariables().get_input_area().innerHTML += el.dataset.value;
          input_handler().set_input(el.dataset.value);
        }
      }
    }
  };
}

function batteryStatus() {
  let battery = document.getElementById('battery-level').children;
  battery = Array.from(battery);
  battery.reverse();

  if (window.navigator.getBattery()) {
    setInterval(() => {
      let battery_level;
      window.navigator.getBattery().then(function (battery) {
        battery_level = battery.level * 100;
      })
      //set timeout because the promise delays its return of the new battery level..
      setTimeout(() => {
        let num_of_full_bars = parseInt(battery_level / 20);
        let remnant_bar = (battery_level % 20) * 5;
        for (let i = 0; i < num_of_full_bars; i += 1) {
          battery[i].style = 'background:linear-gradient( 270deg,rgb(62, 255, 156) 100%, rgb(35, 46, 40) 0%)';
        }
        remnant_bar == 0 ? ''
          : battery[num_of_full_bars].style = ` background:linear-gradient( 270deg,rgb(62, 255, 156) ${remnant_bar}%, rgb(35, 46, 40) ${remnant_bar}%)`
      }, 1000)
    }, 1000)


  } else {
    battery.forEach(el => el.style = 'background:linear-gradient( 270deg,rgb(62, 255, 156) 100%, rgb(35, 46, 40) 0%)')
  }
}

batteryStatus()

function input_handler() {
  let inputed_data;

  return {
    set_input: (input) => { inputed_data = input },
    get_input: () => inputed_data
  };
}

String.prototype.entitify = function (input) {
  let entities = {
    log: "Math.log",
    sin: "Math.sin",
    cos: "Math.cos",
    tan: "Math.tan",
    π: "Math.PI",
    "√": "Math.sqrt",
    "∛": "**(1/3)",
    // "n√": `**${1 / number}`,
    // "^": `**${number}`
  };
  return entities[input];
};
//CLEAR TEXT ON CLICK OF BACKSPACE BUTTON
// ON click of the button, the last innerHTML is removed and put back

function erase_input() {
  let displayed_text = screenVariables().get_input_area().innerHTML;
  let units = [
    "cos",
    "tan",
    "sin",
    "log",
    "µs",
    "ms",
    "min",
    "hr",
    "wk",
    "day",
    "mth",
    "yr",
    "dec",
    "cen",
    "now",
    "mm",
    "km",
    "cm",
    "mile",
    "ft",
    "yrd",
    "in",
    "nm",
    "nmi",
    "hm",
    "µm"
  ];
  let i;

  for (i = 0; i < units.length; i += 1) {
    if (displayed_text.endsWith(units[i])) {
      return (screenVariables().get_input_area().innerHTML = displayed_text.slice(
        0,
        displayed_text.length - units[i].length
      ));
    }
  }
  if (screenVariables().get_input_area().innerHTML.endsWith('>')) {
    return (screenVariables().get_input_area()).removeChild((screenVariables().get_input_area()).lastElementChild);
  }

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
  screenVariables().get_result_area().innerHTML = "0";
}

//Display calculation mode//
function mode_switch() {
  let conv_units = ["length", "time", "mass", "energy", "temp", "area"];
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
    } else {
      screenVariables().get_conv_mode().style.visibility = 'hidden';
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

//CALCULATE PROBLEM CODE
let equal_btn = document.getElementById("equals-btn");
let arranged_data;

function arithmetic_calc() {
  let calc_mode = document.getElementById("calc-mode").innerHTML;
  let conv_mode = document.getElementById("conversion-mode").innerHTML;
  let output = screenVariables().get_result_area();
  // let inputed_data = eval(screenVariables().get_input_area().innerHTML);

  // arranged_data += eval(inputed_data);

  let modes = {
    num: () => {
      // output.innerHTML = inputed_data;
    }
  };
  return modes[calc_mode]();
}

//NUMBERS PARSE FUNCTION 
//Changes every string to number or math object.

/// Numbr base code

function date_conversion() {
  try {
    let input = (screenVariables().get_input_area().innerHTML).replace(/\s/g, '');
    let output = screenVariables().get_result_area();
    let result;
    let date_data = input.match(/[0-9]+/g);
    let conv_sign_idx = input.indexOf(input.match(/\→/g)[0]);
    let output_format = 'yr';
    let from_date;
    let to_date;
    let year, month, week, day, hour, min, sec;
    let formats = {
      cen: 3.154e+12,
      dec: 3.154e+11,
      yr: 31536000000,
      mth: 2.628e+9,
      wk: 6.048e+8,
      day: 8.64e+7,
      hr: 3.6e+6,
      min: 60000,
      s: 1000,
      µs: 0.001
    }
    let values = Object.values(formats);
    let keys = Object.keys(formats);
    if (input.slice(0, conv_sign_idx) == 'now') {
      from_date = new Date().getTime();
      to_date = new Date(`${date_data[1]}-${date_data[0]}-${date_data[2]}`).getTime();
    } else if (input.slice(conv_sign_idx + 1, conv_sign_idx + 4) == 'now') {
      to_date = new Date().getTime();
      from_date = new Date(`${date_data[1]}-${date_data[0]}-${date_data[2]}`).getTime();
    } else {
      from_date = new Date(`${date_data[1]}-${date_data[0]}-${date_data[2]}`);
      to_date = new Date(`${date_data[4]}-${date_data[3]}-${date_data[5]}`);
    }
    result = to_date - from_date;

    //check if result is a negative value// then insert ago after the output// 
    let is_to_date_passed;
    if (Number.prototype.isNegative(result)) {
      result = -(result);
      is_to_date_passed = true;
    }

    if (input.match(/\→/g).length == 2) {
      output_format = input.match(/[a-z]+$/gi)[0];
      let idx = keys.indexOf(output_format);
      let close_result_format = values[idx + 1];
      let close_result_output;
      close_result_format = ((result % formats[output_format]) / formats[close_result_format]);

      if (close_result_format >= 1) {
        close_result_output = keys[idx + 1];
      } else {
        close_result_output = '';
      }

      result /= formats[output_format];
      if (result / formats[output_format] < 1) {
        result = 0;
      };
      return output.innerHTML = result + output_format + ' ' + close_result_output + close_result_format + ' ' + is_to_date_passed;
    } else {
      year = Math.floor(result / 31536000000);
      month = Math.floor((result % (31536000000)) / (2.628e+9));
      week = Math.floor(((result % (31536000000)) % (2.628e+9)) / (6.048e+8));
      day = Math.floor((((result % (31536000000)) % (2.628e+9)) % (6.048e+8)) / 8.64e+7);
      hour = Math.floor(((((result % (31536000000)) % (2.628e+9)) % (6.048e+8)) % 8.64e+7) / 3.6e+6);
      min = Math.floor((((((result % (31536000000)) % (2.628e+9)) % (6.048e+8)) % 8.64e+7) % 3.6e+6) / 60000);
      sec = Math.floor(((((((result % (31536000000)) % (2.628e+9)) % (6.048e+8)) % 8.64e+7) % 3.6e+6) % 60000) / 1000)

      return output.innerHTML = `${year >= 1 ? year + (year > 1 ? 'yrs' : 'yr')
        : ''} ${month >= 1 ? month + (month > 1 ? 'mths' : 'mth')
          : ''} ${week >= 1 ? week + (week > 1 ? 'wks' : 'wk')
            : ''} ${day >= 1 ? day + (day > 1 ? 'dys' : 'dy')
              : ''} ${hour >= 1 ? hour + (hour > 1 ? 'hrs' : 'hr')
                : ''} ${min >= 1 ? min + (min > 1 ? 'mins' : 'min')
                  : ''} ${sec >= 1 ? sec + 's'
                    : ''} ${is_to_date_passed ? 'ago' : ''}`;

    }
  }
  catch (error) {
    console.log(error.message)
    return screenVariables().get_result_area().innerHTML = 'syntaxError';
  }
}

//UNIT CONVERSION CODE////

String.prototype.reverseValue = () => {
  let objects = {

  }

  return {
    get_similar: (input) => console.log(objects[input])
  }
}

let units = {

  µs: {
    µs: 1,
    ms: 0.001,
    s: 1e-6,
    min: 1.6667e-8,
    hr: 2.7778e-10,
    day: 1.1574e-11,
    wk: 1.6534e-12,
    mth: 3.8052e-13,
    yr: 3.171e-14,
    dec: 3.171e-15,
    cen: 3.171e-16
  },
  ms: {
    µs: 1000,
    ms: 1,
    s: 0.001,
    min: 1.6667e-5,
    hr: 2.7778e-7,
    day: 1.1574e-8,
    wk: 1.6534e-9,
    mth: 3.8052e-10,
    yr: 3.171e-11,
    dec: 3.171e-12,
    cen: 3.171e-13
  },
  s: {
    µs: 1e+6,
    ms: 1000,
    s: 1,
    min: 0.0166667,
    hr: 0.000277778,
    day: 1.1574e-5,
    wk: 1.6534e-6,
    mth: 3.8052e-7,
    yr: 3.171e-8,
    dec: 3.171e-9,
    cen: 3.171e-10
  },
  min: {
    µs: 6e+7,
    ms: 60000,
    s: 60,
    min: 1,
    hr: 0.0166667,
    day: 6.9444e-4,
    wk: 9.9206e-5,
    mth: 2.2931e-5,
    yr: 1.9026e-6,
    dec: 1.9026e-7,
    cen: 1.9026e-8
  },
  hr: {
    µs: 3.6e+9,
    ms: 3.6e+6,
    s: 3600,
    min: 60,
    hr: 1,
    day: 1 / 24,
    wk: 1 / 168,
    mth: 1 / 730,
    yr: 1 / 8760,
    dec: 1 / 87600,
    cen: 1 / 876000
  },
  day: {
    µs: 8.64e+10,
    ms: 8.64e+7,
    s: 86400,
    min: 1440,
    hr: 24,
    day: 1,
    wk: 1 / 7,
    mth: 1 / 30.417,
    yr: 1 / 365,
    dec: 1 / 3650,
    cen: 1 / 36500
  },
  wk: {
    µs: 6.048e+11,
    ms: 6.048e+8,
    s: 604800,
    min: 10080,
    hr: 168,
    day: 7,
    wk: 1,
    mth: 1 / 4.345,
    yr: 1 / 52.143,
    dec: 1 / 521,
    cen: 1 / 5214
  },
  mth: {
    µs: 2.628e+12,
    ms: 2.628e+9,
    s: 2.628e+6,
    min: 43800,
    hr: 730.001,
    day: 30.4167,
    wk: 4.34524,
    mth: 1,
    yr: 1 / 12,
    dec: 1 / 120,
    cen: 1 / 1200
  },
  yr: {
    µs: 3.154e+13,
    ms: 3.154e+10,
    s: 3.154e+7,
    min: 525600,
    hr: 8760,
    day: 365,
    wk: 52.1429,
    mth: 12,
    yr: 1,
    dec: 1 / 10,
    cen: 1 / 100
  },
  dec: {
    µs: 3.154e+14,
    ms: 3.154e+11,
    s: 3.154e+8,
    min: 5256000,
    hr: 87600,
    day: 3650,
    wk: 521.429,
    mth: 120,
    yr: 10,
    dec: 1,
    cen: 0.1
  },
  cen: {
    µs: 3.154e+15,
    ms: 3.154e+12,
    s: 3.154e+9,
    min: 52560000,
    hr: 876000,
    day: 36500,
    wk: 5214.29,
    mth: 1200,
    yr: 100,
    dec: 10,
    cen: 1
  },

  //CONVERSION UNITS FOR LENGTH
  nm: {
    nm: 1,
    µm: 0.001,
    mm: 1e-6,
    cm: 1e-7,
    m: 1e-9,
    hm: 1e-11,
    km: 1e-12,
    yrd: 1.0936e-9,
    mile: 6.2137e-13,
    ft: 3.2808e-9,
    in: 3.937e-8,
  },
  µm: {
    nm: 1000,
    µm: 1,
    mm: 0.001,
    cm: 1e-4,
    m: 1e-6,
    hm: 1e-8,
    km: 1e-9,
    yrd: 1.0936e-6,
    mile: 6.2137e-10,
    ft: 3.2808e-6,
    in: 3.937e-5,
  },
  mm: {
    nm: 1e+6,
    µm: 1000,
    mm: 1,
    cm: 0.1,
    m: 1e-3,
    hm: 1e-5,
    km: 1e-6,
    yrd: 1.0936e-3,
    mile: 6.2137e-7,
    ft: 3.2808e-3,
    in: 3.937e-2,
  },
  cm: {
    nm: 1e+7,
    µm: 10000,
    mm: 10,
    cm: 1,
    m: 1e-2,
    hm: 1e-4,
    km: 1e-5,
    yrd: 1.0936e-2,
    mile: 6.2137e-6,
    ft: 3.2808e-2,
    in: 0.393701,
  },
  m: {
    nm: 1e+9,
    µm: 1e+6,
    mm: 1000,
    cm: 100,
    m: 1,
    hm: 1e-2,
    km: 1e-3,
    yrd: 1.0936,
    mile: 6.2137e-4,
    ft: 3.28084,
    in: 39.3701,
  },
  hm: {
    nm: 1e+11,
    µm: 1e+8,
    mm: 1e+5,
    cm: 1e+4,
    m: 100,
    hm: 1,
    km: 0.1,
    yrd: 109.361,
    mile: 6.21371e-2,
    ft: 328.084,
    in: 3937.01,
  },
  km: {
    nm: 1e+12,
    µm: 1e+9,
    mm: 1e+6,
    cm: 1e+5,
    m: 1000,
    hm: 10,
    km: 1,
    yrd: 1093.61,
    mile: 0.621371,
    ft: 3280.84,
    in: 39370.1,
  },
  yrd: {
    nm: 9.144e+8,
    µm: 914400,
    mm: 914.4,
    cm: 91.44,
    m: 0.9144,
    hm: 0.009144,
    km: 0.0009144,
    yrd: 1,
    mile: 0.000568182,
    ft: 3,
    in: 36,
  },
  mile: {
    nm: 1.609e+12,
    µm: 1.609e+9,
    mm: 1.609e+6,
    cm: 160934,
    m: 1609.34,
    hm: 16.0934,
    km: 1.60934,
    yrd: 1760,
    mile: 1,
    ft: 5280,
    in: 63360,
  },
  ft: {
    nm: 3.048e+8,
    µm: 3.048e+5,
    mm: 304.8,
    cm: 30.48,
    m: 0.3048,
    hm: 0.003048,
    km: 0.0003048,
    yrd: 0.333333,
    mile: 0.000189394,
    ft: 1,
    in: 12,
  },
  in: {
    nm: 2.54e+7,
    µm: 25400,
    mm: 25.4,
    cm: 2.54,
    m: 0.0254,
    hm: 0.000254,
    km: 2.54e-5,
    yrd: 0.0277778,
    mile: 1.5783e-5,
    ft: 1 / 12,
    in: 1,
  },
}

function unit_conversion() {
  try {
    let input = (screenVariables().get_input_area().innerHTML).trim();
    let inValue = +(input.match(/[0-9]+/gi)[0]);
    let outValue = +(input.match(/[0-9]+/gi)[1]);
    let inUnit = input.match(/[A-Za-zµ]+/gi)[0];
    let outUnit = input.match(/[A-Za-zµ]+/gi)[1]
    let value1_inUnit = inValue * units[inUnit][outUnit];
    let value2_outUnit = outValue * units[outUnit][inUnit];

    let output1
    let output2;

    switch (input.match(/[–|+|×|\/|→]/gi).join()) {
      case '–':
        output1 = value1_inUnit - outValue;
        output2 = inValue - value2_outUnit
        break;
      case '+':
        output1 = value1_inUnit + outValue;
        output2 = inValue + value2_outUnit
        break;
      case '×':
        output1 = value1_inUnit * outValue;
        output2 = inValue * value2_outUnit
        break;
      case '/':
        output1 = value1_inUnit / outValue;
        output2 = inValue / value2_outUnit
        break;
      case '→':
        output1 = value1_inUnit.toString().length > 9 ? value1_inUnit.toExponential(2)
          : value1_inUnit.toString().includes('.') ? value1_inUnit
            : value1_inUnit.toLocaleString();
        break;
      default:
        break;
    }

    if (input.match(/[–|+|×|\/|→]/gi).join() === '→') {
      return screenVariables().get_result_area().innerHTML = output1 + outUnit;
    }
    output1 = output1.toString().length > 5 ? output1.toExponential(2) : output1.toLocaleString();
    output2 = output2.toString().length > 5 ? output2.toExponential(2) : output2.toLocaleString();
    return inUnit == outUnit ? screenVariables().get_result_area().innerHTML = output1 + outUnit
      : screenVariables().get_result_area().innerHTML = output1 + outUnit + ' or ' + output2 + inUnit;

  }
  catch (error) {
    screenVariables().get_result_area().innerHTML = 'syntaxError';
    return {
      'error name': error.name,
      'error message': 'Check your inputs'
    }
  }
}

equal_btn.addEventListener('click', select_calculation);

function base_conversion() {
  // debugger;
  let input = screenVariables().get_input_area();
  let input_nodes = Array.from(input.childNodes);
  let output = '';
  let number_of_elem = input_nodes.length;
  let base_of_result = '';

  if (input.innerText.includes('→')) {
    base_of_result = input.innerText.slice((input.innerText.indexOf('→')) + 1);
    input_nodes.splice(input_nodes.length - 1);
    number_of_elem -= 1;
  }

  let i;
  input_nodes.forEach(node => {
    node.textContent = ((node.textContent.replace(/\s/gi, '')).replace(/\–/gi, '-'));
  });
  try {
    for (i = 0; i < number_of_elem; i += 1) {
      // debugger
      if (input_nodes[i].constructor == Text) {
        switch ((input_nodes[i].textContent).charAt(0)) {
          case '/': output += '/'
            break;
          case '+': output += '+'
            break;
          case '×': output += '*'
            break;
          case '-': output += '-'
            break;
          default:
            break;
        }
        if (number_of_elem - 1 > i && input_nodes[i + 1].constructor == HTMLElement) {
          output += parseInt((input_nodes[i].textContent).replace(/[\-\+\×\/]/gi, ''), input_nodes[i + 1].textContent);
          i += 1;
        } else {
          output += ((input_nodes[i].textContent).replace(/[\-\+\×\/\→]/gi, ''));
        }
      }
    }
    //EVAL OPENS DOOR TO SECURITY ISSUES... but the code running has zero user input influence
    //if a malicious code is passed, it woulnt reach the eval code.
    output = (eval(output)).toString() == 'NaN' ? 'syntaxError' : eval(output);
    output == 'syntaxError' ? base_of_result = '' : '';

    output = output.toString(base_of_result || 10);
    console.log(base_of_result, output);

    output = `${output}<sub style='color:rebeccapurple'>${base_of_result}</sub>`;
    // screenVariables().get_result_area().innerHTML = eval(output) == NaN ? 'syntaxError' : eval(output);

    screenVariables().get_result_area().innerHTML = output;
  }
  catch (error) {
    return screenVariables().get_result_area().innerHTML = 'synError';
  }

  // let digits_array = output.split(/\+|\-|\*|\//gi);
  // let operators = output.split(/[0-9]+/); //// you can search for multiple splitter;
  // let result = 0;

  // //BODMAS// DIVISION --MULTIPLICATION -- ADDITION -- SUBTRACTION
  // for (let j = 0; j < operators.length; j += 1) {
  //   operators.includes('/')?digits_array[] 
  // }

  //EVAL OPENS DOOR TO SECURITY ISSUES... but the code running has zero user input influence
  //if a malicious code is passed, it woulnt reach the eval code.
}

//THIS CODE SWITCHES THE FORMULAR THAT CARRIES OU THE CALCUATION
function select_calculation() {
  let calc_mode = screenVariables().get_calc_mode().innerHTML;
  // let conv_mode = screenVariables().get_conv_mode().innerHTML;
  switch (calc_mode) {
    case 'base': base_conversion();
      break;
    case 'date': date_conv_interval = setInterval(date_conversion, 1000);
      break;
    case 'conv': unit_conversion();
      break;
    default: arithmetic_calc();
      break;
  }
}

