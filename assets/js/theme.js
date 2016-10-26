'use strict';
var theme = function () {

    // prevent empty links
    // ---------------------------------------------------------------------------------------
    function handlePreventEmptyLinks() {
        $('a[href=#]').on('click', function(event) {
            event.preventDefault();
        });
    }

    // Viewport detection
    // ---------------------------------------------------------------------------------------

    function handleViewportHeight() {

        var viewportHeight = $(window).height();
       // $('.header-wrapper .navigation').css('height',viewportHeight);
        $('#home .header-wrapper .navigation').css('padding-top',viewportHeight/2.5);
    //    $('#home .header-wrapper .opened').css('margin-top',-viewportHeight/3);
    }

    // Placeholdem
    // ---------------------------------------------------------------------------------------
    function handlePlaceholdem() {
        Placeholdem(document.querySelectorAll('[placeholder]'));
    }

    // BootstrapSelect
    // ---------------------------------------------------------------------------------------
    function handleBootstrapSelect() {
        $('.selectpicker').selectpicker();
    }

    // superfish menu
    // ---------------------------------------------------------------------------------------
    function handleSuperFish() {
        $('ul.sf-menu').superfish();
        $('ul.sf-menu a').on('click', function() {
            $('body').scrollspy('refresh');
        });
        // fixed menu toggle
        $('.menu-toggle').on('click', function(){
            if($('.navigation').hasClass('opened')) {
                $(this).find('.fa').removeClass('fa-times').addClass('fa-bars');
                $('.navigation').removeClass('opened').addClass('closed');
            } else {
                $(this).find('.fa').removeClass('fa-bars').addClass('fa-times');
                $('.navigation').removeClass('closed').addClass('opened');
            }
        });
        // submenu fix
        $('.mobile-submenu').on('click', function() {
            $(this).parent().toggleClass('mobile-submenu-open');
        });
        $('ul.sf-menu a').on('click', function() {
            $('ul.sf-menu li').removeClass('mobile-submenu-open');
        });
    }

    // Smooth scrolling
    // ---------------------------------------------------------------------------------------
    function handleSmoothScroll(){
        $('.sf-menu a, .scroll-to').on('click', function() {

            //var headerH = $('header').outerHeight();
            var headerH = 0;
            $('.sf-menu a').removeClass('active');
            $(this).addClass('active');
            $('html, body').animate({
                scrollTop: $($(this).attr('href')).offset().top - headerH + 'px'
            }, {
                duration: 1200,
                easing: 'easeInOutExpo'
            });
            return false;
        });

    if (location.hash != '') {
            var hash = '#' + window.location.hash.substr(1);
            if (hash.length) {
                jQuery('html,body').delay(0).animate({
                    scrollTop: jQuery(hash).offset().top - 44 + 'px'
                }, {
                    duration: 1200,
                    easing: "easeInOutExpo"
                });
            }
        }


    }

    // prettyPhoto
    // ---------------------------------------------------------------------------------------
    function handlePrettyPhoto() {
        $("a[data-gal^='prettyPhoto']").prettyPhoto({
            theme: 'dark_square',
            social_tools: false,
        });
    }

    // Scroll totop button
    // ---------------------------------------------------------------------------------------
    function handleToTopButton() {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 1) {
                $('.to-top').css({bottom: '15px'});
            } else {
                $('.to-top').css({bottom: '-100px'});
            }
        });
        $('.to-top').on('click', function() {
            $('html, body').animate({scrollTop: '0px'}, 800);
            return false;
        });
    }

    // preloader
    // ---------------------------------------------------------------------------------------
    $(window).load(function() {
        $('#status').fadeOut();
        $('#preloader').delay(200).fadeOut(100);
    });

    // Shrink header on scroll
    // ---------------------------------------------------------------------------------------
    function handleAnimatedHeader() {
        var header = $('.header.fixed');
       // var logo = $('.header.fixed .logo');
       // var nav = $('.sf-menu');
       // var header = $('.header.fixed');
        function refresh() {
            var scroll = $(window).scrollTop();

            if (scroll >= 99) {
                header.addClass('shrink');
              // logo.removeClass('logo').addClass('logo2');
                $('.header-inner-bg').removeClass('clouds');
            } else {
                header.removeClass('shrink');
                $('.header-inner-bg').addClass('clouds');
              //  logo.removeclass('logo2').addClass('logo');
            }
        };

        $(window).load(function () { refresh(); });
        $(window).scroll(function () { refresh(); });
        $(window).on('touchstart',function(){ refresh(); });
        $(window).on('scrollstart',function(){ refresh(); });
        $(window).on('scrollstop',function(){ refresh(); });
        $(window).on('touchmove',function(){ refresh(); });

    }

    // Circles
    // ---------------------------------------------------------------------------------------
    function handleCircles() {        
        
        $('.circle.active').each(function(){

            var id              = $(this).attr('id');
            var icon            = '<i class="' + $(this).attr('data-icon') + '"></i>';
            var percentage      = $(this).attr('data-percentage');
            var circleColor     = $(this).attr('data-circle-color');
            var percentageColor = $(this).attr('data-percentage-color');
            
            $(this).waypoint(function (down) {

                Circles.create({
                    id:         id,
                    value:      percentage,
                    radius:     100,
                    width:      10,
                    text:       icon,
                    duration:   800,
                    colors:     [percentageColor, circleColor]
                });
                
            },
            {
                offset: '100%',
            });
            $(this).removeClass('active');
        });
    }

    // player
    // ---------------------------------------------------------------------------------------
    function handlePlayer() {   
            var player = new MediaElementPlayer('#audio-player',{
                audioWidth: 90,
                audioHeight: 20,
                startVolume: 0.3,
                loop: true,
                enableAutosize: true,
                features: ['playpause','volume'],
                alwaysShowControls: true,
            });
           player.play();   
    }


    // resize page
    // ---------------------------------------------------------------------------------------
    function resizePage() {
        $('.page').css('min-height', $(window).height());
        $('#testimonials').trigger('refresh');
        $('.owl-carousel').trigger('refresh');
        $('.header-wrapper .navigation').trigger('refresh');
    }

    // contact form
    // ---------------------------------------------------------------------------------------
    function handleContactForm() {
        $('.submitContactbutton').on('click', function(e){               
            var form = $(this).closest('form');
            $(this).find('.loading').show();                      
            
            $.ajax({
                url: 'contact.php',
                type: "POST",
                data: form.serializeArray(),
                success: function (data) {

                    if( data == 'true'){
                        $('.contact-messages').removeClass('error').addClass('success').show();
                        $('.contact-messages').html('<h4>Thank you!</h4><p>Your message has been successfully sent. We will contact you very soon!</p>');
                    }else{
                        $('.contact-messages').removeClass('success').addClass('error').show();
                        $('.contact-messages').html('<h4>Error!</h4><p>Please fill in all of the required fields.</p>');
                    }                    
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    //if fails      
                }
            });
            $(this).find('.loading').fadeOut('1500');
            e.preventDefault();
        });        
    }

     // book now form
    // ---------------------------------------------------------------------------------------
    function handleBookForm() {
        $('#submitBook').on('click', function(e) {            
            var form = $(this).closest('form');
            $(this).find('.loading').show();                      
            
            $.ajax({
                url: 'contact.php',
                type: "POST",
                data: form.serializeArray(),
                success: function (data) {

                    if( data == 'true'){
                        $('.book-messages').removeClass('error').addClass('success').show();
                        $('.book-messages').html('<h4>Thank you!</h4><p>Your message has been successfully sent. We will contact you very soon!</p>');
                    }else{
                        $('.book-messages').removeClass('success').addClass('error').show();
                        $('.book-messages').html('<h4>Error!</h4><p>Please fill in all of the required fields.</p>');
                    }                    
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    //if fails      
                }
            });
            $(this).find('.loading').fadeOut('1500');
            e.preventDefault();
        });        
    }

    // register form
    // ---------------------------------------------------------------------------------------
    function handleRegisterForm() {
        $('#submitRegister').on('click', function(e) {            
            var form = $(this).closest('form');
            $(this).find('.loading').show();                      
            
            $.ajax({
                url: 'register.php',
                type: "POST",
                data: form.serializeArray(),
                success: function (data) {

                    if( data == 'true'){
                        $('.register-messages').removeClass('error').addClass('success').show();
                        $('.register-messages').html('<h4>Thank you!</h4><p>You have been successfully signed up!</p>');
                    }else{
                        $('.register-messages').removeClass('success').addClass('error').show();
                        $('.register-messages').html('<h4>Error!</h4><p>Please fill in all of the required fields.</p>');
                    }                    
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    //if fails      
                }
            });
            $(this).find('.loading').fadeOut('1500');
            e.preventDefault();
        });        
    }

    // INIT FUNCTIONS
    // ---------------------------------------------------------------------------------------
    return {
        onResize: function() {
            resizePage();
        },
        init: function () {
            handlePreventEmptyLinks();
            handleViewportHeight();
            handlePlaceholdem();
            handleBootstrapSelect();
            handleSuperFish();
            handleSmoothScroll();
            handlePrettyPhoto();
            handleToTopButton();
            handleAnimatedHeader();
            handleCircles();
            handlePlayer();
            handleContactForm();
            handleBookForm();
            handleRegisterForm();
        },
        // Homepage Slider
        initHomeSlider: function () {
              $("#hslides").superslides({
                animation: 'fade',
                animation_speed: 4000,
                pagination: false,
                hashchange: false,
                play: 6000,
                scrollable: false
              });
        },
        // Partners Slider
        initPartnerSlider: function () {
            $('.partners-carousel .owl-carousel').owlCarousel({
                autoplay: true,
                loop: true,
                margin: 25,
                items: 6,
                dots: false,
                nav: true,
                navText: [
                    "<i class='fa fa-angle-left'></i>",
                    "<i class='fa fa-angle-right'></i>"
                ],
                responsive: {
                    0:    {items: 1},
                    240:  {items: 1},
                    320:  {items: 2},
                    479:  {items: 3},
                    768:  {items: 4},
                    1024:  {items: 6}                   
                }
            });
        },
        // Gallery
        initGallery: function () {
            $('#gallery').mixItUp();
        },

        // TablePrice
        initTablePrice: function () {            
            $('#table-price').owlCarousel({
                autoplay: true,
                loop: true,
                items: 3,
                margin: 25,
                dots: false,
                autoplaySpeed: 2000,
                smartSpeed: 2000,
                dragEndSpeed: 2000,
                dotsSpeed: 2000,
                navSpeed: 2000,
                fluidSpeed: 2000,
                nav: true,
                navText: [
                    "<i class='fa fa-angle-left'></i>",
                    "<i class='fa fa-angle-right'></i>"
                ],
                responsive: {                    
                    0:    {items: 1},
                    479:  {items: 2},
                    991:  {items: 2},
                    1024: {items: 3}
                }
            });

        },   
        // Classes
        initClasses: function () {            
            $('.classes-tables').owlCarousel({
                autoplay: true,
                loop: true,
                items: 3,
                margin: 25,
                dots: false,
                autoplaySpeed: 2000,
                smartSpeed: 2000,
                dragEndSpeed: 2000,
                dotsSpeed: 2000,
                navSpeed: 2000,
                fluidSpeed: 2000,
                nav: true,
                navText: [
                    "<i class='fa fa-angle-left'></i>",
                    "<i class='fa fa-angle-right'></i>"
                ],
                responsive: {                    
                    0:    {items: 1},
                    479:  {items: 2},
                    991:  {items: 2},
                    1024: {items: 3}
                }
            });
        },         
        // Team Items
        initTeamitems: function () {            
            $('#teamitems').owlCarousel({
                autoplay: true,
                loop: true,
                items: 3,
                margin: 25,
                dots: false,
                autoplaySpeed: 2000,
                smartSpeed: 2000,
                dragEndSpeed: 2000,
                dotsSpeed: 2000,
                navSpeed: 2000,
                fluidSpeed: 2000,
                nav: true,
                navText: [
                    "<i class='fa fa-angle-left'></i>",
                    "<i class='fa fa-angle-right'></i>"
                ],
                responsive: {                    
                    0:    {items: 1},
                    479:  {items: 2},
                    768:  {items: 2},
                    991:  {items: 2},
                    1024: {items: 3}
                }
            });

        },         
        // Testimonials
        initTestimonials: function () {            
            $('#testimonials').owlCarousel({
                autoplay: false,
                loop: false,
                items: 3,
                margin: 25,
                dots: false,
                autoplaySpeed: 2000,
                smartSpeed: 2000,
                dragEndSpeed: 2000,
                dotsSpeed: 2000,
                navSpeed: 2000,
                fluidSpeed: 2000,
                nav: true,
                navText: [
                    "<i class='fa fa-angle-left'></i>",
                    "<i class='fa fa-angle-right'></i>"
                ],
                responsive: {                    
                    0:    {items: 1},
                    479:  {items: 2},
                    768:  {items: 2},
                    991:  {items: 2},
                    1024: {items: 3}
                }
            });

        },   
        initTooltip: function(){
            $(".tip-top").tooltip({placement : 'top'});
            $(".tip-right").tooltip({placement : 'right'});
            $(".tip-bottom").tooltip({placement : 'bottom'});
            $(".tip-left").tooltip({ placement : 'left'});
        },
        // Animation on Scroll
        initAnimation: function () {
            var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            if (isMobile == false) {
                $('*[data-animation]').addClass('animated');
                $('.animated').waypoint(function (down) {
                    var elem = $(this);
                    var animation = elem.data('animation');
                    if (!elem.hasClass('visible')) {
                        var animationDelay = elem.data('animation-delay');
                        if (animationDelay) {
                            setTimeout(function () {
                                elem.addClass(animation + ' visible');
                            }, animationDelay);
                        } else {
                            elem.addClass(animation + ' visible');
                        }
                    }
                }, {
                    offset: $.waypoints('viewportHeight')
                    //offset: 'bottom-in-view'
                    //offset: '95%'
                });
            }
            // Refresh Waypoints on tab click / animation
            $('#tabs-main li a[data-toggle="tab"]').on('shown.bs.tab', function () { $.waypoints('refresh'); });
        },
        // Google map
        initGoogleMap: function() {
            var map;
            function initialize() {

                //set your google maps parameters
                var latitude  = 43.653226,
                    longitude = -79.383184,
                    mapZoom  = 14;

                //google map custom marker icon
                var marker_url = 'assets/img/marker.png';

                //define the basic color of your map, plus a value for saturation and brightness
                var main_color = '#386091',
                    saturation_value= -20,
                    brightness_value= 5;

                //we define here the style of the map
                var style= [ 
                    {
                        //set saturation for the labels on the map
                        elementType: "labels",
                        stylers: [
                            {saturation: saturation_value}
                        ]
                    },  
                    {   //poi stands for point of interest - don't show these lables on the map 
                        featureType: "poi",
                        elementType: "labels",
                        stylers: [
                            {visibility: "off"}
                        ]
                    },
                    {
                        //don't show highways lables on the map
                        featureType: 'road.highway',
                        elementType: 'labels',
                        stylers: [
                            {visibility: "off"}
                        ]
                    }, 
                    {   
                        //don't show local road lables on the map
                        featureType: "road.local", 
                        elementType: "labels.icon", 
                        stylers: [
                            {visibility: "off"} 
                        ] 
                    },
                    { 
                        //don't show arterial road lables on the map
                        featureType: "road.arterial", 
                        elementType: "labels.icon", 
                        stylers: [
                            {visibility: "off"}
                        ] 
                    },
                    {
                        //don't show road lables on the map
                        featureType: "road",
                        elementType: "geometry.stroke",
                        stylers: [
                            {visibility: "off"}
                        ]
                    }, 
                    //style different elements on the map
                    { 
                        featureType: "transit", 
                        elementType: "geometry.fill", 
                        stylers: [
                            { hue: main_color },
                            { visibility: "on" }, 
                            { lightness: brightness_value }, 
                            { saturation: saturation_value }
                        ]
                    }, 
                    {
                        featureType: "poi",
                        elementType: "geometry.fill",
                        stylers: [
                            { hue: main_color },
                            { visibility: "on" }, 
                            { lightness: brightness_value }, 
                            { saturation: saturation_value }
                        ]
                    },
                    {
                        featureType: "poi.government",
                        elementType: "geometry.fill",
                        stylers: [
                            { hue: main_color },
                            { visibility: "on" }, 
                            { lightness: brightness_value }, 
                            { saturation: saturation_value }
                        ]
                    },
                    {
                        featureType: "poi.sport_complex",
                        elementType: "geometry.fill",
                        stylers: [
                            { hue: main_color },
                            { visibility: "on" }, 
                            { lightness: brightness_value }, 
                            { saturation: saturation_value }
                        ]
                    },
                    {
                        featureType: "poi.attraction",
                        elementType: "geometry.fill",
                        stylers: [
                            { hue: main_color },
                            { visibility: "on" }, 
                            { lightness: brightness_value }, 
                            { saturation: saturation_value }
                        ]
                    },
                    {
                        featureType: "poi.business",
                        elementType: "geometry.fill",
                        stylers: [
                            { hue: main_color },
                            { visibility: "on" }, 
                            { lightness: brightness_value }, 
                            { saturation: saturation_value }
                        ]
                    },
                    {
                        featureType: "transit",
                        elementType: "geometry.fill",
                        stylers: [
                            { hue: main_color },
                            { visibility: "on" }, 
                            { lightness: brightness_value }, 
                            { saturation: saturation_value }
                        ]
                    },
                    {
                        featureType: "transit.station",
                        elementType: "geometry.fill",
                        stylers: [
                            { hue: main_color },
                            { visibility: "on" }, 
                            { lightness: brightness_value }, 
                            { saturation: saturation_value }
                        ]
                    },
                    {
                        featureType: "landscape",
                        stylers: [
                            { hue: main_color },
                            { visibility: "on" }, 
                            { lightness: brightness_value }, 
                            { saturation: saturation_value }
                        ]
                        
                    },
                    {
                        featureType: "road",
                        elementType: "geometry.fill",
                        stylers: [
                            { hue: main_color },
                            { visibility: "on" }, 
                            { lightness: brightness_value }, 
                            { saturation: saturation_value }
                        ]
                    },
                    {
                        featureType: "road.highway",
                        elementType: "geometry.fill",
                        stylers: [
                            { hue: main_color },
                            { visibility: "on" }, 
                            { lightness: brightness_value }, 
                            { saturation: saturation_value }
                        ]
                    }, 
                    {
                        featureType: "water",
                        elementType: "geometry",
                        stylers: [
                            { hue: main_color },
                            { visibility: "on" }, 
                            { lightness: brightness_value }, 
                            { saturation: saturation_value }
                        ]
                    }
                ];

                //set google map options
                var mapOptions = {
                    zoom: mapZoom,
                    center: new google.maps.LatLng(latitude, longitude),
                    scrollwheel: false,
                    panControl: false,
                    zoomControl: false,
                    mapTypeControl: false,
                    streetViewControl: false,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,                    
                    styles: style
                };
                //inizialize the map
                map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

                //add a custom marker to the map                
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(latitude, longitude),
                    map: map,
                    visible: true,
                    icon: marker_url,
                });

                var zoomControlDiv = document.createElement('div');
                var zoomControl = new CustomZoomControl(zoomControlDiv, map);

                //insert the zoom div on the top left of the map
                map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);
            }

            //add custom buttons for the zoom-in/zoom-out on the map
            function CustomZoomControl(controlDiv, map) {
                //grap the zoom elements from the DOM and insert them in the map 
                var controlUIzoomIn= document.getElementById('map-zoom-in'),
                    controlUIzoomOut= document.getElementById('map-zoom-out');
                controlDiv.appendChild(controlUIzoomIn);
                controlDiv.appendChild(controlUIzoomOut);

                // Setup the click event listeners and zoom-in or out according to the clicked element
                google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
                    map.setZoom(map.getZoom()+1)
                });
                google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
                    map.setZoom(map.getZoom()-1)
                });
            }

            google.maps.event.addDomListener(window, 'load', initialize);
        }

    };

}();