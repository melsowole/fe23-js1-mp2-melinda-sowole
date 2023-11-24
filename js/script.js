// - Rock-paper-scissors mechanic
//  - choose option
//  - randomize option from computer
//  - determine winner

const options = [
	{
		name: "rock",
		val: 0,
	},
	{
		name: "paper",
		val: 1,
	},
	{
		name: "scissors",
		val: 2,
	},
];

const players = [
	{
		id: "p-computer",
		name: "Morgathar",
		score: 0,
	},
	{
		id: "p-player",
		name: "Hero Name",
		score: 0,
	},
];

const getRandomOption = () => Math.floor(Math.random() * (0, options.length));

//create HTML
gameFieldDOM();

function gameFieldDOM() {
	const main = document.createElement("main");
	main.classList.add(
		"container",
		"py-3",
		"d-flex",
		"flex-column",
		"justify-content-between"
	);
	document.body.append(main);

	players.forEach((player) => {
		// Create the main container
		const playerContainer = document.createElement("div");
		playerContainer.classList.add(
			player.id,
			"player",
			"row",
			"d-flex",
			"justify-content-end"
		);

		// Create the health box
		const healthBox = document.createElement("div");
		healthBox.classList.add("col", "col-md-5");

		// Create the info div
		const infoDiv = document.createElement("div");
		infoDiv.classList.add("info", "p-2", "flex-grow-1", "h-auto");
		// Create the name paragraph
		const nameParagraph = document.createElement("p");
		nameParagraph.classList.add("name", "mb-2");
		nameParagraph.textContent = player.name;

		// Create the health div
		const healthDiv = document.createElement("div");
		healthDiv.classList.add("health", "d-flex");

		// Create and append heart images to the health div
		for (let i = 0; i < 3; i++) {
			const heartImg = document.createElement("img");
			heartImg.src = "assets/Lucid-V1.2/PNG/Shadow/32/Heart.png";
			heartImg.alt = "Wizard health";
			healthDiv.appendChild(heartImg);
		}

		// Append child elements to their respective parent elements
		infoDiv.appendChild(nameParagraph);
		infoDiv.appendChild(healthDiv);
		healthBox.appendChild(infoDiv);

		// Create the avatar container
		const avatarContainer = document.createElement("div");
		avatarContainer.classList.add("col-auto");

		// Create the avatar image
		const avatarImg = document.createElement("img");
		avatarImg.classList.add("avatar");
		avatarImg.src = "assets/Wizard Pack/Idle - Copy.png";
		avatarImg.alt = player.name;

		// Append the avatar image to the avatar container
		avatarContainer.appendChild(avatarImg);

		// Append the health box and avatar container to the player container
		playerContainer.appendChild(healthBox);
		playerContainer.appendChild(avatarContainer);

		// Append the player container to the document
		main.appendChild(playerContainer);
	});

	main.append(buttonsDOM());
}

function buttonsDOM() {
	const buttonWrapper = document.createElement("section");
	buttonWrapper.classList.add("row", "d-flex");

	options.forEach((option) => {
		const button = document.createElement("button");
		button.textContent = option.name;
		button.setAttribute("type", "button");

		buttonWrapper.append(button);

		button.addEventListener("click", () => {
			//disable buttons

			// play animation

			// get winner
			let winner = getWinner(option.val, getRandomOption());

			//remove health

			// did someone lose?

			// enable buttons
		});
	});

	return buttonWrapper;
}

// recieves option vals
// returns 0 (tie), 1 (computer) or 2 (player)
function getWinner(player, computer) {
	console.log("player: " + options[player].name);
	console.log("computer: " + options[computer].name);

	const result = player - computer;

	switch (result) {
		case 0:
			console.log("it's a tie");
			return 0;
			break;
		case 1:
		case -2:
			console.log("player wins");
			return 1;
			break;
		case 2:
		case -1:
			console.log("computer wins");
			return 2;
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
