const rangeSlider = document.getElementById('range-slider');

if (rangeSlider) {
    noUiSlider.create(rangeSlider, {
        start: 10,
        connect: [true, false],
        step: 1,
        range: {
            'min': 1,
            'max': 30
        }
    });

    const input1 = document.getElementById('input-1');

    rangeSlider.noUiSlider.on('update', function(values, handle){
        input1.value = Math.round(values[handle]);
    });
};