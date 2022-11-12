var buttons = document.getElementsByClassName("buttons")[0].children
var screen = document.getElementsByClassName("screen")[0]
var options = ["MC","M+","X","/",7,8,9,"-",4,5,6,"+",1,2,3,"=",0,"."]
var number1 = ""
var number2 = ""
var secondNumber = false
var numbers = []
var operation
var canPutDot
for (var i = 0; i < buttons.length; i++){
    var button = document.getElementById(buttons[i].id)
    button.style.gridArea = buttons[i].id
    button.addEventListener("click", calculate)
    button.myParam = options[i]
    if (button.id != "minus" && button.id != "dot") button.textContent = options[i]
}

function calculate(evt){
    var data = evt.currentTarget.myParam

    if (data == "MC" || data == "M+"){
        screen.textContent = ""
        number1 = ""
        number2 = ""
        secondNumber = false
    }
    else if (data == "X" || data == "/" || data == "-" || data == "+"){
        if (!secondNumber && number1.length > 0){
            operation = data
            screen.textContent += " " + data + " "
            number2 = number1
            number1 = ""
            secondNumber = true
        }
    }
    else if (data == "="){
        number1 = parseFloat(number1)
        number2 = parseFloat(number2)
        switch (operation){
            case "X":
                number2 *= number1
                break
            case "/":
                number2 /= number1
                break
            case "-":
                number2 -= number1
                break
            case "+":
                number2 += number1
                break
        }
        number1 = number2
        number1 = Math.round(number1 * 100) / 100
        screen.textContent = number1
        number2 = ""
        number1 = number1.toString()
        secondNumber = false

    }
    else{
        if (data == "."){
            if (number1.length > 0){
                canPutDot = true
                for (var i = 0; i < number1.length; i++){
                    if (number1[i] == "."){
                        canPutDot = false
                        break
                    }
                }
                if (canPutDot){
                    number1 += data
                    screen.textContent += data
                }
            }
        }
        else{
            number1 += data
            screen.textContent += data
        }
    }
}

