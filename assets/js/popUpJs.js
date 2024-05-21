let popupBoxCard03 = document.getElementById("pop-up-card-03");
let popupBoxCard04 = document.getElementById("pop-up-card-04");
let popupBoxCard08 = document.getElementById("pop-up-card-08");

function backgroundBluer() {
    document.querySelector(".grid-assignments").classList.add("blur-background");
    document.querySelector("#assignments-h1").classList.add("blur-background");
    document.querySelector(".line-left-01").classList.add("blur-background");
    document.querySelector(".line-right-02").classList.add("blur-background");
    document.querySelector("#courses-and-certificates").classList.add("blur-background");
}

function displayPopUpCard03() {
    popupBoxCard03.classList.add("display-card-03");
    document.body.classList.add("no-scroll");

}

function displayPopUpCard04() {
    popupBoxCard04.classList.add("display-card-04");
    document.body.classList.add("no-scroll");
}

function displayPopUpCard08() {
    popupBoxCard08.classList.add("display-card-08");
    document.body.classList.add("no-scroll");
}

function closePopUp() {
    popupBoxCard03.classList.remove("display-card-03");
    popupBoxCard04.classList.remove("display-card-04");
    popupBoxCard08.classList.remove("display-card-08");
    document.body.classList.remove("no-scroll");
    document.querySelector(".grid-assignments").classList.remove("blur-background");
    document.querySelector("#assignments-h1").classList.remove("blur-background");
    document.querySelector(".line-left-01").classList.remove("blur-background");
    document.querySelector(".line-right-02").classList.remove("blur-background");
    document.querySelector("#courses-and-certificates").classList.remove("blur-background");
}

function CardThreeCaseOne() {
    window.open("../assignments/assignment_03/index.html", "_blank");
}

function CardThreeCaseTwo() {
    window.open("../assignments/assignment_03/Case-02.html", "_blank");
}

function CardThreeCaseThree() {
    window.open("../assignments/assignment_03/Case-03.html", "_blank");
}

function CardThreeCaseFore() {
    window.open("../assignments/assignment_03/Case-04.html", "_blank");
}

function CardThreeCaseFive() {
    window.open("../assignments/assignment_03/Case-05.html", "_blank");
}

function CardThreeCaseSix() {
    window.open("../assignments/assignment_03/Case-06.html", "_blank");
}

function CardForeCaseOne() {
    window.open("../assignments/assignment_04/index.html", "_blank");
}

function CardForeCaseTwo() {
    window.open("../assignments/assignment_04/case02.html", "_blank");
}

function CardForeCaseThree() {
    window.open("../assignments/assignment_04/case03.html", "_blank");
}

function CardForeCaseFore() {
    window.open("../assignments/assignment_04/case04.html", "_blank");
}

function CardForeCaseFive() {
    window.open("../assignments/assignment_04/case05.html", "_blank");
}

function CardForeCaseSix() {
    window.open("../assignments/assignment_04/case06.html", "_blank");
}

function CardEightCaseOne() {
    window.open("../assignments/assignment_08/index.html", "_blank");
}

function CardEightCaseTwo() {
    window.open("../assignments/assignment_08/Que_2.html", "_blank");
}