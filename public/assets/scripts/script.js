$(document).ready(function() {
    
    console.log('linked and loaded');

    $('#stories').masonry({
        // options
        columnWidth: '.story-sizer', 
        itemSelector: '.story',
        percentPosition: true,
        gutter: 15,
        horizontalOrder: true
    });

    $('#modal-close').click(function() {
        $('#modal-overlay').css("display", "none");
    });

    $('#stories').on('click', '.comment-btn', function() {
        var thisId = $(this).attr('data-id');
        $.ajax({
            method: 'GET',
            url: '/stories/' + thisId
        })
        .then(function(data) {
            console.log(data);
            $('#modal-overlay').css('display', 'block');
            $('#modal-title').text(data.headline);
        })

    })

})