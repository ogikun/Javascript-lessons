const ALL_NUMBERS = ["1","2","3","4","5","6","7","8","9","0"]
const INFO_AREA = document.getElementById('infoArea');
const OUTPUT_AREA = document.getElementById('outputArea');
const MESSAGE_AREA = document.getElementById('messageArea');
const ANS_DISPLAY = document.getElementById('ansDisplay');
const INPUT_AREA = document.getElementById('inputArea');
let difficulty = {
  name: "",
  digit: 0,
  count: 0
};
let info = "";
let message = "";
let keyNums = [];
let remain = 0;
let ansNums = [];
let match = 0;
let touch = 0;
let log = "-";

let fisherYatesShuffle = (arr) => {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

let selectDifficulty = (argDifficulty) => {
  switch (argDifficulty) {
    case "standard":
      difficulty.name = "Standard";
      difficulty.digit = 3;
      difficulty.count = 10;
      break;
    case "hard":
      difficulty.name = "Hard";
      difficulty.digit = 4;
      difficulty.count = 10;
      break;
    case "veryHard":
      difficulty.name = "VeryHard";
      difficulty.digit = 10;
      difficulty.count = 1;
      break;
  }
  info = `難易度：${difficulty.name}　桁数：${difficulty.digit}　試行回数：${difficulty.count}`;
  remain = difficulty.count;
  log = "";
  message = `${difficulty.digit}桁の数字を入力してください。[残り回数：${remain}]`;
  keyNums = ALL_NUMBERS;
  fisherYatesShuffle(keyNums);
  keyNums = keyNums.slice(0,difficulty.digit);
  OUTPUT_AREA.innerHTML = log;
  INFO_AREA.innerText = info;
  MESSAGE_AREA.innerText = message;
  clearAnswer();
  for (let i = 0; i < document.getElementsByClassName(`tenKey`).length; i++) {
    document.getElementsByClassName(`tenKey`)[i].disabled = false;
  }
};

let setAnswer = (argAnsNum) => {
  ansNums.push(argAnsNum);
  ANS_DISPLAY.innerText = ansNums.join('');
  document.getElementById(`${argAnsNum}key`).disabled = true;
  if (ansNums.length > difficulty.digit) {
    ansNums = [];
    ansNums.push(argAnsNum);
    ANS_DISPLAY.innerText = ansNums.join('');
    document.getElementById("enterKey").disabled = true;
    for (let i = 0; i < document.getElementsByClassName(`tenKey`).length; i++) {
      document.getElementsByClassName(`tenKey`)[i].disabled = false;
    }
    document.getElementById(`${argAnsNum}key`).disabled = true;
  } else if (ansNums.length === difficulty.digit) {
    document.getElementById("enterKey").disabled = false;
  }
};

let clearAnswer = () => {
  ansNums = [];
  ANS_DISPLAY.innerText = "-";
  document.getElementById("enterKey").disabled = true;
  for (let i = 0; i < document.getElementsByClassName(`tenKey`).length; i++) {
    document.getElementsByClassName(`tenKey`)[i].disabled = false;
  }
};

let enterAnswer = () => {
  remain--;
  match = 0;
  touch = 0;
  for (let i = 0; i < difficulty.digit; i++) {
    if (ansNums[i] === keyNums[i]) {
      match++;
    }　else if (keyNums.includes(ansNums[i])) {
      touch++;
    }
  }
  if (match === difficulty.digit ){
    message = `おめでとうございます。正解は${keyNums.join("")}でした。[残り回数：${remain}]`;
    MESSAGE_AREA.innerHTML = message;
    outputLog(ansNums, match, touch);
    clearAnswer();
    for (let i = 0; i < document.getElementsByClassName(`tenKey`).length; i++) {
      document.getElementsByClassName(`tenKey`)[i].disabled = true;
    }
  } else if (remain <= 0) {
    message = `残念でした。正解は${keyNums.join("")}でした。[残り回数：${remain}]`;
    MESSAGE_AREA.innerHTML = message;
    outputLog(ansNums, match, touch);
    clearAnswer();
    for (let i = 0; i < document.getElementsByClassName(`tenKey`).length; i++) {
      document.getElementsByClassName(`tenKey`)[i].disabled = true;
    }
  } else {
    message = `あなたが選んだ数字：${ansNums.join("")}<br>・${match}個が一致しています。<br>・${touch}個の位置が違います。<br>[残り回数：${remain}]`;
    MESSAGE_AREA.innerHTML = message;
    outputLog(ansNums, match, touch);
    clearAnswer();
  }
};

let outputLog = (argAnsNums, argMatch, argTouch) => {
  log = log + `<tr><td> ${argAnsNums.join("")} - ${argMatch} - ${argTouch} </td></tr>`;
  OUTPUT_AREA.innerHTML = log;
};

let cheating = () => {
  alert(keyNums);
};