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
        $('#comment-btn').attr('data-id', thisId);
        $.ajax({
            method: 'GET',
            url: '/stories/' + thisId
        })
        .then(function(data) {
            console.log(data);
            $('#modal-overlay').css('display', 'block');
            $('#modal-title').text(data.headline + ' Comments');
        })

    })

    $('#comment-btn').on('click', function(event) {     
        var thisId = $(this).attr('data-id');
        var username = $('#username').val().trim() || 'Anonymous';
        var message = $('#message').val().trim();

        if (message) {
            $.ajax({
                method: 'POST',
                url: '/stories/' + thisId,
                data: {
                    username: username,
                    message: message
                }
            })
            .then(function(data) {
                console.log(data);
                event.preventDefault();
            })
        } else {
            alert('Comment can\'t be empty!');
            event.preventDefault();
        }
    })

})