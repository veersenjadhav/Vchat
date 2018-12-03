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

    var txt_message = document.getElementById("txt_message");
    var btn_send = document.getElementById("btn_send");
    var btn_logout = document.getElementById("btn_logout");
    var img_loading = document.getElementById("img_loading");
    var display_msg = document.getElementById("display_msg");
    var ulList = document.getElementById("list");

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            img_loading.style.visibility = "visible";

            if(user.emailVerified){

                img_loading.style.visibility = "hidden";

            }else{

                img_loading.style.visibility = "hidden";
                swal("Verify Email !", "Please Check E-mail Inbox for Verification Link", "warning");
                firebase.auth().signOut().then(function() {
                    // Sign-out successful.
                    window.location.replace("index.html");

                }).catch(function(error) {
                    // An error happened.
                    swal("Error !", error.message, "warning");
                });

            }

        } else {

            // No user is signed in.
            img_loading.style.visibility = "hidden";
            window.location.replace("index.html");

        }
    });

    var ref = firebase.database().ref("chat/").orderByKey();

    ref.on('child_added', function (snap) {

        var old = console.log;
        console.log = function (message) {

            if (typeof message == 'object') {

                var li = document.createElement('li');

                var temp = (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
                var temp2 = temp.replace(/(?:{|}|")/g, '');
                var temp3 = temp2.replace(/ddaattee:/g, '<b>At : </b>');
                var temp4 = temp3.replace(/,mmssgg:/g, '<br><br><b>Message : </b>');
                var temp5 = temp4.replace(/,nnffrroomm:/g, '<br><br><b>From : </b>');

                li.innerHTML += '<div class="alert-success" style="padding: 1em; margin-bottom: 1em;">'+temp5+'</div>';
                li.id = snap.key;
                ulList.appendChild(li);

                window.scrollTo(0,document.body.scrollHeight);

            } else {

                display_msg.innerHTML += message + '<br />';
            }
        };

        console.log(snap.val());
    });

    btn_send.addEventListener("click", function () {

        if((txt_message.value)==null || (txt_message.value)==" " || (txt_message.value)=="")
        {
            swal("Enter Message First !", "", "warning");
        }else{
            img_loading.style.visibility = "visible";

            var user = firebase.auth().currentUser;

            var msg = txt_message.value;
            var from = user.email;
            var ref1 = Date.now();

            var userRef = firebase.database().ref('chat/'+ ref1).set({
                ddaattee: Date(),
                mmssgg: msg,
                nnffrroomm: from
            });

            userRef.then(function () {
                img_loading.style.visibility = "hidden";
                swal("Message Sent !", "", "success");
            });

            userRef.catch(function (error) {
                img_loading.style.visibility = "hidden";
                swal("Error !", error.message, "error");
            });
        }

    });

    btn_logout.addEventListener("click", function () {

        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            window.location.replace("index.html");

        }).catch(function(error) {
            // An error happened.
            swal("Error !", error.message, "warning");
        });

    });

}());