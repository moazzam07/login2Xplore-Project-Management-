var jpdbBaseUrl = "http://api.login2explore.com:5577";
var jpdbIML = '/api/iml';
var jpdbIRL = '/api/irl';
var collegeDBName = "COLLEGE-DB";
var ProjectRelationName = "PROJECT-TABLE";
var connToken = "90932376|-31949271702715692|90953945";

$('#projId').focus()

function saveRecordToLocalStorage(jsonObj){
    var data = JSON.parse(jsonObj.data);
    localStorage.setItem('rec_no', data.rec_no);
}

function getProjIdAsJsonObj(){
    var projId = $('#projId').val();
    var jsonStr = {
        Id: projId
    };
    return JSON.stringify(jsonStr);
}

function validateData() {
    var projId = $('#projId').val();
    var projName = $('#projName').val()
    var assnTo = $('#assnTo').val()
    var assnDate = $('#assnDate').val()
    var deadLine = $('#deadLine').val()

    if(projId == ''){
        alert("Project Id cannot be blank")
        $('#projId').focus()
        return "";
    }

    if(projName == ''){
        alert("Project Name cannot be blank")
        $('#projName').focus()
        return "";
    }

    if(assnTo == ''){
        alert("Assigned to cannot be blank")
        $('#assnTo').focus()
        return "";
    }

    if(projId == ''){
        alert("Project Id not be blank")
        $('#projId').focus()
        return "";
    }

    if(assnDate == ''){
        alert("Assignment Date cannot be blank")
        $('#assnDate').focus()
        return "";
    }

    if(deadLine == ''){
        alert("deadLine cannot be blank")
        $('#deadLine').focus()
        return "";
    }

    var jsonStrObj = {
        Id: projId,
        Name: projName,
        To: assnTo,
        Date: assnDate,
        Deadline: deadLine
    };
    return JSON.stringify(jsonStrObj);
}

function resetForm(){
    $('#projId').val("")
    $('#projName').val("")
    $('#assnTo').val("")
    $('#assnDate').val("")
    $('#deadLine').val("")

    $('#projId').prop("disabled", false)
    $('#save').prop("disabled", true)
    $('#update').prop("disabled", true)
    $('#reset').prop("disabled", true)

    $('#projId').focus()
}

function saveData(){
    var jsonStrObj = validateData();
    if(jsonStrObj === "") return "";

    var putRequest = createPUTRequest(connToken, jsonStrObj, collegeDBName, ProjectRelationName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj =  executeCommandAtGivenBaseUrl(putRequest, jpdbBaseUrl, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $('#projId').focus();
}

function getProj(){
    var projJsonObj = getProjIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, collegeDBName, ProjectRelationName, projJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj =  executeCommandAtGivenBaseUrl(getRequest, jpdbBaseUrl, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if(resJsonObj.status === 400){
        $('#save').prop("disabled", false);
        $('#reset').prop("disabled", false);
        $('#projName').focus();
    } else{
        $('#projId').prop("disabled", true);
        fillData(resJsonObj);
        $('#update').prop("disabled", false);
        $('#reset').prop("disabled", false);
        $('#projName').focus();
    }
}

function fillData(jsonObj){
    saveRecordToLocalStorage(jsonObj);
    var data = JSON.parse(jsonObj.data).record;
    console.log(jsonObj)
    $('#projName').val(data.Name);
    $('#assnTo').val(data.To);
    $('#assnDate').val(data.Date)
    $('#deadLine').val(data.Deadline)
}

function changeData(){
    $('#change').prop("disabled", true);
    jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, collegeDBName, ProjectRelationName, localStorage.getItem('rec_no'));
    console.log(updateRequest)
    jQuery.ajaxSetup({async: false});
    var resJsonObj =  executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseUrl, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj)
    resetForm();
    $('#projId').focus();

}