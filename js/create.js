// reference to the groups section of the database
let groupsFirebaseRef = firebase.database().ref('groups/');

function createGroupInformation() {
    // Create the object to hold all the information
    let groupInfo = new Object();

    let groupName = document.getElementById('group-name').value;
    let location = document.getElementById('location').value;
    let email = document.getElementById('email').value;
    let maxNumber = document.getElementById('max').value;

    // console.log(groupName);
    // console.log(location);
    // console.log(email);
    // console.log(maxNumber);

    groupInfo.name = groupName;
    groupInfo.location = location;
    groupInfo.email = email;
    groupInfo.max = maxNumber;
}

function addGroupToFirebase(obj) {
    groupsFirebaseRef.on('value', function (snapshot) {
        console.log(snapshot.val());
    })

}

addGroupToFirebase();

// Add onclick function to submit button
document.getElementById('submit-button').onclick = function() {
    createGroupInformation();
}



