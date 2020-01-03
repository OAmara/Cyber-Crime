console.log(`--Cyber Crime--`);

// Order/ GOALs:
	// create multiple hidden divs within main divs (think hw10 or pokasquare)
	// Create test comment to appendTo random hidden div. within main div.
	// test clicks

	// NEXT: Random string added to constructor from string array. Random hidden div.
		// if statement to determine if string is coming from bully or regular generator


// Class
class Comment {
	constructor(bully, string) {
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

		// Add constructor for creating h2 with class comments. Then this can be accessed with revealBully?


		// this.user = 	// this.reportUser[0]
		// this.string = 	// this.comments[0].string

	}
	revealBully($thisComment) {
		//change border color, maybe even bgColor to mainly transparent red or green

		if(this.bully === true) {
			$thisComment.addClass('revealedTrue').hide(2000)

			// border: 2px solid red;

			console.log("im truthy");
		}
		if(this.bully === false) {
			$thisComment.addClass('revealedFalse').hide(5000)
			// $('comments').addClass('revealedFalse')

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
	reportUser: ['Penguin1137', 'DirtyHarry'],
	// Comments; "bully" = true, "regular" = false
	bullyStringGenerator: [{
		string: "Bad Negative Comment",
		bully: true
	}],
	regularStringGenerator: [{
		string: "hello",
		bully: false
	}, {
		string: "world",
		bully: false
	}],
	comments: [],
	addComment() {
		// instantiate a Comment
		const helloComment = new Comment()
		console.log(helloComment);
		console.log(this.bullyStringGenerator.length);

		// store in array
		this.comments.push(helloComment)

		// print on screen
		// $(`<h2 class="comments"></h2`).text(this.comments[0].bully).appendTo($('#main'))

		this.generateComment()
	},
	// Click event listener method that triggers class method
	revealTruthy($thisComment) {
		this.comments[0].revealBully($thisComment)
	},

	startTimer() {
		const intervalId = setInterval()
	},
	hiddenDivPosition() {
		for(let i = 0; i <= 15; i++) {
			$p = $(`<p class='hiddenDiv${i}'></p>`)
				// `class='${i}'></p>`)
			$p.css({
				width: '10px',
				height: '10px',
				backgroundColor: 'blue',
				display: 'inline-block',
				margin: '3% 16%'
			})
			$p.appendTo($('#main'))

		}
		this.addComment()
	},
	// generates random comment and user match
	generateComment() {
		const randReportUser = Math.floor(Math.random() * this.reportUser.length)
		const randComment = Math.floor(Math.random() * this.bullyStringGenerator.length)
		// Will have to find logic to 
		const randHiddenDiv = Math.floor(Math.random() * 15)

		$(`<h2 class="comments"></h2`).text(this.comments[0].bully).appendTo($('#main'))

		$p = $(`<p class='comments'><span class="userComment">user: ${this.reportUser[0]}</span>"${this.bullyStringGenerator[0].string}"</p>`)
		// $p.appendTo($('.hiddenDiv'))
		$p.insertAfter($('.hiddenDiv8'))
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





