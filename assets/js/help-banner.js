/**
 * Need help banner button behaviour.
 */
$( document ).ready( function() {
	if ( document.getElementById( 'smartpath' ) ) {

		// Change link.
		$( '.goTocta' ).attr( 'href', '#' );

		// Scroll to top behaviour.
		$( '.goTocta' ).on( 'click', function() {
			$( 'html, body' ).animate({
				scrollTop: $( '#page' ).offset().top
			}, 1000 );
		});
	}
});

/**
 * Need help banner close behaviour.
 */
$( '.help-banner__close' ).click( function() {
	$( '#help-banner' ).css({
		position: 'relative'
	});
	$( this ).addClass( 'hide' );
});

/**
 * Need help banner sticky delay.
 */
if ( window.matchMedia( '(max-width: 992px)' ).matches ) {
	helpBanner = $( '#help-banner' );
	$( window ).scroll( function() {
		if ( 900 < window.scrollY ) {
			helpBanner.addClass( 'sticky' ).slideDown();
		} else {
			helpBanner.slideUp();
		}
	});
}
