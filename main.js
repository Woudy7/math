const form = document.querySelector("#form")
        const numberBox = document.querySelector("#number")
        const termBox = document.querySelector("#terms")
        const randomBox = document.querySelector("#random")
        const resultDiv = document.querySelector("#result")

        function randomNum(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min)
        }

        form.addEventListener("submit", (event) => {
            event.preventDefault()
            const inputNumber = parseInt(numberBox.value)
            const termAmount = parseInt(termBox.value)
            const maxRandom = parseInt(randomBox.value)
            
            const possibleOperations = ["+","-","/"]

            let result = ""
            let operations = {
                
            }
            let addedNumbers = {inputNumber}
            let numbers = [inputNumber]

            for (let i = 0; i < termAmount - 1; i++) {
                const randomIndex = randomNum(0, numbers.length-1)
                const number = numbers[randomIndex]
                
                const randomNumber = randomNum(1, maxRandom)
                const operation = possibleOperations[randomNum(0, possibleOperations.length-1)]
                let newNumber = number
                switch (operation) {
                    case "+":
                        newNumber -= randomNumber
                        break
                    case "-":
                        newNumber += randomNumber
                        break
                    case "/":
                        newNumber *= randomNumber
                        break   
                    default:
                        break;
                }
                console.log(`${newNumber}${operation}${randomNumber}=${number}`)
                let newOperation = [newNumber, operation, randomNumber]
                if (operations[number] === undefined) {
                    operations[number] = [newOperation]
                } else {
                    operations[number].push(newOperation)
                }
                numbers.splice(randomIndex, 1)
                numbers.push(newNumber, randomNumber)
            }
            
            function controlNumber(number) {
                let possibleOperations = operations[number]
                if (possibleOperations === undefined) {
                    return number
                }
                let operation = possibleOperations[0]
                possibleOperations.splice(0, 1)
                if (possibleOperations.length === 0) {
                    delete operations[number]
                }
                let returnValue = `(${controlNumber(operation[0])}${operation[1]}${controlNumber(operation[2])})`   
                return returnValue
            }

            result = controlNumber(inputNumber)

            console.log(numbers, operations)
            resultDiv.innerHTML = result
        })