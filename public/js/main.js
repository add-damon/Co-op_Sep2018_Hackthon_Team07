$( document ).ready(function() {

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            console.log('user logged in');
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var uid = user.uid;
            var phoneNumber = user.phoneNumber;
            var providerData = user.providerData;

            // 
            firebase.database().ref("users/" + user.uid).update(
                {
                    uid: uid,
                    name: displayName,
                    email: email,
                    phoneNumber: phoneNumber,
                    photoURL: photoURL,
                    emailVerified: emailVerified,
                    providerData: providerData
                });
            // 

            user.getIdToken().then(function(accessToken) {
                
                //Save user info in Session Storage
                var userInfo = {'uid': uid, 'name':displayName, 'email':email};
                sessionStorage.setItem('userInfo', JSON.stringify(user));
                
                $("#profile").text(userInfo.name);
                $("#profile").css("color","green");
            });
        } else {
            sessionStorage.removeItem('userInfo');
            // Page is redirected.
            window.location.href='../html/landing.html';
        }
    }, function(error) {
        console.log(error);
    });
    
    function signOut () {
        firebase.auth().signOut().then(function() {
            console.log('Signed Out');
            sessionStorage.removeItem('userInfo');
            window.location.href = './landing.html';
          }, function(error) {
            console.error('Sign Out Error', error);
          });
    }
    
    document.getElementById('sign-out').onclick = signOut;
});


