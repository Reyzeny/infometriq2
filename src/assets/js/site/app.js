$(document).on('click', '.nav__mobile-button', function(e) {
    e.preventDefault();
    $('body').addClass('oc-menu-shown');
});
$(document).on('click', '.oc-menu-shown .side-nav-overlay ', function() {
    $('body').removeClass('oc-menu-shown');
});

$(document).on('keyup', '.input--money', function() {
    var amount = $(this).val();
    var number = numeral(amount).format('0,0');
    $(this).val(number);
});
