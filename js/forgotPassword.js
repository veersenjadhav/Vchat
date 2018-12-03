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
    var btn_send_link = document.getElementById("btn_send_link");
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

    btn_send_link.addEventListener("click", function () {

        img_loading.style.visibility = "visible";

        var auth = firebase.auth();
        var emailAddress = txt_email.value;

        auth.sendPasswordResetEmail(emailAddress).then(function() {
            // Email sent.
            img_loading.style.visibility = "hidden";
            swal("Email Sent !", "Check Email Inbox for Password Reset Link", "success");

        }).catch(function(error) {
            // An error happened.
            img_loading.style.visibility = "hidden";
            swal("Error !", error.message, "error");

        });

    })

}());