$(document).ready(function(){
    var offset = 0;
    var current = 1;
    var total = 0;
    var getInfo = function(url, page, action, token, offset){
        token = "api_key="+token;
        offset = typeof(offset) == "undefined" ? 0 : offset;
        $.getJSON(url+"/"+page+"/"+action+"?"+token+"&offset="+(20*offset)+"&type=photo"+"&jsonp=?",{
            format: "json"
            }).done(function(data){
                var posts = data.response.posts;
                var photos = {};
                $.each(posts, function(i,item){
                    for(var j in item.photos){
                        var photo = null;
                        for(var jj in item.photos[j].alt_sizes){
                            if(item.photos[j].alt_sizes[jj].url.match(/_500\./g)!== null){
                                photo = item.photos[j].alt_sizes[jj];
                                break;
                            }
                            if(item.photos[j].alt_sizes[jj].url.match(/_400\./g)!== null){
                                photo = item.photos[j].alt_sizes[jj];
                                break;
                            }
                            if(item.photos[j].alt_sizes[jj].url.match(/_250\./g)!== null){
                                photo = item.photos[j].alt_sizes[jj];
                                break;
                            }
                        }
                        if(photo !== null){
                            photo['post_url'] = item.post_url;
                            photo['source_title'] = item.source_title;
                            photo['caption'] = item.caption;
                            photo['id'] = item.id;
                            if(typeof photos[photo.id] == "undefined") photos[photo.id]= [];
                            photos[photo.id].push(photo);
                        }
                    }
                });
                var counter = 0;
                console.log(photos);
                for(var i in photos){
                    total++;
                    var photo = photos[i];
                    var photoInformation = photos[i][0];
                    var cls = "none";
                    if(offset === 0 && counter === 0) cls = "block";
                    counter++;
                    if($("#"+photoInformation.id).length === 0) $("<div>").attr('id', photoInformation.id).appendTo("#images").css('display',cls).addClass("images_image");
                    if($("#"+photoInformation.id+"_images").length === 0) $("<div>").attr("id", photoInformation.id+"_images").appendTo("#"+photoInformation.id);
                    for(var j in photo) $("<img/>").attr("src",photo[j].url).attr('width',photo.width).attr('height',photo[j].height).appendTo("#"+photo[j].id+"_images").wrap("<a href='"+photo[j].post_url+"'>");
                    if($("#"+photoInformation.id+"_title").length === 0) $("<div>").attr("id", photoInformation.id+"_title").appendTo("#"+photoInformation.id).text(photoInformation.caption).addClass("image_title");
                    calculate();
                }
                
            });
        
    };

    function calculate(){
        $("span.current").text(current);
        $("span.total").text(total);
    }

    function changeImage(whereTo){
        //Determine where the hell am i
        var me = $("div[style~='block;']");
        var duration = 150;
        if(whereTo == "left"){
            if(typeof me.prev()[0] != "undefined"){
                me.animate({opacity: "hide"}, duration );
                me.prev().animate({opacity: "show"}, duration );
                me.prev().css("display","block");
                me.css("display","none");
                current--;
            }
        }
        if(whereTo == "right"){
            if(typeof me.next()[0] != "undefined"){
                me.animate({opacity: "hide"}, duration );
                me.next().animate({opacity: "show"}, duration );
                me.css("display","none");
                me.next().css("display","block");
                current++;
            }
        }
        calculate();
    }
    function backToTop(){
        var we = $("div.images_image");
        we.css("display","none");
        $(we[0]).css("display","block");
    }

    var url = "http://api.tumblr.com/v2/blog";
    var page = "www.jaidefinichon.com";
    var token = "fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4";
    getInfo(url, page, "posts",token, offset );
    $(window).scroll(function () {
        if (($(window).scrollTop() + screen.height) >= ($(document).height() - 100)) {
            offset = offset + 1;
            getInfo(url, page, "posts",token, offset);
        }
    });
    $("#left, #right").click(function(e){
        var me = $("div[style~='block;']").first();
        if(me.nextAll().length < 5){
            offset = offset + 1;
            getInfo(url, page, "posts",token, offset);
        }
        changeImage(this.id);

    });
    $(document).keydown(function(e){
        var me = $("div[style~='block;']").first();
        if(me.nextAll().length < 5){
            offset = offset + 1;
            getInfo(url, page, "posts",token, offset);
        }
        switch(e.which){
        case 37:
            changeImage("left");
        break;
        case 39:
            changeImage("right");
        break;
        case 33:
            backToTop();
        break;

       }
    });

});