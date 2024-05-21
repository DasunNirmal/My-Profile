var array = ["A","B","C","D","E","F"];

var interval;

function replaceText() {
    let lastValue = array.pop(); /*this will caught the last index*/
    array.unshift(lastValue);

    $('#a').text(array[0]);
    $('#b').text(array[1]);
    $('#c').text(array[2]);
    $('#d').text(array[3]);
    $('#e').text(array[4]);
    $('#f').text(array[5]);
}

$('#start').on('click',() =>{
    console.log("start");
    interval = setInterval(replaceText,1500);
})

$('#stop').on('click',() =>{
    console.log("stop");
    clearInterval(interval);
})