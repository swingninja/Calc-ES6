var totalDigits = 12,
    digits = 0,
    valueSaved = null,
    value1 = null,
    value2 = null,
    value = null,
    decimal = 0,
    fixed = 0,
    opSaved = '',
    entered = true;

var button = function (i) {
    if (i == 1 || i == 2 || i == 3 || i == 4 || i == 5 || i == 6 || i == 7 || i == 8 || i == 9 || i == 0)
        buttonNumber(i);
    else if (i == "plus" || i == "minus" || i == "divide" || i == "times" || i == 'equal')
        buttonTwoOps(i);
    else if (i == "percent" || i == "sqrt" || i == "square" || i == "inverse" || i == "plusminus")
        buttonSingleOps(i);
    else if (i == "MR" || i == "MC" || i == "MMINUS" || i == "MPLUS")
        buttonMemoryOps(i);
    else if (i == "C")
        buttonClear();
    else if (i == "CE")
        buttonClearEntry();
    else if (i == "BKSP")
        buttonBackspace();
    else if (i == ".") {
        if (entered) {
            value = null;
            digits = 1
        }
        entered = false;
        if ((decimal == 0) && (value == null) && (digits == 0)) {
            digits = 1
        }
        if (decimal == 0) {
            decimal = 1
        }
        refresh()
    }


}

var format = function (i) {
    return i;
}

var refresh = function () {
    var i = format(value);

    if (i.toString().indexOf('.') < 0) {
        if (entered || decimal > 0) {
            i += "."
        }
    }
    document.getElementById("screen").innerHTML = i;

}

var buttonNumber = function (i) {
    if (entered) {
        value = null;
        digits = 0;
        entered = false;
    }

    if (digits < totalDigits - 1) {
        ++digits;
        if (decimal > 0) {
            decimal = decimal * 10;
            value = value + (i / decimal);
            ++fixed;
        } else {
            value = value * 10 + i
        }
    }

    refresh();
}

var buttonClear = function () {
    value1 = null;
    value2 = null;
    value = 0;
    opSaved = '';
    refresh();
}

var buttonClearEntry = function () {

    value = 0;
    refresh();

}

var buttonBackspace = function () {

    if (digits > 0) {
        var valueString = value.toString();

        --digits;

        if (valueString.slice(-2, -1) == '.') {// if 2 digits from last is '.'
            valueString = valueString.slice(0, -2); // remove '.' as well

        }
        else
            valueString = valueString.slice(0, -1);// remove the last digit;

        if (fixed > 0) {
            value = parseFloat(valueString);
            --fixed;
        }
        else {
            value = parseInt(valueString);
        }
    }

    if (digits == 0) {
        value = null;
        decimal = 0;
    }

    console.log(value, digits, decimal, fixed);
    refresh();
}

var buttonSingleOps = function (i) {
    // 1st value
    if (value) {
        switch (i) {
            case 'percent':
                // value = value / 100;
                break;
            case 'square':
                value = Math.pow(value, 2);
                break;
            case 'sqrt':
                value = Math.sqrt(value);
                break;
            case 'inverse':
                value = 1 / value;
                break;
            case 'plusminus':
                value = -value;
                break;
            default:
                break;
        }

    }
    refresh();
}

var buttonTwoOps = function (i) {
    // waiting for 2nd value
    if (i == opSaved && value1 && value == null)
        return;

    // 1st value
    if (value1 == null & opSaved == '') {
        value1 = value;
        opSaved = i;
        value = null;
    }
    else {
        switch (opSaved) {
            case 'plus':
                value = value1 + value;
                break;
            case 'minus':
                value = value1 - value;
                break;
            case 'times':
                value = value1 * value;
                break;
            case 'divide':
                value = value1 / value;
                break;
            default:
                break;

        }
        refresh();
        opSaved = i;
        value1 = value;
        value = null;
    }
}

var buttonMemoryOps = function (i) {
    switch (i) {
        case 'MPLUS':
            value1 = value1 + value;
            break;
        case 'MMINUS':
            value1 = value1 - value;

            break;
        case 'MR':
            value = value1;

            break;
        case 'MC':
            value = 0;
            break;
        default:
            break;
    }
    console.log(value1, value);
    refresh();
    value = 0;
}

/* BUG
 1) 1 + 1 = + 1 should be 3

 */