$(document).ready(() => {
    var validUsername = false;
    var validPassword = false;
    const usernameInput = $('#username');
    const passwordInput = $('#password');
    const confirmPasswordInput = $('#confirm-password');
    const usernameError = $('#username-error');
    const passwordError = $('#password-error');
    const confirmPasswordError = $('#confirm-password-error');

    if (validUsername && validPassword) {
        $('#submit-button').prop('disabled', false);
    }

    $('.signup-button').click(() => {
        window.location.href = '/signup';
    });

    $('.signin-button').click(() => {
        window.location.href = '/signin';
    });

    passwordInput.blur(validatePassword);
    usernameInput.blur(checkUsernameAvailability);
    confirmPasswordInput.blur(validateConfirmPassword);

    function checkUsernameAvailability() {
        const username = usernameInput.val();

        $.ajax({
            url: '/check-username-availability',
            method: 'POST',
            data: { username: username },
            success: function (response) {
                if (!response.available) {
                    usernameError.css('color', 'red');
                    usernameError.text('Username is not available');
                }
                else {
                    usernameError.hide()
                    validUsername = true;
                }
            },
            error: function () {
                usernameError.text('Error occurred. Please try again later.');
            }
        });
    }

    function validatePassword() {
        const password = passwordInput.val();
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        const conditions = {
            lowercase: /[a-z]/,
            uppercase: /[A-Z]/,
            digit: /\d/,
            specialChar: /[@$!%*?&]/
        };

        const messages = {
            lowercase: 'Password must contain at least one lowercase letter.',
            uppercase: 'Password must contain at least one uppercase letter.',
            digit: 'Password must contain at least one digit.',
            specialChar: 'Password must contain at least one special character.',
            length: 'Password must be at least 6 characters long.'
        };

        let isValid = true;
        let errorMessage = '';

        if (!regex.test(password)) {
            for (const condition in conditions) {
                if (!conditions[condition].test(password)) {
                    errorMessage = messages[condition];
                    break;
                }
            }

            if (password.length < 6) {
                errorMessage = messages.length;
            }

            isValid = false;
        }

        if (!isValid) {
            passwordError.css('color', 'red');
            passwordError.text(errorMessage).show();
        }
        else {
            passwordError.hide();
        }
    }

    function validateConfirmPassword() {
        if (passwordInput.val() !== confirmPasswordInput.val()) {
            confirmPasswordError.css('color', 'red');
            confirmPasswordError.text("Password does not match").show();
        }
        else {
            validPassword = true;
            confirmPasswordError.hide();
        }
    }
});