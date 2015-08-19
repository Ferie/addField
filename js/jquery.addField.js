;
(function ($, window, document, undefined) {
	"use strict";

	var pluginName = 'addField',
		defaults = {
			addFieldContainerClass: 'addFieldContainer',
			addFieldClass: 'addField',
			generalMultipleFieldsContainerParentsClass: 'generalMultipleFieldsContainer',
			firstMultipleFieldsContainerParentsClass: 'firstMultipleFieldsContainer',
			firstWrapperClass: 'firstWrapper',
			firstPrefix: 'firstPrefix',
			secondMultipleFieldsContainerParentsClass: null,
			secondWrapperClass: null,
			secondPrefix: null,
			thirdMultipleFieldsContainerParentsClass: null,
			thirdWrapperClass: null,
			thirdPrefix: null,
			fourthMultipleFieldsContainerParentsClass: null,
			fourthWrapperClass: null,
			fourthPrefix: null,
			fifthMultipleFieldsContainerParentsClass: null,
			fifthWrapperClass: null,
			fifthPrefix: null,
			sixthMultipleFieldsContainerParentsClass: null,
			sixthWrapperClass: null,
			sixthPrefix: null,
			mustacheTemplateId: 'addFieldTemplate',
			maxFieldsNumber: 10
		};

	//constructor
	function plugin(element, options) {
		this.elem = element;
		this.$elem = $(element);
		this.options = $.extend({}, defaults, options);

		this.$addField = this.$elem.find('.' + this.options.addFieldClass);
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
				$thisParents = $this.parents('.' + pluginThis.options.generalMultipleFieldsContainerParentsClass),
				max_fields = pluginThis.options.maxFieldsNumber,
				counter = 0,
				prefix,
				$wrapper;

			event.preventDefault();

			if ($thisParents.hasClass(pluginThis.options.firstMultipleFieldsContainerParentsClass)) {
				$wrapper = $thisParents.find('.' + pluginThis.options.firstWrapperClass);
				prefix = pluginThis.options.firstPrefix;
				pluginThis.elecInputCount = pluginThis.elecInputCount + 1;
				counter = pluginThis.elecInputCount;
			} else if ($thisParents.hasClass(pluginThis.options.secondMultipleFieldsContainerParentsClass)) {
				$wrapper = $thisParents.find('.' + pluginThis.options.secondWrapperClass);
				prefix = pluginThis.options.secondPrefix;
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

				var output = Mustache.render($('#' + pluginThis.options.mustacheTemplateId).html(), view);

				$wrapper.append(output);
				/* End Mustache.js template rendering */
				
				$wrapper.find('[data-' + prefix + '-field-remove="' + (counter-1) + '"]').addClass('is-hidden');

				if (counter == max_fields) {
					$wrapper.siblings('.' + pluginThis.options.addFieldContainerClass).addClass('is-hidden');
				}
			}

			$wrapper.find('.removeField[data-' + prefix + '-field-remove="' + counter + '"]').on('click', function (e) {
				var $this = $(this);

				e.preventDefault();
				e.stopPropagation();
				$this.parent().remove();

				if (prefix == pluginThis.options.firstPrefix) {
					pluginThis.elecInputCount = pluginThis.elecInputCount - 1;
					counter = pluginThis.elecInputCount;
				} else if (prefix == pluginThis.options.secondPrefix) {
					pluginThis.gasInputCount = pluginThis.gasInputCount - 1;
					counter = pluginThis.gasInputCount;
				}

				$wrapper.find('[data-' + prefix + '-field-remove="' + counter + '"]').removeClass('is-hidden');
				$wrapper.siblings('.' + pluginThis.options.addFieldContainerClass).removeClass('is-hidden');
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