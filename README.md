# BBC PENNY CONVERTER

* [Summary](#summary)
* [Requirements](#requirements)
* [Starting App](#starting-app)
* [Starting Tests](#starting-tests)

## Summary

A simple application that given a number of pennies will calculate the minimum number of Sterling coins needed to make that amount.
```
- 123p = 1 x £1, 1 x 20p, 1 x 2p, 1 x 1p
- £12.34 = 6 x £2, 1 x 20p, 1 x 10p, 2 x 2p
```
Examples of valid inputs with their canonical equivalents: `432` (432), `213p` (213), `£16.23p` (1623), `£14` (1400), `£54.04` (5404), `£23.33333` (2333), `001.41p` (141).

Examples of invalid inputs: `13x` (invalid character), `13p.02` (valid character in the wrong position), `£p` (missing value).

## Requirements
* Accounts for only the common `£2`, `£1`, `50p`, `20p`, `10p`, `5p`, `2p` and `1p` coins. Ignore those commemorative `£5` coins.
* A modern browser with Javascript support.
* User interface consists of an input field that accepts an 'amount' string (Eg. `92p`, `£2.12`) and displays the denominations needed when the user hits 'enter'.


## Starting App
* To run the app, open the file `index.html` in a modern web browser with javascript support

## Starting Tests
* To run the test for the app, open the file `index.test.html` in a modern web browser with javascript support