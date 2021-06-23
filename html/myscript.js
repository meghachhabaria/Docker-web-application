var subcmdlist = ["ls", "exec"]
function lw() {
    //document.getElementsByTagName("h1").innerHTML = "Successfull";
    document.getElementById("1").innerHTML = document.getElementById("2").value;
}
function dockerOutput() {
    try {
        var cmd = "sudo docker" + " " + document.getElementById("managementCMD").value + " " + document.getElementById("SubCMD").value + " " + document.getElementById("Options").value
    }
    catch (TypeError) {
        var cmd = "sudo docker" + " " + document.getElementById("cmds").value + " " + document.getElementById("Options").value
    }
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://192.168.104.53/cgi-bin/docker.py?x=" + cmd, true);
    document.getElementById("OutputWindow").innerHTML = '<div class="loader"></div>';
    xhr.send()
    xhr.onload = function () {
        document.getElementById("OutputWindow").innerHTML = xhr.responseText;
    }
}
function managementChoice(choiceID) {
    if (choiceID == "choiceYES") {
        commands = ["container", "image", "volume", "network"]
        CMDs = '<td class="RowDescribe"><label for="managementCMD">Choose a Management Command :</label></td>' +
            '<td><select name="managementCMD" id="managementCMD" onchange="managementSubCMDsList();">';
        for (var i = 0; i < commands.length; i++) {
            CMDs = CMDs + '<option value="' + commands[i] + '">' + commands[i] + '</option>';
        }
        CMDs = CMDs + '</select></td>';
        document.getElementById("managementCMDs").innerHTML = CMDs;
        //document.getElementById("managementSubCMDsAsk").innerHTML = "Choose a Management Sub-Command :";
        document.getElementById("CMDs").innerHTML = null;
        commands = ["exec", "run", "ls"];
        CMDs = '<td class="RowDescribe"><label for="SubCMD" id="managementSubCMDsAsk">Choose a Management Sub-Command :</label></td>' +
            '<td><select name="managementSubCMDs" id="SubCMD">';
        for (var i = 0; i < commands.length; i++) {
            CMDs = CMDs + '<option value="' + commands[i] + '">' + commands[i] + '</option>';
        }
        CMDs = CMDs + '</select></td>';
        document.getElementById("managementSubCMDs").innerHTML = CMDs;
    }
    else if (choiceID == "choiceNO") {
        document.getElementById("managementCMDs").innerHTML = null;
        document.getElementById("managementSubCMDs").innerHTML = null;
        commands = ["exec", "run", "ps", "images", "rm", "rmi", "pull", "start"];
        CMDs = '<td class="RowDescribe"><label for="CMDs" >Choose a Command :</label></td><td><select name="CMDs" id="cmds">';
        for (var i = 0; i < commands.length; i++) {
            CMDs = CMDs + '<option value="' + commands[i] + '">' + commands[i] + '</option>';
        }
        CMDs = CMDs + '</select></td>';
        document.getElementById("CMDs").innerHTML = CMDs;
    }
}
function test() {
    document.getElementById("header").innerHTML = document.getElementById("managementCMD").value;
}
function managementSubCMDsList() {
    managementCMD = document.getElementById("managementCMD").value;
    if (managementCMD == "container") {
        commands = ["exec", "run", "ls"];
    }
    else if (managementCMD == "image") {
        commands = ["build", "history", "ls"];
    }
    else if (managementCMD == "volume") {
        commands = ["inspect", "ls"];
    }
    else if (managementCMD == "network") {
        commands = ["inspect", "ls"];
    }
    CMDs = "";
    for (var i = 0; i < commands.length; i++) {
        CMDs = CMDs + '<option value="' + commands[i] + '">' + commands[i] + '</option>';
    }
    document.getElementById("SubCMD").innerHTML = CMDs;
}