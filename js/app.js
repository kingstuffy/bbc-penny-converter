(function (exports) {


    $(function () {
        var amountInput = $('#amount');
        var convertBtn = $('#convert');
        var resetBtn = $('#reset');
        var formMessages = $('.form__messages');

        amountInput.keypress(trimInput);
        amountInput.focus(clearErrors);
        convertBtn.click(convertInput);
        resetBtn.click(resetData);
        $(document).on('click', '.alert__dismiss', dismissAlert);

        function trimInput(e) {
            return e.which !== 32;
        }

        function clearErrors() {
            $(this).siblings('.form__error-message').remove();
            amountInput.removeClass('form__input--has-error');
        }

        function convertInput(e) {
            e.preventDefault();
            var input = amountInput.val();
            if (typeof input === 'undefined' || input === '' || input === '0') {
                showErrorMessage('Empty Input', amountInput);
                return;
            }

            var penniesResult = convertToPennies(input);
            if (!penniesResult.success) {
                showErrorMessage(penniesResult.value, amountInput);
                return;
            }

            var requiredCoins = getRequiredNumberOfCoins(penniesResult.value);
            var resultsMessage = composeResultsMessage(requiredCoins);
            var state = requiredCoins.length > 1 ? ' are ' : ' is ';
            var successMessage = 'The minimum number of Sterling coins needed to make '
                + input + state + '<span class="text--results">' + resultsMessage + '</span>';
            showSuccessMessage(successMessage);

        }

        function resetData(e) {
            e.preventDefault();
            amountInput.val('');
            amountInput.focus();
            formMessages.empty();
        }

        function dismissAlert() {
            $(this).closest('.alert').fadeOut('slow', function () {
                $(this).remove();
            });
        }

        function showErrorMessage(message, input) {
            var errorMessage = '<div class="form__error-message">Oops! ' + message + '</div>';
            input.addClass('form__input--has-error');
            input.siblings('.form__error-message').remove();
            input.after(errorMessage)
        }

        function showSuccessMessage(message) {
            var successMessage = '<div class="alert alert--success">'
                + '<span class="alert__dismiss">x</span>'
                + message + '</div>';
            formMessages.hide().html(successMessage).fadeIn('slow');
        }

    });

    /**
     * Gets the minimum number of Sterling coins needed
     * to make the amount in pennies
     * @param pennies
     * @returns {Array.<{quantity: number, remainingPennies: number}>}
     */
    function getRequiredNumberOfCoins(pennies) {
        var denominations = ['£2', '£1', '50p', '20p', '10p', '5p', '2p', '1p'];
        var results = [];
        var remainingPennies = pennies;

        denominations.some(function (denomination) {
            var denominationQuantity = getDenominationQuantity(remainingPennies, denomination);
            if (denominationQuantity.quantity) {
                results.push({
                    quantity: denominationQuantity.quantity,
                    denomination: denomination
                });
            }
            remainingPennies = denominationQuantity.remainingPennies;
            return remainingPennies === 0;
        });

        return results;
    }

    /**
     * Gets the quantity of a particular currency denomination
     * that can be gotten from the provided pennies
     * @param pennies
     * @param denomination
     * @returns {{quantity: number, remainingPennies: number}}
     */
    function getDenominationQuantity(pennies, denomination) {
        var pennyValue = convertToPennies(denomination).value;
        var quantity = Math.floor(pennies / pennyValue);
        var remainingPennies = pennies % pennyValue;
        return {
            quantity: quantity,
            remainingPennies: remainingPennies
        };
    }


    /**
     *
     * @param input
     * @returns {{success: boolean, value: number|string}}
     */
    function convertToPennies(input) {
        var multiplier = 1;
        var acceptedLetters = /^[0-9.]+$/;
        var decimalCharacter = /[.]/;

        if (input.charAt(0) === '£') {
            multiplier = 100;
            input = input.substr(1);
        }

        if (input.charAt(input.length - 1) === 'p') {
            input = input.substr(0, input.length - 1);
        }

        if (input.length === 0) {
            return {success: false, value: 'Missing value'}
        }

        if (!acceptedLetters.test(input)) {
            return {success: false, value: 'Invalid value'}
        }

        if (decimalCharacter.test(input)) {
            multiplier = 100;
        }

        var result = parseFloat(input).toFixed(2) * multiplier;
        return {success: true, value: result};
    }

    /**
     * Compose results message
     * @param requiredCoins
     * @returns {string}
     */
    function composeResultsMessage(requiredCoins) {
        var resultsDescription = requiredCoins.reduce(function (descriptions, coin) {
            return descriptions.concat(coin.quantity + '(' + coin.denomination + ')');
        }, []);
        return resultsDescription.join(', ') || 'NA';
    }

    exports.getRequiredNumberOfCoins = getRequiredNumberOfCoins;
    exports.getDenominationQuantity = getDenominationQuantity;
    exports.convertToPennies = convertToPennies;
    exports.composeResultsMessage = composeResultsMessage;

})(this);