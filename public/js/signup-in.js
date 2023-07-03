$(document).ready(() => {
    const emailInput = $('#email');
    const usernameInput = $('#username');
    const passwordInput = $('#password');
    const confirmPasswordInput = $('#confirm-password');

    const emailError = $('#email-error');
    const usernameError = $('#username-error');
    const passwordError = $('#password-error');
    const confirmPasswordError = $('#confirm-password-error');

    let validEmail = false;
    let validUsername = false;
    let validPassword = false;
    let validConfirmPassword = false;

    $('form').submit(() => {
        if (!validEmail || !validUsername || !validPassword || !validConfirmPassword) {
            return;
        }
    });

    $('.signup-button').click(() => {
        window.location.href = '/signup';
    });

    $('.signin-button').click(() => {
        window.location.href = '/signin';
    });

    passwordInput.blur(validatePassword);
    emailInput.blur(checkEmailAvailability);
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
                    usernameError.text('Username is not available').show();
                    validUsername = false;
                }
                else {
                    usernameError.hide();
                    validUsername = true;
                }
            },
            error: function () {
                usernameError.text('Error occurred. Please try again later.');
            }
        });
    }

    function checkEmailAvailability() {
        const email = emailInput.val();

        $.ajax({
            url: '/check-email-availability',
            method: 'POST',
            data: { email: email },
            success: function (response) {
                if (!response.available) {
                    emailError.css('color', 'red');
                    emailError.text('Email is not available').show();
                    validEmail = false;
                }
                else {
                    emailError.hide();
                    validEmail = true;
                }
            },
            error: function () {
                emailError.text('Error occurred. Please try again later.');
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
            validPassword = false;
        }
        else {
            passwordError.hide();
            validPassword = true;
        }
    }

    function validateConfirmPassword() {
        if (passwordInput.val() !== confirmPasswordInput.val()) {
            confirmPasswordError.css('color', 'red');
            confirmPasswordError.text("Password does not match").show();
            validConfirmPassword = false;
        }
        else {
            confirmPasswordError.hide();
            validConfirmPassword = true;
        }
    }
});