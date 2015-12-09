
var Event = function(obj){
	if(obj.hasOwnProperty("date")){
		this.date = obj.date;
	}
	if(obj.hasOwnProperty("notes")){
		this.notes = obj.notes;
	}
	if(obj.hasOwnProperty("type")){
		this.type = obj.type;
	}
	

}