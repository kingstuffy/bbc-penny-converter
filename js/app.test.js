var expect = chai.expect;

describe("App", function () {

    describe("#convertToPennies", function () {

        it("should return error for invalid inputs", function () {
            var invalidInputs = ['13x', '£45.3u', '56p23p', '45£', 'SFW'];
            invalidInputs.forEach(function (input) {
                var result = convertToPennies(input);
                expect(result.success).to.equal(false);
                expect(result.value).to.equal('Invalid value');
            });
        });

        it("should return error for missing values", function () {
            var invalidInputs = ['', '£', '£p', 'p'];
            invalidInputs.forEach(function (input) {
                var result = convertToPennies(input);
                expect(result.success).to.equal(false);
                expect(result.value).to.equal('Missing value');
            });
        });

        it("should return correct results for valid values", function () {
            var inputsMap = [
                {input: '£5', value: 500},
                {input: '£2.50', value: 250},
                {input: '213p', value: 213},
                {input: '£16.23p', value: 1623},
                {input: '£14', value: 1400},
                {input: '£54.04', value: 5404},
                {input: '£23.33333', value: 2333},
                {input: '001.41p', value: 141}
            ];
            inputsMap.forEach(function (inputMap) {
                var result = convertToPennies(inputMap.input);
                expect(result.success).to.equal(true);
                expect(result.value).to.equal(inputMap.value);
            });
        });

    });


    describe("#getDenominationQuantity", function () {

        it("should return zero quantity and same pennies when denomination is greater than pennies", function () {
            var inputsMap = [
                {pennies: 130, denomination: '£2'},
                {pennies: 23, denomination: '£1'},
                {pennies: 24, denomination: '50p'},
                {pennies: 18, denomination: '20p'},
                {pennies: 7, denomination: '10p'},
                {pennies: 3, denomination: '5p'},
                {pennies: 1, denomination: '2p'}
            ];
            inputsMap.forEach(function (inputMap) {
                var result = getDenominationQuantity(inputMap.pennies, inputMap.denomination);
                expect(result.quantity).to.equal(0);
                expect(result.remainingPennies).to.equal(inputMap.pennies);
            });
        });

        it("should return correct quantity and remaining pennies for valid values", function () {
            var inputsMap = [
                {pennies: 700, denomination: '£2', quantity: 3, remainingPennies: 100},
                {pennies: 123, denomination: '£1', quantity: 1, remainingPennies: 23},
                {pennies: 324, denomination: '50p', quantity: 6, remainingPennies: 24},
                {pennies: 40, denomination: '20p', quantity: 2, remainingPennies: 0},
                {pennies: 11, denomination: '10p', quantity: 1, remainingPennies: 1},
                {pennies: 7, denomination: '5p', quantity: 1, remainingPennies: 2},
                {pennies: 11, denomination: '2p', quantity: 5, remainingPennies: 1},
                {pennies: 2, denomination: '1p', quantity: 2, remainingPennies: 0}
            ];
            inputsMap.forEach(function (inputMap) {
                var result = getDenominationQuantity(inputMap.pennies, inputMap.denomination);
                expect(result.quantity).to.equal(inputMap.quantity);
                expect(result.remainingPennies).to.equal(inputMap.remainingPennies);
            });
        });

    });


    describe("#getRequiredNumberOfCoins", function () {

        it("should return the required number of coins", function () {
            var inputsMap = [
                {
                    pennies: '123',
                    result: [
                        {denomination: '£1', quantity: 1},
                        {denomination: '20p', quantity: 1},
                        {denomination: '2p', quantity: 1},
                        {denomination: '1p', quantity: 1}
                    ]
                },
                {
                    pennies: '1234',
                    result: [
                        {denomination: '£2', quantity: 6},
                        {denomination: '20p', quantity: 1},
                        {denomination: '10p', quantity: 1},
                        {denomination: '2p', quantity: 2}
                    ]
                },
                {
                    pennies: '234',
                    result: [
                        {denomination: '£2', quantity: 1},
                        {denomination: '20p', quantity: 1},
                        {denomination: '10p', quantity: 1},
                        {denomination: '2p', quantity: 2}
                    ]
                }
            ];
            inputsMap.forEach(function (inputMap) {
                var result = getRequiredNumberOfCoins(inputMap.pennies);
                expect(result).to.eql(inputMap.result);
            });
        });

    });


    describe("#composeResultsMessage", function () {

        it("should return composed message from results", function () {
            var inputsMap = [
                {
                    coins: [
                        {denomination: '£1', quantity: 1},
                        {denomination: '20p', quantity: 1},
                        {denomination: '2p', quantity: 1},
                        {denomination: '1p', quantity: 1}
                    ],
                    message: '1(£1), 1(20p), 1(2p), 1(1p)'
                },
                {
                    coins: [
                        {denomination: '£2', quantity: 6},
                        {denomination: '20p', quantity: 1},
                        {denomination: '10p', quantity: 1},
                        {denomination: '2p', quantity: 2}
                    ],
                    message: '6(£2), 1(20p), 1(10p), 2(2p)'
                },
                {
                    coins: [
                        {denomination: '£2', quantity: 1},
                        {denomination: '20p', quantity: 1},
                        {denomination: '10p', quantity: 1},
                        {denomination: '2p', quantity: 2}
                    ],
                    message: '1(£2), 1(20p), 1(10p), 2(2p)'
                }
            ];
            inputsMap.forEach(function (inputMap) {
                var result = composeResultsMessage(inputMap.coins);
                expect(result).to.equal(inputMap.message);
            });
        });

    });

});