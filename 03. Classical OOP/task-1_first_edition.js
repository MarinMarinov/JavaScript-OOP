function solve() {
    var Person = (function(){

        function Person(inputFirstName, inputLastName, inputAge){
            this.firstname = inputFirstName;
            this.lastname = inputLastName;
            this.age = inputAge;
        }

        function validateAge(value){
            var age = parseInt(value);
            var isNotValid = false;
            if(age < 0 || age > 150 || isNaN(age)){
                isNotValid = true;
            }

            return isNotValid;
        }

        function validateName(value){
            var resultLength = false;
            var resultLetters = false;

            if(value.length > 2 && value.length < 21){
                resultLength = true;
            }
            for(var i = 0; i< value.length; i+=1){
                if((value.charCodeAt(i)>= 65 && value.charCodeAt(i)<= 90) || (value.charCodeAt(i) >= 97 && value.charCodeAt(i) <= 122)){
                    resultLetters = true;
                }
                else{
                    resultLetters = false;
                    break;
                }
            }

            return (resultLength && resultLetters); //will return true if both results are true
        }

        Object.defineProperty(Person.prototype, 'firstname', {
            get: function(){
                return this._firstname;
            },
            set: function(value){
                if(!validateName(value)){
                    throw Error('Invalid first name. Must be between 3 and 20 only latin characters!');
                }

                this._firstname = value;
                return this;
            }
        });

        Object.defineProperty(Person.prototype, 'lastname',{
            get: function(){
                return this._lastname;
            },
            set: function(value){
                if(!validateName(value)){
                    throw Error('Invalid last name. Must be between 3 and 20 only latin characters!');
                }

                this._lastname = value;
                return this;
            }
        });

        Object.defineProperty(Person.prototype, 'age',{
            get: function(){
                return this._age;
            },
            set: function(value){
                if(validateAge(value)){
                    throw Error('Invalid age. Must be between 0 and 150 years!');
                }
                this._age = parseInt(value);
                return this;
            }
        });

        Object.defineProperty(Person.prototype, 'fullname', {
            get: function(){
                return this._firstname + ' ' + this._lastname;
            },
            set: function(value){
                var names = value.split(' ');
                this.firstname = names[0]; //why firstname is without _!!!!???????????!!!!!!!!!
                this.lastname = names[1];

                return this;
            }
        });

        Person.prototype.introduce = function(){
            return 'Hello! My name is ' + this.fullname/*this.firstname + ' ' + this.lastname*/ + ' and I am ' + this.age + '-years-old';
        };

        return Person;
    }());
    //return Person;
    return new Person('Iva', 'Evova', '19').introduce();
}
console.log(solve());

//module.exports = solve;