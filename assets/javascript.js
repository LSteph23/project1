

// Creates AJAX call for Trump Quote and translates it into Shakespeare when button is clicked //


var trumpURL = 'https://api.whatdoestrumpthink.com/api/v1/quotes/random'
var shakesURL = 'https://api.funtranslations.com/translate/shakespeare.json?text='

var config = {
    apiKey: "AIzaSyAK98O_zyCnb2Meg5woyok-qyZS10pDw8I",
    authDomain: "trumpspeare-118f5.firebaseapp.com",
    databaseURL: "https://trumpspeare-118f5.firebaseio.com",
    projectId: "trumpspeare-118f5",
    storageBucket: "trumpspeare-118f5.appspot.com",
    messagingSenderId: "479133195626",
    appId: "1:479133195626:web:acead7e1213f07f5"
};

firebase.initializeApp(config);

var quoteData = firebase.database();

$("#button").click(function () {
    $.ajax({
        url: trumpURL,
        method: "GET"
    }).done(function (response) {
        $("#trump-quote").html('"' + response.message + '"');
        var trumpQuote = response.message;
        console.log(trumpQuote)

        $.ajax({
            url: shakesURL + trumpQuote,
            method: "GET"
        }).done(function (response) {
            $("#shakespeare-quote").html('"' + response.contents.translated + '"');

            var shakeQuote = response.contents.translated;

            //firebase code to save to database here
            var newQuote = {
                trump: trumpQuote,
                shake: shakeQuote,
            };
            console.log(newQuote.trump);
            console.log(newQuote.shake);

            //uploads quotes to the database
            quoteData.ref().push(newQuote);

        })

        quoteData.ref().on("child_added", function (childSnapshot, prevChildKey) {
        
        // store the quotes into variables
        var trump = childSnapshot.val().trump;
        var shake = childSnapshot.val().shake;

        $("#history-table > tbody").append(
            $("<tr>").append(
                $("<td>").text(trump),
                $("<td>").text(shake)
            )
        );
        

        console.log(childSnapshot.val())


        });



    })
});
