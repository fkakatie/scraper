$(document).ready(function() {
    
    console.log('linked and loaded');

    // $.getJSON('/', function(data) {
    //     for (var i = 0; i < data.length; i++) {
    //         //
    //     }
    // })

    $('#stories').masonry({
        // options
        columnWidth: '.story-sizer', 
        itemSelector: '.story',
        percentPosition: true,
        gutter: 15,
        horizontalOrder: true
    });

    $('#stories').on('click', '.comment-btn', function() {
        var id = $(this).attr('data-id');

        $.ajax({
            method: 'GET',
            url: '/stories/' + id
        })
        .then(function(data) {
            console.log(data);
        })

    })

})