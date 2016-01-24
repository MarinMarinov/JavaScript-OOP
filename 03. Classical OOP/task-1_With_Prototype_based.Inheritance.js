var person = (function () {
    var person = {};
    person.init = function(firstname, lastname, age){
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;

        return this;
    };

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

    Object.defineProperties(person,{
        firstname: {
            get: function () {
                return this._firstname;
            },
            set: function (value) {
                validateName(value);

                this._firstname = value;
                return this;
            }
        },
        lastname: {
            get: function () {
                return this._lastname;
            },
            set: function (value) {
                validateName(value);
                this._lastname = value;
                return this;
            }
        },
        age: {
            get: function () {
                return this._age;
            },
            set: function (value) {
                validateAge(value);

                this._age = parseInt(value);
                return this;
            }
        },
        fullname: {
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
        }
    });

    person.introduce = function () {
        return 'Hello! My name is ' + this.fullname + ' and I am ' + this.age + '-years-old';
    };

    return person;
}());

var student = (function (parent) {
    var student = Object.create(parent);

    student.init = function(firstname, lastname, age, grade){
        parent.init.call(this, firstname, lastname, age);
        this.grade = grade;

        return this;
    };

    function validateGrade(value) {
        if (value < 2 || value > 6) {
            throw new Error('Grade is invalid');
        }
    }

    Object.defineProperty(student, 'grade', {
        get: function () {
            return this._grade;
        },
        set: function (value) {
            validateGrade(value);
            this._grade = value;
            return this;
        }
    });

    student.introduce = function(){
        var baseResult = parent.introduce.call(this);
        return baseResult + ' and my grade is ' + this.grade;
    };

    return student;
}(person));

var personGosho = Object.create(person).init('Gosho', 'Petrov', '18');
console.log(personGosho);//{ _firstname: 'Gosho', _lastname: 'Petrov', _age: 18 }
console.log(personGosho.introduce());//Hello! My name is Gosho Petrov and I am 18-years-old

var studentTosho = Object.create(student).init('Tosho', 'Petrov', 20, 6);
console.log(studentTosho); //{ _firstname: 'Tosho', _lastname: 'Petrov', _age: 20, _grade: 6 }
console.log(studentTosho.introduce());//Hello! My name is Tosho Petrov and I am 20-years-old and my grade is 6