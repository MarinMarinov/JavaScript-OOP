/* Task description */
/*
	Write a function that finds all the prime numbers in a range
		1) it should return the prime numbers in an array
		2) it must throw an Error if any on the range params is not convertible to `Number`
		3) it must throw an Error if any of the range params is missing
*/

/*function findPrimes(start, end) {
    var array = [];
    if(typeof(start) === 'undefined' || typeof(end) === 'undefined'){
        throw new Error;
    }
    start = start*1;
    end = end*1;
    for(var i= start; i<= end; i+=1){
        var isPrime = true;
        for (var divisor = 2; divisor < i; divisor+=1){
            if(i % divisor === 0){
                isPrime = false;
                break;
            }
        }
        if(isPrime && i > 1){
            array.push(i);
        }
    }
    return array;
}*/

function solve(){
    return function findPrimes(start, end) {
        var array = [];
        if(typeof(start) === 'undefined' || typeof(end) === 'undefined'){
            throw new Error;
        }
        start = start*1;
        end = end*1;
        for(var i= start; i<= end; i+=1){
            var isPrime = true;
            for (var divisor = 2; divisor < i; divisor+=1){
                if(i % divisor === 0){
                    isPrime = false;
                    break;
                }
            }
            if(isPrime && i > 1){
                array.push(i);
            }
        }
        return array;
    }
}

//console.log(findPrimes(1,6));

//module.exports = findPrimes;
module.exports = solve();