/* Task Description */
/* 
	Create a function constructor for Person. Each Person must have:
	*	properties `firstname`, `lastname` and `age`
		*	firstname and lastname must always be strings between 3 and 20 characters, containing only Latin letters
		*	age must always be a number in the range 0 150
			*	the setter of age can receive a convertible-to-number value
		*	if any of the above is not met, throw Error 		
	*	property `fullname`
		*	the getter returns a string in the format 'FIRST_NAME LAST_NAME'
		*	the setter receives a string in the format 'FIRST_NAME LAST_NAME'
			*	it must parse it and set `firstname` and `lastname`
	*	method `introduce()` that returns a string in the format 'Hello! My name is FULL_NAME and I am AGE-years-old'
	*	all methods and properties must be attached to the prototype of the Person
	*	all methods and property setters must return this, if they are not supposed to return other value
		*	enables method-chaining
*/
function solve(){

    var Person = (function () {
        function Person(firstName, lastName, inputAge) {
            this.firstname = firstName;
            this.lastname = lastName;
            this.age = inputAge
        }

        function validateAge(value) {
            var age = parseInt(value);

            if (age < 0 || age > 150 || isNaN(age)) {
                throw new Error('Age must be number between 0 and 150')
            }
        }

        function validateName(value) {
            if (!(value.length > 2 && value.length < 21)) {
                throw new Error('Name length must be between 3 and 20 characters');
            }
            for (var i = 0; i < value.length; i += 1) {
                if (!((value.charCodeAt(i) >= 65 && value.charCodeAt(i) <= 90) || (value.charCodeAt(i) >= 97 && value.charCodeAt(i) <= 122))) {
                    throw new Error('Name can contain only Latin letters');
                }
            }
        }

        Object.defineProperty(Person.prototype, 'firstname', {
            get: function () {
                return this._firstname;
            },
            set: function (value) {
                validateName(value);

                this._firstname = value;
                return this;
            }
        });

        Object.defineProperty(Person.prototype, 'lastname', {
            get: function () {
                return this._lastname;
            },
            set: function (value) {
                validateName(value);
                this._lastname = value;
                return this;
            }
        });

        Object.defineProperty(Person.prototype, 'age', {
            get: function () {
                return this._age;
            },
            set: function (value) {
                validateAge(value);

                this._age = parseInt(value);
                return this;
            }
        });

        Object.defineProperty(Person.prototype, 'fullname', {
            get: function () {
                return this._firstname + ' ' + this._lastname;
            },
            set: function (value) {
                var names = value.split(' ');
                validateName(names[0]);
                validateName(names[1]);

                this._firstname = names[0];
                this._lastname = names[1];

                return this;
            }
        });

        Person.prototype.introduce = function () {
            return 'Hello! My name is ' + this.fullname + ' and I am ' + this.age + '-years-old';
        };

        return Person;
    }());

    var Student = (function (parent) {
        function Student(firstName, lastName, inputAge, inputGrade) {
            parent.call(this, firstName, lastName, inputAge);
            this.grade = inputGrade;
        }

        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        Student.prototype = Object.create(Person.prototype);//TODO -the best solution
        Student.prototype.constructor = Student;
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        function validateGrade(value) {
            if (value < 2 || value > 6) {
                throw new Error('Grade is invalid');
            }
        }

        Object.defineProperty(Student.prototype, 'grade', {
            get: function () {
                return this._grade;
            },
            set: function (value) {
                validateGrade(value);

                this._grade = value;
                return this;
            }
        });

        Student.prototype.introduce = function(){
            var baseResult = Person.prototype.introduce.call(this);
            return baseResult + ' and my grade is: ' + this.grade;
        };

        return Student;
    }(Person));

    return {
        Person: Person,
        Student: Student
    };

}
var solver = solve();

var eva =  new solver.Person('Eva', 'Ova', '19');
console.log(eva);//{ _firstname: 'Eva', _lastname: 'Ova', _age: 19 }
console.log(eva.introduce());//Hello! My name is Eva Ova and I am 19-years-old
var student = new solver.Student('Oho', 'Boho', 20, 6);
console.log(student);//{ _firstname: 'Oho', _lastname: 'Boho', _age: 20, _grade: 6 }
console.log(student.introduce());//Hello! My name is Oho Boho and I am 20-years-old and my grade is: 6


//module.exports = solve;