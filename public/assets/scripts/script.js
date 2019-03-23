$(document).ready(function() {

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
            $('#modal-overlay').css('display', 'block');
            $('#modal-title').text(data.headline + ' Comments');

            $('#modal-comments').empty(); // clear previous comments

            data.comment.reverse().forEach(function(comment) {
                $('#modal-comments').append(
                    `<div class="modal-comment" data-id=${comment._id}>
                        <p class="comment-username">${comment.username} wrote:</p>
                        <p class="comment-message">${comment.message}</p>
                    <i class="fas fa-times-circle comment-delete" data-id=${comment._id}></i>
                    <hr />
                    </div>
                    `
                )
            })

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
                console.log("Comment posted!");
            })
        } else {
            alert('Comment can\'t be empty!');
            event.preventDefault();
        }
    })

    $('#modal-comments').on('click', '.comment-delete', function() {
        var thisId = $(this).attr('data-id');
        $.ajax({
            type: 'GET',
            url: '/remove/' + thisId
        })
        .then(function(data) {
            $('.modal-comment [data-id=' + thisId + ']').parent().remove();
            console.log('Something was removed?');
        })
    })

})