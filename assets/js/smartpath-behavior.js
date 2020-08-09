/* global $ */

/**
 * Smartpath behavior functionality
 */

// Mutate the DOM for the smartpath flow
function postSlide() {

	//** General Helpers */
	$( '.post-slide-hide' ).addClass( 'd-none' ).attr( 'style', 'display: none !important' );
	$( '.post-slide-show' ).removeClass( 'd-none' ).attr( 'style', 'display:' );
	$( '.smartpath__container' ).attr( 'style', 'position: relative; margin-bottom: 0; top: 0;' );

	//** END General Helpers */


	//** Progress Bar */
	// NOTES: Structure to make progress programaticaly is in place, we need to coordinate with Aaron so when react path is in place he can give us some insight of the sp progress on his end.
	let spProgressBarTotalSteps = $( '.sp-progress-bar__step' ).length;
	let spProgressBarCurrentStep = parseInt( $( '#sp-progress-bar' ).attr( 'data-step-progress' ) );
	let spEmailField = $( '#spForm' ).find( 'input[name="EMAIL"]' ).length;
	let spSurveyIdField = $( '#spForm' ).find( 'input[name="SurveyId"]' ).length;
	let progress =  false;

	// Check condition to bump progress bar to step 2.
	if ( 1 == spProgressBarCurrentStep && 0 == spEmailField && 1 >= spSurveyIdField ) {
		spProgressBarNextStep = 2;
		progress = true;
	}

	function setProgressBarNextStep() {
		$( '#sp-progress-bar' ).attr( 'data-step-progress', spProgressBarNextStep );
	}

	function setStepStyleDone() {
		$( `.sp-progress-bar__step[data-step=${spProgressBarCurrentStep}]` ).removeClass( 'active' ).addClass( 'done' ).find( '.step-icon' ).html( '' ).next().html( 'Done' );
	}

	function setStepDividerStyleActive() {
		$( `.sp-progress-bar__step-divider[data-step=${spProgressBarCurrentStep}]` ).addClass( 'active' );
	}

	function setNextStepStyleActive() {
		$( `.sp-progress-bar__step[data-step=${spProgressBarNextStep}]` ).addClass( 'active' );
	}

	// Check if there is any step remaining and if progress conditions are meet.
	// NOTES: Curently step 1 is the only step that will trigger progress
	if ( spProgressBarCurrentStep <= spProgressBarTotalSteps && progress ) {
		setProgressBarNextStep();
		setStepStyleDone();
		setStepDividerStyleActive();
		setNextStepStyleActive();
	}

	/** END Progress Bar */


	//** Path Footer */
	$( '.site-footer' ).addClass( 'site-footer__path' );

	//** END Path Footer */
}

window.postSlide = postSlide;
