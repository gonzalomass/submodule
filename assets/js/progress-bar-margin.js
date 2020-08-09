/**
 * Progress Bar dektop margin adjustment via css variable
 */
$( document ).ready( function() {
	let logoWidth = $( '.site-header__custom-logo' ).width(),
		progressBarMarginAdjustment = logoWidth / 2;
	document.documentElement.style.setProperty( '--progress-bar-margin-adjustment', '-' + progressBarMarginAdjustment + 'px' );
});
