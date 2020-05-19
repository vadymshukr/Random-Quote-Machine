const COLORS = ['#66FFFF', '#00FF99', '#CCCC99', '#3366CC', '#FFCCFF', '#FF9966', '#CCCC00'];

const getRandomColor = colorsArr => {
    return colorsArr[Math.floor(Math.random() * colorsArr.length)];
}




let quoteText, quoteAuthor;

const getRandomQuote = () =>{
    return $.ajax({
        jsonp: "jsonp",
        dataType: "jsonp",
        url: "https://api.forismatic.com/api/1.0/",
        contentType: "application/jsonp",
        data: {
          lang: "en",
          method: "getQuote",
          format: 'jsonp'
        },
        success: function(data) {
            quoteText = data.quoteText;
            quoteAuthor = data.quoteAuthor;
        }});
}

const writeRandomQuote = () =>{
    getRandomQuote();
    let color = getRandomColor(COLORS);
    $( ".randomBackgroundColor" ).animate({
        backgroundColor: color
      }, 1000, function() { 
  });
    $( ".randomTextColor" ).animate({
        color: color
      }, 1000, function() { 
    });
    $( '.quote-section__text' ).animate(
        {
            opacity: 0
        }, 500, function(){
            $( this ).animate({opacity: 1}, 500);
            $('#text').html(`<i class="fas fa-quote-left"></i>` + quoteText + `<i class="fas fa-quote-right"></i>`);
        }
    );
    $( '.quote-section__author' ).animate(
        {
            opacity: 0
        }, 500, function(){
            $( this ).animate({opacity: 1}, 500);
            $('#author').html(quoteAuthor);
        }
    );
}

$( document ).ready(function() {
    getRandomQuote().then(() => {writeRandomQuote()});
    $( '#new-quote' ).on('click', writeRandomQuote);
    
    
});