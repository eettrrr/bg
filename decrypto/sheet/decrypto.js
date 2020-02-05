var WHITE_TEAM = 0
var BLACK_TEAM = 1

var curTeam = 0

var teamName = new Array()
var hints = new Array()
var guesses = new Array()
var answers = new Array()

hints[0] = new Array()
hints[1] = new Array()

guesses[0] = new Array()
guesses[1] = new Array()

answers[0] = new Array()
answers[1] = new Array()

var summary = new Array()
summary[0] = new Array()
summary[1] = new Array()

for (let team = 0; team <= 1; team++) {

    teamName[team] = "팀이름"
    for (let idx = 0; idx < 4; idx++) {
        summary[team][idx] = ""
    }

    for (let round = 0; round < 8; round++) {
        for (let numOfHints = 0; numOfHints < 3; numOfHints++) {
            hints[team][3 * round + numOfHints] = ""
        }
    }

    for (let round = 0; round < 8; round++) {
        for (let numOfHints = 0; numOfHints < 3; numOfHints++) {
            hints[team][3 * round + numOfHints] = ""
            guesses[team][3 * round + numOfHints] = 0
            answers[team][3 * round + numOfHints] = 0

        }
    }

}

function funcChangeTeam() {
    teamName[curTeam] = document.getElementById("pName").innerHTML

    for (let idx = 0; idx < 4; idx++) {
        summary[curTeam][idx] = document.getElementById("pHints_" + idx).innerHTML
    }

    for (let round = 0; round < 8; round++) {
        for (let numOfHints = 0; numOfHints < 3; numOfHints++) {
            var textInput = document.getElementById("txtHints_" + round + "_" + numOfHints)
            hints[curTeam][3 * round + numOfHints] = textInput.value

            var sltGuess = document.getElementById("sltGuess_" + round + "_" + numOfHints)
            guesses[curTeam][3 * round + numOfHints] = sltGuess.selectedIndex

            var sltAnswer = document.getElementById("sltAnswer_" + round + "_" + numOfHints)
            answers[curTeam][3 * round + numOfHints] = sltAnswer.selectedIndex

        }
    }

    if (curTeam == 0) {
        document.getElementById("main").style.backgroundColor = "black"
        curTeam = 1
    } else {
        document.getElementById("main").style.backgroundColor = "white"
        curTeam = 0
    }

    document.getElementById("pName").innerHTML = teamName[curTeam]
    for (let idx = 0; idx < 4; idx++) {
        document.getElementById("pHints_" + idx).innerHTML = summary[curTeam][idx]
    }

    for (let round = 0; round < 8; round++) {
        for (let numOfHints = 0; numOfHints < 3; numOfHints++) {
            var textInput = document.getElementById("txtHints_" + round + "_" + numOfHints)
            textInput.value = hints[curTeam][3 * round + numOfHints]

            var sltGuess = document.getElementById("sltGuess_" + round + "_" + numOfHints)
            sltGuess.selectedIndex = guesses[curTeam][3 * round + numOfHints]

            var sltAnswer = document.getElementById("sltAnswer_" + round + "_" + numOfHints)
            sltAnswer.selectedIndex = answers[curTeam][3 * round + numOfHints]

        }
    }


}

function drawTile() {

    var pageHeight = document.documentElement.clientHeight
    var pageWidth = document.documentElement.clientWidth

    var maindiv = document.getElementById("main")
    var mainbody = document.getElementById("body")

    maindiv.style.height = pageHeight + "px"
    maindiv.style.width = pageWidth + "px"

    var leftTxt = 0.10
    var leftTxtTic = 0.40
    var topTxtStart = 0.10
    var topTxtNextGroupTic = 0.04
    var topTxtNextHintsTic = 0.04
    var txtFontSize = 0.05
    var txtWidth = 0.20
    var sltWidth = 0.05
    var txtHeight = 0.03
    var txtPadding = 0.00

    var sltLeftGuess = 0.38
    var sltLeftAnswer = 0.44

    var pName = document.getElementById("pName")
    pName.style.left = 0.6 * pageWidth + "px"
    pName.style.top = 0.01 * pageHeight + "px"
    pName.style.width = 0.3 * pageWidth + "px"
    pName.style.height = 0.05 * pageHeight + "px"
    pName.style.fontSize = txtFontSize * pageWidth + "px"



    var topTxtIter = topTxtStart

    for (let round = 0; round < 8; round++) {

        for (let numOfHints = 0; numOfHints < 3; numOfHints++) {
            var textInput = document.createElement("input")
            textInput.id = "txtHints_" + round + "_" + numOfHints
            textInput.value = ""
            maindiv.appendChild(textInput)
            textInput.className = "txtHints"
            textInput.style.left = leftTxt * pageWidth + "px"
            textInput.style.top = topTxtIter * pageHeight + "px"
            textInput.style.width = txtWidth * pageWidth + "px"
            textInput.style.height = txtHeight * pageHeight + "px"
            textInput.style.fontSize = txtFontSize * pageWidth + "px"
            textInput.style.padding = txtPadding * pageHeight + "px"

            {
                var sltGuess = document.createElement("select")
                sltGuess.id = "sltGuess_" + round + "_" + numOfHints
                maindiv.appendChild(sltGuess)
                sltGuess.className = "sltGuess"
                sltGuess.innerHTML = ""
                sltGuess.style.left = sltLeftGuess * pageWidth + "px"
                sltGuess.style.top = topTxtIter * pageHeight + "px"
                sltGuess.style.width = sltWidth * pageWidth + "px"
                sltGuess.style.height = txtHeight * pageHeight + "px"
                sltGuess.style.fontSize = txtFontSize * pageWidth + "px"
                sltGuess.style.padding = "0px"


                for (let idx2 = 0; idx2 <= 4; idx2++) {
                    var opt = document.createElement("option")
                    opt.innerHTML = (idx2)
                    if (idx2 == 0) {
                        opt.selected = true
                        opt.disabled = true
                        opt.hidden = true
                        opt.innerHTML = ""
                    }
                    sltGuess.appendChild(opt)
                }

            }

            {
                var sltGuess = document.createElement("select")
                sltGuess.id = "sltAnswer_" + round + "_" + numOfHints
                maindiv.appendChild(sltGuess)
                sltGuess.className = "sltGuess"
                sltGuess.style.left = sltLeftAnswer * pageWidth + "px"
                sltGuess.style.top = topTxtIter * pageHeight + "px"
                sltGuess.style.width = sltWidth * pageWidth + "px"
                sltGuess.style.height = txtHeight * pageHeight + "px"
                sltGuess.style.fontSize = txtFontSize * pageWidth + "px"
                sltGuess.style.padding = "0px"
                sltGuess.onchange = function() {
                    funcInputAnswer(round, numOfHints)
                }
                sltGuess.onclick = function() {
                    funcClickCheck(round, numOfHints)
                }

                for (let idx2 = 0; idx2 <= 4; idx2++) {
                    var opt = document.createElement("option")
                    opt.innerHTML = (idx2)
                    if (idx2 == 0) {
                        opt.selected = true
                        opt.disabled = true
                        opt.hidden = true
                        opt.innerHTML = ""
                    }
                    sltGuess.appendChild(opt)
                }
            }

            topTxtIter += topTxtNextHintsTic



        }
        topTxtIter += topTxtNextGroupTic
        if (round == 3) {
            leftTxt += leftTxtTic
            sltLeftAnswer += leftTxtTic
            sltLeftGuess += leftTxtTic
            topTxtIter = topTxtStart
        }

    }

    var leftTxt = 0.10
    var leftTxtTic = 0.20
    var topTxt = 0.70
    var txtFontSize = 0.05
    var txtWidth = 0.15
    var txtHeight = 0.15


    for (let answer = 0; answer < 4; answer++) {
        var pAnswer = document.createElement("p")
        pAnswer.id = "pHints_" + answer
        maindiv.appendChild(pAnswer)
        pAnswer.className = "txtHints"
        pAnswer.style.left = leftTxt * pageWidth + "px"
        pAnswer.style.top = topTxt * pageHeight + "px"
        pAnswer.style.width = txtWidth * pageWidth + "px"
        pAnswer.style.height = txtHeight * pageHeight + "px"
        pAnswer.style.fontSize = txtFontSize * pageWidth + "px"
        leftTxt += leftTxtTic

    }
}

function funcClickCheck(thisRound, thisNumOfHints) {
    for (let round = 0; round < thisRound; round++) {
        for (let numOfHints = 0; numOfHints < 3; numOfHints++) {
            var sltAnswer = document.getElementById("sltAnswer_" + round + "_" + numOfHints)
            console.log(sltAnswer.selectedIndex)
            if (sltAnswer.selectedIndex == 0) {
                alert("before")
                return
            }

        }

    }
}

function funcInputAnswer(thisRound, thisNumOfHints) {
    var hints = new Array()
    hints[0] = ""
    hints[1] = ""
    hints[2] = ""
    hints[3] = ""
    for (let round = 0; round <= thisRound; round++) {
        for (let numOfHints = 0; numOfHints < 3; numOfHints++) {
            var sltAnswer = document.getElementById("sltAnswer_" + round + "_" + numOfHints)
            var txtHints = document.getElementById("txtHints_" + round + "_" + numOfHints)
            if (txtHints.value == "") {
                continue
            }
            if (hints[sltAnswer.selectedIndex - 1] == "") {
                hints[sltAnswer.selectedIndex - 1] = txtHints.value
            } else {
                hints[sltAnswer.selectedIndex - 1] = hints[sltAnswer.selectedIndex - 1] + "<br>" + txtHints.value
            }
        }
    }

    for (let idx = 0; idx < 4; idx++) {
        var pAnswer = document.getElementById("pHints_" + idx)
        pAnswer.innerHTML = hints[idx]


    }
    console.log("" + 0 + ":" + hints[0])
    console.log("" + 1 + ":" + hints[1])
    console.log("" + 2 + ":" + hints[2])
    console.log("" + 3 + ":" + hints[3])

}

function setName() {
    var pName = document.getElementById("pName")
    var name = prompt("이름을 입력해 주세요.")
    if (name != null) {
        pName.innerHTML = name
    }
}
