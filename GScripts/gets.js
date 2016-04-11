function getColumn(sheet,colnum){
 var col = sheet.getSheetValues(1,colnum,sheet.getLastRow(),colnum)
 colVals = []
 for(var i=1;i<col.length;i++){
   colVals.push(col[i][0])
 }
  return colVals
}

function getUserDetails() {
	return new Object({name:"Ching",loginid:"noid",password:"sdluqya",phone:"209318231"})
}

function getAllValues(sheet){
  return sheet.getSheetValues(2,1,sheet.getLastRow()-1,sheet.getLastColumn())
}

function getDefaultSheet(url) {
	return SpreadsheetApp.openByUrl(url).getSheets()[0]
}