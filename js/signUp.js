(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDFqvuBPgV2_oaAJHNWCTKg6ywHDv9FdwQ",
        authDomain: "veersenchatapp.firebaseapp.com",
        databaseURL: "https://veersenchatapp.firebaseio.com",
        projectId: "veersenchatapp",
        storageBucket: "veersenchatapp.appspot.com",
        messagingSenderId: "95741420012"
    };
    firebase.initializeApp(config);

    var txt_email = document.getElementById("txt_email");
    var txt_password = document.getElementById("txt_password");
    var txt_password_again = document.getElementById("txt_password_again");
    var btn_sign_up = document.getElementById("btn_sign_up");
    var img_loading = document.getElementById("img_loading");

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            img_loading.style.visibility = "visible";

            if(user.emailVerified){

                img_loading.style.visibility = "hidden";
                window.location.replace("chatPage.html");

            }else{

                img_loading.style.visibility = "hidden";
                swal("Verify Email !", "Please Check E-mail Inbox for Verification Link", "warning");
                firebase.auth().signOut().then(function() {
                    // Sign-out successful.
                }).catch(function(error) {
                    // An error happened.
                    swal("Error !", error.message, "warning");
                });

            }

        } else {

            // No user is signed in.
            img_loading.style.visibility = "hidden";

        }
    });

    btn_sign_up.addEventListener("click", function () {

        img_loading.style.visibility = "visible";

        var email = txt_email.value;
        var password = txt_password.value;
        var password_again = txt_password_again.value;

        if(!(password == password_again)){

            img_loading.style.visibility = "hidden";
            swal("Password Didn't Match", "Please Confirm Your Password", "error");

        }else{

            var promise = firebase.auth().createUserWithEmailAndPassword(email, password);

            promise.then(function () {

                var user = firebase.auth().currentUser;

                user.sendEmailVerification().then(function() {
                    // Email sent.
                    img_loading.style.visibility = "hidden";
                    swal("Sign Up Successful !", "Please Check E-mail Inbox for Verification Link", "success");
                    firebase.auth().signOut().then(function() {
                        // Sign-out successful.
                    }).catch(function(error) {
                        // An error happened.
                        swal("Error !", error.message, "warning");
                    });

                }).catch(function(error) {
                    // An error happened.
                    img_loading.style.visibility = "hidden";
                    swal("Error !", error.message, "error");
                });

            });

            promise.catch(function (error) {

                img_loading.style.visibility = "hidden";
                swal("Error !", error.message, "error");

            });

        }

    });

}());