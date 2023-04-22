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

    var orderTemplate = $('#order-template').html();


    function addOrder(orders){
        let rendered = Mustache.render(orderTemplate, orders);
        $orders.append(rendered);
    };

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

    function postAddOrder(newOrder) {
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
                postAddOrder(newOrder); 
                // console.log(addOrder(newOrder));
            },
            error: function(){
                alert('error saving order');
            }
        });
    });

    $orders.on('click', '.remove', function() {

        var $li = $(this).closest('li');

        $.ajax({
            type: 'POST',
            url: 'delete.php?id=' + $(this).attr('data-id'),
            success: function() {
                $li.fadeOut(300, function() {
                    $(this).remove();
                });
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText)
            }
        });
    });

    $orders.on('click', '.editOrder', function() {
        var $li = $(this).closest('li');
        $li.find('input.name').val($li.find('span.name').html() );
        $li.find('input.drink').val($li.find('span.drink').html() );
        $li.addClass('edit');
    });

    $orders.on('click', '.cancelEdit', function() {
        $(this).closest('li').removeClass('edit');
    });

    $orders.on('click', '.saveEdit', function() {
        var $li = $(this).closest('li');
        var order = {
            name: $li.find('input.name').val(),
            drink: $li.find('input.drink').val()
        };

        $.ajax({
            type: 'POST',
            url:'postorder.php?id=' + $li.attr('data-id'),
            data: order,
            success: function(newOrder){
                $li.find('span.name').html(order.name);
                $li.find('span.drink').html(order.drink);
                $li.removeClass('edit');
            },
            error: function() {
                alert('error updating order');
            }
        });
    });
}); 