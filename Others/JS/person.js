
/* javascript library for tracking individual persons */

var Person = function(name,email){
	this.name = name;
	this.email = email;
	this.team = [];
}

Person.prototype.addTeam = function(teamName){
	this.team.push(teamName);
}


var PersonList = function(){
	this.personList = [];
});

PersonList.prototype.add = function(person){
	this.personList.push(person);
}

PersonList.prototype.delete = function(personEmail){
	var personIndex;

	this.personList.forEach(function(value,index){
		if(person.email == personEmail){
			personIndex = index;
		}
	});

	this.personList.splice(index,1);
}

var pList = new PersonList();

var createPerson = function(name,email){
	var person = new Person(name,email);
	pList.add(person);
	return person;
}

