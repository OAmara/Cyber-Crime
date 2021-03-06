console.log(`--Cyber Crime--`);

// Order/ GOALs:
	// Focus: 

	// NEXT:  
		// Rounds
			// Each round adds true within truthy array to increase odds of bully comments.
			// Proper way may be to extend class to change class each round...
				//...since a Class should never change. 
			// BONUS+: Each round stores previous round data into array and displays stats before resetting variables. Maybe user want to be able to go back to previous rounds?
				// This would require .empty() on #main div.
					//Unless there is a way to save what is attached to a div. Like var. = #main.children()

		// Skills -- look at skill1 to continue
			// First skill button is to use 2 stars to wipe all good commemnts on screen.
				// On hover: display skill button discription.
				// USE EMOJI CODE: \u{1F4AB} or \u{1F320} --> increase font-size w/ CSS.


// lines that begin with comment (//) = stretch goal/ future itteration.
// Class
class Comment {
	constructor(bully, string, user) {
		// bad or good randomly assigned 
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
//	// IN ORDER TO change increments/ decrements per round. if statements can instead call method in game that will determine truthy or falsy. Multiply specific points per round. This will be done to then change per round for difficulty setting.
	revealBully($whatWasClicked) {
		// alt. = changing bully color to regular when clicked and regular disappears when clicked.

		//change border color, maybe even bgColor to mainly transparent red or green
		if(this.bully === false) {
			$whatWasClicked.addClass('revealedFalse').hide(5000).text(`${this.user} wrote "I'm giving you a bad rating"`).css('fontSize', '0.85em')
//			// Place all scoring within new method in game
			game.appUserScore = Math.ceil(game.appUserScore * 0.85)

			// Determines Rating for next round
			if (game.stars > 0) {
				game.stars -= 2
				if (game.stars <= 0) {
					game.stars = 0
				}
			}
			game.wrongUsersBanned++
			this.bully = null
			game.scoreboard()


			console.log("I'm falsy");
		}
		if(this.bully === true) {
			// MAY be better to use .classList or .className , .remove() then .addclass()
			$whatWasClicked.addClass('revealedTrue').hide(3500).text(`\u{1F44D} Banned Account: ${this.user}`).css('fontSize', '0.85em')

			// Place all scoring within new method in game		
			if(game.appUserScore > 0) {
				game.appUserScore+=242
				// For testing
				game.appUserScore+= 800
				game.appUserScore+=Math.ceil(game.appUserScore * 0.064)
			}
			game.stars++
			game.bullyAccountsBanned++
			// Change value so that for loop logic within scoreboard() prevents point decrement for having bully in comments array
			// Previously this.bully = false, changed to null to prevent user from dbl-clicking! 
			this.bully = null
			game.scoreboard()

			console.log(`I was truthy, now I'm ${this.bully}`);
		}
	}

}

// lines that begin with comment (//) = stretch goal/ future itteration.
// Game
const game = {
	// Random user reporting comment
	reportUser: ['Penguin1137', 'DirtyHenry', 'sparkles87', 'HELLokItteN66', 'frenchToast44', 'Anonymous', 'RaidStryker22', 'H@K3Rtroll', 'GoodSam13', 'meLLoyeLLo', 'paLindroMe76', 'chknFryer44', 'iLLiNTENT99', 'bADsEED'],
	// Comments; "bully" = true, "regular" = false --> may not need this.
	bullyStringGenerator: [
		"Bad, Negative Comment Here",
		"Bad, You Know Nobody likes you",
		"You are worst than dirt",
		"A fart would smell better than You.",
		"This App is as Bad as your photo"
		],
	regularStringGenerator: [
		"Good day sir, I am a Good Comment",
		"Good Comment here, nice to meet you",
		"Oh, how I love pancakes!",
		"many Hugs and Kisses xoxo",
		"I can't believe it's not butter."
		],
	comments: [],
	appUserScore: 1000,
	// Just for visualization
	time: 0,
	timer: 0,
	totalTimer: 0,
	stars: 0,
	// Total correct clicks
	bullyAccountsBanned: 0,
	// Total wrong clicks; Total: star loss, banned regular user
	wrongUsersBanned: 0,
	intervalID: 0,
	// round & pauseRound logic used for when game/round Ends or when user pauses round.
	// Goal: Game logic will pause when round != pauseRound. When pause button pressed to pause, pauseRound +=1,
	//pressed again pauseRound -=1. Same when starting next round
	round: 0,
	pauseRound: 0,

	// roundStatHolder array containing each round statistic to display when paused and next round screen.
	roundStatistics: [],
	// refer to roundStatDisplay()
	totalUsers: 0,
	youreFired: false,
	hiddenDivPosition(num) {
		for(let i = 0; i <= 2500; i++) {
			const $p = $(`<p class='hiddenDiv${i}'></p>`)
				// `class='${i}'></p>`)
			$p.css({
				width: '2.5px',
				height: '2.5px',
				// Only visible for testing purposes: change transparency to view
				backgroundColor: 'rgba(245, 245, 245, 0',
				display: 'inline-block',
				margin: '0.2% 0.2%'
			})
			$p.appendTo($('#main'))

		}
		// not currently used
		if (num != true) {
			this.startTime()
		}

		// For #pause click event use to start game
		this.intervalID = -1
		this.scoreboard()
	},
	startTime() {

		this.intervalID = setInterval(() => {
			
			// Will be used for logic like how frequently to display new comment...
			this.time++
			// console.log(this.time);
			this.timer += 2
			this.totalTimer += 2
			
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
//					// was roughly around 0.00488, changed for presentation purposes.
					this.appUserScore -= Math.ceil(this.appUserScore * 0.00188)
					this.scoreboard()
					this.appUserScore--
				} else{
					// this.appUserScore += Math.ceil(this.appUserScore * 0.009)
					this.scoreboard()
					this.appUserScore++
				}
			}

			this.scoreboard()
//		// Keep very closely around 200
		}, 200) // IF this is not 200, need to change this.timer & this.totalTimer to reflect proper time.
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

		const $p = $(`<p class='comment'><span class='userComment'>user: ${this.comments[this.comments.length-1].user}</span>"${this.comments[this.comments.length-1].string}"</p>`)

		$p.data('whichComment', this.comments.length-1)

		$p.insertAfter($(`.hiddenDiv${randHiddenDiv}`))
		// $p.insertBefore($('.hiddenDiv'))

//		//Place roundStatDisplay() content HERE FOR TESTING:

	},
	scoreboard(buttonPause) {
		// Need to get Rating to 5 stars and score to 3000 for round 2.
		if (buttonPause === 'end') {
			const $tooBad = $('<h1>Collect your things.</h1>')
			$('#main').empty()
			$('#main').append($tooBad)
			console.log($tooBad);
		}
	
		// Score Display
		$('.app-users').text(`Recurring Users: ${this.appUserScore}`)
		// Rating Display
		$('.user-rating').text(`App Rating: `)
		// First skill button Display
		$('#skill-star-comment-clear').text(`\u{1F4AB}`)

		this.starRating()

		// this.buttonPresentation()
		if (this.round > 0){
			if (this.appUserScore <= (this.roundStatistics[this.round-1].appUserScoreIs * 0.5)) {
				$('.app-users').text(`Recurring Users: 0`)
//				// ClearInterval() goes here
				clearInterval(this.intervalID)
				this.youreFired = true
				this.gameEnd()
			}
		} else if (this.appUserScore <= 500) {
			$('.app-users').text(`Recurring Users: 0`)
			clearInterval(this.intervalID)
			this.youreFired = true
			this.gameEnd()
		}
		if (buttonPause === 1) {
			this.pauseGame()
		}
	},
	starRating() {
		// 4 for testing, 10 for actual.
		if (this.stars >= 6 && this.appUserScore >= 3000) {
			this.endRound()
		} else {
			if (this.stars <= 0) {
				// Display this image attr in class .user-rating
				$(`.user-rating`).text(`App Rating: \u{2605} \u{2605} \u{2605} \u{2605} \u{2605}`)
			//originally: (this.stars >= 2 && this.stars <= 3)
			} else if (this.stars === 1) {
				// Display this image
				$(`.user-rating`).text(`App Rating: \u{2B50} \u{2605} \u{2605} \u{2605} \u{2605}`)
			// originally: (this.stars >= 4 && this.stars <= 5)
			} else if (this.stars === 2) {
				// Display this image
				$(`.user-rating`).text(`App Rating: \u{2B50} \u{2B50} \u{2605} \u{2605} \u{2605}`)
			// originally: (this.stars >= 6 && this.stars <= 7)
			} else if (this.stars === 3) {
				// Display this image
				$(`.user-rating`).text(`App Rating: \u{2B50} \u{2B50} \u{2B50} \u{2605} \u{2605}`)
			// originally: (this.stars >= 8 && this.stars <= 9)
			} else if (this.stars === 4) {
				// Display this image
				$(`.user-rating`).text(`App Rating: \u{2B50} \u{2B50} \u{2B50} \u{2B50} \u{2605}`)
			// originally: (this.stars >= 10)
			} else if (this.stars === 5) {
				// Display this image
				$(`.user-rating`).text(`App Rating: \u{1F31F} \u{1F31F} \u{1F31F} \u{1F31F} \u{1F31F}`)
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
		$(`.user-rating`).text(`App Rating: \u{1F929} \u{1F929} \u{1F929} \u{1F929} \u{1F929}`)
		
		// New variable that saves round variables as statistics within an array.
		// Round variables held in here, pushed into roundStatistics, then erased for next round.
		const roundStatHolder = [{
			roundIs: this.round/*this.round*/,
			appUserScoreIs: this.appUserScore,
			bullyAccountsBannedIs: this.bullyAccountsBanned/*this.*/,
			wrongUsersBannedIs: this.wrongUsersBanned
		}]
		console.log(roundStatHolder);
		this.roundStatistics.push(roundStatHolder[0])
		console.log(this.roundStatistics[this.round-1]);
		console.log(this.roundStatistics[this.round-1].appUserScoreIs);

		this.roundStatDisplay()
		// this.newRound()
	},
	// Click event for button that displays when round is won.
	newRound() {
//		// USE css to clear screen within divs then start with this.hiddenDivPosition() instead
		// this.startTime()

	$('#main').css({
			filter: 'blur(0px)',
			// zIndex: '1'
	})
	$('#stats').hide().css({
			zIndex: '-1'
		})
	$('#pause').show()

		// this.comments = []
		this.stars = 0
		this.wrongUsersBanned = 0
		this.timer = 0

		this.pauseRound++
		this.startTime()
	},
	gameEnd() { // MAKE IT SO WHEN YOU LOSE YOU CAN START FROM LAST ROUND STATS
		this.pauseRound++
		console.log("WHAT A Shame");
		$(`.user-rating`).text(`Filed Bankrupt: \u{26B0} \u{FE0F}`) //⚰️
		$('#main').empty().append(`<h4>You're Fired!</h4>`).css({
				textAlign: 'center',
				fontSize: '1.8em',
				margin: '1px auto'
			})
		if (this.round <= 0) {
			$('#main').append('<h6>Did not even last a day.</h6>').append('<p>Clear out your desk.</p>')
		}
		if (this.round > 0) {
			$('#main').append(`<h5>\n\t~ Progress ~\n</h5>`).append(`<h6>You worked a total of ${((Math.floor(this.totalTimer))/10)}s and made it to day ${this.round}. </h6>`).append(`<h6><br/>- Total Users: ${this.roundStatistics[this.round-1].appUserScoreIs}</h6>`).append(`<h6><br/>- Accounts Banned: ${this.bullyAccountsBanned}<h6>`).append(`<h6><br/>- Horrible! You banned ${this.wrongUsersBanned} falsely reported users.</h6>`).append(`<h6>\u{2B07}File for Unemployment?\u{2B07}</h6>`).append(`<button class="stat-button">Good Luck.</button>`)
		}
//		// ADD A BUNCH OF CSS, BLURS FILTERS, ..........Main Text/ buttons up front. Layering to come before other content? --> how to do that? --> Maybe even flexbox or position: ;

	},
	// Displays roundstats with next round button displayed. Blurs background(z-index: -1) html.
	roundStatDisplay() {

		if (this.round <= 1) {
			this.totalUsers = (this.appUserScore)
		} else {
			// Might Need for future math use
			// for (let i = 0; i <= this.roundStatistics.length; i++) {
			// 	this.totalUsers += this.roundStatistics[i].appUserScoreIs
			// }
			this.totalUsers = (this.appUserScore) - (this.roundStatistics[this.round-2].appUserScoreIs)
		}

		$('#main').css({
			filter: 'blur(2.1px)',
			zIndex: '-1'
		})
		//// Timer Testing:
			// 		console.log(this.timer);
			// console.log(((Math.floor(this.timer))*0.1));
			// console.log(((Math.floor(this.timer))/10));
			// console.log(((Math.floor(this.timer))/(10)));
		$('#stats').empty()
		$('#stats').append(`<h4>Do I hear Revenue! Great Job on Keeping Your Recurring Users by Banning the Internet Trolls & Cyber Bullies.</h4>`).append(`<h4>\n\t~ Day ${this.round} Statistics ~\n</h4>`).append(`<h5>- It took you ${((Math.floor(this.timer))/10)}s to finish your shift.</h5>`).append(`<h5>- Total Recurring Users: ${this.appUserScore}</h5>`).append(`<h5>- New Users from Day ${this.round}: ${this.totalUsers}</h5>`).append(`<h5>- Accounts Banned: ${this.bullyAccountsBanned}</h5>`).append(`<h5>Tip: Be Careful! You accidentally banned ${this.wrongUsersBanned} falsely reported users. Each one you ban reduces your Users and Ratings</h5>`).append(`<h6><br/>\nGet ready to clock in!</h6>`).append(`<h6>\u{2B07}</h6`).append(`<button class="stat-button">Day ${(this.round) + 1}</button>`).append(`<h6>\u{2B06}</h6>`).show().css({
			zIndex: '2',
			filter: 'blur(0px)'
		})
		$('#pause').hide()

	},
	// Determines to pause or play game
	pauseGame() {
	// (i)
	// Similar to roundStatDisplay(), but displays how to play (i)info.
	// alt: display stats, roundStatHolder variable will have to be pushed at beginning of game to be displayed at any moment.
	// Also change css for pause button(w/ emoji) to play button(w/ emoji)
	
		if (this.intervalID != -1) {
			if (this.round === this.pauseRound) {
			clearInterval(this.intervalID)
			console.log(this.intervalID);
			this.pauseRound++
			this.pauseDisplay(1)
			} else {
			this.pauseRound--
			console.log(this.intervalID);
			this.pauseDisplay(2)
			this.startTime()
			}
		} else if (this.intervalID === -1) {
			this.intervalID = 0
			this.pauseDisplay(2)
			this.startTime()
		}	
	},
	// From click event that shows/ hides how pause button looks and how to play div while paused:
	pauseDisplay(num) {

		if (num === 1 || num === 3) {
			$('#main').css({
				filter: 'blur(2.3px)',
				// zIndex: '-1'
			})
 			$('#pause').css({
						height: '68px',
						width: 'auto',
						fontSize: '3.5em',
						padding: '0px 0px',
						margin: 'auto 5% auto 35%',
						backgroundColor: 'transparent',
						boxShadow: '0px 0px 5px 1px transparent, 20px 0px 0px 0px transparent, 20px 0px 5px 1px transparent',
						color: 'rgba(150, 150, 150, 0.8)',
						outlineColor: 'grey',
						outlineStyle: 'inset'
            		}).text('\u{25B6}')
 				// Issues with with clicking, .mouseout() changing to previous style before click
 			// $('#pause').hover(function() {
    //         		$(this).css({
				// 		height: '50px',
				// 		width: '50px',
				// 		fontSize: '3.8em',
				// 		padding: '0px 5px',
				// 		margin: 'auto 5% auto 50%',
				// 		backgroundColor: 'transparent',
				// 		boxShadow: '0px 0px 5px 1px transparent, 20px 0px 0px 0px transparent, 20px 0px 5px 1px whitesmoke',
				// 		color: 'rgba(150, 150, 150, 0.8)'
    //         		}).text('\u{25B6}')
    //       	}).mouseout(function(){
    //           		$(this).css({
    //           			height: '50px',
				// 		width: '50px',
				// 		fontSize: '2.8em',
				// 		padding: '0px 5px',
				// 		margin: 'auto 5% auto 50%',
				// 		backgroundColor: 'transparent',
				// 		boxShadow: '0px 0px 5px 1px transparent, 20px 0px 0px 0px transparent, 20px 0px 5px 1px whitesmoke',
				// 		color: 'rgba(150, 150, 150, 0.8)'
		  //          	})
    //       	});
			$('.pause-stars').text(`\u{2B50} \u{2B50} \u{2B50} \u{2605} \u{2605}`)
			$('#while-pause').css({
					zIndex: '4',
					visibility: 'visible'
				})

			// Changes from welcome story to how to play after starting.
			if (num === 3) {

				this.hiddenDivPosition(true)
			} else {
				$('.intro-pause').text('How To Play:')
				$('.intro-story').remove()
			}
		}
		if (num === 2) {
			$('#main').css({
				filter: 'blur(0px)',
				// zIndex: '-1'
			})
 			$('#pause').css({
					height: '40px',
				width: '1px',
				fontSize: '2.5em',
				padding: '0px 5px',
				margin: 'auto 5% auto 35%',
				backgroundColor: 'lightgrey',
				boxShadow: '0px 0px 5px 1px grey, 20px 0px 0px 0px lightgrey, 20px 0px 5px 1px grey',
				color: 'rgba(150, 150, 150, 0)',
				outline: 'none'
			}).text('||')
 			// Issues with with clicking, .mouseout() changing to previous style before click
 		// 	$('#pause').hover(function() {
   //          		$(this).css({
			// 		height: '40px',
			// 	width: '1px',
			// 	fontSize: '2.5em',
			// 	padding: '0px 5px',
			// 	margin: 'auto 5% auto 50%',
			// 	backgroundColor: 'lightgrey',
			// 	boxShadow: '0px 0px 5px 1px grey, 20px 0px 0px 0px lightgrey, 20px 0px 5px 1px grey',
			// 	color: 'rgba(150, 150, 150, 0)'
			// }).text('||')
   //        	}).mouseout(function(){
   //            		$(this).css({
			// 		height: '40px',
			// 	width: '1px',
			// 	fontSize: '2.5em',
			// 	padding: '0px 5px',
			// 	margin: 'auto 5% auto 50%',
			// 	backgroundColor: 'lightgrey',
			// 	boxShadow: '0px 0px 5px 1px grey, 20px 0px 0px 0px lightgrey, 20px 0px 5px 1px grey',
			// 	color: 'rgba(150, 150, 150, 0)'
		 //           	}).text('||')
   //        	});
			$('#while-pause').css({
					zIndex: '-4',
					visibility: 'hidden'
				})
		}

	},
	// this changes display and usage of buttons according to if skill is ready...
//	// have passing arg look like: buttonPresentation(null, skill2, null)
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
//Initiates game display, then #Pause button click event triggers game start.
game.pauseDisplay(3)

// game.hiddenDivPosition()
// game.addComment()

////Event Listeners
// Comment truthy/ falsy reveal
$('#main').on('click', (e) => {

	// First if for pause functionality.
	if (game.round === game.pauseRound) {
		const $clicked = $(e.target)

		// if user clicks comment
		if ($clicked.hasClass('comment')) {
			game.revealTruthy($clicked)
		} 
		// if user clicks child or comment
		if ($clicked.hasClass('userComment')) {
			const childOfParent = $clicked.parent()
			game.revealTruthy(childOfParent)
		}
	}
})

// Skill1 button to clear all regular comments to sacrifice 2 stars
$('#skill-star-comment-clear').on('click', (e) => {
	console.log(e.target);
	if (game.round === game.pauseRound) {
		const $skillClick = $(e.target)
		game.buttonPresentation($skillClick)
	}
	// Reference tamagtochi for utilizing clicks to change variable values. How can this be utilized in passing argument into game method. That way data will be stored more properly.
})

// Pause game button that triggers game.pauseGame()
$('#pause').on('click', (e) => {
	// game.pauseGame()
	if (game.youreFired === false) {
		const pauseClick = $(e.target)
		game.scoreboard(1)
	} else if (game.youreFired === true) {
		game.scoreboard('end')
	}

})

// Button to start next round
$('#stats').on('click', (e) => {
	console.log(e.target)	
	if ($(e.target).hasClass('stat-button')) {
		game.newRound()
	}
})



