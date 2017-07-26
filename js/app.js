(function () {
    /**
     *
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
        console.log(denomination, pennyValue);
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

        if (!input.match(acceptedLetters)) {
            return {success: false, value: 'Invalid value'}
        }

        var result = parseFloat(input).toFixed(2) * multiplier;
        return {success: true, value: result};
    }


}());