function getProgramSheetUrl () {
	return "https://docs.google.com/spreadsheets/d/1y4MdRT5kDQstEzLY1jf0JzthfcEDaOeVV2nWcxCoD0A/edit"
}

function getProgramSheet(argument) {
	return SpreadsheetApp.openByUrl(getProgramSheetUrl)
}

function getMasterSheetUrl(programName) {
	var programSheet = SpreadsheetApp.openByUrl(getProgramSheetUrl)
	programIndex = getColumn(programSheet,1).indexOf(programName)

	if(programIndex==-1){
		return ""
	}else{
		return programSheet.getSheetValues(programIndex+2,5,programIndex+2,5)[0][0]
	}
}

function getProgramsByCreator(userName) {
	var creatorPos = 1 //0,1
	var programSheet = getProgramSheet().getSheets()[0]
	var programData = programSheet.getSheetValues(2,1,programSheet.getLastRow()-1,programSheet.getLastColumn()).filter(function(row,i){
		return row[creatorPos]==userName ? true : false
	}).map(function(prog,i){
		return ({
			name:prog[0],
			creator:prog[1],
			creatorEmail:prog[2],
			createdOn:prog[3],
			masterUrl:prog[4],
			allocUrl:prog[5],
			volUrl:prog[6],
		})
	})

	return ({program : programData})
}

function getAllPrograms() {
	var programSheet = getProgramSheet().getSheets()[0]
	var programData = programSheet.getSheetValues(2,1,programSheet.getLastRow()-1,programSheet.getLastColumn()).map(function(prog,i){
		return ({
			name:prog[0],
			creator:prog[1],
			creatorEmail:prog[2],
			createdOn:prog[3],
			masterUrl:prog[4],
			allocUrl:prog[5],
			volUrl:prog[6],
		})
	})
	return ({program : programData})
}

function getProgram(programName){
	var programSheet = getProgramSheet().getSheets()[0]
	var rawProgramData = getAllValues(programSheet)
	var index = getColumn(getProgramSheet(),1).indexOf(programName)
	if(index==-1){
		return {program : {}}
	}else{
		var prog = rawProgramData[index]
		var programData = ({
			name:prog[0],
			creator:prog[1],
			creatorEmail:prog[2],
			createdOn:prog[3],
			masterUrl:prog[4],
			allocUrl:prog[5],
			volUrl:prog[6],
		})
		return ({program : programData})
	}
}