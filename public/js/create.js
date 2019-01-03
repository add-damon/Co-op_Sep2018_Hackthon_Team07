// reference to the groups section of the database
let groupsFirebaseRef = firebase.database().ref('groups/');

function adjustTime(num) {
    if (num < 10) {
        return '0' + num;
    }
}
function createGroupInformation() {
    // Create the object to hold all the information
    let groupInfo = new Object();
    let nameObj = new Object();

    let groupName = document.getElementById('group-name').value;
    let location = document.getElementById('location').value;
    let email = document.getElementById('email').value;
    let maxNumber = document.getElementById('max').value;
    let type = document.getElementById('type').value;
    let description = document.getElementById('description').value;
    let day = document.getElementById('day').value;
    let time = document.getElementById('time').value;

    let date = new Date();

    let dd = adjustTime(date.getDay());
    let mm = adjustTime(date.getMonth() + 1);
    let yyyy = date.getFullYear();

    // console.log(groupName);
    // console.log(location);
    // console.log(email);
    // console.log(maxNumber);

    nameObj.location = location;
    nameObj.email = email;
    nameObj.max = maxNumber;
    nameObj.type = type;
    nameObj.description = description;
    nameObj.date = dd + '/' + mm + '/' + yyyy;
    nameObj.dateForOrder = '' + yyyy + mm + dd;
    nameObj.day = day;
    nameObj.time = time;

    groupInfo[groupName] = nameObj;

    return groupInfo;
}

function addGroupToFirebase(obj) {
    groupsFirebaseRef.update(obj);

}

function hasValue(x) {
    if (document.getElementById(x).value) {
        return true;
    } else {
        return false;
    }
}

// Add onclick function to submit button
function submitFunction () {
    let ids = ['group-name', 'email', 'max', 'time', 'description'];

    let booleanList = ids.map(hasValue);

    let numberOfTrues = 0;

    for (let i = 0; i < booleanList.length; i++) {
        if (booleanList[i] === true) {
            numberOfTrues += 1;
        }
    }

    if (numberOfTrues === 5) {
        let groupObj = createGroupInformation();
        setTimeout(function () {
            addGroupToFirebase(groupObj);
            alert('You have successfully added a group!');
        }, 200);
        setTimeout(function () {
            window.location.href = 'find.html';
        }, 400);
    } else {
        alert('Please fill in all the forms');
    }
}

document.getElementById('submit-button').onclick = submitFunction;



