console.log(`--Cyber Crime--`);

// Order/ GOALs:
	// create multiple hidden divs within main divs (think hw10 or pokasquare)
	// Create test comment to appendTo random hidden div. within main div.
	// test clicks

	// NEXT:  
		// Create game time(currently in startTime(), 
		// Score system.
		// Be able to create multiple instantiated classes in comments array without hardcoding.
			// Me be more easily achieved with game time set-up
		// Rounds
			// Each round adds true within truthy array to increase odds of bully comments.
			// Proper way may be to extend class to change class each round...
				//...since a Class should never change. 
			// BONUS+: Each round stores previous round data into array and displays stats before resetting variables. Maybe user want to be able to go back to previous rounds?

	//// NOW: New random instantiated class, then score decrement based on bully on screen


// Class
class Comment {
	constructor(bully, string, user) {
		// bad or good randomly assign. 
//		// Add/ Remove a True or False in truthy Array to alter odds of getting one over another.
			// Additional rounds may have more true (bullys) to become progressively harder.
			// i.e. [true, false, true, true] --> 75% chance it will be true
		const truthy = [true, false]
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


		// this.user = 	// this.reportUser[0]
		// this.string = 	// this.comments[0].string

	}
	revealBully($whatWasClicked) {
		// alt. = changing bully color to regular when clicked and regular disappears when clicked.

		//change border color, maybe even bgColor to mainly transparent red or green
		if(this.bully === false) {
			$whatWasClicked.addClass('revealedFalse').hide(5000).text(`${this.user} wrote "I'm giving you a bad rating"`).css('fontSize', '0.85em')
			game.appUserScore = Math.ceil(game.appUserScore * 0.75)
			game.scoreboard()

			console.log("im falsy");
		}
		if(this.bully === true) {
			// MAY be better to use .classList or .className , .remove() then .addclass()
			$whatWasClicked.addClass('revealedTrue').hide(3500).text(`\u{1F44D} Suspended Account: ${this.user}`).css('fontSize', '0.85em')

				if(game.appUserScore > 0) {
					game.appUserScore += 95
					game.appUserScore += Math.ceil(game.appUserScore * 0.02)
				}
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
		"You Know Nobody likes you",
		],
	regularStringGenerator: [
		"Hello, I am a Good Comment",
		"Good Comment here, nice to meet you",
		],
	comments: [],
	appUserScore: 1000,
	// Just for visualization
	time: 0,
	intervalID: 0,
	hiddenDivPosition() {
		for(let i = 0; i <= 18; i++) {
			const $p = $(`<p class='hiddenDiv${i}'></p>`)
				// `class='${i}'></p>`)
			$p.css({
				width: '10px',
				height: '10px',
				// Only visible for testing purposes
				backgroundColor: 'rgba(245, 245, 245, .5',
				display: 'inline-block',
				margin: '3% 16%'
			})
			$p.appendTo($('#main'))

		}
		this.scoreboard()
		this.startTime()
	},
	startTime() {
		this.intervalID = setInterval(() => {
			
			// Will be used for logic like how frequently to display new comment...
			this.time++
			// console.log(this.time);
			
			// Have addCOmment() pass an argument to create new random instantiated comment.
			this.appUserScore
			if(this.time % 2 === 0 && this.appUserScore > 0) {
				// (Random Logic Here)
				// let createNewComment = hi//this.comments.length
				// this.addComment(createNewComment)

				// temporary fix?
				// this.comments = []
				this.addComment()
			}

			// utilize forEach?
			for(let i = 0; i <= this.comments.length-1; i++) {
				// Chnage this to document.body logic so that only when it is displayed since currently it will always be inside the comments[]
//	used-->		// alt.: Better solution may be to change bully to false within revealBully() class method. 
				if(this.comments[i].bully === true){
					this.appUserScore -= Math.ceil(this.appUserScore * 0.04)
					this.appUserScore -= 20
				}
			}


			this.scoreboard()
		}, 1000)
	},
	addComment() {
		// instantiate a Comment
		const helloComment = new Comment()
		console.log(helloComment);

		// Create logic for new class per time

		// store in array
		this.comments.push(helloComment)

		// this.startTime()
		this.showComment()
	},
	showComment() {
		// * length based on for loop above for hidden divs
		const randHiddenDiv = Math.floor(Math.random() * 18)

//		// For testing purposes only to view end of main div placement
		// $(`<h2 class="comments"></h2`).text(this.comments[0].bully).appendTo($('#main'))

		// use data
			// i.e. .data('name', this.comments.length-1)

		const $p = $(`<p class='comment'><span class="userComment">user: ${this.comments[this.comments.length-1].user}</span>"${this.comments[this.comments.length-1].string}"</p>`)
		// $p.appendTo($('.hiddenDiv'))
		$p.insertAfter($(`.hiddenDiv${randHiddenDiv}`))
		// $p.insertBefore($('.hiddenDiv'))
	},
	scoreboard() {
		this.appUserScore
		this.time
		$('.app-users').text(`Recurring Users: ${this.appUserScore}`)
		if(this.appUserScore <= 0) {
			$('.app-users').text(`Recurring Users: 0`)
//			// ClearInterval() goes here
			clearInterval(this.intervalID)
			this.gameEnd()
		}
		console.log(this.appUserScore);
	},
	gameEnd() {
		console.log("WHAT A Shame");
//		// ADD A BUNCH OF CSS, BLURS FILTERS, ..........Main Text/ buttons up front. Layering to come before other content? --> how to do that? --> Maybe even flexbox or position: ;

	},
	// Click event listener method that triggers class method
	revealTruthy($whatWasClicked) {

		// get index of what was clicked from dataset -- use that instead of this.comments.length - 1
		this.comments[this.comments.length-1].revealBully($whatWasClicked)

	}


}
game.hiddenDivPosition()
// game.addComment()

////Event Listeners
// try: #main w/ e.target try: .comment w/ e.currentTarget
$('#main').on('click', (e) => {
	console.log(e.currentTarget);
	// Previously e.target
	const $thisComment = $(e.target)
	if($thisComment.hasClass('comment')) {
		game.revealTruthy($thisComment)
	}
	// Utilize way to change comment when clicked on. Change ID main to general comment class?
	// if (e.currentTarget...bully === true) {
	// 	this.revealBully
	// }

})





