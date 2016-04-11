function main(){

  myProgs = getProgram("Password For Happiness")

  requestor = {
        name:"me2",
        loginid:"you",
        password:"wqeq",
        phone:"9102831033",
      }
  
  // Logger.log(myProgs)
  
  // var resp = requestAccess(myProgs.program.volUrl,requestor)
  // if(!resp.OK){
  //   Logger.log(resp.err)
  // }

  // var resp = grantAccess(myProgs.program.volUrl,requestor)
  // if(!resp.OK){
  //   Logger.log(resp.err)
  // }

  var requests = getRequests(myProgs.program.volUrl).volunteers
  Logger.log(requests)
  for(var i=0;i<requests.length;i++){
    var resp = grantAccess(myProgs.program.volUrl,requests[i])
    if(!resp.OK){
      Logger.log(resp.err)
    }
  }

}

function createNewSheet(name) {
  return SpreadsheetApp.create(name)
}

function createNewMasterSheet(programName){
  var masterSheet = createNewSheet(programName+" - Master Contact List")
  masterSheet.renameActiveSheet("void")
  return masterSheet
}

function createNewVolSheet(programName,adminDetails){
  var volSheet = createNewSheet(programName+" - Volunteers List")
  volSheet.renameActiveSheet("Volunteers")
  volSheet.appendRow(["Name","Login ID","Password","Phone","Permission"])
  volSheet.appendRow([adminDetails.name,adminDetails.loginid,adminDetails.password,adminDetails.phone,true])
  return volSheet
}

function createNewAllocSheet(programName){
  var allocSheet = createNewSheet(programName+" - Call Allocation Lists")
  allocSheet.renameActiveSheet("void")
  allocSheet.appendRow(["Contact Name", "Phone", "To call on", "Allocated to", "Satuts Code", "Remarks", "Previous Code", "Previous Remarks", "Deference Date"])
  return allocSheet
}

function createNewProgram(program){
  var programSheetUrl = "https://docs.google.com/spreadsheets/d/1y4MdRT5kDQstEzLY1jf0JzthfcEDaOeVV2nWcxCoD0A/edit"

  if(program.name==""){
    return {OK:false,err:"Program name cannot be empty"}
  }

  var programSheet = SpreadsheetApp.openByUrl(getProgramSheetUrl())
  programNames = getColumn(programSheet,1)

  if(programNames.indexOf(program.name)!=-1){
    return {OK:false,err:"Program with same name already exists"}
  }

  var creator = getUserEmail()
  var createdOn = getCurrentDate()

  var sheetUrl = []
  sheetUrl.push(createNewMasterSheet(program.name).getUrl())
  sheetUrl.push(createNewAllocSheet(program.name).getUrl())
  sheetUrl.push(createNewVolSheet(program.name,getUserDetails()).getUrl())

  var programData = [] 
  for (var key in program){
    programData.push(program[key])
  }
  
  SpreadsheetApp.openByUrl(getProgramSheetUrl()).appendRow(programData.concat([creator,createdOn].concat(sheetUrl)))

  return {OK:true,err:""}
}

function createNewEvent(programName,eventDate){
  var masterSheetUrl = getMasterSheetUrl(programName)
  Logger.log(masterSheetUrl)
  var masterSheet = SpreadsheetApp.openByUrl(masterSheetUrl)
  if(masterSheetUrl==""||eventDate==""){
    return {OK:false,err:"Empty url or eventDate"}
  }
  if(masterSheet.getSheets().map(function(sheet,i){sheet.getSheetName()}).indexOf(eventDate)!=-1){
    return {OK:false,err:"Event already exists"}
  }

  var allSheets = masterSheet.getSheets()
  if(allSheets.length==1 && allSheets[0].getSheetName() == "void"){
    Logger.log(allSheets.length)
    masterSheet.renameActiveSheet(eventDate)
  }else{
    Logger.log("here",allSheets.length)
    masterSheet.insertSheet(eventDate)
  }

  var eventSheet = masterSheet.getSheetByName(eventDate)
  var userFields = ["Timestamp","Name","Phone"]
  var autoFields = ["State","Deference Date"]

  eventSheet.appendRow(userFields.concat(autoFields))
  return {OK:true,err:""}
}