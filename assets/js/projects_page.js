var checkboxes1 = document.querySelectorAll('#p-card-01');
var checkboxes2 = document.querySelectorAll('#p-card-02');
var checkboxes3 = document.querySelectorAll('#p-card-03');
var checkboxes4 = document.querySelectorAll('#p-card-04');
var checkboxes5 = document.querySelectorAll('#p-card-05');
var checkboxes6 = document.querySelectorAll('#p-card-06');
var containersP01 = document.querySelectorAll('#P-1');
var containersP02 = document.querySelectorAll('#P-2');
var containersP03 = document.querySelectorAll('#P-3');
var containersP04 = document.querySelectorAll('#P-4');
var containersP05 = document.querySelectorAll('#P-5');
var containersP06 = document.querySelectorAll('#P-6');

checkboxes1.forEach(function(checkbox, index) {
    checkbox.addEventListener('change', function() {
        // If checkbox is checked
        if (this.checked) {
            containersP01[index].style.borderColor = '#eab520';
            containersP01[index].style.backgroundSize = '1980px 1200px';

        } else {
            containersP01[index].style.borderColor = '#192A56';
            containersP01[index].style.backgroundSize = '1580px 900px';
        }
    });
});

checkboxes2.forEach(function(checkbox, index) {
    checkbox.addEventListener('change', function() {
        // If checkbox is checked
        if (this.checked) {
            containersP02[index].style.borderColor = '#eab520';
            containersP02[index].style.backgroundSize = '450px 380px';
        } else {
            containersP02[index].style.borderColor = '#192A56';
            containersP02[index].style.backgroundSize = '415px 310px';
        }
    });
});

checkboxes3.forEach(function(checkbox, index) {
    checkbox.addEventListener('change', function() {
        // If checkbox is checked
        if (this.checked) {
            containersP03[index].style.borderColor = '#eab520';
            containersP03[index].style.backgroundSize = '450px 380px';
        } else {
            containersP03[index].style.borderColor = '#192A56';
            containersP03[index].style.backgroundSize = '415px 310px';
        }
    });
});

checkboxes4.forEach(function(checkbox, index) {
    checkbox.addEventListener('change', function() {
        // If checkbox is checked
        if (this.checked) {
            containersP04[index].style.borderColor = '#eab520';
            containersP04[index].style.backgroundSize = '450px 380px';
        } else {
            containersP04[index].style.borderColor = '#192A56';
            containersP04[index].style.backgroundSize = '415px 310px';
        }
    });
});

checkboxes5.forEach(function(checkbox, index) {
    checkbox.addEventListener('change', function() {
        // If checkbox is checked
        if (this.checked) {
            containersP05[index].style.borderColor = '#eab520';
            containersP05[index].style.backgroundSize = '450px 380px';
        } else {
            containersP05[index].style.borderColor = '#192A56';
            containersP05[index].style.backgroundSize = '415px 310px';
        }
    });
});

checkboxes6.forEach(function(checkbox, index) {
    checkbox.addEventListener('change', function() {
        // If checkbox is checked
        if (this.checked) {
            containersP06[index].style.borderColor = '#eab520';
            containersP06[index].style.backgroundSize = '450px 380px';
        } else {
            containersP06[index].style.borderColor = '#192A56';
            containersP06[index].style.backgroundSize = '415px 310px';
        }
    });
});