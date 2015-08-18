;
(function ($, window, document, undefined) {
	"use strict";

	var pluginName = 'addField',
		defaults = {
			addFieldClass: '.addField'
		};

	//constructor
	function plugin(element, options) {
		this.elem = element;
		this.$elem = $(element);
		this.options = $.extend({}, defaults, options);

		this.$addField = this.$elem.find(this.options.addFieldClass);
		this.elecInputCount = 1;
		this.gasInputCount = 1;

		this._defaults = defaults;
		this._name = pluginName;

		this.init();
	}

	plugin.prototype = {
		constructor: plugin,
		addField: function (event) {
			var pluginThis = event.data.pluginThis,
				$this = $(this),
				$thisParents = $this.parents('.energyFieldsContainer'),
				max_fields = 10,
				counter = 0,
				prefix,
				$wrapper;

			event.preventDefault();

			if ($thisParents.hasClass('elec-usage-amount')) {
				$wrapper = $thisParents.find('.electricityMeter');
				prefix = 'elec';
				pluginThis.elecInputCount = pluginThis.elecInputCount + 1;
				counter = pluginThis.elecInputCount;
			} else if ($thisParents.hasClass('gas-usage-amount')) {
				$wrapper = $thisParents.find('.gasMeter');
				prefix = 'gas';
				pluginThis.gasInputCount = pluginThis.gasInputCount + 1;
				counter = pluginThis.gasInputCount;
			}

			if (counter <= max_fields) {
//				$wrapper.append('\
//					<div class="meterReadingFields" data-' + prefix + '-input-count="' + counter + '">\
//						<div class="meterReadingField">\
//							<label for="' + prefix + 'kWh-' + counter + '" class="formLabel">kWhs</label>\
//							<input id="' + prefix + 'kWh-' + counter + '" name="' + prefix + 'kWh-' + counter + '" type="text" class="formField">\
//						</div>\
//						<div class="meterReadingOccurrence">\
//							<label for="' + prefix + 'UseDuration" class="formLabel">Per</label>\
//							<input name="' + prefix + 'PerYear" type="text" class="formField" value="Per Year" disabled="disabled">\
//						</div>\
//						<a class="removeField link" data-' + prefix + '-field-remove="' + counter + '">\
//							<span class="gbe-icon-minus"></span>\
//						</a>\
//					</div>\
//				');

				/* Mustache.js template rendering */
				var view = {
					counter: counter,
					prefix: prefix
				};

				var output = Mustache.render($('#addFieldTemplate').html(), view);

				$wrapper.append(output);
				/* End Mustache.js template rendering */
				
				$wrapper.find('[data-' + prefix + '-field-remove="' + (counter-1) + '"]').addClass('is-hidden');

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
					pluginThis.elecInputCount = pluginThis.elecInputCount - 1;
					counter = pluginThis.elecInputCount;
				} else if (prefix == 'gas') {
					pluginThis.gasInputCount = pluginThis.gasInputCount - 1;
					counter = pluginThis.gasInputCount;
				}

				$wrapper.find('[data-' + prefix + '-field-remove="' + counter + '"]').removeClass('is-hidden');
				$wrapper.siblings('.addFieldContainer').removeClass('is-hidden');
			});
		},
		eventBindings: function () {
			this.$addField.on('click', {pluginThis: this}, this.addField);
		},
		init: function () {
			this.eventBindings();
		}
	};

	$.fn[pluginName] = function (option) {
		return this.each(function () {
			var data = $.data(this, 'ObjPlugin_' + pluginName),
				options = typeof option === 'object' && option;

			if (!data) $.data(this, 'ObjPlugin_' + pluginName, (data = new plugin(this, options)));
			if (typeof option === 'string') data[option]();
		})
	};

	$.fn[pluginName].defaults = defaults;
	$.fn[pluginName].constructor = plugin;

	$(document).addField();

})(jQuery, window, document);