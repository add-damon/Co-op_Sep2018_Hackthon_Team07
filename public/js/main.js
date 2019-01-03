$( document ).ready(function() {
    
    initApp = function() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var uid = user.uid;
                var phoneNumber = user.phoneNumber;
                var providerData = user.providerData;
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
    };
    
    window.addEventListener('load', function() {
        initApp();
    });    
    
    // Logout button listener
    $("#logout").on("click", function(e) {
        var promise = firebase.auth().signOut();
        promise.then(function(){
            sessionStorage.removeItem('userInfo');
            window.location.href='/html/landing.html';
        });
    });

});

function signOut () {
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
        window.location.href = './landing.html';
      }, function(error) {
        console.error('Sign Out Error', error);
      });
}

document.getElementById('sign-out').onclick = signOut;
