// создание случайного 4-х значного числа
module.exports.makeNumber = function() {  
    
    return (Math.floor(Math.random()*10000)).toString();
}

// Функция проверки совпадения пользовательского варианта числа с числом, загаданным ботом
module.exports.checkNumber = function(number, guessNum) { 
    
        let result = ''; // возвращаемое значение
        let arrB = [];  // массив для цифр, которые присутствуют в числе, но не на том месте
        
        // первый цикл для проверки на точное совпадение цифр
        for(let i=0; i<number.length; i++) 
        { 
            if (number[i] === guessNum[i]) {  
                    result += 'B'; 
            } 
            else { 
                result += '*'; 
                arrB.push(number[i]); 
            } 
        }       
        
        // второй цикл для обозначения цифр, которые присутствуют в числе, но не на том месте
        for (let j=0; j<number.length; j++) { 
            if ((result[j] === '*') && (arrB.indexOf(guessNum[j]) !== -1)) {
                //если присутствует такая цифра, то она обозначается как "К"         
                result = result.substr(0, j) + 'K' + result.substr(j + 1); 
            } 
            else { 
                continue; 
            } 
        } 
        
        return (result === 'BBBB') ? `Вы выиграли! было загадано число ${number}` : result; 
    } 