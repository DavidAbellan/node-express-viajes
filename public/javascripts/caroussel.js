$.fn.carousel = function(options) {
   
    var carousel = this, index,
        settings, contents,
        length, page,
        current, limit,
        prevBtn = carousel.children(".prev"),
        nextBtn = carousel.children(".next");
    
    function initializeDefaults(){
      settings = {
        elements: options.elements || 4,
        speed: options.speed || 200,
        step: options.step || 1,
        listeners: {},
        spacing: options.spacing || 0,
        effects: options.effects || false,
        circular: options.circular || false,
        autoplay: options.autoplay || false,
        callback: options.callback || function(){},
        width: options.width ||  carousel.find(".container").width()
      };
    }
    
    function prevCircular(){
      var jump = false;
      if(index == 0){
         jump = true;
         index = length - 2;  
      }
      if(current == 0){
        jump = true;
        current = (limit-1)*(-1);
      }
      if(jump == true){
        normalSwitch(current);
      }
      settings.callback(index,"prev",carousel);
      return jump;
    }
    
    function nextCircular(){
      var jump = false;
      
      if(index == (length - 2)){
        jump = true;
        index = 0; 
      }
      
      if(current == ((limit-1)*(-1))){
        jump = true;
        current = 0;
      }
      
      if(jump == true){
        normalSwitch(current);
      }
      settings.callback(index,"next",carousel);
      return jump;
    }
    
    function initializeCarousel(){
      contents = carousel.find(".content");
      //number of contents
      length = contents.length+1;
      current = 0;
      index = 0;
      //width of the contents
      page = settings.width / settings.elements + settings.spacing/ settings.elements;
      //establish the limit based on elements number
      limit = length - settings.elements;
      limit = limit > 0 ? limit : length;
      //set the sizes for contents and wrapper
      contents.width(page+"px");
      contents.eq(0).addClass("active");               
      carousel.find(".wrapper").width(length*page+"px");
    }
    
    function initializeControls(){
      prevBtn.addClass("disable").click(function(e){
        
        e.preventDefault();
        var state = false;
          if(settings.circular){
            state = prevCircular();
            if(state == true){
              return false;
            }
         }
        prevBtn.removeClass("disable");
        nextBtn.removeClass("disable");
        current = current + settings.step;
        current = current < 1 ? current : 0;
        current === 0 ?prevBtn.addClass("disable"):prevBtn.removeClass("disable");
        index = index - settings.step;
        index = index > -1 ? index : 0;
        settings.callback(index,"prev",carousel);
        animateSwitch(current);
     });
 
     nextBtn.click(function(e){
       e.preventDefault();
       var state = false;
       if(settings.circular){
         state = nextCircular();
         if(state == true){
            return false;
         }
       }
       nextBtn.removeClass("disable");
       nextBtn.removeClass("disable");
       current = current - settings.step;
       current = current > limit*(-1) ? current : (limit-1)*(-1);
       current == ((limit-1)*(-1)) ? nextBtn.addClass("disable"):nextBtn.removeClass("disable");
       index = index + settings.step;
       index = index < length-2 ? index : length - 2;
       settings.callback(index,"next",carousel);
       animateSwitch(current);
     });
      
    }
    
    function normalSwitch(direction){
      contents.removeClass("active");
      contents.eq(index).addClass("active");
      carousel.find(".wrapper").css({
          "left":direction*page+"px"
       });
    } 
    
   function animateSwitch(direction){
     'use strict';
     var content = contents.eq(index);
     contents.removeClass("active");
     content.addClass("active");
     if(settings.effects == true){
       content.css("opacity","0").animate({
         "opacity": "1"
       },settings.speed);
     }
     carousel.find(".wrapper").animate({
       "left":direction*page+"px"
     },settings.speed);
   }
       
    function initializeAutoplay(){
      var timer = null;
      function autoplay(){
        return setInterval(function(){
          nextBtn.trigger("click");
        }, 5000); 
      }
      if(settings.autoplay == true){
         timer = autoplay();
        carousel.mouseenter(function(){
           clearInterval(timer);
        }).mouseleave(function(){
           timer = autoplay();
        });
      }
    }
    
    initializeDefaults();
    initializeCarousel();
    initializeControls();
    initializeAutoplay();
     
   return carousel;
 };
 
 
 
 $(function(){
   setTimeout(function(){
     var mysync = {index:0};
     var carousel = $(".carousel-one").carousel({elements : 1, speed: 500, step: 1,spacing: 20, circular: true, autoplay: true, callback: function(index,direction,scope){
      $(".temp li").css("color","black");
     $(".temp li").eq(index).css("color","red");
     }});//change the elements number and the carousel will adapt
     
   $(".content").each(function(i,it){
     var new_light_color = 'rgb(' + (Math.floor((256-229)*Math.random()) + 230) + ',' + 
                                     (Math.floor((256-229)*Math.random()) + 230) + ',' + 
                                     (Math.floor((256-229)*Math.random()) + 230) + ')';
     $(it).css("background",new_light_color);  
   });
   },100);
 });