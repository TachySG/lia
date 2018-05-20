(function($){
    // Carousel
    $('#carousel-text').html($('#slide-content-0').html());

    // When the carousel slides, auto update the text
    $('#article-carousel').on('slid.bs.carousel', function (e) {
             var id = $('.item.active').data('slide-number');
            $('#carousel-text').html($('#slide-content-'+id).html());
    });


    // Carousel Two
    $('#carousel-text-a').html($('#slide-content-a-0').html());

    // When the carousel slides, auto update the text
    $('#article-carousel-a').on('slid.bs.carousel', function (e) {
             var id = $('.item.a.active').data('slide-number');
            $('#carousel-text-a').html($('#slide-content-a-'+id).html());
    });

})(jQuery);