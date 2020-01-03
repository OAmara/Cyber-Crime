console.log(`--Cyber Crime--`);

// Order/ GOALs:
	// create multiple hidden divs within main divs (think hw10 or pokasquare)
	// Create test comment to appendTo random hidden div. within main div.
	// test clicks

	// NEXT: create game timer(currently in startTimer(), score system


// Class
class Comment {
	constructor(bully, string, user) {
		//bad or good  randomly assign
		const truthy = [true, false]
		const randomTruthy = Math.floor(Math.random() * truthy.length)
		this.bully = truthy[randomTruthy]

		// Add random string from array according to truthy
		// May have to edit this portion if errors occur utilizing this.string
		const randomBully = Math.floor(Math.random() * game.bullyStringGenerator.length)
		const randomRegular = Math.floor(Math.random() * game.regularStringGenerator.length)
		if(this.bully == true) {
			this.string = game.bullyStringGenerator[randomBully].string
		}
		if (this.bully == false) {
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
		//change border color, maybe even bgColor to mainly transparent red or green

		if(this.bully === true) {
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
		console.log("it works!");

			//i.e. if(this....bully === false) {jQuery change class name to this new class name that
				// changes color turn comment green}
				// else {jQuery change class to class that reveals bully === true}
				// Then slowly hide comment until it is in "space and time" --> not in body. .remove()

	}

}

// Game
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
	addComment() {
		// instantiate a Comment
		const $helloComment = new Comment()
		console.log($helloComment);
		console.log(this.bullyStringGenerator.length);

		// Create logic for new class per timer

		// store in array
		this.comments.push($helloComment)

		// print on screen
		// $(`<h2 class="comments"></h2`).text(this.comments[0].bully).appendTo($('#main'))
		this.scoreboard()
		this.generateComment()
	},
	// Click event listener method that triggers class method
	revealTruthy($thisComment) {
		this.comments[0].revealBully($thisComment)
	},

	startTimer() {
		const intervalId = setInterval()
	},
	scoreboard() {
		this.appUserScore
		$('.app-users').text(`Recurring Users: ${this.appUserScore}`)
		console.log(this.appUserScore);
	},
	hiddenDivPosition() {
		for(let i = 0; i <= 20; i++) {
			$p = $(`<p class='hiddenDiv${i}'></p>`)
				// `class='${i}'></p>`)
			$p.css({
				width: '10px',
				height: '10px',
				// Only visible for testing purposes
				backgroundColor: 'rgba(245, 245, 245, .4',
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

//Event Listeners
$('#main').on('click', (e) => {
	console.log(e.currentTarget);
	$thisComment = $(e.target)
	if($thisComment.hasClass('comments')) {
		game.revealTruthy($thisComment)
	}
	// Utilize way to change comment when clicked on. Change ID main to general comment class?
	// if (e.currentTarget...bully === true) {
	// 	this.revealBully
	// }

})





