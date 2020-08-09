/**
 * States select redirect
 */

$( 'select[name="state"].redirect' ).on( 'change', function() {
	if ( 'Select your state...' !== $( this ).val() ) {
		let state = $( this ).val().toLowerCase().replace( ' ', '-' );
		window.location.href = '/' + state;
	}
});
