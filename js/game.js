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


// Class
class Comment {
	constructor(bully, string, user) {
		// bad or good randomly assign. 
//		// Add/ Remove a True or False in truthy Array to alter odds of getting one over another.
			// Additional rounds may have more true (bullys) to become progressively harder.
		const truthy = [true, false, true]
		const randomTruthy = Math.floor(Math.random() * truthy.length)
		this.bully = truthy[randomTruthy]

		// Add random string from array according to truthy
		// May have to edit this portion if errors occur utilizing this.string
		const randomBully = Math.floor(Math.random() * game.bullyStringGenerator.length)
		const randomRegular = Math.floor(Math.random() * game.regularStringGenerator.length)
		if(this.bully === true) {
			this.string = game.bullyStringGenerator[randomBully].string
		}
		if (this.bully === false) {
			this.string = game.regularStringGenerator[randomRegular].string
		}

		// Random user reported comment
		const randomUser = Math.floor(Math.random() * game.reportUser.length)
		this.user = game.reportUser[randomUser]

		// Add constructor for creating h2 with class comments. Then this can be accessed with revealBully?


		// this.user = 	// this.reportUser[0]
		// this.string = 	// this.comments[0].string

	}
	revealBully($thisComment) {
		// alt. = changing bully color to regular when clicked and regular disappears when clicked.

		//change border color, maybe even bgColor to mainly transparent red or green
		if(this.bully === true) {
			// MAY be better to use .classList or .className , .remove() then .addclass()
			$thisComment.addClass('revealedTrue').hide(3500).text(`\u{1F44D} Suspended Account: ${this.user}`).css('fontSize', '0.85em')
			game.appUserScore += 80
			game.scoreboard()

			// border: 2px solid red;

			console.log("im truthy");
		}
		if(this.bully === false) {
			$thisComment.addClass('revealedFalse').hide(5000).text(`${this.user} wrote "I'm giving you a bad rating"`).css('fontSize', '0.85em')
			game.appUserScore = Math.ceil(game.appUserScore * 0.75)
			game.scoreboard()

			console.log("im falsy");
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
	bullyStringGenerator: [{
		string: "Bad Negative Comment Here",
		bully: true
	}, {
		string: "You Know Nobody likes you",
		bully: true
	}],
	regularStringGenerator: [{
		string: "Hello, I am a Good Comment",
		bully: false
	}, {
		string: "Good Comment here, nice to meet you",
		bully: false
	}],
	comments: [],
	appUserScore: 1000,
	// Just for visualization
	time: 0,
	intervalID: 0,
	addComment() {
//	//Create instantiated class name that is universal and will be added to comments array with every passing
		// this.comments.length++
		// let newClassObject = $helloComment
		// console.log(newClassObject);

		// instantiate a Comment
		const $helloComment = new Comment()
		console.log($helloComment);

		// Create logic for new class per time

		// store in array
		this.comments.push($helloComment)

		// print on screen
		// $(`<h2 class="comments"></h2`).text(this.comments[0].bully).appendTo($('#main'))
		this.startTime()
		this.scoreboard()
		this.generateComment()
	},
	// Click event listener method that triggers class method
	revealTruthy($thisComment) {
		this.comments[this.comments.length-1].revealBully($thisComment)
	},

	startTime() {
		this.intervalID = setInterval(() => {
			// Will be used for logic like how frequently to display new comment...
			this.time++
			// console.log(this.time);
			
			// Have addCOmment() pass an argument to create new random instantiated comment.
				// (Random Logic Here)
			this.addComment()


			// utilize forEach?
			for(let i = 0; i <= this.comments.length-1; i++) {
				// Chnage this to document.body logic so that only when it is displayed since currently it will always be inside the comments[]
//					// alt.: Better solution may be to change bully to false within revealBully() class method. 
				if(this.comments[i].bully === true){
					this.appUserScore = Math.ceil(this.appUserScore * 0.97)
					this.appUserScore-=10
					this.scoreboard()
				}
			}

			// this.addComment() placed here when figured out how to instantiate class with new const everytime. 



		}, 1000)
	},
	scoreboard() {
		this.appUserScore
		$('.app-users').text(`Recurring Users: ${this.appUserScore}`)
		console.log(this.appUserScore);
		if(this.appUserScore <= 0) {
			$('.app-users').text(`Recurring Users: 0`)
//			// ClearInterval() goes here
			clearInterval(this.intervalID)
			this.gameEnd()
		}
	},
	gameEnd() {
		console.log("WHAT A SHAME");
//		// ADD A BUNCH OF CSS, BLURS FILTERS, ..........Main Text/ buttons up front. Layering to come before other content? --> how to do that? --> Maybe even flexbox or position: ;

	},
	hiddenDivPosition() {
		for(let i = 0; i <= 20; i++) {
			$p = $(`<p class='hiddenDiv${i}'></p>`)
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
		this.addComment()
	},
	// generates random comment and user match
	generateComment() {
		// * length based on for loop above for hidden divs
		const randHiddenDiv = Math.floor(Math.random() * 20)

		$(`<h2 class="comments"></h2`).text(this.comments[0].bully).appendTo($('#main'))

		$p = $(`<p class='comments'><span class="userComment">user: ${this.comments[this.comments.length-1].user}</span>"${this.comments[this.comments.length-1].string}"</p>`)
		// $p.appendTo($('.hiddenDiv'))
		$p.insertAfter($(`.hiddenDiv${randHiddenDiv}`))
		// $p.insertBefore($('.hiddenDiv'))
	}


}
game.hiddenDivPosition()
// game.addComment()

////Event Listeners
// Previously #main, but issue with not triggering when clicking in whitespace of .comments
$('.comments').on('click', (e) => {
	console.log(e.currentTarget);
	// Previously e.target
	$thisComment = $(e.currentTarget)
	if($thisComment.hasClass('comments')) {
		game.revealTruthy($thisComment)
	}
	// Utilize way to change comment when clicked on. Change ID main to general comment class?
	// if (e.currentTarget...bully === true) {
	// 	this.revealBully
	// }

})





