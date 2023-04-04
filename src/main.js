'use strict'

$(function () {

    //Image Slider

    //create a variable for configuration
    var width = 720;
    var animationSpeed = 1000;
    var pause = 3000;
    var currentSlide = 1;

    //caching the DOM (avoid callbacks)
    var $slider = $('#slider'); //assign a variable to slider id
    var $slideContainer = $slider.find('.slides'); //find the slides in the slider
    var $slides = $slideContainer.find('.slide'); //find the slide in slides

    //setInterval
    var interval;

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

});


$(function() {

    //jQuery AJAX 

    //caching the DOM
    var $orders = $('#orders');
    var $name = $('#name');
    var $drink = $('#drink');

    // Fetch Data from JSON file
    // $.getJSON('api/orders.json', function(data) {

    //     //loop through data and append to list
    //     $.each(data, function(index, orders) {
    //         $orders.append('<li>name: '+ orders.name+', drink: '+orders.drink +'</li>');
    //     });
    // });

    function addOrder(orders){
        $orders.append('<li>name: '+ orders.name+', drink: '+orders.drink +'</li>');
    }

    $.ajax({
        type: 'GET',
        url: 'api/orders.json',
        success: function(orders) {
            console.log('success', orders);
            $.each(orders, function(i, orders) {
                addOrder(orders);
            });
        },
        error: function(){
            alert('error loading orders');
        }
    });

    //POSTING FROM jQuery TO SERVER SIDE

    function addOrder(newOrder) {
        $orders.append('<li>name: ' + newOrder.name + ', drink: ' + newOrder.drink + '</li>');
        $name.val(''); // clear the name field
        $drink.val(''); // clear the drink field
    }

    $('#btn-add-order').on('click', function(){
        // e.preventDefault();

        var order = {
            name: $name.val(),
            drink: $drink.val(),
        };

        console.log('sending order', order);      

        $.ajax({
            type: 'POST',
            url: 'postorder.php',
            data: order,
            success: function(newOrder){
                console.log('success', newOrder);
                addOrder(newOrder); 
                // console.log(addOrder(newOrder));
            },
            error: function(){
                alert('error saving order');
            }
        });
    });
}); 