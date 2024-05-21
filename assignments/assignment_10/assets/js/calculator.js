$(document).ready(function() {
    var result = ''; /*Define a variable to store the mathematical result*/

    $('.buttons').not('#equal').on('click', function() {
        var value = $(this).attr('data-value'); /*get the actual value of the clicked button*/
        result += value; /* += is to add a number to behind the clicked number other wise it will replace the current number */
        $('span').text(result); /*display the clicked number or value*/
    });

    $('#equal').on('click', function() {
        try {
            result = eval(result).toString(); /*when = is clicked we can use eval() method to make the calculation*/
        } catch (error) {
            result = 'Error';
        }
        $('span').text(result); /*if something goes wrong hen it will prompt error*/
    });

    $('#clear').on('click',() => {
        $('span').text("");
        result = "";
    });
});
