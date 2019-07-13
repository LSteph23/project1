

    // Creates AJAX call for Trump Quote and translates it into Shakespeare when button is clicked //

        
        var trumpURL = 'https://api.whatdoestrumpthink.com/api/v1/quotes/random'
        var shakesURL = 'https://api.funtranslations.com/translate/shakespeare.json?text='

            $("#button").click(function(){
                $.ajax({
                    url: trumpURL,
                    method: "GET" 
                }).done(function(response){
                    $("#trump-quote").html('"' + response.message + '"');
                    var trumpQuote = response.message;
                    console.log(trumpQuote)
                
                    $.ajax({
                        url: shakesURL + trumpQuote,
                        method: "GET"
                    }).done(function(response){
                    $("#shakespeare-quote").html('"' + response.contents.translated + '"');
                    })


                })
            });
               
  