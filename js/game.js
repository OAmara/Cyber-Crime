console.log(`--Cyber Crime--`);

// Order/ GOALs:
	// create multiple hidden divs within main divs (think hw10 or pokasquare)
	// Create test comment to appendTo random hidden div. within main div.
	// test clicks

	// NEXT:  
		// Create game time(currently in startTime(), 
		// Score system: score decrement based on bully on screen
		// Be able to create multiple instantiated classes in comments array without hardcoding.
			// ^ Was not needed

		// Rounds
			// Each round adds true within truthy array to increase odds of bully comments.
			// Proper way may be to extend class to change class each round...
				//...since a Class should never change. 
			// BONUS+: Each round stores previous round data into array and displays stats before resetting variables. Maybe user want to be able to go back to previous rounds?

		// Skills -- look at skill1 to continue
			// First skill button is to use 2 stars to wipe all good commemnts on screen.
				// On hover: display skill button discription.
				// USE EMOJI CODE: \u{1F4AB} or \u{1F320} --> increase font-size w/ CSS.


// Class
class Comment {
	constructor(bully, string, user) {
		// bad or good randomly assign. 
//		// Add/ Remove a True or False in truthy Array to alter odds of getting one over another.
			// Additional rounds may have more true (bullys) to become progressively harder.
			// i.e. [true, false, true, true] --> 75% chance it will be true
		const truthy = [true, false, true]
		const randomTruthy = Math.floor(Math.random() * truthy.length)
		this.bully = truthy[randomTruthy]

		// Add random string from array according to truthy
		// May have to edit this portion if errors occur utilizing this.string
		const randomBully = Math.floor(Math.random() * game.bullyStringGenerator.length)
		const randomRegular = Math.floor(Math.random() * game.regularStringGenerator.length)
		if (this.bully === true) {
			this.string = game.bullyStringGenerator[randomBully]
		}
		if (this.bully === false) {
			this.string = game.regularStringGenerator[randomRegular]
		}

		// Random user reported comment
		const randomUser = Math.floor(Math.random() * game.reportUser.length)
		this.user = game.reportUser[randomUser]

		// Add constructor for creating h2 with class comments. Then this can be accessed with revealBully?

	}
//	// IN ORDER TO change increments/ decrements per round. if statements can instead call method in game that will determine truthy or falsy. This will be done to then change per round for difficulty setting.
	revealBully($whatWasClicked) {
		// alt. = changing bully color to regular when clicked and regular disappears when clicked.

		//change border color, maybe even bgColor to mainly transparent red or green
		if(this.bully === false) {
			$whatWasClicked.addClass('revealedFalse').hide(5000).text(`${this.user} wrote "I'm giving you a bad rating"`).css('fontSize', '0.85em')
			game.appUserScore = Math.ceil(game.appUserScore * 0.75)

			// Determines click streak for next round
			if (game.stars > 0) {
				game.stars -= 2
				if (game.stars <= 0) {
					game.stars = 0
				}
			}
			game.scoreboard()


			console.log("im falsy");
		}
		if(this.bully === true) {
			// MAY be better to use .classList or .className , .remove() then .addclass()
			$whatWasClicked.addClass('revealedTrue').hide(3500).text(`\u{1F44D} Suspended Account: ${this.user}`).css('fontSize', '0.85em')

			if(game.appUserScore > 0) {
				game.appUserScore+=242
				game.appUserScore+=Math.ceil(game.appUserScore * 0.064)
			}
			game.stars++
			game.bullyAccountsBanned++
			game.scoreboard()

			// Turns any clicked bully to false in order to prevent point decrement for having bully on screen.
			this.bully = false

			// border: 2px solid red;

			console.log(`I was truthy, now I am ${this.bully}`);
		}

			//i.e. if(this....bully === false) {jQuery change class name to this new class name that
				// changes color turn comment green}
				// else {jQuery change class to class that reveals bully === true}
				// Then slowly hide comment until it is in "space and time" --> not in body. .remove()

	}

}

//// Game
const game = {
	// Random user reporting comment
	reportUser: ['Penguin1137', 'DirtyHenry', 'sparkles87'],
	// Comments; "bully" = true, "regular" = false --> may not need this.
	bullyStringGenerator: [
		"Bad Negative Comment Here",
		"Bad, You Know Nobody likes you",
		],
	regularStringGenerator: [
		"Good day sir, I am a Good Comment",
		"Good Comment here, nice to meet you",
		],
	comments: [],
	appUserScore: 1000,
	// Just for visualization
	time: 0,
	stars: 0,
	bullyAccountsBanned: 0,
	intervalID: 0,
	// round & pauseRound logic used for when game/round Ends or when user pauses round.
	// Goal: Game logic will pause when round != pauseRound. When pause button pressed to pause, pauseRound +=1,
	//pressed again pauseRound -=1. Same when starting next round
	round: 0,
	pauseRound: 0,


	// roundStatHolder array containing each round statistic to display when paused and next round screen.
	roundStatistics: [],
	hiddenDivPosition() {
		for(let i = 0; i <= 2500; i++) {
			const $p = $(`<p class='hiddenDiv${i}'></p>`)
				// `class='${i}'></p>`)
			$p.css({
				width: '2.5px',
				height: '2.5px',
				// Only visible for testing purposes
				backgroundColor: 'rgba(245, 245, 245, .95',
				display: 'inline-block',
				margin: '0.2% 0.2%'
			})
			$p.appendTo($('#main'))

		}
		this.scoreboard()
		this.startTime()

//ONLY HERE FOR TESTING: place in  when done
				$('#main').css({
			filter: 'blur(1.5px)'
		})
		$('#stats').show().text("hi there")
//ONLY HERE FOR TESTING ^^: place in statRoundDisplay() when done and call in endRound() and endGame() and click event for Pause button. Will be #pause-game -->
	},
	startTime() {
		this.intervalID = setInterval(() => {
			
			// Will be used for logic like how frequently to display new comment...
			this.time++
			// console.log(this.time);
			
			// Have addCOmment() pass an argument to create new random instantiated comment.
			this.appUserScore
			if (this.appUserScore > 0) {
				if (this.time % 12 === 0) {

				this.addComment()
				}
				if (this.time % 12 === 0 && this.time % 14 === 0) {

				this.addComment()
				}

			}

			// utilize forEach?
			for(let i = 0; i <= this.comments.length-1; i++) {
				// Chnage this to document.body logic so that only when it is displayed since currently it will always be inside the comments[]
//	used-->		// alt.: Better solution may be to change bully to false within revealBully() class method. 
				if(this.comments[i].bully === true){
					this.appUserScore -= Math.ceil(this.appUserScore * 0.0038)
					this.scoreboard()
					this.appUserScore--
				} else{
					this.appUserScore++
				}
			}


			this.scoreboard()
//		// Keep very closely around 200
		}, 200)
	},
	addComment() {
		// instantiate a Comment
		const helloComment = new Comment()
		// console.log(helloComment);

		// Create logic for new class per time

		// store in array
		this.comments.push(helloComment)

		// this.startTime()
		this.showComment()
	},
	showComment() {
		// * length based on for loop above for hidden divs
		const randHiddenDiv = Math.floor(Math.random() * 2500)

//		// For testing purposes only to view end of main div placement
		// $(`<h2 class="comments"></h2`).text(this.comments[0].bully).appendTo($('#main'))

		// const $p = $(`<p class='comment'><span class="userComment">user: ${this.comments[this.comments.length-1].user}</span>"${this.comments[this.comments.length-1].string}"</p>`)


		// const $span = $(`<span>user: ${this.comments[this.comments.length-1].user}</span>`)
		// $span.text(`user: ${this.comments[this.comments.length-1].user}`)
		// .css({
		// 	fontSize: '0.85em',
		// 	display: 'block',
		// 	textAlign: 'left'
		// })
		// console.log($span);

//		// FIX: span not clickable since seperate from p comment class.
		const $p = $(`<p class='comment'><span class='userComment'>user: ${this.comments[this.comments.length-1].user}</span>"${this.comments[this.comments.length-1].string}"</p>`)

		$p.data('whichComment', this.comments.length-1)

		$p.insertAfter($(`.hiddenDiv${randHiddenDiv}`))
		// $p.insertBefore($('.hiddenDiv'))
	},
	scoreboard() {
		// Need to get streak to 5 stars and score to 3000 for round 2.
	
		this.appUserScore
		this.time
		// Score Display
		$('.app-users').text(`Recurring Users: ${this.appUserScore}`)
		// Streak Display
		$('.user-streak').text(`Streak: `)
		// First skill button Display
		$('#skill-star-comment-clear').text(`\u{1F4AB}`)
		// Pause button Display
		$('#pause').text(`||`)
		this.starStreak()
		// this.buttonPresentation()
		if(this.appUserScore <= 0) {
			$('.app-users').text(`Recurring Users: 0`)
//			// ClearInterval() goes here
			clearInterval(this.intervalID)
			this.gameEnd()
		}
		console.log(this.appUserScore);
	},
	starStreak() {
		if (this.stars >= 10 && this.appUserScore >= 3000) {
			this.endRound()
		} else {
			if (this.stars <= 1) {
				// Display this image attr in class .user-streak
				$(`.user-streak`).text(`Streak: \u{2605} \u{2605} \u{2605} \u{2605} \u{2605}`)
			} else if (this.stars >= 2 && this.stars <= 3) {
				// Display this image
				$(`.user-streak`).text(`Streak: \u{2B50} \u{2605} \u{2605} \u{2605} \u{2605}`)
			} else if (this.stars >= 4 && this.stars <= 5) {
				// Display this image
				$(`.user-streak`).text(`Streak: \u{2B50} \u{2B50} \u{2605} \u{2605} \u{2605}`)
			} else if (this.stars >= 6 && this.stars <= 7) {
				// Display this image
				$(`.user-streak`).text(`Streak: \u{2B50} \u{2B50} \u{2B50} \u{2605} \u{2605}`)
			} else if (this.stars >= 8 && this.stars <= 9) {
				// Display this image
				$(`.user-streak`).text(`Streak: \u{2B50} \u{2B50} \u{2B50} \u{2B50} \u{2605}`)
			} else if (this.stars >= 10) {
				// Display this image
				$(`.user-streak`).text(`Streak: \u{1F31F} \u{1F31F} \u{1F31F} \u{1F31F} \u{1F31F}`)
			}
		}

	},
	endRound() {
		// Logic for pausing round until starting next round.
		this.stars
		this.round++
		console.log(this.round);
		clearInterval(this.intervalID)
		console.log('you beat the round');
		$(`.user-streak`).text(`Streak: \u{1F929} \u{1F929} \u{1F929} \u{1F929} \u{1F929}`)
//		// Implement new variable that saves round variables as statistics within an array object then wipes them to create new round
//			//i.e. push new roundStatHolder to roundStatistics Array. Then can be called with roundStatistics[this.round-1]
		// Round variables held in here, pushed into roundStatistics, then erased for next round.
		const roundStatHolder = [{
			roundIs: this.round/*this.round*/,
			bullyAccountsBannedIs: this.bullyAccountsBanned/*this.*/,
		}, {

		}]
		console.log(roundStatHolder);
		this.roundStatistics.push(roundStatHolder)
		console.log(this.roundStatistics[this.round-1]);

		// this.statRoundDisplay()

		// this.newRound()
	},
	newRound() {
//		// USE css to clear screen within divs then start with this.hiddenDivPosition() instead
		// this.startTime()
		//Next round button pressed === ture {this.pauseRound++}
			// placed for now
			// this.pauseRound++
	},
	gameEnd() {
		this.round++
		console.log("WHAT A Shame");
		$(`.user-streak`).text(`Losing Streak: \u{26B0} \u{FE0F}`) //⚰️
//		// ADD A BUNCH OF CSS, BLURS FILTERS, ..........Main Text/ buttons up front. Layering to come before other content? --> how to do that? --> Maybe even flexbox or position: ;
	
	// this.statRoundDisplay()

	},
	// Displays roundstats with next round button displayed. Blurs background(z-index: -1) html.
	statRoundDisplay() {




	},
	// Pause button click event that displays how to play while paused:
	pauseGame() {
	// (i)
	// Similar to statRoundDisplay(), but displays how to play (i)info.
	// alt: display stats, roundStatHolder variable will have to be pushed at beginning of game to be displayed at any moment.
	// Also change css for pause button(w/ emoji) to play button(w/ emoji)


	},
	// this changes display and usage of buttons according to if skill is ready...
	// have passing arg look like: buttonPresentation(null, skill2, null)
	buttonPresentation(skill1, skill2, skill3) { 
		// Skill: clear all regular comments from screen. Costs 2 stars
			// cooldown?
				//setInterval started within button with id to stop after time variable reaches after 5 seconds?

		// Button appearance when pressed while during cooldown.
		// if(brand new timer is < certain amount){
				$('#skill-star-comment-clear').css({
				//demonstration
				border: '2px solid yellow'
			})
		// }

		//way to clear reg comments?:
			// 'p.comment'  if (this.comment[i].bully === false) {
						    // .hide
						    // this.stars -= 2
					    	// }
		const hello = console.log(skill1)
		// console.log(hello);

	},
	// Click event listener method that triggers class method
	revealTruthy($whatWasClicked) {

		// get index of what was clicked from dataset -- use that instead of this.comments.length - 1
		// i.e. $whatWasClicked.data('data-name-here')?
		const dataComment = $whatWasClicked.data().whichComment
		this.comments[dataComment].revealBully($whatWasClicked)
		console.log(dataComment)

	}


}
game.hiddenDivPosition()
// game.addComment()

////Event Listeners
// Comment truthy/ falsy reveal
// try: #main w/ e.target try: .comment w/ e.currentTarget
$('#main').on('click', (e) => {
	console.log(e.currentTarget);
	// Previously e.target
	if (game.round === game.pauseRound) {
		const $thisComment = $(e.target)
		if ($thisComment.hasClass('comment')) {
			game.revealTruthy($thisComment)
		}
	}
})

// Skill1 button to clear all regular comments to sacrifice 2 stars
$('#skill-star-comment-clear').on('click', (e) => {
	console.log(e.target);
	if (game.round === game.pausRound) {
		const $skillClick = $(e.target)
		game.buttonPresentation($skillClick)
	}
	// Reference tamagtochi for utilizing clicks to change variable values. How can this be utilized in passing argument into game method. That way data will be stored more properly.
})

// Pause game button that triggers game.pauseGame()
$('#pause').on('click', (e) => {
	
	game.pauseGame()


})



