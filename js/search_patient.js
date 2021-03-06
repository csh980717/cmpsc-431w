function getEle(id) {
    return document.getElementById(id);
}

var pat_name = '';
var cou = 0;

function search_patient_by_name() {
    var patient_name = getEle("patient_name").value;
    pat_name = patient_name;
    var request = new XMLHttpRequest();
    ++cou;
    request.open("GET", "search_patient_action.php?keyword=" + patient_name + "&page=" + 1 + "&cou=" + cou); //async
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                var a = JSON.parse(request.response);
                var obj = getEle("search_patient_table_body");
                var table = '';

                for (var k in a) {
                    var birthday = a[k].birthday.substr(0, 4);
                    var age = 2021 - birthday;
                    table += '' +
                        '                <tr >\n' +
                        '                    <td >' + a[k].fname + ' ' + a[k].mname + ' ' + a[k].lname + '</td>\n' +
                        '                    <td >' + age + '</td>\n' +
                        '                    <td >' + a[k].email + '</td>\n' +
                        '                    <td  style="display:none">' + a[k].patient_id + '</td>\n' +
                        '                    <td >\n' +
                        '                        <div >\n' +
                        '                            <button type="button" class="btn btn-sm btn-secondary" onclick=select_patient(this)>Select</button>\n' +
                        '                        </div>\n' +
                        '                    </td>\n' +
                        '                </tr>'
                }
                obj.innerHTML = table;
            } else {
                alert("error occured: " + request.status);
            }
        }
    }
}


function sort_patient() {
    var request = new XMLHttpRequest();
    ++cou;
    var patient_name = getEle("patient_name").value;
    if (patient_name == '') {
        // not init
        request.open("GET", "doc_center_action.php?func=" + 1 + "&patient_name=" + patient_name + "&mode=" + cou); //async
    } else {
        request.open("GET", "doc_center_action.php?func=" + 1 + "&patient_name=" + patient_name + "&mode=" + cou); //async
    }
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                var jsonStr = request.response.replace(new RegExp('\\"', "gm"), '"');
                var a = JSON.parse(jsonStr);
                var obj = getEle("search_patient_table_body");
                var table = '';

                for (var k in a) {
                    for (var j in a[k]) {
                        table += '' +
                            '                <tr>\n' +
                            '                    <td>' + a[k][j].fname + a[k][j].mname + a[k][j].lname + '</td>\n' +
                            '                    <td>' + a[k][j].age + '</td>\n' +
                            '                    <td>' + a[k][j].email + '</td>\n' +
                            '                    <td id="td3">\n' +
                            '                        <div id="div">\n' +
                            '                            <button type="button" class="btn btn-sm btn-secondary">Select</button>\n' +
                            '                        </div>\n' +
                            '                    </td>\n' +
                            '                </tr>'
                    }
                }
                obj.innerHTML = table;
            } else {
                alert("error occured: " + request.status);
            }
        }
    }
}

function select_patient(_this) {
    var selected_pat_id = _this.parentNode.parentNode.parentNode.cells[3].innerHTML;
    var doc_id = getEle("doctor_info").innerHTML;

    location.href = `create_pres.php?pid=${selected_pat_id}`

    // var request = new XMLHttpRequest();
    // request.open("GET","add_appointment.php?patid=" + selected_pat_id + "&docid=" + doc_id); //async
    // request.send();
    // request.onreadystatechange = function() {
    //     if(request.readyState === 4) {
    //         if(request.status === 200) {
    //             // alert("select successfully");
    //             location.replace("doc_center.php");
    //         }
    //         else {
    //             alert("error occured: " + request.status);
    //         }
    //     }
    // }
}