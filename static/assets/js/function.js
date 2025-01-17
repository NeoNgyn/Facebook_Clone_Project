// Create post
$(document).ready(function(){
    $("#post-form").submit(function(e){
        e.preventDefault()

        let post_caption = $("#post-caption").val()
        let post_visibility = $("#visibility").val()

        let fileInput = $("#post-thumbnail")[0]
        let file = fileInput.files[0]
        let fileName = file.name

        console.log(post_caption)
        console.log(post_visibility)
        console.log(fileName)
        console.log(file)


        let formData = new FormData()
        formData.append("post-caption", post_caption)
        formData.append("post-thumbnail", file, fileName)
        formData.append("visibility", post_visibility)

        $.ajax({
            url:"/create-post/",
            type:"POST",
            dataType:"json",
            data: formData,
            processData: false,
            contentType: false,

            success: function(response){
                console.log(response)
                let _html = '<div class="card lg:mx-0 uk-animation-slide-bottom-small mt-3 mb-3">\
    <!-- post header-->\
    <div class="flex justify-between items-center lg:p-4 p-2.5">\
        <div class="flex flex-1 items-center space-x-4">\
            <a href="#">\
                <img src="' + response.post.profile_image + '" class="bg-gray-200 border border-white rounded-full w-10 h-10">\
            </a>\
            <div class="flex-1 font-semibold capitalize">\
                <a href="#" class="text-black dark:text-gray-100"> ' + response.post.full_name + ' </a>\
                <div class="text-gray-700 flex items-center space-x-2"><span><small>' + response.post.date + ' ago</small></span> \
                    <ion-icon name="people"></ion-icon>\
                </div>\
            </div>\
        </div>\
        <div>\
            <a href="#"> <i class="icon-feather-more-horizontal text-2xl hover:bg-gray-200 rounded-full p-2 transition -mr-1 dark:hover:bg-gray-700"></i> </a>\
            <div class="bg-white w-56 shadow-md mx-auto p-2 mt-12 rounded-md text-gray-500 hidden text-base border border-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700" uk-drop="mode: click;pos: bottom-right;animation: uk-animation-slide-bottom-small">\
                <ul class="space-y-1">\
                    <li>\
                        <a href="#" class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">\
                    <i class="uil-share-alt mr-1"></i> Share\
                    </a>\
                    </li>\
                    <li>\
                        <a href="#" class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">\
                    <i class="uil-edit-alt mr-1"></i>  Edit Post \
                    </a>\
                    </li>\
                    <li>\
                        <a href="#" class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">\
                    <i class="uil-comment-slash mr-1"></i>   Disable comments\
                    </a>\
                    </li>\
                    <li>\
                        <a href="#" class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">\
                    <i class="uil-favorite mr-1"></i>  Add favorites \
                    </a>\
                    </li>\
                    <li>\
                        <hr class="-mx-2 my-2 dark:border-gray-800">\
                    </li>\
                    <li>\
                        <a href="#" class="flex items-center px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-500 rounded-md dark:hover:bg-red-600">\
                    <i class="uil-trash-alt mr-1"></i>  Delete\
                    </a>\
                    </li>\
                </ul>\
            </div>\
        </div>\
    </div>\
        <div class="p-5 pt-0 border-b dark:border-gray-700">\
            ' + response.post.title + '\
        </div>\
        <div uk-lightbox>\
            <a href="' + response.post.image + '">  \
                <img src="' + response.post.image + '" alt="" class="max-h-96 w-full object-cover">\
            </a>\
        </div>\
    <div class="p-4 space-y-3">\
        <div class="flex space-x-4 lg:font-bold">\
            <a class="flex items-center space-x-2  text-blue-500" style="cursor: pointer;">\
                <div class="p-2 rounded-full like-btn' + response.post.id + ' {% if request.user in p.likes.all %}text-blue-500 {% else %} text-black {% endif %} "\
                    id="like-btn" data-like-btn="' + response.post.id + '">\
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="22"\
                        height="22" class="dark:text-blue-100">\
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />\
                    </svg>\
                </div>\
                <div> Like</div>\
            </a>\
            <a href="#" class="flex items-center space-x-2">\
                <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600">\
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="22"\
                        height="22" class="dark:text-gray-100">\
                        <path fill-rule="evenodd"\
                            d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"\
                            clip-rule="evenodd" />\
                    </svg>\
                </div>\
                <div> <b><span id="comment-count' + response.post.id + '">0</span></b> Comment</div>\
            </a>\
            <a href="#" class="flex items-center space-x-2 flex-1 justify-end">\
                <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600">\
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="22"\
                        height="22" class="dark:text-gray-100">\
                        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />\
                    </svg>\
                </div>\
                <div> Share</div>\
            </a>\
        </div>\
        <div class="flex items-center space-x-3 pt-2">\
            <div class="dark:text-gray-100">\
                <strong><span id="like-count' + response.post.id + '">0</span></strong> Like\
            </div>\
        </div>\
        <div class="border-t py-4 space-y-4 dark:border-gray-600" id="comment-div' + response.post.id + '">\
        </div>\
        <div class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">\
            <input placeholder="Add your Comment..." id="comment-input' + response.post.id + '" data-comment-input="' + response.post.id + '"\
                class="bg-transparent max-h-10 shadow-none px-5 comment-input' + response.post.id + '">\
            <div class="-m-0.5 absolute bottom-0 flex items-center right-3 text-xl">\
                <a style="cursor: pointer;" id="comment-btn" class="comment-btn' + response.post.id + '" data-comment-btn="' + response.post.id + '">\
                    <ion-icon name="send-outline" class="hover:bg-gray-200 p-1.5 rounded-full"></ion-icon>\
                </a>\
            </div>\
        </div>\
    </div>\
</div>\
'

                $("#create-post-modal").removeClass("uk-flex uk-open")
                $(".post-div").prepend(_html)
            }
        })
    })

    // Like post
    $(document).on("click", "#like-btn", function(){
        console.log("Liked");
        let btn_val= $(this).attr("data-like-btn")
        // console.log(btn_val);
        
        $.ajax({
            url: "/like-post/",
            dataType: "json",
            data: {
                "id": btn_val,
            },
            success: function(response){
                if(response.data.bool === true){
                    $("#like-count" + btn_val).text(response.data.likes)
                    $(".like-btn" + btn_val).addClass("text-blue-500")
                    $(".like-btn" + btn_val).removeClass("text-black")
                } else{
                    $("#like-count" + btn_val).text(response.data.likes)
                    $(".like-btn" + btn_val).addClass("text-black")
                    $(".like-btn" + btn_val).removeClass("text-blue-500")
                }
            }
        })
    })

    // Comment on post
    $(document).on("click", "#comment-btn", function(){
        let id = $(this).attr("data-comment-btn")
        let comment = $("#comment-input"+ id).val()
        
        console.log(id);
        console.log(comment);
        
        $.ajax({
            url: "/comment-post/",
            dataType: "json",
            data: {
                "id": id,
                "comment": comment,
            },
            success: function(response){
                console.log(response);
                let newComment = '<div class="flex card shadow p-2">\
                    <div class="w-10 h-10 rounded-full relative flex-shrink-0">\
                        <img src="'+ response.data.profile_image +'" alt="" class="absolute h-full rounded-full w-full">\
                    </div>\
                    <div>\
                        <div class="text-gray-700 py-2 px-3 rounded-md bg-gray-100 relative lg:ml-5 ml-2 lg:mr-12  dark:bg-gray-800 dark:text-gray-100">\
                            <p class="leading-6">'+ response.data.comment +'\
                            </p>\
                            <div class="absolute w-3 h-3 top-3 -left-1 bg-gray-100 transform rotate-45 dark:bg-gray-800"></div>\
                        </div>\
                        <div class="text-sm flex items-center space-x-3 mt-2 ml-5">\
                            <a id="like-comment-btn" data-like-comment="'+ response.data.comment_id +'" class="like-comment'+ response.data.comment_id +'" style="color: gray; cursor: pointer;"> <i class="fa-solid fa-heart"></i></a><span id="comment-likes-count'+ response.data.comment_id +'">0</span>\
                            <details >\
                                <summary>\
                                    <div class="">Reply</div>\
                                </summary>\
                                <details-menu role="menu" class="origin-topf-right relative right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">\
                                <div class="pyf-1" role="none">\
                                    <div class="p-1 d-flex">\
                                        <input type="text"  class="with-border" placeholder="Reply" name="" id="reply-input'+ response.data.comment_id +'">\
                                        <button id="reply-comment-btn" data-reply-comment-btn="'+ response.data.comment_id +'" type="submit" class="block w-fulfl text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 reply-comment-btn'+ response.data.comment_id +'" role="menuitem">\
                                            <ion-icon name="send"></ion-icon>\
                                        </button>\
                                    </div>\
                                </div>\
                                </details-menu>\
                            </details>\
                            <span> <small>'+ response.data.date +' ago</small> </span>\
                        </div>\
                            <div class="reply-div'+ response.data.comment_id +'">\
                    </div>\
                </div>\
                '
                $("#comment-div" + id).prepend(newComment)
                $("#comment-input"+ id).val("")
                $("#comment-count"+ id).text(response.data.comment_count)
            }
        })
    })

    // Like comment
    $(document).on("click", "#like-comment-btn", function(){
        let id = $(this).attr("data-like-comment")
        console.log("comment id:" + id)

        $.ajax({
            url: "/like-comment/",
            dataType: "json",
            data: {
                "id": id,
            },
            success: function(response){
                if (response.data.bool === true){
                    $("#comment-likes-count" + id).text(response.data.likes)
                    $(".like-comment" + id).css("color", "red")
                } else{
                    $("#comment-likes-count" + id).text(response.data.likes)
                    $(".like-comment" + id).css("color", "gray")

                }
                
            }
        })
    })

    // Reply comment
    $(document).on("click", "#reply-comment-btn", function(){
        let id = $(this).attr("data-reply-comment-btn")
        let reply = $("#reply-input" + id).val()
        
        console.log(id);
        console.log(reply);
        
        $.ajax({
            url: "/reply-comment/",
            dataType: "json",
            data: {
                "id": id,
                "reply": reply
            },
            success: function(response){
                let newReply = '<div class="flex mr-12 mb-2 mt-2" style="margin-right: 20px;">\
                    <div class="w-10 h-10 rounded-full relative flex-shrink-0">\
                        <img src="'+ response.data.profile_image +'" style="width: 40px; height: 40px;" alt=""\
                            class="absolute h-full rounded-full w-full">\
                    </div>\
                    <div>\
                        <div\
                            class="text-gray-700 py-2 px-3 rounded-md bg-gray-100 relative lg:ml-5 ml-2 lg:mr-12 dark:bg-gray-800 dark:text-gray-100">\
                            <p class="leading-6">'+ response.data.reply +'</p>\
                            <button class="ml-auto text-red-600 text-xs" id="delete-reply"  data-delete-reply="'+ response.data.reply_id +'">\
                                <i class="fa-solid fa-trash"></i>\
                            </button>\
                            <div class="absolute w-3 h-3 top-3 -left-1 bg-gray-100 transform rotate-45 dark:bg-gray-800"></div>\
                        </div>\
                    </div>\
                </div>\
                '
                $(".reply-div" + id).prepend(newReply)
                $("#reply-input" + id).val("")
            }
        })
    })

    // Delete comment
    $(document).on("click", "#delete-comment", function(){
        let id = $(this).attr("data-delete-comment")
        console.log(id);
        
        $.ajax({
            url: "/delete-comment/",
            dataType: "json",
            data: {
                "id": id,
            },
            success: function(response){
                console.log("Comment: " + id + "deleted");
                $("#comment-div" + id).addClass("d-none")
            }
        })
    })

    // Delete reply
    $(document).on("click", "#delete-reply", function(){
        let id = $(this).attr("data-delete-reply")
        console.log(id);
        

        $.ajax({
            url: "/delete-reply/",
            dataType: "json",
            data: {
                "id": id
            },
            success: function(response){
                console.log("Reply " + id + " deleted");
                $("#reply-block" + id).addClass("d-none")
            }
        })
    })

    // Add friend
    $(document).on("click", "#add-friend", function(){
        let id = $(this).attr("data-friend-id")
        console.log("Added friend: " + id);

        $.ajax({
            url: "/add-friend/",
            dataType: "json",
            data: {
                "id": id
            },
            success: function(response){
                console.log(response);
                if(response.bool === true){
                    $("#friend-text").html('<i class="fa-solid fa-xmark"></i> Cancel Request')
                    $(".add-friend" + id).addClass("bg-red-600")
                    $(".add-friend" + id).removeClass("bg-blue-600")
                } 
                
                if(response.bool === false){
                    $("#friend-text").html('<i class="fa-solid fa-user-plus"></i> Add Friend')
                    $(".add-friend" + id).addClass("bg-blue-600")
                    $(".add-friend" + id).removeClass("bg-red-600")
                }
            }
        })
    })

    // Accept friend request
    $(document).on("click", "#accept-friend-request", function(){
        let id = $(this).attr("data-request-id")
        console.log(id);
        

        $.ajax({
            url: "/accept-friend-request/",
            dataType: "json",

            data: {
                "id": id,
            },
            success: function(response){
                console.log(response);
                $(".reject-friend-request-hide" + id).hide()
                $(".accept-friend-request" + id).html('<i class="fa-solid fa-user-check"></i> Friend Request Accepted')

            }
        })

    })

    // Reject friend request
    $(document).on("click", "#reject-friend-request", function(){
        let id = $(this).attr("data-request-id")
        console.log(id);
        

        $.ajax({
            url: "/reject-friend-request/",
            dataType: "json",

            data: {
                "id": id,
            },
            success: function(response){
                console.log(response);
                $(".reject-friend-request" + id).html('<i class="fa-solid fa-user-xmark"></i> Friend Request Accepted')
                $(".accept-friend-request-hide" + id).hide()

            }
        })

    })

    // Unfriend
    $(document).on("click", "#unfriend", function(){
        let id = $(this).attr("data-unfriend")
        console.log(id);

        $.ajax({
            url: "/unfriend/",
            dataType: "json",
            data: {
                "id": id
            },
            success: function(response){
                console.log(response);
                $("#unfriend-text").html('<i class="fa-solid fa-user-plus"></i> Unfriended')
            }
        })
    })

    // Block User
    $(document).on("click", "#block-user-btn", function(){
        let id = $(this).attr("data-block-user")

        $.ajax({
            url: "/block-user/",
            dataType: "json",
            beforeSend: function(){
                $("#block-user-btn").html("<i class='fa-solid fa-spinner fa-spin'></i>")
            },
            data: {
                "id": id
            },
            success: function(response){
                console.log(response);
                $(".block-text" + id).html("<i class='fa-solid fa-check-circle'></i> User Block Successfully")
                
            }
        })
    })
})



































