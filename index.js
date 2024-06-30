var calc = [];
var display = document.getElementById("display");
var button_AC = document.getElementById("AC");
var ops = document.getElementsByClassName("circle orange");
var current_num = 0;
var decimal = false;
var current_decimal = 0.1;
var decimal_digits = 0;
var new_ready = true;
var positive = true;
var percent = false;

const number = (num) => {
    if (new_ready || percent) {
        for (let op of ops) {
            op.style.backgroundColor = "orange";
            op.style.color = "white";
        }
        clear();
        new_ready = false;
        percent = false;
        button_AC.innerHTML = "C";
    }
    if (display.textContent.replace(/[^0-9]/g,"").length < 9 || current_num == 0) {
        if (decimal == false) {
            if (!(current_num == 0 && num == 0)) {
                if (positive) {
                    current_num = current_num * 10 + num;
                } else {
                    current_num = current_num * 10 - num;
                }
            }
        } else {
            if (num == 0) {
            } else {
                if (positive) {
                    current_num += current_decimal * num;
                } else {
                    current_num -= current_decimal * num;
                }
            }
            current_decimal /= 10;
            decimal_digits += 1;
            current_num = round(current_num);
        }
        print();
    }
}

const round = (num) => {
    let decimals = 8;
    if (num > 100000000 || num < -100000000) {
        decimals = 0;
    } else if (num > 10000000 || num < -10000000) {
        decimals = 1;
    } else if (num > 1000000 || num < -1000000) {
        decimals = 2;
    } else if (num > 100000 || num < -100000) {
        decimals = 3;
    } else if (num > 10000 || num < -10000) {
        decimals = 4;
    } else if (num > 1000 || num < -1000) {
        decimals = 5;
    } else if (num > 100 || num < -100) {
        decimals = 6;
    } else if (num > 10 || num < -10) {
        decimals = 7;
    }
    return Math.round(num * (10 ** decimals))/(10 ** decimals);
}

const font_size = (ponctuations, nums) => {
    let width = ponctuations/2 + nums;
    if (!positive) {
        width += 0.25;
    }
    let pixels = Math.round(460/width);
    return String(pixels) + "px";
}

const dot = () => {
    if (new_ready || percent) {
        for (let op of ops) {
            op.style.backgroundColor = "orange";
            op.style.color = "white";
        }
        clear();
        print();
        new_ready = false;
        percent;
        button_AC.innerHTML = "C";
    }
    if (display.textContent.replace(/[^0-9]/g,"").length < 9 && decimal == false) {
        display.append(".")
    }
    decimal = true;
}

const AC = () => {
    if (new_ready) {
        for (let op of ops) {
            op.style.backgroundColor = "orange";
            op.style.color = "white";
        }
        calc = [];
        current_num = 0;
        decimal = false;
        current_decimal = 0.1;
        decimal_digits = 0;
        positive = true;
        percent = false;
        print();
    } else {
        if (calc.length > 0) {
            let operation = calc[calc.length - 1];
            if (operation == "+") {
                let op = document.getElementById("add");
                op.style.backgroundColor = "white";
                op.style.color = "orange";
            } else if (operation == "-") {
                let op = document.getElementById("sub");
                op.style.backgroundColor = "white";
                op.style.color = "orange";
            } else if (operation == "*") {
                let op = document.getElementById("mult");
                op.style.backgroundColor = "white";
                op.style.color = "orange";
            } else if (operation == "/") {
                let op = document.getElementById("div");
                op.style.backgroundColor = "white";
                op.style.color = "orange";
            }
        }
        current_num = 0;
        decimal = false;
        current_decimal = 0.1;
        decimal_digits = 0;
        positive = true;
        new_ready = true;
        button_AC.innerHTML = "AC";
        print();
    }
}

const AC_noPrint = () => {
    calc = [];
    current_num = 0;
    decimal = false;
    current_decimal = 0.1;
    decimal_digits = 0;
    positive = true;
}

const clear = () => {
    current_num = 0;
    decimal = false;
    current_decimal = 0.1;
    decimal_digits = 0;
    positive = true;
}

const changeSign = () => {
    if (new_ready && current_num == 0) {
        for (let op of ops) {
            op.style.backgroundColor = "orange";
            op.style.color = "white";
        }
        clear();
        new_ready = false;
        button_AC.innerHTML = "C";
    }
    if (positive) {
        positive = false;
    } else {
        positive = true;
    }
    current_num *= -1;
    print();
}

const error = () => {
    display.style.fontSize = "73px";
    display.style.bottom = "-20px";
    display.innerHTML = "Error";
    AC_noPrint();
}

const print = () => {
    display.innerHTML = round(current_num).toLocaleString(undefined, {maximumFractionDigits: 8, minimumFractionDigits: decimal_digits});
    length = display.textContent.replace(/[^0-9]/g,"").length;
    if (length > 9) {
        error();
    } else {
        if (length >= 6) {
            let len = display.textContent.length;
            display.style.fontSize = font_size(len-length, length);
            let h = display.clientHeight;
            display.style.bottom = String((84-h)/5-20) + "px";
        } else {
            display.style.fontSize = "73px";
            display.style.bottom = "-20px";
        }
    }
}

const add_sub = (operation) => {
    if (new_ready && calc.length > 0) {
        calc.pop();
    } else {
        calc.push(current_num);
    }
    for (let op of ops) {
        op.style.backgroundColor = "orange";
        op.style.color = "white";
    }
    if (operation == "+") {
        let op = document.getElementById("add");
        op.style.backgroundColor = "white";
        op.style.color = "orange";
    } else if (operation == "-") {
        let op = document.getElementById("sub");
        op.style.backgroundColor = "white";
        op.style.color = "orange";
    }
    current_num = solve_all();
    calc.push(operation);
    decimal_digits = 0;
    print();
    clear();
    new_ready = true;
    button_AC.innerHTML = "AC";
}

const mult_div = (operation) => {
    if (new_ready && calc.length > 0) {
        calc.pop();
    } else {
        calc.push(current_num);
    }
    for (let op of ops) {
        op.style.backgroundColor = "orange";
        op.style.color = "white";
    }
    if (operation == "*") {
        let op = document.getElementById("mult");
        op.style.backgroundColor = "white";
        op.style.color = "orange";
    } else if (operation == "/") {
        let op = document.getElementById("div");
        op.style.backgroundColor = "white";
        op.style.color = "orange";
    }
    current_num = solve_mult_div();
    calc.push(operation);
    decimal_digits = 0;
    print();
    clear();
    new_ready = true;
    button_AC.innerHTML = "AC";
}

const equal = () => {
    if (new_ready && calc.length > 0) {
        calc.pop();
    } else {
        calc.push(current_num);
    }
    for (let op of ops) {
        op.style.backgroundColor = "orange";
        op.style.color = "white";
    }
    current_num = solve_all();
    decimal_digits = 0;
    print();
    calc = [];
    new_ready = true;
    button_AC.innerHTML = "AC";
}

const solve_all = () => {
    let solver = [calc[0]];
    for (let i = 1; i < calc.length ; i+=2) {
        if (calc[i] == "+" || calc[i] == "-") {
            solver.push(calc[i]);
            solver.push(calc[i+1]);
        } else if (calc[i] == "*") {
            solver[solver.length - 1] *= calc[i+1];
        } else if (calc[i] == "/") {
            if (calc[i+1] == 0) {
                return 10**10;
            }
            solver[solver.length - 1] /= calc[i+1];
        }
    }
    let answer = solver[0]
    for (let i = 1; i < solver.length ; i+=2) {
        if (solver[i] == "+") {
            answer += solver[i+1];
        } else if (solver[i] == "-") {
            answer -= solver[i+1];
        }
    }
    return answer;
}

const solve_mult_div = () => {
    let answer = calc[0]
    for (let i = 1; i < calc.length ; i+=2) {
        if (calc[i] == "+" || calc[i] == "-") {
            answer = calc[i+1]
        } else if (calc[i] == "*") {
            answer *= calc[i+1];
        } else if (calc[i] == "/") {
            if (calc[i+1] == 0) {
                return 10**10;
            }
            answer /= calc[i+1];
        }
    }
    return answer;
}

const percentage = () => {
    for (let op of ops) {
        op.style.backgroundColor = "orange";
        op.style.color = "white";
    }
    current_num = round(current_num/100);
    print();
    percent = true;
}