$('#troubleSigningIn').on('shown.bs.collapse', function () {
    $('#troubleSigningIn')[0].scrollIntoView();
});

$("#showHidePassword").click(function (event) {
    event.preventDefault();
    var password = $('#inputPassword');
    var showPassword = $('#showPassword');
    var hidePassword = $('#hidePassword');

    if (showPassword.attr('hidden')) {
        password.attr('type', 'password');
        showPassword.removeAttr('hidden');
        hidePassword.attr('hidden', '');
    }
    else {
        password.attr('type', 'text');
        showPassword.attr('hidden', '');
        hidePassword.removeAttr('hidden');
    }
});

$('#signIn').click(function (event) {
    event.preventDefault();
    this.disabled = true;
    this.innerText = 'Signing in...';
    $('#spinner').removeAttr('hidden');
    //this.form.submit();  //do not submit in test page
});