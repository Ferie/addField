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
            $wrapper.append('\
                <div class="meterReadingFields" data-' + prefix + '-input-count="' + counter + '">\
                    <div class="meterReadingField">\
                        <label for="' + prefix + 'kWh-' + counter + '" class="formLabel">kWhs</label>\
                        <input id="' + prefix + 'kWh-' + counter + '" name="' + prefix + 'kWh-' + counter + '" type="text" class="formField">\
                    </div>\
                    <div class="meterReadingOccurrence">\
                        <label for="' + prefix + 'UseDuration" class="formLabel">Per</label>\
                        <input name="' + prefix + 'PerYear" type="text" class="formField" value="Per Year" disabled="disabled">\
                    </div>\
                    <a class="removeField link" data-' + prefix + '-field-remove="' + counter + '">\
                        <span class="gbe-icon-minus"></span>\
                    </a>\
                </div>\
			');

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