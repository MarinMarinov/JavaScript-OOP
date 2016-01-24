function solve() {
    function validateTitle(title){
        if(title === ''){
            throw new Error('Title must have at least one character');
        }
        if(title[0] === ' ' || title[title.length - 1] === ' '){
            throw new Error('Title cannot starts or ends with space');
        }
        /*if(title.match(/\s{2,}/)){
         throw new Error('Title cannot contain two consecutive spaces');
         }*/
        for(var i = 0; i< title.length - 1; i+=1){
            if(title[i] === ' ' && title[i + 1] === ' '){
                throw new Error('Title cannot contain two consecutive spaces');
            }
        }
    }
    function validatePresentationsExistence(presentations){
        if(!presentations.length){
            throw new Error('Presentations cannot be an empty array')
        }
        presentations.some(function(item){
            return validateTitle(item);
        })
    }
    function validateName(name){
        if(!name.length){
            throw new Error('Name must have at least one character');
        }
        if(!(name.charCodeAt(0) >= 65 && name.charCodeAt(0) <= 90)){
            throw new Error('Name must starts with capital letter');
        }
        for(var i = 1; i < name.length; i+=1){
            if(!(name.charCodeAt(i) >= 90 && name.charCodeAt(i) <= 122)){
                throw new Error('All name symbols after the first must be in lower case');
            }
        }
    }

    function validateId(id){
        if(isNaN(id) || id !== parseInt(id) || id < 1){
            //if(isNaN(id) || id !== (id | 0)){
            throw new Error('ID must be integer number');
        }

    }

    function checkForExistingStudentID(students, studentID){
        return students.some(function(object){
            return object.id === studentID;
        })
    }

    function checkForValidHomeworkID(presentations, homeworkID){
        if( homeworkID < 1 || homeworkID > presentations.length){
            return true;
        }
        return false;
    }

    function validateResults(results){
        for(var i = 0; i < results.length; i+=1){
            validateId(results[i].StudentID);
            if(results[i].Score < 0 || validateId(results[i].Score)){ //TODO Score < 0 or <2?!?!
                throw new Error('Score cannot be negative number');
            }
        }

        var studentIds = [];
        results.forEach(function(object){
            studentIds.push(object.StudentID);
        });
        studentIds.sort(function(x,y){
            return x - y;
        });

        for(var j = 0; j < studentIds.length; j+=1){
            if(studentIds[j] === studentIds[j + 1]){
                throw new Error('Duplicated Student ID when pushing Exam results')
            }
        }
    }

    function isCorrectID(id, max){
        return id > 0 && id <= max;
    }

    var Course = {
        init: function(title, presentations) {
            validateTitle(title);
            validatePresentationsExistence(presentations);
            this.title = title;
            this.presentations = presentations;
            this.students = [];
            this.StudentID = 1;
            this.homeworks = [[null]]; //TODO it's working without that raw
            this.results = []; //TODO useless???

            return this;
        },
        addStudent: function(name) {
            var fullname = name.split(' '),
                firstname = fullname[0],
                lastname = fullname[1];
            if(fullname.length > 2){
                throw new Error('Names must be no more than two')
            }

            validateName(firstname);
            validateName(lastname);

            this.students.push({
                firstname: firstname,
                lastname: lastname,
                id: this.StudentID,
                Score: 0,
                finalScore: 0
            });

            return this.StudentID++;
        },
        getAllStudents: function() {
            return this.students.slice();
        },
        submitHomework: function(studentID, homeworkID) { //TODO what is the meaning of this method?
            validateId(studentID);
            validateId(homeworkID);
            if(!checkForExistingStudentID(this.students, studentID)){
                throw new Error('There is no student with such ID');
            }
            if(checkForValidHomeworkID(this.presentations, homeworkID)){
                throw new Error('Homework ID is less than 1 or bigger then the number of lectures');
            }

            if(!this.homeworks[studentID]){
                this.homeworks[studentID] = [];
            }
            this.homeworks[studentID].push(homeworkID);

            //return this; //TODO has it to return anything, at all?
        },
        pushExamResults: function(results) {

            validateResults(results);
            var self = this;

            for(var i = 0; i < results.length; i+=1){
                this.students[results[i].StudentID - 1].Score = results[i].Score;
            }

            return this.students;
        },
        getTopStudents: function() {

            for(var i = 0; i< this.students.length; i+=1){
                this.students[i].finalScore = Math.round((0.75*this.students[i].Score + 0.25*(this.homeworks[i].length/this.presentations.length))*100)/100;
            }

            this.students.sort(function(x,y){
                return y.finalScore - x.finalScore;
            });

            this.students = this.students.slice(0, 10);

            return this.students;
        }
    };

    var course = Course.init('KPK', ['First lecture', 'Second lecture', 'Third lecture']);
    console.log(course.presentations);
    course.addStudent('Acho Zhechov');
    course.addStudent('Gosho Toshov');
    console.log(course.getAllStudents());
    course.students = {'Pesho': 'Shtangata'};

    return Course;
}

solve();

//module.exports = solve;

/*    var course = Course.init('KPK', ['First lecture', 'Second lecture', 'Third lecture']);
 console.log(course.presentations);
 course.addStudent('Acho Zhechov');
 course.addStudent('Gosho Toshov');
 course.addStudent('Tosho Toshov');
 course.addStudent('Ba Toshov');
 course.addStudent('Ga Toshov');
 course.addStudent('Da Toshov');
 course.addStudent('Ka Toshov');
 course.addStudent('La Toshov');
 course.addStudent('Ma Toshov');
 course.addStudent('Na Toshov');

 console.log(course.getAllStudents());


 course.submitHomework(1, 3);
 course.submitHomework(1, 1);
 course.submitHomework(1, 2);
 course.submitHomework(2, 2);
 course.submitHomework(3, 2);
 course.submitHomework(4, 2);
 course.submitHomework(5, 3);
 course.submitHomework(6, 1);
 course.submitHomework(7, 1);
 course.submitHomework(8, 3);
 course.submitHomework(9, 3);
 course.submitHomework(10, 1);
 /!*    course.submitHomework(11, 1);
 course.submitHomework(12, 2);*!/
 console.log(course.homeworks); //[ , [ 1 ], , [ 5 ] ]
 course.pushExamResults([{StudentID: 1, Score: 5},
 {StudentID: 2, Score: 6},
 /!*{StudentID: 3, Score: 4}*!/
 {StudentID: 4, Score: 3},
 {StudentID: 5, Score: 2},
 {StudentID: 6, Score: 3},
 {StudentID: 7, Score: 5},]);
 /!*                            {StudentID: 8, Score: 4},
 {StudentID: 9, Score: 6},
 {StudentID: 10, Score: 3},
 {StudentID: 11, Score: 4},
 {StudentID: 12, Score: 4}]);*!/
 //console.log(course.results);
 //console.log(course.students);
 console.log(course.getTopStudents());*/