console.log(`--Cyber Crime--`);

// Order/ GOALs:
	// create multiple hidden divs within main divs (think hw10 or pokasquare)
	// Create test comment to appendTo random hidden div. within main div.
	// test clicks



// Class
class Comment {
	constructor(bully) {
		//bad or good  randomly assign
		const truthy = [true, false]
		const randomTruthy = Math.floor(Math.random() * truthy.length)
		this.bully = truthy[randomTruthy]

		// Add constructor for creating h2 with class comments. Then this can be accessed with revealBully?


		// this.user = 	// this.reportUser[0]
		// this.string = 	// this.comments[0].string

	}
	revealBully() {
		//change border color, maybe even bgColor to mainly transparent red or green

		if(this.bully === true) {
			// $('comments').addClass('revealedTrue')

			// border: 2px solid red;

			console.log("im truthy");
		}
		if(this.bully === false) {
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
		// store in array
		this.comments.push(helloComment)
		console.log(this.comments);
		// print on screen
		$(`<h2 class="comments"></h2`).text(this.comments[0].bully).appendTo($('#main'))
	},
	revealTruthy() {
		this.comments[0].revealBully()
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
		this.generateComment()
	},
	// generates random comment and user match
	generateComment() {
		const randReportUser = Math.floor(Math.random() * this.reportUser.length)
		const randComment = Math.floor(Math.random() * this.bullyStringGenerator.length)
		// Will have to find logic to 
		const randHiddenDiv = Math.floor(Math.random() * 15)

		$p = $(`<p class='comments'>"${this.bullyStringGenerator[0].string}"<span class="userComment">user: ${this.reportUser[0]}</span></p>`)
		// $p.appendTo($('.hiddenDiv'))
		$p.insertAfter($('.hiddenDiv8'))
		// $p.insertBefore($('.hiddenDiv'))
	}


}
game.hiddenDivPosition()
game.addComment()

//Event Listeners
$('#main').on('click', (e) => {
	console.log(e.currentTarget);
	$thisComment = $(e.target)
	if($thisComment.hasClass('comments')) {
		game.revealTruthy()
	}
	// Utilize way to change comment when clicked on. Change ID main to general comment class?
	// if (e.currentTarget...bully === true) {
	// 	this.revealBully
	// }

})





