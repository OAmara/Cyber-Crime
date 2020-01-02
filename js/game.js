console.log(`--Cyber Crime--`);

// Order/ GOALs:
	// create multiple hiddne divs within main divs (think hw10 or pokasquare)
	// Create test comment to appendTo random hidden div. within main div.
	// test clicks



// Class
class Comment{
	constructor(user, string) {
		this.user = game.reportUser[0]
		this.string = game.comments[0].string
	}

	revealBully() {
		//change border color, maybe even bgColor to mainly transparent red or green
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
	comments: [{
		string: "Bad Negative Comment",
		bully: true
	}, {
		string: "hello",
		bully: false
	}, {
		string: "world",
		bully: false
	}],
	hiddenDivPosition() {
		for(let i = 0; i <= 13; i++) {
			$h3 = $(`<h3 class='hiddenDiv''${i}'></h3>`)
				// `class='${i}'></h3>`)
			$h3.appendTo($('#main'))

			this.generateComment()
		}

	},
	// generates random comment and user match
	generateComment() {
		const randReportUser = Math.floor(Math.random * this.reportUser.length)
		const randComment = Math.floor(Math.random * this.comments.length)
		// Will have to find logic to 
		const randHiddenDiv = Math.floor(Math.random * 13)

		$h3 = $(`<h3 style="display: inline" class='comments'>${this.comments[0].string}<p>${this.reportUser[0]}</p></h3>`)
		$h3.appendTo($('.hiddenDiv'))

	}



}
game.hiddenDivPosition()

//Event Listeners
$('#main').on('click', (e) => {
	console.log(e.Currenttarget);
	console.log($(e.target));
	console.log(e.target);
	// Utilize way to change comment when clicked on. Change ID main to general comment class?
	// if (e.currentTarget...bully === true) {
	// 	this.revealBully
	// }

})





