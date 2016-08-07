$(document).foundation();

$('.top-bar').on('sticky.zf.stuckto:top', function(){
  $(this).addClass('shrink');
}).on('sticky.zf.unstuckfrom:top', function(){
  $(this).removeClass('shrink');
})

var buttonPost = document.getElementById('submitButton');

// Wire the button click.
buttonPost.addEventListener("click", function() {

      // Extract values from DOM elements.
      var inputFileName = document.getElementById('fileInput');
      var strFileName = inputFileName.value;


      // Compose payload.
      var objectEntry = {
        fileName: strFName,
      };

      // Send to server route.
      var xmlhr = new XMLHttpRequest();
      xmlhr.open('POST', 'http://localhost:5000/api/formdata', true);
      xmlhr.setRequestHeader('Content-type', 'application/json');
      xmlhr.send(JSON.stringify(objectEntry));
});


$.post("")