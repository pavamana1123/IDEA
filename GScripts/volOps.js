function requestAccess(volUrl,requestor) {

	var volSheet = getDefaultSheet(volUrl)
	index = getColumn(volSheet,1).indexOf(requestor.name)
	if(index!=-1){
		return {OK:false,err:"Name already exists"}
	}

	volSheet.appendRow(object2Array(requestor).concat([false]))
	return {OK:true,err:""}
	
}

function getRequests(volUrl) {
	var permitPos = 4 //0,1..
	var volSheet = getDefaultSheet(volUrl)
	var volunteers = getAllValues(volSheet).filter(function(row,i){
		return !row[permitPos]
	}).map(function(vol,i){
		return (
			{
				name:vol[0],
				loginid:vol[1],
				phone:vol[3],
			}	
		)
	})
	return {volunteers : volunteers}
}

function grantAccess(volUrl,volunteer){
	var permitPos = 4 //0,1..
	var volSheet = getDefaultSheet(volUrl)
	var index = getColumn(volSheet,1).indexOf(volunteer.name)
	if(index==-1){
		return {OK:false,err:"Name does not exist"}
	}else{
		Logger.log(volSheet.getRange(index+2,permitPos+1).getValues())
		Logger.log(getColumn(volSheet,1)[index])
		volSheet.getRange(index+2,permitPos+1).setValue([[true]])
		return {OK:true,err:""}
	}
}

function authorizeUser(volUrl, volunteer) {
	var volSheet = getDefaultSheet(volUrl)
	var index = getColumn(volSheet,1).indexOf(volunteer.name)
	return index!=-1
}

function showAllUsers(volUrl) {
	var volSheet = getDefaultSheet(volUrl)
	var volunteers = getAllValues(volSheet).map(function(vol,i){
		return (
			{
				name:vol[0],
				loginid:vol[1],
				phone:vol[3],
			}	
		)
	})
	return {volunteers : volunteers}
}

function revokeAccess(volUrl,volunteer){
	var permitPos = 4 //0,1..
	var volSheet = getDefaultSheet(volUrl)
	var index = getColumn(volSheet,1).indexOf(volunteer.name)
	if(index==-1){
		return {OK:false,err:"Name does not exist"}
	}else{
		Logger.log(volSheet.getRange(index+2,permitPos+1).getValues())
		Logger.log(getColumn(volSheet,1)[index])
		volSheet.getRange(index+2,permitPos+1).setValue([[false]])
		return {OK:true,err:""}
	}
}