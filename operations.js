module.exports.makeNumber = function() {
    
    return (Math.floor(Math.random()*10000)).toString();
}

module.exports.checkNumber = function(number, guessNum) {
    
        let result = ''; 
        let arrB = []; 
            
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
        
        for (let j=0; j<number.length; j++) { 
            if ((result[j] === '*') && (arrB.indexOf(guessNum[j]) !== -1)) {            
                result = result.substr(0, j) + 'K' + result.substr(j + 1); 
            } 
            else { 
                continue; 
            } 
        } 
        
        return (result === 'BBBB') ? `Вы выиграли! было загадано число ${number}` : result; 
    } 