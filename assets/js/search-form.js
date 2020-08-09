/**
 * Search Form
 */

// Show search bar for desktop
$( '.search-form__submit').click( function( event ) {
	if ( ! $( '.search-form__field' ).hasClass( 'active' ) && 768 <= $( document ).width() ) {
		event.preventDefault();
		let menuWidth = $( '#main-menu' ).width();
		document.documentElement.style.setProperty( '--menu-width', menuWidth + 'px' );
		$( '.search-form__submit, .search-form, .search-form__close, .search-form__field' ).addClass( 'active' );
		$( '.site-header__main-menu' ).addClass( 'search-bar-expandend' );
	}
});

// Hide search bar
$( '.search-form__close' ).click( function( event ) {
	$( '.search-form__close, .search-form, .search-form__submit, .search-form__field' ).removeClass( 'active' );
	$( '.site-header__main-menu' ).removeClass( 'search-bar-expandend' );
});

// Toggle search bar for mobile
$( '.site-header__toggler' ).click( function() {
	if ( $( this ).hasClass( 'collapsed' ) ) {
		$( '#searchform' ).removeClass( 'd-none' );
	} else {
		$( '#searchform' ).addClass( 'd-none' );
	}
});
