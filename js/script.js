/*
 * Author: Melinda Sowole
 * Date: 27/11/2023
 * Description:
 * 		This was a graded Miniproject created as part of the
 * 		Javascript 1 course at Grit Academy Fall23.
 * 		The goal was to create a game of Rock-Paper-Scissors
 * 		in which the user plays against the computer.
 * 		Required functionalities were:
 * 		- Enter name before game starts
 * 		- Choose move: Select rock, paper, or scissors
 * 		- Generate and display random computer move
 * 		- Display winner each round
 * 		- Track score of both players
 * 		- First to 3 points win
 * 		- Clearly declare overall winner
 * 		- Restart option after victory
 *
 *    - this file is a mess. I'm sorry ;-;
 */

///////////////////////////////////////////////////////////////////
// CONFIG

const defaultHealth = 3;

const playerDefaults = {
  id: "",
  name: "",
  health: defaultHealth,
  choice: null,
};

const players = {
  user: {
    ...playerDefaults,
    id: "p-user",
    name: "Rowan The Great",
    avatar: { skin: 2, clothes: 2 },
  },
  computer: { ...playerDefaults, id: "p-computer", name: "Morgathar" },
  array: [],
};

const avatarOptions = {
  skin: [
    { id: 1, displayColor: "#342316" },
    { id: 2, displayColor: "#5f4531" },
    { id: 3, displayColor: "#a48053" },
  ],
  clothes: [
    { id: 1, displayColor: "#c0c0c0" },
    { id: 2, displayColor: "#d8b05b" },
    { id: 3, displayColor: "#4169e1" },
  ],
};

players.array.push(players.computer, players.user);

// which spells to cast
const spellOptions = [
  { name: "FIRE", domination: "fire beats ice", value: 0 },
  { name: "WATER", domination: "water beats fire", value: 1 },
  { name: "ICE", domination: "ice beats water", value: 2 },
];

const dialogueDefaultText = "Quick, choose a spell to cast at the evil wizard!";

const gameInfo = {
  title: "Spell Clash: Eldoria",
  intro: [
    "In the mystical realm of Eldoria, darkness yields to the mighty wizard Morgathar.",
    "Your mission is clear: defeat the wizard and liberate Eldoria.",
    "Yet, in this clash of equally mighty forces, anyone could win or lose.",
  ],
  howTo: {
    heading: "How to Play",
    text: [
      "Choose between casting spells of Fire, Water, or Ice when attacking the evil wizard.",
      "Fire scorches Ice",
      "Ice freezes Water",
      "Water extinguishes Fire",
      `To win, beat the evil wizard's spells ${defaultHealth} times`,
    ],
  },
  about: {
    heading: "About the Game",
    text: [
      "This game was a graded assignment for the course Javascript 1 at Grit Academy",
      "The goal was to create a functioning game of rock-paper-scissors played against the computer.",
      "The game was coded and designed by <a href='olusade.com'>Olusade</a>.",
      "The icons were created by <a href='https://leo-red.itch.io/lucid-icon-pack'>Midhil</a>",
      "The character bases were created by <a href='https://sagak-art-pururu.itch.io/24pxminicharacters'>Sagak Art</a> and edited by <a href='olusade.com'>Olusade</a>.",
    ],
  },
  menuButtons: [
    {
      txt: "Start Game",
      click() {
        // customization
        openCustomization();
        // openGame();
      },
    },
    {
      txt: "How to Play",
      click() {
        generatePopupDOM(gameInfo.howTo.heading, gameInfo.howTo.text);
      },
    },
    {
      txt: "About",
      click() {
        generatePopupDOM(gameInfo.about.heading, gameInfo.about.text);
      },
    },
  ],
  icons: {
    close: "Close.png",
    menu: "Home.png",
    howTo: "Message-Question.png",
  },
};

///////////////////////////////////////////////////////////////////
// GLOBAL VARIABLES
const main = document.querySelector("main");

///////////////////////////////////////////////////////////////////
// INITALIZE APP

openMenu();

///////////////////////////////////////////////////////////////////
// GAME SCREENS

function openMenu() {
  clearBody();

  if (main.classList.contains("color")) {
    main.classList.remove("color");
  }

  generateMenuDOM();
}

function openGame() {
  clearBody();

  main.classList.add("color");

  //create HTML
  generateGameDOM();

  setDialogueText(dialogueDefaultText);
}

function openCustomization() {
  clearBody();

  generateCustomizationDOM();
}

///////////////////////////////////////////////////////////////////
// GENERATE DOM

function generateGameDOM() {
  NAVIGATION();

  players.array.forEach((player) => {
    main.append(PLAYER(player));
  });

  main.querySelector(".player").after(BATTLESTRIP());

  main.append(DIALOGUEBOX());

  // DOM FUNCTIONS ----------------
  function NAVIGATION() {
    const navigation = createElement("section", [
      "game-nav",
      "position-absolute",
      "top-right-outter",
      "d-none",
      "d-sm-block",
    ]);
    main.append(navigation);

    const navItems = [
      {
        name: "How To Play",
        icon: gameInfo.icons.howTo,
        click() {
          generatePopupDOM(gameInfo.howTo.heading, gameInfo.howTo.text);
        },
      },
      {
        name: "Menu",
        icon: gameInfo.icons.menu,
        click() {
          generatePopupDOM(
            "Return to menu?",
            [
              "Returning to menu will cancel the current game and all progress will be lost.",
              "Are you sure you want to abandon the current battle?",
            ],
            [
              {
                txt: "Yes",
                click() {
                  location.reload();
                },
              },
              {
                txt: "Cancel",
                click: "CLOSE",
              },
            ]
          );
        },
      },
    ];

    navItems.forEach((item) => {
      const button = createElement("button", ["game-nav-item", "px-2"]);
      navigation.append(button);
      button.setAttribute("type", "button");
      const img = createElement("img", "button-icon");
      button.append(img);
      img.setAttribute("src", "assets/lucid-icons/" + item.icon);
      img.setAttribute("alt", item.name);

      button.addEventListener("click", () => {
        item.click();
      });

      navigation.append(button);
    });
  }

  function PLAYER(playerObj) {
    console.log();
    const playerDOM = createElement("div", [
      "player",
      playerObj.id,
      playerObj.id == "p-user"
        ? `a${players.user.avatar.skin}-${players.user.avatar.clothes}`
        : null,
      "row",
      "max-width",
      "m-auto",
      "d-grid",
      "align-items-center",
    ]);

    const avatar = createElement("div", ["avatar", "col-auto"]);

    const info = INFO();

    playerDOM.append(avatar, info);

    return playerDOM;

    function INFO() {
      const infoWrapper = createElement("div", ["info", "col", "m-auto"]);

      const health = createElement("div", [
        "health",
        "d-flex",
        "gap-1",
        "p-1",
        main.querySelector(".player") ? "justify-content-end" : null,
      ]);

      const arrow = createElement("div", ["arrow"]);
      health.append(arrow);

      for (let i = 0; i < playerObj.health; i++) {
        const heart = createElement("div", ["heart"]);
        health.append(heart);
      }

      const name = createElement("div", [
        "name",
        main.querySelector(".player") ? "text-end" : null,
      ]);
      name.textContent = playerObj.name;

      infoWrapper.append(health, name);

      return infoWrapper;
    }
  }

  // - vs -
  function BATTLESTRIP() {
    const battlestripDOM = createElement("div", [
      "battlestrip",
      "row",
      "d-flex",
      "justify-content-center",
    ]);

    players.array.forEach((player) => {
      const playerChoice = createElement("div", [
        "spellChoice",
        "spellChoice-" + player.id,
      ]);

      playerChoice.textContent = "-";

      battlestripDOM.prepend(playerChoice);
    });

    const separator = createElement("div", ["vs", "col-auto"]);
    separator.textContent = "vs";
    battlestripDOM.querySelector(".spellChoice").after(separator);

    return battlestripDOM;
  }

  function DIALOGUEBOX() {
    const dialogueDOM = createElement("div", ["dialogue-box", "row"]);

    const textArea = createElement("div", [
      "text-area",
      "col",
      "m-2",
      "p-0",
      "p-2",
      "d-flex",
      "flex-column",
    ]);
    const p = createElement("p", ["dialogue-text", "m-0"]);
    p.textContent = dialogueDefaultText;
    const proceed = createElement("p", ["proceed-text", "m-0"]);

    textArea.append(p, proceed);

    const buttonArea = createElement("div", [
      "button-area",
      "position-relative", // for promptbutton absolute
      "col-12",
      "col-md-4",
      "d-flex",
      "flex-column",
      "p-0",
      "p-2",
      "gap-2",
    ]);

    spellOptions.forEach((option) => {
      buttonArea.append(OPTIONBUTTON(option));
    });

    dialogueDOM.append(textArea, buttonArea);

    return dialogueDOM;
  }

  function OPTIONBUTTON(btn) {
    const button = createElement("button", [
      "option",
      btn.name,
      "flex-grow-1",
      "py-2",
    ]);
    button.setAttribute("type", "button");
    button.textContent = btn.name;

    button.addEventListener("click", () => {
      spellOptionClick(btn);
    });

    return button;
  }
}

function generateMenuDOM() {
  const wrapper = createElement("div", [
    "menu-wrapper",
    "container",
    "text-center",
  ]);
  main.append(wrapper);

  const title = createElement("h1", ["title", "pt-5", "pb-2", "fs-3"]);
  wrapper.append(title);
  title.textContent = gameInfo.title;

  const buttonContainer = createElement("div", [
    "menu-button-container",
    "row",
    "d-flex",
    "flex-column",
    "align-items-center",
    "gap-3",
  ]);
  wrapper.append(buttonContainer);

  gameInfo.menuButtons.forEach((btn) => {
    const button = createElement("button", [
      "menu-button",
      "col",
      "py-2",
      "p-sm-2",
      "col-md-4",
    ]);
    button.textContent = btn.txt;

    button.addEventListener("click", () => {
      btn.click();
    });
    buttonContainer.append(button);
  });
}

function generateCustomizationDOM() {
  const wrapper = createElement("div", [
    "customization-wrapper",
    "container",
    "text-center",
  ]);

  main.append(wrapper);

  const heading = createElement("h2", ["pt-5", "pb-2", "fs-3"]);
  wrapper.append(heading);
  heading.textContent = "Customize your hero";

  const nameWrapper = createElement("div", ["input-wrapper"]);
  wrapper.append(nameWrapper);
  const nameLabel = createElement("label", ["pt-2"]);
  nameLabel.setAttribute("for", "name");
  nameLabel.textContent = "Name :";
  const nameInput = createElement("input", ["p-2", "ms-2"]);
  nameInput.setAttribute("placeholder", players.user.name);
  nameInput.setAttribute("id", "name");
  nameWrapper.append(nameLabel, nameInput);

  //choose color;
  wrapper.append(
    colorPicker("Skin Color", "skin", avatarOptions.skin),
    colorPicker("Clothes ", "clothes", avatarOptions.clothes)
  );

  function colorPicker(label, arrayName, array) {
    const colorWrapper = createElement("div", [
      "color-wrapper",
      arrayName,
      "max-width",
      "m-auto",
      "pb-3",
    ]);
    const colorLabel = createElement("label", ["p-2"]);
    colorLabel.textContent = label + " :";
    const swatchWrapper = createElement("div", ["swatches", "d-flex", "gap-2"]);
    array.forEach((color) => {
      const swatch = createElement("div", [
        "swatch",
        "flex-grow-1",
        "p-3",
        arrayName + "-color-" + color.id,
      ]);
      swatch.style.backgroundColor = color.displayColor;
      swatch.setAttribute("value", color.id);

      if (color.id == players.user.avatar[arrayName]) {
        swatch.classList.add("pick");
      }

      swatch.addEventListener("click", () => {
        swatchWrapper.querySelector(".pick").classList.remove("pick");
        swatch.classList.add("pick");
      });

      swatchWrapper.append(swatch);
    });

    colorWrapper.append(colorLabel, swatchWrapper);

    return colorWrapper;
  }

  // accept
  const button = createElement("button", [
    "customization-continue-button",
    "p-2",
    "mt-5",
  ]);
  wrapper.append(button);
  button.setAttribute("type", "button");
  button.textContent = "Start Game";

  button.addEventListener("click", () => {
    // save customization
    //if user changed the name
    if (nameInput.value) {
      players.user.name = nameInput.value;
    }

    // set colors

    console.log(
      document.querySelector(".skin .swatches .pick").getAttribute("value")
    );

    players.user.avatar.skin = document
      .querySelector(".skin .swatches .pick")
      .getAttribute("value");
    players.user.avatar.clothes = document
      .querySelector(".clothes .swatches .pick")
      .getAttribute("value");

    console.log(players.user.avatar);

    // remove wrapper
    wrapper.remove();

    //introduction to game
    //click to skip<

    //start Game
    generateIntroDOM();
  });
}

function generateIntroDOM() {
  const wrapper = createElement("div", [
    "intro-wrapper",
    "container",
    "text-center",
    "pt-4",
    "pb-2",
    //to make whole screen clickable for eventlistener
    "flex-grow-1",
  ]);
  main.append(wrapper);

  const skipText = createElement("p", ["skip-intro"]);
  wrapper.append(skipText);
  skipText.textContent = "!";
  let counter = 0;
  wrapper.addEventListener("click", () => {
    counter++;
    skipText.textContent = " " + counter + "!";

    // click three times to skip
    if (counter == 3) {
      startGame();
    }
  });

  gameInfo.intro.forEach((text, i) => {
    setTimeout(() => {
      const p = createElement("p");
      p.textContent = text;
      wrapper.append(p);

      setTimeout(() => {
        p.classList.add("fade-in");
      }, 500);

      if (i == gameInfo.intro.length - 1) {
        setTimeout(() => {
          const button = createElement("button", ["p-2"]);
          button.textContent = "Continue";
          button.addEventListener("click", startGame);
          wrapper.append(button);
        }, 2500);
      }
    }, 2500 * i);
  });

  function startGame() {
    wrapper.classList.add("fade-out");

    setTimeout(() => {
      openGame();
      wrapper.remove();
    }, 200);
  }
}

function generatePopupDOM(title, txt, buttons) {
  const container = createElement("div", [
    "popup-container",
    "d-flex",
    "position-absolute",
    "top-0",
    "start-0",
  ]);
  main.prepend(container);

  const wrapper = createElement("div", [
    "popup",
    "max-width",
    "container",
    "flex-grow-1",
    "pt-4",
    "m-1",
    "p-md-5",
    "m-lg-5",
    "m-xl-auto",
    "position-relative",
  ]);
  container.append(wrapper);

  const buttonClose = createElement("button", [
    "close-popup",
    "position-absolute",
    "top-right-inner",
  ]);
  buttonClose.setAttribute("type", "button");
  const img = createElement("img", "button-icon");
  img.setAttribute("src", "assets/lucid-icons/" + gameInfo.icons.close);
  img.setAttribute("alt", "Close popup");
  buttonClose.append(img);

  buttonClose.addEventListener("click", () => {
    container.remove();
  });

  const heading = createElement("h2", ["heading", "pb-2", "fs-3"]);
  heading.textContent = title;

  const text = createElement("div", ["how-to-text"]);
  txt.forEach((para) => {
    const p = createElement("p");
    p.innerHTML = para;
    text.append(p);
  });

  wrapper.append(buttonClose, heading, text);

  if (buttons) {
    const buttonsWrapper = createElement("div", [
      "popup-buttons-wrapper",
      "d-flex",
      "gap-5",
      "pt-3",
    ]);
    wrapper.append(buttonsWrapper);
    buttons.forEach((btn) => {
      const button = createElement("button", ["p-2"]);
      button.setAttribute("type", "button");

      button.textContent = btn.txt;

      button.addEventListener("click", () => {
        if (btn.click == "CLOSE") {
          container.remove();
        } else {
          btn.click();
        }
      });

      buttonsWrapper.append(button);
    });
  }
}

///////////////////////////////////////////////////////////////////
// DOM MANIPULATING FUNCTIONS

function removeHealth(roundLoser) {
  const heartToRemove = document.querySelector(
    `.${roundLoser} .heart${roundLoser == "p-computer" ? ":last-of-type" : " "}`
  );

  heartToRemove.classList.add("remove-anim");

  if (getMatchLoser()) {
    setTimeout(() => {
      document.querySelector(`.${roundLoser} .avatar`).classList.add("death");
    }, 600);
  }

  setTimeout(() => {
    heartToRemove.remove();
  }, 500);
}

function nextRound() {
  //reset battle strip
  resetBattleStrip();
  //reset dialogie
  setDialogueText(dialogueDefaultText);
  //enable buttons
  changeButtonState("ENABLE");
}

function restartGame() {
  const loser = getMatchLoser();

  // set health
  players.user.health = defaultHealth;
  players.computer.health = defaultHealth;

  // add hearts

  players.array.forEach((player) => {
    const health = document.querySelector(`.${player.id} .health`);

    console.log(player.id);

    const hearts = health.querySelectorAll(".heart");
    hearts.forEach((heart) => {
      heart.remove();
    });

    for (let i = 0; i < player.health; i++) {
      const heart = createElement("div", ["heart"]);
      health.append(heart);
    }
  });

  // remove death
  document.querySelector(".death").classList.remove("death");

  // set dialogue text to default
  setDialogueText(`${loser.name} resurrected. \n\n${dialogueDefaultText}`);

  resetBattleStrip();

  // show play buttons
  changeButtonState("ENABLE");
}

// - vs -
function resetBattleStrip(string) {
  const choiceContainers = document.querySelectorAll(".spellChoice");

  choiceContainers.forEach((choice) => {
    choice.textContent = string ? string : "-";
  });

  document.querySelector(".vs").textContent = "vs";
}

function promptRestart() {
  setDialogueText("Do you wish to play again?");

  changeButtonState("HIDE");

  const promptOptions = [
    {
      btnTxt: "Yes",
      click() {
        restartGame();
      },
    },
    {
      btnTxt: "No",
      click() {
        openMenu();
      },
    },
  ];

  const buttonWrapper = createElement("div", [
    "prompt-buttons",
    "position-absolute",
    "w-100",
    "top-0",
    "start-0",
    "mt-2",
    "p-2",
    "d-flex",
    "gap-2",
  ]);
  document.querySelector(".button-area").append(buttonWrapper);

  promptOptions.forEach((option) => {
    const button = createElement("button", [
      "prompt-button",
      "flex-grow-1",
      "py-2",
    ]);

    button.textContent = option.btnTxt;

    buttonWrapper.append(button);

    button.addEventListener("click", () => {
      option.click();
      buttonWrapper.remove();
    });
  });
}

function spellOptionClick(button) {
  changeButtonState("DISABLE");

  setDialogueText("");

  // player choices
  updatePlayerChoices(button);

  // determine round outcome and update player objects
  let outcome = getRoundOutcome();
  if (outcome.winner) {
    outcome.loser.health--;
  }

  roundAnimationAndScreenUpdates();

  function roundAnimationAndScreenUpdates() {
    let time = 0;

    // Destructuring: take id from players.user and assing to userId
    const { id: userId } = players.user;
    const { id: computerId } = players.computer;

    const heroAvatar = document.querySelector(`.${userId} .avatar`);
    const heroSpell = document.querySelector(`.spellChoice-${userId}`);
    const computerAvatar = document.querySelector(`.${computerId} .avatar`);
    const computerSpell = document.querySelector(`.spellChoice-${computerId}`);

    // HERO ATTACK
    // hero avatar "cast" ability
    setTimeout(() => {
      heroAvatar.classList.add("attack");

      setTimeout(() => {
        heroAvatar.classList.remove("attack");
      }, 1000);
    }, (time += 500));

    // hero ability "land" in battle strip
    setTimeout(() => {
      heroSpell.textContent = spellOptions[players.user.choice].name;
      console.log("hello");
    }, (time += 600));

    // COMPUTER ATTACK
    // computer avatar "cast" ability
    setTimeout(() => {
      computerAvatar.classList.add("attack");

      setTimeout(() => {
        computerAvatar.classList.remove("attack");
      }, 1000);
    }, (time += 500));

    // computer ability "land" in battle strip
    setTimeout(() => {
      computerSpell.textContent = spellOptions[players.computer.choice].name;
      console.log("hello");
    }, (time += 600));

    // THEN DIALOGUE
    setTimeout(() => {
      //cb is proceed action
      let cb = nextRound;

      let battleOutcome = getMatchOutcome();

      if (battleOutcome.victor) {
        cb = () => gameVictoryScreen(battleOutcome);
      }

      const dialogueText = getDialogueOutcomeText(outcome);

      setDialogueText(dialogueText, cb);
    }, (time += 1000));

    // THEN HEALTH (if there is a loser)
    if (outcome.winner) {
      setTimeout(() => {
        removeHealth(outcome.loser.id);
      }, (time += 1000));
    }
  }

  // FUNCTION FROM SPELLOPTIONSCLICK
  function updatePlayerChoices(clickedSpellButton) {
    players.user.choice = clickedSpellButton.value;
    players.computer.choice = getRandomOption();
  }

  function getDialogueOutcomeText(outcome) {
    // display text in dialogue box
    let dialogueText = outcome.winner
      ? spellOptions[outcome.winner.choice].domination
      : "It's a tie!";

    if (outcome.winner) {
      dialogueText +=
        outcome.winner == players.user
          ? `\n\nYou win!`
          : `\n\n${players.computer.name} wins!`;
    }

    return dialogueText;
  }

  function gameVictoryScreen(battleOutcome) {
    resetBattleStrip(" ");

    document.querySelector(".vs").textContent =
      battleOutcome.victor == players.user
        ? "You are the victor!"
        : players.computer.name + " is the victor!";

    let dialogueText =
      battleOutcome.loser == players.user
        ? "You have been defeated, \n\nBut heroes don't necessarily always die!"
        : `${players.computer.name} has been defeated, \n\n But sometimes evil never truly dies!`;

    setDialogueText(dialogueText, promptRestart);
  }
}

function changeButtonState(state) {
  const buttons = document.querySelectorAll(".option");

  buttons.forEach((btn) => {
    switch (state) {
      case "HIDE":
        btn.classList.add("hide");
      case "DISABLE":
        btn.setAttribute("disabled", "disabled");
        break;
      case "ENABLE":
        btn.removeAttribute("disabled", "disabled");
      default:
        btn.classList.remove("hide");
        break;
    }
  });
}

function setDialogueText(string, cb, time = 750) {
  const textContainer = document.querySelector(".dialogue-text");
  const proceedContainer = document.querySelector(".proceed-text");

  textContainer.innerText = string;
  proceedContainer.textContent = "";

  if (cb) {
    setTimeout(() => {
      proceedContainer.innerHTML = `Click anywhere to proceed <span class="continue-icon"> >>></span>`;

      document.body.addEventListener("click", proceed);

      function proceed() {
        cb();
        document.body.removeEventListener("click", proceed);
      }
    }, time);
  }
}

///////////////////////////////////////////////////////////////////
// HELPER FUNCTIONS

function createElement(type, classes) {
  const elem = document.createElement(type);

  if (classes) {
    if (Array.isArray(classes)) {
      //if array
      classes.forEach((cls) => {
        // for ternary operator
        if (cls !== null) {
          elem.classList.add(cls);
        }
      });
    } else {
      // if single
      elem.classList.add(classes);
    }
  }

  return elem;
}

function clearBody() {
  document.querySelector("main").innerHTML = "";
}

function getRandomOption() {
  return Math.floor(Math.random() * (0, spellOptions.length));
}

// recieves option vals
// returns 0 (player), 1 (computer) or 2 (tie)
function getRoundWinner() {
  const user = players.user.choice;
  const computer = players.computer.choice;

  const result = user - computer;

  switch (result) {
    case 2:
    case -1:
      //computer wins
      return "computer";
    case 1:
    case -2:
      // user wins
      return "user";
    case 0:
      // tie
      return null;
  }

  // GAME LOGIC

  // 3 outcomes
  // player wins
  // computer wins
  // tie

  // 0 > 2;
  // 2 > 1;
  // 1 > 0;

  // 0 - 0 = 0 (tie)
  // 0 - 1 = -1 (computer)
  // 0 - 2 = -2 (player)

  // 1 - 0 = 1 (player)
  // 1 - 1 = 0 (tie)
  // 1 - 2 = -1 (computer)

  // 2 - 0 = 2 (computer)
  // 2 - 1 = 1 (player)
  // 2 - 2 = 0 (tie)
}

function getMatchLoser() {
  return players[Object.keys(players).find((i) => players[i].health === 0)];
}

// returns {winner, loser} or {tie}
function getRoundOutcome() {
  // func returns "user" or "computer" or false
  const winner = getRoundWinner();

  return winner
    ? {
        winner: players[winner],
        loser:
          players[
            Object.keys(players).find((i) => players[i] !== players[winner])
          ],
      }
    : { tie: true };
}

// returns {victor, loser} or {victor:false}
function getMatchOutcome() {
  // func returns "user" or "computer" or false
  const loser = getMatchLoser();

  return loser
    ? {
        victor:
          players[
            Object.keys(players).find((i) => players[i] !== players[loser])
          ],
        loser: players[loser],
      }
    : { victor: false };
}
