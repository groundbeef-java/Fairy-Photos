/* --- answer-element correspondence --- */
/*  A - Water
    B - Star
    C - Cloud
    D - Forest */
/* ------------------------------------- */

/* --- Variables --- */
let questionIndex = -1

const elements = Object.freeze({
    WATER: "Water",
    STAR: "Star",
    CLOUD: "Cloud",
    FOREST: "Forest"
})

const elementCounters = new Map()

Object.values(elements).forEach(element => {
    elementCounters.set(element, 0)
})

const NUMBER_OF_QUESTIONS = 14

const container = document.getElementsByClassName("container")
/* ----------------- */

/* --- Images --- */
const titlePageBackground = "New Images/fairy-background.gif"
const questionBackgroundImage = "New Images/question-page-background.jpg"
/* -------------- */

const qAndA = {
    // Question 1
    "Which vacation sounds the most appealing to you?": 
        ["Summer Beach party", 
            "Cozy movie night at home", 
            "Café date with your best friends", 
            "Exploring and being outside"],

    // Question 2
    "What's the first thing you do in the morning?":
        ["A cup of coffee is enough to get my day started", 
            "A strict morning routine that helps me get energized for the day", 
            "Turn off alarm and go back to sleep", 
            "Have a big yummy breakfast before anything"],

    // Question 3
    "When things start to get overwhelming what do you do?":
        ["Retreat to a safe space", 
            "Address it head on",
            "Start crashing out",
            "Reach out to friends or loved ones, so they can help you through it"],

    // Question 4
    "Which one of these jobs sounds the most appealing to you?":
        ["Dolphin trainer", 
        "Video Game Designer", 
        "Professional Bird-Watcher", 
        "Park Ranger"],

    // Question 5
    "How do you normally deal with your emotions?":
        ["I don’t really address them, and always put on a happy face", 
        "I let myself feel whatever I need to and then move on", 
        "I tell everyone what I’m feeling all the time", 
        "I’m pretty in touch with my emotions and know how to regulate them"],

    // Question 6
    "If you had to hide a treasure, where would you hide it?":
        ["Bury it in the sand, then make a map to it (classic)", 
        "Somewhere outside where there’s a lot of spiders surrounding it",  
        "Forgets where it’s hidden, so no one ever finds it", 
        "Hide it at home under my mattress"], 

    // Question 7
    "What treat are you getting at the vending machine?":
        ["Something very salty",  
        "Something with a lot of protein", 
        "Something very sugary",  
        "Something very nutty"],

    // Question 8
    "What do you do if you can’t get past a level in a video-game?":
        ["Turns the whole thing off", 
        "Refuses to look anything up, and figure it out without any help",  
        "Start crashing out (it’s the games fault)",
        "Go search up the solution online"], 

    // Question 9
    "How does math make you feel?": 
        ["I like doing math, until it gets hard",  
        "I’m usually able to figure it out",   
        "*Vietnam Flashbacks*", 
        "I like learning math I need to know for real life"], 

    // Question 10 
    "What kind of vibe do you think you bring to a party?": 
        ["I’m always the first one to leave", 
        "I don’t go to a lot of parties",  
        "I can’t wait to talk and meet everyone there and get to know all the tea", 
        "I stick with 1 or 2 close friends but always have a good time"], 

    // Question 11
    "If you’re upset with someone, what do you do?": 
        ["Don’t address anything until later – once I’ve collected my thoughts", 
        "It depends on the person whether I choose to be confrontational or not",  
        "Confront them immediately",  
        "Try to casually resolve upset feelings (doesn’t like confrontation)"],

    // Question 12
    "If you were to get an offer from your dream job, how would you react?": 
        ["I immediately start planning for whatever the offer entails", 
        "Making sure it’s not a scam",  
        "Immediately telling every single person I know",  
        "Be excited but continue with the day"],  

    // Question 13
    "Which word sounds the goofiest to you?": 
        ["Hoecake", 
        "Smeeg",  
        "Bumfuzzle",   
        "Plushbottom"], 

    // Question 14
    "If you had to write a book, what would it be about?": 
        ["A fictional story that I’ve always wanted to tell",  
        "A commentary on a certain issue",  
        "Me (auto-biography)",  
        "Something I know a lot about and have a passion for"] 
    }

const yesButton = document.getElementById("yes-button") 

yesButton.addEventListener("click", () => {
    document.getElementById("start-screen").style.display = "none"
    startQuiz()
})

function startQuiz() {
    document.body.classList.add("question-mode");

    const buttons = document.getElementById("buttons")
    const questionNumber = document.getElementById("question-number")
    const question = document.getElementById("question")

    const footer = document.createElement("footer")
    footer.textContent = "Created by Mila Maes & Shawn Pribadi"
    document.body.appendChild(footer)

    nextQuestion(buttons, questionNumber, question)
}

function nextQuestion(buttons, questionNumber, question) {
    questionIndex++

    buttons.innerHTML = ""

    if (questionIndex == NUMBER_OF_QUESTIONS) {
        const tallyMap = countTally()
        endQuiz(tallyMap, buttons, questionNumber, question)
        return
    }

    if (questionIndex > NUMBER_OF_QUESTIONS) {
        questionIndex = 0
    }
    /* --------------------------------------------------- */

    questionNumber.textContent = `Question ${questionIndex + 1}`
    question.textContent = Object.keys(qAndA)[questionIndex]

    const answerArray = Object.values(qAndA)[questionIndex]
    const elementsArray = Object.values(elements)

    answerArray.forEach((answer, index) => {
        const button = document.createElement("button")
        button.textContent = answer

        button.addEventListener("click", () => {
            addElement(elementsArray[index])
            nextQuestion(buttons, questionNumber, question)
        })

        buttons.appendChild(button)
    })
}

function addElement(element) {
    let currentCount
    currentCount = elementCounters.get(element)
    currentCount++
    elementCounters.set(element, currentCount)
}

function countTally() {
    const tempMap = new Map()
    let largestValue = -Infinity 
    
    elementCounters.forEach((counter, element) => {
        if (counter > largestValue) {
            largestValue = counter
            tempMap.clear()
            tempMap.set(element, counter)
        } else if (counter === largestValue) {
            tempMap.set(element, counter)
        }
    })
    return tempMap
}

function displayCounters() {
    let counterString = ""
    counterString += `Water Counter: ${elementCounters.get("Water")}<br>`
    counterString += `\nStar Counter: ${elementCounters.get("Star")}<br>`
    counterString += `\nCloud Counter: ${elementCounters.get("Cloud")}<br>`
    counterString += `\nForest Counter: ${elementCounters.get("Forest")}<br>`
    
    return counterString
}

function endQuiz(tallyMap, buttons, questionNumber, question) {
    questionIndex = -1
    if (tallyMap.size > 1) {
        tiebreaker(tallyMap, buttons, questionNumber, question)
    } else if (tallyMap.size === 1) {
        const element = Array.from(tallyMap.keys())[0]
        showResult(element)
    }
}

function tiebreaker(tallyMap, buttons, questionNumber, question) {
    /* Tie breaker question: Which planet would you want to travel to if you could?  
    Neptune 
    Saturn  
    I want to visit all of them 
    I’d rather stay on earth 
    */

    buttons.innerHTML = ""

    questionNumber.textContent = `Question ${NUMBER_OF_QUESTIONS + 1}`
    question.textContent = "Which planet would you want to travel to if you could?" 

    tallyMap.forEach((count, element) => {
        const button = document.createElement("button")

        if (element === elements.WATER) {
            button.textContent = "Neptune"
        }

        if (element === elements.STAR) {
            button.textContent = "Saturn"
        }

        if (element === elements.CLOUD) {
            button.textContent = "I want to visit all of them."
        }
    
        if (element === elements.FOREST) {
            button.textContent = "I'd rather stay on Earth."
        }

        button.addEventListener("click", () => {
            showResult(element)
        })

        buttons.appendChild(button)
    }) 
}

function showResult(element) {
    document.body.innerHTML = ""
    
    const descriptionContainer = document.createElement("p")
    descriptionContainer.id = "fairy-description"
    
    const fairyImage = document.createElement("img")
    fairyImage.id = "final-fairy-image"

    switch (element) {
        case elements.WATER:
            fairyImage.src = "New Images/water-fairy.jpg"
            descriptionContainer.textContent = 
                `These fairies are found near refreshing lakes, ponds, streams, or even puddles. 
                They are extremely friendly and can come off as timid at first but once you get to know a water fairy, 
                they will become one of your most loyal companions.  They are also collectors, and can’t help but keep 
                any rocks, shells, leaves, or pebbles they find interesting.` 
            descriptionContainer.style.color = "#1E537D"
            break
        case elements.STAR:
            fairyImage.src = "New Images/star-fairy.jpg" 
            descriptionContainer.textContent = 
                `Unlike most fairies, Star fairies appear at dawn or nighttime. This is because they are drawn to peaceful 
                atmospheres, and prefer to play when there aren’t as many folks around. Star fairies are highly intelligent and thrive on routine. 
                They are goal oriented and when they “shoot for the stars” they usually end up hitting a few. 
                The star fairies have a witty sense of humor and are great company to have around you`
            descriptionContainer.style.color = "#7F5B98"
            break
        case elements.CLOUD:
            fairyImage.src = "New Images/cloud-fairy.jpg" 
            descriptionContainer.textContent = 
                `The cloud fairies are the most social and energetic of all the fairies. 
                They are extremely creative and imaginative beings who either have their head up 
                in the clouds or are daydreaming about their next adventure. Nonetheless, they have big hearts, and care very much 
                for the people in their lives.  Cloud fairies are also the masters of crafting, and have lots of knowledge on homemade gift giving.`
            descriptionContainer.style.color = "#847266"
            break
        case elements.FOREST:
            fairyImage.src = "New Images/forest-fairy.jpg" 
            descriptionContainer.textContent = 
                `The forest fairies are nomads and wander the many places the world has to offer. 
                Because of how much they travel they can easily fall asleep, and are often found taking long naps in the sun, on tree branches, 
                or underneath the forest mushrooms. They have a very independent nature about them but are still 
                surrounded by close friends who deeply care for them.`
            descriptionContainer.style.color = "#546845"
            break
        default:
            document.body.innerHTML = "<p> An error occured </p>"
    }

    const buttonContainer = document.createElement("p")
    buttonContainer.id = "button-container"

    const backToHomeButton = document.createElement("button")
    backToHomeButton.textContent = "Back to Home"
    backToHomeButton.id = "back-to-home-button"
    backToHomeButton.class = "bottom-result-screen-container"
    backToHomeButton.addEventListener("click", () => {
        backToHome()
    })
    buttonContainer.appendChild(backToHomeButton)

    const exploreOtherFairiesButton = document.createElement("button")
    exploreOtherFairiesButton.textContent = "Explore Other Fairies"
    exploreOtherFairiesButton.id = "other-fairies-button"
    exploreOtherFairiesButton.class = "bottom-result-screen-container"
    exploreOtherFairiesButton.addEventListener("click", () => {
        toOtherFairies()
    })
    buttonContainer.appendChild(exploreOtherFairiesButton)

    const resultContainer = document.createElement("div")
    resultContainer.classList.add("result-container")

    const footer = document.createElement("footer")
    footer.textContent = "Created by Mila Maes & Shawn Pribadi"
    document.body.appendChild(footer)

    resultContainer.appendChild(fairyImage)
    resultContainer.appendChild(descriptionContainer)
    resultContainer.appendChild(buttonContainer)

    document.body.appendChild(resultContainer)
    document.body.appendChild(footer)

    document.body.style.display = "flex";
    document.body.style.flexDirection = "column";    
    document.body.style.alignItems = "center";
}

function backToHome() {
    document.body.innerHTML = 
        `<main class="container">
            <h1 id="question-number"></h1>
            <h2 id="question"></h2>

            <p id="start-screen">
                <img src="New Images/yes-button.png" id="yes-button">
            </p>

            <div class="buttons" id="buttons"></div>
        </main>`    
    questionIndex = -1
    elementCounters.forEach((count, element) => {
        elementCounters.set(element, 0)
    })
    document.body.style.backgroundImage = `url("${titlePageBackground}")`

    const yesButton = document.getElementById("yes-button") 

    yesButton.addEventListener("click", () => {
        document.getElementById("start-screen").style.display = "none"
        startQuiz()
    })

    document.body.classList.remove("question-mode");
}

function toOtherFairies() {

}

/* --- Description Colors ---- */
/*  Water: #1E537D
    Star: #7F5B98 
    Cloud: #847266
    Forest: #546845 
*/