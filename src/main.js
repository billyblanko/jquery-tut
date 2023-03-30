'use strict'
$(function () {

    //create a variable for configuration
    var width = 720;
    var animationSpeed = 1000;
    var pause = 3000;
    var currentSlide = 1;

    //caching the DOM (avoid callbacks)
    var $slider = $('#slider'); //assign a variable to slider id
    var $slideContainer = $slider.find('.slides'); //find the slides in the slider
    var $slides = $slideContainer.find('.slide'); //find the slide in slides

    var interval;

    //setInterval
    //animate margn-left
    //when you get to the last slde, go to position 1 (0px)
    function startSlider(){
        interval = setInterval(function(){
            $slideContainer.animate({'margin-left': '-='+width}, animationSpeed, function() {
                currentSlide++;
                if(currentSlide === $slides.length){
                    currentSlide = 1;
                    $slideContainer.css('margin-left', 0)
                }
            });
        }, pause);
    }
    function stopSlider() {
        clearInterval(interval);
    }

    //listen for mouse enter and pause
    //resume on mouse leave
    $slider.on('mouseenter', stopSlider).on('mouseleave', startSlider);

    //start slider
    startSlider();


    //jQuery AJAX 
    var $orders = $('#orders');

    $.ajax({
        type: 'GET',
        url: 'api/orders.json',
        success: function(orders) {
            $.each(orders, function(i, order) {
                $orders.append('<li>name: '+ order.name+', drink: '+order.drink +'</li>');
            });
        }
    });
});