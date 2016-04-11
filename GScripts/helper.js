function getCurrentDate(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd='0'+dd
	} 

	if(mm<10) {
	    mm='0'+mm
	} 

	return yyyy+'/'+mm+'/'+dd;
}

function getUserEmail(){
	return Session.getActiveUser().getEmail()
}

function object2Array(obj) {
	var arr = []
	for (var key in obj){
    	arr.push(obj[key])
  	}
  	return arr
}