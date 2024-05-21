var colors = ["red","green","blue","yellow","lightpink","deeppink"];

var interval;

function replaceText() {
    let lastValue = colors.pop(); /*this will caught the last index*/
    colors.unshift(lastValue);

    $('#a').css('background-color',colors[0]);
    $('#b').css('background-color',colors[1]);
    $('#c').css('background-color',colors[2]);
    $('#d').css('background-color',colors[3]);
    $('#e').css('background-color',colors[4]);
    $('#f').css('background-color',colors[5]);
}

$('#start').on('click',() =>{
    console.log("start");
    interval = setInterval(replaceText,1000);
});

$('#stop').on('click',() =>{
    console.log("stop");
    clearInterval(interval);
});