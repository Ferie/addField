$(document).ready(function () {
	var elecInputCount = 0,
		gasInputCount = 0;

	$('.addFieldContainer').on('click', function (event) {
		var $this = $(this),
			$thisParents = $this.parents('.energyFieldsContainer'),
			max_fields = 10,
			counter = 0,
			prefix,
			$wrapper;

		event.preventDefault();

		if ($thisParents.hasClass('elec-usage-amount')) {
			$wrapper = $thisParents.find('.electricityMeter');
			prefix = 'elec';
			elecInputCount = elecInputCount + 1;
			counter = elecInputCount;
		} else if ($thisParents.hasClass('gas-usage-amount')) {
			$wrapper = $thisParents.find('.gasMeter');
			prefix = 'gas';
			gasInputCount = gasInputCount + 1;
			counter = gasInputCount;
		}

		if (counter <= max_fields) {
			/* Mustache.js template rendering */
			var view = {
				counter: counter,
				prefix: prefix
			};

			var output = Mustache.render($('#addFieldTemplate').html(), view);

			$wrapper.append(output);
			/* End Mustache.js template rendering */

			$wrapper.find('[data-' + prefix + '-field-remove="' + (counter - 1) + '"]').addClass('is-hidden');

			if (counter == max_fields) {
				$wrapper.siblings('.addFieldContainer').addClass('is-hidden');
			}
		}

		$wrapper.find('.removeField[data-' + prefix + '-field-remove="' + counter + '"]').on('click', function (e) {
			var $this = $(this);

			e.preventDefault();
			e.stopPropagation();
			$this.parent().remove();

			if (prefix == 'elec') {
				elecInputCount = elecInputCount - 1;
				counter = elecInputCount;
			} else if (prefix == 'gas') {
				gasInputCount = gasInputCount - 1;
				counter = gasInputCount;
			}

			$wrapper.find('[data-' + prefix + '-field-remove="' + counter + '"]').removeClass('is-hidden');
			$wrapper.siblings('.addFieldContainer').removeClass('is-hidden');
		});
	});
});