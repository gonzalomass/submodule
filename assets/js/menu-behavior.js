$( document ).ready( function() {

	/**
	 * Mutate the dropdown element.
	 * If the element is out of the window margins then set correct margin to make it 100% visible.
	 *
	 * @param {Object} target The dropdown element to mutate.
	 */
	function mutateDropdown( target ) {
		var offset = $( target ).offset(),
			elementWidth = target.offsetWidth,
			windowWidth = window.innerWidth,
			pointerOffset,
			noneOffset,
			leftOffset,
			rightOffset;

		if ( 0 < offset.left && offset.left + elementWidth > windowWidth ) {
			rightOffset = ( offset.left + elementWidth ) - windowWidth;
			pointerOffset = ( rightOffset ) + ( $( target ).parent().width() / 2 );
			$( target ).css( 'margin-right', 'auto' );
			$( target ).css( 'margin-left', '-' + rightOffset - 15 + 'px' );
		} else if ( 0 > offset.left ) {
			leftOffset = Math.abs( offset.left );
			$( target ).css( 'margin-left', leftOffset + 15 );
		} else {
			noneOffset = ( $( target ).parent().width() - $( target ).width() ) / 2;
			pointerOffset = ( $( target ).width() / 2 ) - 10;
			$( target ).css( 'margin-left', noneOffset );
		}

		document.documentElement.style.setProperty( '--pointer-margin-left', pointerOffset + 'px' );
	}

	/**
	 * Observe a dropdown item in order to act upon class attribute mutation.
	 *
	 * @param {Object} target The dropdown element to observe.
	 */
	function observeDropdown( target ) {

		// Set all variables.
		var attributeValue;

		// Set a observer.
		let observer = new MutationObserver( function( mutations ) {
			mutations.forEach( function( mutation ) {

				// Check if attribute class mutates.
				if ( 'class' === mutation.attributeName ) {
					attributeValue = $( mutation.target ).prop( mutation.attributeName );

					// If dropdown element is showing we set the correct margins to make it 100% visible,
					// else we reset margins to 0.
					if ( ! attributeValue.includes( 'show' ) ) {
						$( mutation.target ).css({'margin-left': '0', 'margin-right': '0'});
					} else {
						mutateDropdown( mutation.target );
					}
				}
			});
		});

		// Execute the observer.
		observer.observe( target, {
			attributes: true
		});
	}

	// Get all the dropdowns to observe.
	let $dropdown = document.querySelectorAll( '.dropdown-menu' );

	// Iterate over the dropdowns to observe.
	for ( let i = 0; i < $dropdown.length; i++ ) {
		observeDropdown( $dropdown[i]);

		// Set the desktop columns of each dropdown if required.
		let columnsCount = $( $dropdown[i]).find( 'li.menu-item' ).find( 'ul.dropdown-menu' ).length;
		if ( 2 <= columnsCount && 3 >= columnsCount ) {
			$( $dropdown[i]).addClass( 'dropdown-colums-' + columnsCount );
		} else if ( 4 <= columnsCount ) {
			if ( 0 === columnsCount % 3 || 0 === columnsCount % 5 || 0 === columnsCount % 7 ) {
				$( $dropdown[i]).addClass( 'dropdown-colums-3' );
			} else {
				$( $dropdown[i]).addClass( 'dropdown-colums-4' );
			}
		} else {
			$( $dropdown[i]).addClass( 'dropdown-colums-1' );
		}
	}

	// Mutate dropdown element on window resize to make it fit the window always
	$( window ).on( 'resize', function() {
		for ( let i = 0; i < $dropdown.length; i++ ) {
			$( $dropdown[i]).css({'margin-left': '0', 'margin-right': '0'});
			if ( $( $dropdown[i]).hasClass( 'show' ) ) {
				mutateDropdown( $dropdown[i]);
			}
		}
	});
});
