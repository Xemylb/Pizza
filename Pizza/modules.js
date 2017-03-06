"use strict"
;
(function () {
    function getTotal(elements, activeSize, priceHtml, weightHtml) {
        var totalPrice = +$(activeSize).attr('data-price'),
            totalWeight = +$(activeSize).attr('data-weight');
        elements.each(
            function () {
                var price = +$(this).attr('data-price') * (+$(this).attr('data-val'));
                var weight = +$(this).attr('data-weight') * (+$(this).attr('data-val'));
                totalPrice += price;
                totalWeight += weight;
            }
        );
        if (totalWeight >= 2000) {
            $('#message').show();
            return 0
        } else {
            priceHtml.text(totalPrice + ' грн');
            weightHtml.text(totalWeight + ' гр');
            return 1
        }

    }

    function changeCoeff(activeSize, tabItems, callback) {
        var coeff = +activeSize.attr('data-coeff'),
            i = 0;
        tabItems.each(
            function () {
                var val = +$(this).attr('data-val'),
                    newPrice,
                    newWeight;
                if (coeff != 1) {
                    newPrice = (staticPrice[i] * coeff).toFixed(0);
                    newWeight = (staticWeight[i] * coeff).toFixed(0);
                } else {
                    newPrice = staticPrice[i];
                    newWeight = staticWeight[i];
                }
                $(this).attr('data-price', newPrice);
                $(this).attr('data-weight', newWeight);
                $(this).find('.ingredient-price').text(newPrice + ' грн');
                $(this).find('.ingredient-weight').text(newWeight + 'гр');
                ++i
            });
        callback();
    }

    function startFunc(tabItems) {
        window.staticPrice = [];
        window.staticWeight = [];
        var i = 0;
        tabItems.each(function () {
            staticPrice[i] = +$(this).attr('data-price');
            staticWeight[i] = +$(this).attr('data-weight');
            $(this).find('.ingredient-price').text($(this).attr('data-price') + ' грн');
            $(this).find('.ingredient-weight').text($(this).attr('data-weight') + 'гр');
            $(this).attr('data-pos', i);
            $(this).attr('data-val', 1);
            i++
        });

    }

    function addImg(elem, include) {
        //проверяем на класс который указывает на то что у элмента нет нужного изображения
        if (elem.hasClass('no-img')) {  //если есть
            include.append('<img style="width: 1px" id="' + elem.attr('data-pos') + '-img">');
        } else { //если нет
            var src = 'img/in-pizza/' + elem.attr('data-pos') + '.png';
            include.append('<img id="' + elem.attr('data-pos') + '-img" src="' + src + '">');
        }
    }

    function removeImg(elem) {
        var id = '#' + elem.attr('data-pos') + '-img';
        $(id).remove();
    }

    function addVal() {

    }

    window._ = {
        'getTotal': getTotal,
        'changeCoeff': changeCoeff,
        'startFunc': startFunc,
        'addImg': addImg,
        'removeImg': removeImg
    }
})();