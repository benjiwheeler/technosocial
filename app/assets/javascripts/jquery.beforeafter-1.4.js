var openLeft;
var openRight;

/*
 * jQuery beforeafter plugin
 * @author admin@catchmyfame.com - http://www.catchmyfame.com
 * @version 1.4
 * @date September 19, 2011
 * @category jQuery plugin
 * @copyright (c) 2009 admin@catchmyfame.com (www.catchmyfame.com)
 * @license CC Attribution-NonCommercial-ShareAlike 3.0 Unported (CC BY-NC-SA 3.0) - http://creativecommons.org/licenses/by-nc-sa/3.0/
 */
(function($){
	$.fn.extend({ 
		beforeAfter: function(options)
		{
			var defaults = 
			{
				animateIntro : false,
				introDelay : 1000,
				introDuration : 1000,
				introPosition : .5,
				showFullLinks : true,
				beforeLinkText: 'Show only before',
				afterLinkText: 'Show only after',
				imagePath : './js/',
				handleImagePath : 'https://dl.dropboxusercontent.com/u/1035381/ref/js/beforeafter/handle.gif',
//				rtImagePath : 'https://dl.dropboxusercontent.com/u/1035381/ref/js/beforeafter/rt-small.png',
			  rtImagePath: 'http://cdn.icons8.com/iOS7/PNG/25/Arrows/forward-25.png',
			  ltImagePath: 'http://cdn.icons8.com/Android/PNG/24/Arrows/previous-24.png',
//				ltImagePath : 'https://dl.dropboxusercontent.com/u/1035381/ref/js/beforeafter/lt-small.png',
				cursor: 'pointer',
				clickSpeed: 600,
				linkDisplaySpeed: 200,
				dividerColor: '#888',
				enableKeyboard: false,
				keypressAmount: 20,
				onReady: function(){}
			};
		var options = $.extend(defaults, options);

		var randID =  Math.round(Math.random()*100000000);

		  var arrowWidth = parseFloat(getStyleRuleValue('width', '.drag_arrow'));
		  var arrowBufferWidth = 10;

    		return this.each(function() {
			var o=options;
			var obj = $(this);

		  var befDiv = $('div.before', obj);
		  var aftDiv = $('div.after', obj);

			var divWidth = befDiv.width();
		  var divWidthNum = parseFloat(divWidth);

			var divHeight = befDiv.height();
		  if (aftDiv.height() > divHeight) {
		    divHeight = aftDiv.height();
		  }
//			alert(divHeight);

			$(obj)
			.width(divWidth)
			.height(divHeight)
			.css({'overflow':'hidden','position':'relative','padding':'0'});

		  befDiv.wrap('<div id="before_container_' + randID + '">'); // wrap in div tags.
		  aftDiv.wrap('<div id="after_container_' + randID + '">'); // wrap in div tags.

		  var befContainerDiv = $('div#before_container_' + randID + '', obj);
		  var aftContainerDiv = $('div#after_container_' + randID + '', obj);
		  befContainerDiv.width(divWidth);
		  
		  var dragWrapperWidth = getStyleRuleValue('width', '.drag_wrapper');
		  var dragWrapperHalfWidth = parseFloat(dragWrapperWidth)/2 + "px";
		  var dragHandleWidth = getStyleRuleValue('width', '.drag_handle');
		  var dragHandleHalfWidth = parseFloat(dragHandleWidth)/2 + "px";
		  //var dragHandleHeight = getStyleRuleValue('height', '.drag_handle');
		  //var dragHandleHalfHeight = "5vh";
		  var dragHandleInitialLeft = divWidthNum*o.introPosition-parseFloat(dragHandleHalfWidth) + 'px'; // divWidth*o.introPosition)-dragHandleHalfWidth+'px'
		  var dragWrapperInitialLeft = divWidthNum*o.introPosition-parseFloat(dragWrapperHalfWidth) + 'px'; // divWidth*o.introPosition)-dragHandleHalfWidth+'px'
//		  var dragHandleInitialTop = '45vh';
		  var dragHandleInitialTop = (parseFloat(divHeight)/2)+'px';



//		  alert("dragHandleWidth: " + dragHandleWidth + " dragHandleHalfWidth: " + dragHandleHalfWidth + " dragHandleHeight: " + dragHandleHeight + " dragHandleHalfHeight: " + dragHandleHalfHeight + " dragHandleInitialLeft: " + dragHandleInitialLeft + " dragHandleInitialTop: " + dragHandleInitialTop);


			// Create an inner div wrapper (dragwrapper) to hold the various divs
			$(obj).prepend('<div id="dragwrapper'+randID+'"><div id="drag'+randID+'"><div id="draghandle'+randID+'" class="drag_handle"></div></div></div>'); // Create drag handle
			$('#dragwrapper'+randID).css({'opacity':.25,'position':'fixed','padding':'0','left':dragWrapperInitialLeft,'z-index':'20'}).width(dragWrapperWidth).height(divHeight);

			befContainerDiv.height(divHeight).width(divWidthNum*o.introPosition).css({'position':'absolute','overflow':'hidden','left':'0px','z-index':'10'}); // Set CSS properties of the before image div
			aftDiv.height(divHeight).width(divWidthNum).css({'position':'absolute','overflow':'hidden','right':'0px'});	// Set CSS properties of the after image div
			$('#drag'+randID).width(2).height(divHeight).css({'background':o.dividerColor,'position':'absolute','left':dragWrapperHalfWidth});	// Set drag handle CSS properties
			befContainerDiv.css({'position':'absolute','top':'0px','left':'0px'});
			aftContainerDiv.css({'position':'absolute','top':'0px','right':'0px'});
			$('#draghandle'+randID).css({'z-index':'100','cursor':o.cursor,'position':'relative','top':dragHandleInitialTop,'left':'-'+dragHandleHalfWidth}); 

			$(obj).append('<img src="'+o.ltImagePath + '" class="drag_arrow" id="lt-arrow'+randID+'"><img src="'+o.rtImagePath + '" class="drag_arrow" id="rt-arrow'+randID+'">');


		  

 openLeft = function(){
		  var leftOpenWidth = getStyleRuleValue('left', '.leftOpen'); // divWidth-$('#dragwrapper'+randID).width()+'px'
//   alert('open left: to ' + leftOpenWidth);
					befContainerDiv.animate({width:divWidth},o.linkDisplaySpeed);
					$('#dragwrapper'+randID).animate({left: leftOpenWidth},o.linkDisplaySpeed);
				};
		   openRight = function(){
		  var leftClosedWidth = getStyleRuleValue('left', '.leftClosed');
//   alert('close left: to ' + leftClosedWidth);
					befContainerDiv.animate({width:0},o.linkDisplaySpeed);
					$('#dragwrapper'+randID).animate({left: leftClosedWidth},o.linkDisplaySpeed);
				};

/*
			if(o.showFullLinks)
			{	
				$(obj).after('<div class="balinks" id="links'+randID+'" style="position:relative"><span class="balinks"><a id="showleft'+randID+'" href="javascript:void(0)">'+o.beforeLinkText+'</a></span><span class="balinks"><a id="showright'+randID+'" href="javascript:void(0)">'+o.afterLinkText+'</a></span></div>');
				$('#links'+randID).width(divWidth);
				$('#showleft'+randID).css({'position':'relative','left':'0px'}).click(function(){openLeft()});
				$('#showright'+randID).css({'position':'absolute','right':'0px'}).click(function(){openRight()});
			}
*/
			if(o.enableKeyboard)
			{
				$(document).keydown(function(event){
					if(event.keyCode == 39)
					{
						if( (parseFloat($('#dragwrapper'+randID).css('left'))+parseFloat($('#dragwrapper'+randID).width()) + o.keypressAmount) <= divWidthNum )
						{
							$('#dragwrapper'+randID).css('left', parseFloat( $('#dragwrapper'+randID).css('left') ) + o.keypressAmount + 'px');
							befContainerDiv.width( parseFloat( befContainerDiv.width() ) + o.keypressAmount + 'px' );
						  //updateDivWidth();
						}
						else
						{
							$('#dragwrapper'+randID).css('left', divWidthNum - parseFloat( $('#dragwrapper'+randID).width() ) + 'px');
							befContainerDiv.width( divWidthNum - parseFloat( $('#dragwrapper'+randID).width() )/2 + 'px' );
						  //updateDivWidth();
						}
					}
					if(event.keyCode == 37)
					{
						if( (parseFloat($('#dragwrapper'+randID).css('left')) - o.keypressAmount) >= 0 )
						{
							$('#dragwrapper'+randID).css('left', parseFloat( $('#dragwrapper'+randID).css('left') ) - o.keypressAmount + 'px');
							befContainerDiv.width( parseFloat( befContainerDiv.width() ) - o.keypressAmount + 'px' );
						  //updateDivWidth();
						}
						else
						{
							$('#dragwrapper'+randID).css('left', '0px');
							befContainerDiv.width($('#dragwrapper'+randID).width()/2);
						  //updateDivWidth();
						}
					}
				});
			}

			$('#dragwrapper'+randID).draggable( { containment:obj,drag:drag,stop:drag });

			function drag()
			{
				$('#lt-arrow'+randID+', #rt-arrow'+randID).stop().css('opacity',0);
//			  alert("this left: " + $(this).css('left') + "; half width is " + parseFloat(dragWrapperHalfWidth)  );
				befContainerDiv.width( parseFloat($(this).css('left')) + parseFloat(dragWrapperHalfWidth)  + 'px' );
			  //updateDivWidth();

			  // borrowed from the animate hover thing below
						$('#lt-arrow'+randID).stop().css({'z-index':'20','position':'absolute','top':divHeight/2-$('#lt-arrow'+randID).height()/2+'px','opacity':'1','left':parseFloat($('#dragwrapper'+randID).css('left'))-arrowBufferWidth-arrowWidth+'px'});
						$('#rt-arrow'+randID).stop().css({'position':'absolute','top':divHeight/2-$('#lt-arrow'+randID).height()/2+'px','opacity':'1','left':parseFloat($('#dragwrapper'+randID).css('left'))+parseFloat(dragWrapperWidth)+arrowBufferWidth-arrowWidth+'px'});
//						$('#dragwrapper'+randID).animate({'opacity':1},200);

			}
/*
			$('#dragwrapper'+randID).on('drag', function(e) {
//			  drag();
//    e.preventDefault();
			  console.log(this, e);
			});

			function drag()
			{
				$('#lt-arrow'+randID+', #rt-arrow'+randID).stop().css('opacity',0);
			      var newWidth = parseFloat($('#dragwrapper'+randID).css('left')) + 'px'; // NOTE: should add 4!!!
			  console.log("this left: " + $('#dragwrapper'+randID).css('left') + " newWidth: " + newWidth);
				befContainerDiv.width( newWidth );
			}
*/

			if(o.animateIntro)
			{
			  // befContainerDiv.width(divWidth); // not needed, right?
				$('#dragwrapper'+randID).css('left',divWidthNum-($('#dragwrapper'+randID).width()/2)+'px');
				setTimeout(function(){
					$('#dragwrapper'+randID).css({'opacity':1}).animate({'left':(divWidthNum*o.introPosition)-($('#dragwrapper'+randID).width()/2)+'px'},o.introDuration,function(){$('#dragwrapper'+randID).animate({'opacity':.25},1000)});
// NOTE: needs to call updateDivWidth(); on completion?
					befContainerDiv.width(divWidth).animate({'width':divWidthNum*o.introPosition+'px'},o.introDuration,function(){clickit();o.onReady.call(this);});
				},o.introDelay);
			}
			else
			{
				clickit();
				o.onReady.call(this);
			}

			function clickit()
			{
				$(obj).hover(function(){
						$('#lt-arrow'+randID).stop().css({'z-index':'20','position':'absolute','top':divHeight/2-$('#lt-arrow'+randID).height()/2+'px','left':parseFloat($('#dragwrapper'+randID).css('left'))-arrowBufferWidth+'px'}).animate({opacity:1,left:parseFloat($('#lt-arrow'+randID).css('left'))-arrowWidth+'px'},200);
						$('#rt-arrow'+randID).stop().css({'position':'absolute','top':divHeight/2-$('#lt-arrow'+randID).height()/2+'px','left':parseFloat($('#dragwrapper'+randID).css('left'))+parseFloat(dragWrapperWidth)+arrowBufferWidth-arrowWidth+'px'}).animate({opacity:1,left:parseFloat($('#rt-arrow'+randID).css('left'))+arrowWidth+'px'},200);
						$('#dragwrapper'+randID).animate({'opacity':1},200);
					},function(){
						$('#lt-arrow'+randID).animate({opacity:0,left:parseFloat($('#lt-arrow'+randID).css('left'))-arrowWidth+'px'},350);
						$('#rt-arrow'+randID).animate({opacity:0,left:parseFloat($('#rt-arrow'+randID).css('left'))+arrowWidth+'px'},350);
						$('#dragwrapper'+randID).animate({'opacity':.25},350);
					}
				);

				// When clicking in the container, move the bar and imageholder divs
/*
				$(obj).click(function(e){
					var clickX = e.pageX - $(this).offset().left;
					$('#dragwrapper'+randID).stop().animate({'left':clickX-($('#dragwrapper'+randID).width()/2)+'px'},o.clickSpeed);
					befContainerDiv.stop().animate({'width':clickX+'px'},o.clickSpeed);
					$('#lt-arrow'+randID+',#rt-arrow'+randID).stop().animate({opacity:0},50);
				});
*/
				$(obj).one('mousemove', function(){$('#dragwrapper'+randID).stop().animate({'opacity':1},500);}); // If the mouse is over the container and we animate the intro, we run this to change the opacity when the mouse moves since the hover event doesnt get triggered yet
			}
  		});
    	}
	});
})(jQuery);
