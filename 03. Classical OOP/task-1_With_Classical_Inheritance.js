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

var personGosho = new Person('Gosho', 'Petrov', 18);
console.log(personGosho);//{ _firstname: 'Gosho', _lastname: 'Petrov', _age: 18 }
console.log(personGosho.introduce());//Hello! My name is Gosho Petrov and I am 18-years-old

var studentTosho = new Student('Tosho', 'Petrov', 20, 6);
console.log(studentTosho); //{ _firstname: 'Tosho', _lastname: 'Petrov', _age: 20, _grade: 6 }
console.log(studentTosho.introduce());//Hello! My name is Tosho Petrov and I am 20-years-old and my grade is: 6

console.log(personGosho instanceof Person);//true
console.log(personGosho instanceof Student);//false
console.log(studentTosho instanceof Person);//true
console.log(studentTosho instanceof Student);//true