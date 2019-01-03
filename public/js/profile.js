// reference to the profile section of the database
var userInfo = JSON.parse(sessionStorage.userInfo);
let uid = userInfo.uid;
let profileFirebaseRef = firebase.database().ref("users/" + uid);


//Display current profile
profileFirebaseRef.on(
    "value",   
    function(snap) {
        //console.log(JSON.stringify(snap.val()));

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

//Firebase database updating
$("#submit-button").on("click", function(e) {
    let profileInfo = generateProfileInformation();

    profileFirebaseRef.update(profileInfo, function(error) {
        if (error) {
            alert('Something wrong happend. Try again!');
        } else {
            alert('You have successfully updated your profile!');
        }
    }).then(function(){
    });
});
