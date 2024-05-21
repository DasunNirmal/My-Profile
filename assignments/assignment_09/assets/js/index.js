
var firstIndex = 0;
var maxIndex = 6;
var move = "RIGHT";
var interval = null;

function replaceColor() {
    $('.light').removeClass("light_on");
    $('.light').removeClass("light_on2");

    $('.light').eq(firstIndex).addClass("light_on");

    if (move==="RIGHT") {
        if (firstIndex!==0) $(".light").eq(firstIndex-1).addClass("light_on2");

        ++firstIndex;
        if (firstIndex>maxIndex - 2) {
            move = "LEFT";
        }

    } else {
        $(".light").eq(firstIndex+1).addClass("light_on2");
        --firstIndex;
        if (firstIndex===0) {
            move = "RIGHT";
        }
    }
}

$('#start').on('click', () => {
    interval = setInterval(replaceColor,50);
    $('#audio')[0].play();
});
$('#stop').on('click', () => {
    interval = clearInterval(interval);
    $('#audio')[0].pause();
});