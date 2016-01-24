/* Task Description */
/* 
	Write a function that sums an array of numbers:
		numbers must be always of type Number
		returns `null` if the array is empty
		throws Error if the parameter is not passed (undefined)
		throws if any of the elements is not convertible to Number	
*/

function solve(){
    function theSum(arrayOfNumbers) {
        if(arrayOfNumbers.length === 0){
            return null;
        }

        var sum = 0;

        //first variant of solution
        /*for (var i= 0; i< arrayOfNumbers.length; i+=1){
            if(isNaN(arrayOfNumbers[i])){
                throw new Error;
            }
            sum += +arrayOfNumbers[i]; //with +arrayOfNumbers parsing the string numbers to Number
        }*/

        //second variant of solution
        if(arrayOfNumbers.some(function(item){
                return isNaN(item);
            })){
            throw new Error('Array must contains only numbers');
        }
        sum = arrayOfNumbers.reduce(function(sum, number){
            return Number(sum) +Number(number);
        });

        return sum;
    }

    var array = ['1', 2, 3];
    return theSum(array);
}

console.log(solve());

//module.exports = solve();