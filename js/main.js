
;( function( window ) {
	
	'use strict';

	function classReg( className ) {
	  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
	}

	// classList support for class management
	// altho to be fair, the api sucks because it won't accept multiple classes at once
	var hasClass, addClass, removeClass;

	if ( 'classList' in document.documentElement ) {
	  hasClass = function( elem, c ) {
	    return elem.classList.contains( c );
	  };
	  addClass = function( elem, c ) {
	    elem.classList.add( c );
	  };
	  removeClass = function( elem, c ) {
	    elem.classList.remove( c );
	  };
	}
	else {
	  hasClass = function( elem, c ) {
	    return classReg( c ).test( elem.className );
	  };
	  addClass = function( elem, c ) {
	    if ( !hasClass( elem, c ) ) {
	      elem.className = elem.className + ' ' + c;
	    }
	  };
	  removeClass = function( elem, c ) {
	    elem.className = elem.className.replace( classReg( c ), ' ' );
	  };
	}

	function toggleClass( elem, c ) {
	  var fn = hasClass( elem, c ) ? removeClass : addClass;
	  fn( elem, c );
	}

	var classie = {
	  // full names
	  hasClass: hasClass,
	  addClass: addClass,
	  removeClass: removeClass,
	  toggleClass: toggleClass,
	  // short names
	  has: hasClass,
	  add: addClass,
	  remove: removeClass,
	  toggle: toggleClass
	};

	// transport
	if ( typeof define === 'function' && define.amd ) {
	  // AMD
	  define( classie );
	} else {
	  // browser global
	  window.classie = classie;
	}

	var docElem = window.document.documentElement;

	function getViewportH() {
		var client = docElem['clientHeight'],
			inner = window['innerHeight'];
		
		if( client < inner )
			return inner;
		else
			return client;
	}

	function scrollY() {
		return window.pageYOffset || docElem.scrollTop;
	}

	// http://stackoverflow.com/a/5598797/989439
	function getOffset( el ) {
		var offsetTop = 0, offsetLeft = 0;
		do {
			if ( !isNaN( el.offsetTop ) ) {
				offsetTop += el.offsetTop;
			}
			if ( !isNaN( el.offsetLeft ) ) {
				offsetLeft += el.offsetLeft;
			}
		} while( el = el.offsetParent )

		return {
			top : offsetTop,
			left : offsetLeft
		}
	}

	function inViewport( el, h ) {
		var elH = el.offsetHeight,
			scrolled = scrollY(),
			viewed = scrolled + getViewportH(),
			elTop = getOffset(el).top,
			elBottom = elTop + elH,
			// if 0, the element is considered in the viewport as soon as it enters.
			// if 1, the element is considered in the viewport only when it's fully inside
			// value in percentage (1 >= h >= 0)
			h = h || 0;

		return (elTop + elH * h) <= viewed && (elBottom) >= scrolled;
	}

	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	function cbpScroller( el, options ) {	
		this.el = el;
		this.options = extend( this.defaults, options );
		this._init();
	}

	cbpScroller.prototype = {
		defaults : {
			// The viewportFactor defines how much of the appearing item has to be visible in order to trigger the animation
			// if we'd use a value of 0, this would mean that it would add the animation class as soon as the item is in the viewport. 
			// If we were to use the value of 1, the animation would only be triggered when we see all of the item in the viewport (100% of it)
			viewportFactor : 0.2
		},
		_init : function() {
			this.sections = Array.prototype.slice.call( this.el.querySelectorAll( '.work-anim' ) );
			this.didScroll = false;

			var self = this;
			// the sections already shown...

			

			this.sections.forEach( function( el, i ) {
				if( inViewport( el ) ) {
					setTimeout( function(){
						classie.add( el, 'animate' );
					}, 60 );
					//classie.add( el, 'cbp-so-init' );
				}
			} );

			var scrollHandler = function() {
					if( !self.didScroll ) {
						self.didScroll = true;
						setTimeout( function() { self._scrollPage(); }, 60 );
					}
				},
				resizeHandler = function() {
					function delayed() {
						self._scrollPage();
						self.resizeTimeout = null;
					}
					if ( self.resizeTimeout ) {
						clearTimeout( self.resizeTimeout );
					}
					self.resizeTimeout = setTimeout( delayed, 200 );
				};

			window.addEventListener( 'scroll', scrollHandler, false );
			window.addEventListener( 'resize', resizeHandler, false );
		},
		_scrollPage : function() {
			var self = this;

			this.sections.forEach( function( el, i ) {
				if( inViewport( el, self.options.viewportFactor ) ) {
					classie.add( el, 'animate' );
					//el.addClass("animate-now");
				}
				else {
					// this add class init if it doesn't have it. This will ensure that the items initially in the viewport will also animate on scroll
					//classie.add( el, 'cbp-so-init' );
					
					//classie.remove( el, 'animate' );
					//console.log("assd");
					//el.removeClass("animate-now");

				}
			});

			this.didScroll = false;
		}
	}

	// add to global namespace
	window.cbpScroller = cbpScroller;

} )( window );
	

	$(document).ready(function(){
		new cbpScroller( document.getElementById( 'mainbody' ) );
	});


(function($){
	$(".menu-button").click(function(){
		$(".menu-wrapper, .menu-button").toggleClass("on");
	});
	$(".dropdown .dropdown-toggle").click(function(){
		$(this).parent().find(".dd-menu").toggle();
		$(this).parent().find(".dd-arrow").toggleClass("on");
	})
	$('a[href="#"').click(function(e){
		e.preventDefault();
		$('#popup-01').modal('show');
	})
	$('.box').click(function(e){
		e.preventDefault();
		$('#popup-01').modal('show');
	})
})(jQuery)


