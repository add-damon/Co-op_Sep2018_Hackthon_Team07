// reference to the profile section of the database
var userInfo = JSON.parse(sessionStorage.userInfo);
let uid = userInfo.uid.replace('\n', '');
let profileFirebaseRef = firebase.database().ref("users/" + uid);


//Display current profile
profileFirebaseRef.on(
    "value",
    function (snap) {
        console.log(JSON.stringify(snap.val()));

        $("#user-name").val(snap.val().name);
        $("#email").val(snap.val().email);
        $("#phone").val(snap.val().phone);
        $("#description").val(snap.val().description);
    });

function generateProfileInformation() {
    // Create the object to hold all the information
    let profileInfo = new Object();
    let formInfoObj = new Object();

    let userName = document.getElementById('user-name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let description = document.getElementById('description').value;

    formInfoObj.name = userName;
    formInfoObj.phone = phone;
    formInfoObj.description = description;

    return formInfoObj;
}

//Firebase database updating user profile
$("#submit-button").on("click", function (e) {
    let profileInfo = generateProfileInformation();

    profileFirebaseRef.update(profileInfo, function (error) {
        if (error) {
            alert('Something wrong happend. Try again!');
        } else {
            alert('You have successfully updated your profile!');
        }
    }).then(function () {
    });
});

// Get Current User Email Information and compare with the email that each group contains
let email = userInfo.email;
let numberMatched = 0
let groupNames = []
let yourGroups = document.getElementById('your-groups');

// checks if the database contains any groups with the email = the current user
// if so, store the name in groupNames
firebase.database().ref('groups/').on('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        let userEmail = childSnapshot.val().email;
        if (userEmail === email) {
            numberMatched += 1;
            groupNames.push(childSnapshot.key);
        }
    })
})

// Create table elements if numberMatched is greater than 0
setTimeout(function () {

    if (numberMatched > 0) {
        for (let i = 0; i < numberMatched; i++) {
            let row = yourGroups.insertRow(i);
            row.id = 'row' + i;
            console.log(row.id);

            let cell1 = row.insertCell(0);
            cell1.innerHTML = groupNames[i];

            let cell2 = row.insertCell(1);
            let anchor = document.createElement('button');
            anchor.className = 'btn btn-primary btn-sm';
            anchor.innerHTML = 'Edit';
            anchor.href = 'https://www.google.com/';
            cell2.appendChild(anchor);

            let cell3 = row.insertCell(2);
            let addMembers = document.createElement('button');
            addMembers.className = 'btn btn-primary btn-sm';
            addMembers.innerHTML = 'Add Member';
            cell3.appendChild(addMembers);

            let cell4 = row.insertCell(3);
            let delbutton = document.createElement('button');
            delbutton.className = 'btn btn-primary btn-sm';
            delbutton.innerHTML = 'Delete';
            delbutton.onclick = function () {
                delFromFirebase(groupNames[i]);
                setTimeout(function () {
                    let rowToBeRemoved = document.getElementById('row' + i);
                    console.log(rowToBeRemoved);
                    rowToBeRemoved.parentNode.removeChild(rowToBeRemoved);
                }, 500);
            }
            cell4.appendChild(delbutton);
        }
    }

}, 1000);

// delete group information from firebase
function delFromFirebase(name) {
    let groupRef = firebase.database().ref('groups/');
    groupRef.child(name).remove();
}



