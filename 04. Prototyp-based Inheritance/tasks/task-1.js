/* Task Description */
/*
* Create an object domElement, that has the following properties and methods:
  * use prototypal inheritance, without function constructors
  * method init() that gets the domElement type
    * i.e. `Object.create(domElement).init('div')`
  * property type that is the type of the domElement
    * a valid type is any non-empty string that contains only Latin letters and digits
  * property innerHTML of type string
    * gets the domElement, parsed as valid HTML
      * <type attr1="value1" attr2="value2" ...> .. content / children's.innerHTML .. </type>
  * property content of type string
    * sets the content of the element
    * works only if there are no children
  * property attributes
    * each attribute has name and value
    * a valid attribute has a non-empty string for a name that contains only Latin letters and digits or dashes (-)
  * property children
    * each child is a domElement or a string
  * property parent
    * parent is a domElement
  * method appendChild(domElement / string)
    * appends to the end of children list
  * method addAttribute(name, value)
    * throw Error if type is not valid
  * method removeAttribute(attribute)
    * throw Error if attribute does not exist in the domElement
*/


//function solve() {
    var domElement = (function () {

        function validateType(type) {
            if (!(/^[a-zA-Z0-9]+$/.test(type)) || type === '' || typeof type !== 'string') {
                throw new Error('Valid type is any non-empty string that contains only Latin letters and digits');
            }
        }

        function validateContent(content) {
            if (typeof content !== 'string') {
                throw new Error('Content must be of type string');
            }
        }

        function validateParent(parent) {
            if (Object.getPrototypeOf(parent) !== domElement) {
                throw new Error('Parent must be domElement');
            }
        }

        function validateChild(child) {
            if (typeof(child) !== 'string' && Object.getPrototypeOf(child) !== domElement) { //TODO it matters the order of checking
                throw new Error('Each child has to be a domElement or a string')
            }
        }

        function validateAttribute(attribute) {
            if (!(/^[a-zA-Z0-9-]+$/.test(attribute)) || attribute === '' || typeof attribute !== 'string') {
                throw new Error('Attribute must to have a non-empty string for a nam//e that contains only Latin letters and digits or dashes (-)')
            }
        }

        function sortAttributes(attributes) { //TODO question X
            var arrayOfAttributes = [];
            for (var prop in attributes) { //TODO if there isn't property(in case of empty attributes = {}
                if (attributes.hasOwnProperty(prop)) { //TODO ...so what we check here in that case? Isn't this check useless, because here we receive not-empty attributes?
                    arrayOfAttributes.push(prop); //will enter if there are ONLY own properties, not inherited ones
                }
                //arrayOfAttributes.push(prop); //TODO the solution is passing!!!
            }
            arrayOfAttributes = arrayOfAttributes.sort();

            return arrayOfAttributes;
        }


        var domElement = {
            init: function (type) {
                this.type = type; //TODO why this is without_
                this.content = ''; //TODO but this is with _
                this._attributes = {};
                this._children = [];
                //this._parent =  //TODO where is the parent?
                return this;
            },
            appendChild: function (child) {
                validateChild(child);
                this.children.push(child); ////TODO why with this?
                console.log(this); //this is the domElement
                child.parent = this; //TODO why? this is domElement, and child must know his poarent, beacause we use it in get innerHTml()
                return this;
            },
            addAttribute: function (name, value) {
                validateAttribute(name);
                this.attributes[name] = value;
                return this;
            },
            removeAttribute: function (attribute) {
                if (!this.attributes[attribute]) {
                    throw new Error('This attribute does not exist');
                }

                delete this.attributes[attribute]; //TODO DELETE - operator

                return this;
            },
            get innerHTML() {
                var result = '';
                result += '<' + this.type;

                if (this.attributes) { //TODO in connection with question X
                    var sortedAttributes = sortAttributes(this.attributes);

                    for (var i = 0, len = sortedAttributes.length; i < len; i += 1) {
                        result += ' ' + sortedAttributes[i] + '="' + this.attributes[sortedAttributes[i]] + '"';
                    }
                }

                result += '>';

                if (this.children.length > 0) {
                    for (var j = 0, length = this.children.length; j < length; j += 1) {
                        if (typeof this.children[j] === 'string') { //TODO why? We have already validate all children!
                            result += this.children[j];
                        }
                        else {
                            result += this.children[j].innerHTML; //TODO ? Recursion
                        }
                    }
                }
                else {
                    result += this.content;
                }
                result += '</' + this.type + '>';

                return result;
            }
        };

        Object.defineProperties(domElement, {
            type: {
                get: function () {
                    return this._type;
                },
                set: function (value) {
                    validateType(value);
                    this._type = value;
                }
            },
            content: {
                get: function () {
                    return this._content;
                },
                set: function (value) {
                    validateContent(value);
                    this._content = value;
                }
            },
            attributes: {
                get: function () {
                    return this._attributes;
                }
                // TODO why doesn't have setter?
            },
            children: {
                get: function () {
                    return this._children;
                }
                // TODO why doesn't have setter?
            },
            parent: {
                get: function () {
                    return this._parent;
                },
                set: function (value) {
                    validateParent(value);
                    this._parent = value;
                }
            }
        });

        return domElement;
    }());

//   return domElement;
//}

//module.exports = solve;

//Example

var meta = Object.create(domElement)
    .init('meta')
    .addAttribute('charset', 'utf-8');

var head = Object.create(domElement)
    .init('head')
    .appendChild(meta);

var div = Object.create(domElement)
    .init('div')
    .addAttribute('style', 'font-size: 42px');

div.content = 'Hello, world!';

var body = Object.create(domElement)
    .init('body')
    .appendChild(div)
    .addAttribute('id', 'cuki')
    .addAttribute('bgcolor', '#012345');

    //.addAttribute('bgcolor', '#012345');

var root = Object.create(domElement)
    .init('html')
    .appendChild(head)
    .appendChild(body);

console.log(root.innerHTML);
/*var text = 'Some text here, doesn\'t really matter that much what it is.',
    root = Object.create(domElement)
        .init('p')
        .appendChild(text);
console.log(root);*/
//Outputs:
//<html><head><meta charset="utf-8"></meta></head><body bgcolor="#012345" id="cuki"><div style="font-size: 42px">Hello, world!</div></body></html>
//<html><head><meta charset="utf-8"></meta></head><head><meta charset="utf-8"></meta></head></html>
//<html><head><meta charset="utf-8"></meta></head><body bgcolor="#012345" id="cuki"><div style="font-size: 42px">Hello, world!</div></body></html>