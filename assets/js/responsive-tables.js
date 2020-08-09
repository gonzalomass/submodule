/**
 * Responsive tables behaviour.
 */
$( 'table' ).each( function() {
	var labels = [];
	$( this ).find( 'thead th' ).each( function() {
		var value = $( this ).html();
		labels.push( value );
	});
	$( this ).find( 'tbody tr' ).each( function() {
		var count = -1;
		$( this ).find( 'td' ).each( function() {
			count++;
			$( this ).attr( 'label', labels[count]);
		});
	});
});
