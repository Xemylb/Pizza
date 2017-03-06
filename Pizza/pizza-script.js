$(document).ready(function () {
    var priceHtml = $('#sum'),
        weightHtml = $('#size'),
        tabItems = $('.tab-item'),
        check = 0;
    _.startFunc(tabItems); //создаем статические данные правильного умножения коэфициентов
    $('.tab-links').on('click', 'a', function () { //переключение табов
        $('.tab-links').children('a').css('background-position-y', '-2px');
        $(this).css('background-position-y', '-42px');
        var tabTarget = $(this).attr('data-href');
        $('#tabs').children('div').removeClass('active-tab');
        $(tabTarget).addClass('active-tab');
    });

    $('.pizza-type').on('click', function () {//тип теста
        $('.pizza-type').css('opacity', '0.7');
        $(this).css('opacity', '1');
        $('#pizza-type-txt').text($(this).attr('data-pizza-type'));
    });

    $('.pizza-size').on('click', function () { // размер пиццы
        var invertHeight = '-' + $(this).attr('data-height');
        $('.pizza-size').css('background-position-y', '0').removeClass('active-size');
        $(this).css('background-position-y', invertHeight).addClass('active-size');
        $('#pizza-size-txt').text($(this).attr('data-pizza-size'));
        _.changeCoeff($(this), tabItems, function () {
            _.getTotal($('#in-pizza').children('.tab-item'), $('.active-size'), priceHtml, weightHtml);
        });
        console.log(staticPrice);
        console.log(staticWeight);
    });

    $('.pizza-sauce').on('click', function () { // основной соус пиццы
        $('.pizza-sauce').children().css('opacity', '0.6');
        $(this).children().css('opacity', '1');
        $('#pizza-sauce-txt').text($(this).attr('data-sauce-name'));
    });

    $('.sauce-select').on('change', function () { // выбор соуса в пиццу
        var imgSrc = $('option:selected').attr('data-img');
        $('#main-component-img').children().attr('src', imgSrc);
    });

    $(".out-pizza").on("click", '.tab-item', function () { //перенос с права на лево ингридиентов
        check = _.getTotal($('#in-pizza').children('.tab-item'), $('.active-size'), priceHtml, weightHtml);//функция подстчета и вывода "Итого"
        if (check != 0) { // если лимит веса не привышен
            $("#in-pizza").append($(this)); //перемещаем влево
            _.addImg($(this), $('.pizza-img-konst')); //добовляем картинку на пиццу
            $(this).after('<span class="plus"></span>'); // аппендим элемент плюс
        }
    });

    $("#in-pizza").on("click", '.tab-item', function () { //перенос с лева на право ингридиентов
        var pos = Number($(this).attr("data-pos")),
            thisValue =  +$(this).attr('data-val');
        if(thisValue == 1){
            $(this).next().remove();
            $(".out-pizza").find(".in-tab-div").eq(pos).append($(this));
            _.getTotal($('#in-pizza').children('.tab-item'), $('.active-size'), priceHtml, weightHtml); //функция подстчета и вывода "Итого"
            _.removeImg($(this));
            $(this).children('.val-count').remove();
        } else {
            --thisValue;
            $(this).attr('data-val', thisValue);
            $(this).children('.val-count').html('<div>' +thisValue+ '</div>');
        }

    });

    $('#ok-btn').on('click', function () {
        $('#message').hide();
    });

    $('#in-pizza').on('click','.plus', function () { // вешаем клик на новый элемент
        var tabItem= $(this).prev();
        var tabItemVal = +tabItem.attr('data-val'); //заносим в переменную атрибут data-val элемента .tab-item
        tabItem.attr('data-val', tabItemVal + 1); // увеличиваем по клику data-val на 1
        check = _.getTotal($('#in-pizza').children('.tab-item'), $('.active-size'), priceHtml, weightHtml); //считаем сумму с обновленным data-val
        tabItem.append('<span class="val-count"></span>');
        if (check == 0) { //если привышает возвращаем data-val обратно
            $(this).prev().attr('data-val', tabItemVal - 1);
        } else {
            tabItem.children('.val-count').html('<div>' + ++tabItemVal+ '</div>');
        }
    })
});