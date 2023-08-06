@@include('nouislider.min.js');
@@include('range-slider.js');
@@include('canvas.js');


//--- Какая та фигня для Webp ---
function testWebp(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}
testWebp(function (support) {
    if (support == true) {
        document.querySelector('body').classList.add('webp');
    }
});
//--- /Какая та фигня для Webp ---





//---Зависимость подзунка от числа---

// var output1 = document.querySelector(".generate__range-input").oninput = function () { myFunction() };
// var output2 = document.querySelector(".generate__range-number").oninput = function () { myFunction() };

// function myFunction() {
//     output1.value = output2.value;
//     output2.value = output1.value;
// }


const rangenumber = document.querySelector('.slider-settings-grid__input');
const rangeinput = document.querySelector('.slider-settings-grid__slider');

rangenumber.oninput = function () {
    let n = 10;
    n = rangenumber.value;
    rangeinput.value = n;
    //rangeinput.value = rangenumber.value;
}
// rangeinput.oninput = function () {
//     rangenumber.value = rangeinput.value;
// }

//---/Зависимость подзунка от числа---





//--- Генерация пароля ---

let len = 10;

const hidenInput = document.getElementById('sliderValueInput');
const numberInput = document.getElementById('input-1');

rangeSlider.noUiSlider.on('update', function (values, handle) {
    hidenInput.value = Math.round(values[handle]);
    len = hidenInput.value;
});


const button = document.querySelector('.slider-settings-grid__button');
const form = document.querySelector('.label-generator__input');

button.onclick = function () {
    const check1_Numbers = document.querySelector('.label-checkbox__check-1');
    const check2_CapitalLatin = document.querySelector('.label-checkbox__check-2');
    const check3_LowercaseLatin = document.querySelector('.label-checkbox__check-3');
    const check4_SpecSymbols = document.querySelector('.label-checkbox__check-4');
    const check5_AddSymbols = document.querySelector('.label-checkbox__check-5');

    var symb_check1_Numbers = "0123456789";
    var symb_check2_CapitalLatins = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var symb_check3_LowercaseLatin = "abcdefghijklmnopqrstuvwxyz";
    var symb_check4_SpecSymbols = "!@#$%-";
    var symb_check5_AddSymbols = "^&*()_+~\"№;%:?=[]{}\\|/,.'<>";

    var symbols = "";

    if (check1_Numbers.checked) {
        symbols += symb_check1_Numbers
    }
    if (check2_CapitalLatin.checked) {
        symbols += symb_check2_CapitalLatins
    }
    if (check3_LowercaseLatin.checked) {
        symbols += symb_check3_LowercaseLatin
    }
    if (check4_SpecSymbols.checked) {
        symbols += symb_check4_SpecSymbols
    }
    if (check5_AddSymbols.checked) {
        symbols += symb_check5_AddSymbols
    }


    var password = "";
    for (var i = 0; i < len; i++) {
        password += symbols.charAt(Math.floor(Math.random() * symbols.length));
    }
    form.value = password;
}

//--- /Генерация пароля ---





//--- Функционал (CTRL + C) ---

document.getElementById("copyButton").addEventListener("click", function () {
    copyToClipboard(document.getElementById("copyTarget"));
});

function copyToClipboard(elem) {
    // create hidden text element, if it doesn't already exist
    var targetId = "_hiddenCopyText_";
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    } else {
        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
        if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = elem.textContent;
    }
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);

    // copy the selection
    var succeed;
    try {
        succeed = document.execCommand("copy");
    } catch (e) {
        succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }

    if (isInput) {
        // restore prior selection
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        // clear temporary content
        target.textContent = "";
    }
    return succeed;
}



//Фокус на инпуте

const buttCopy = document.querySelector(".label-generator__btn");
const inputCopyFocus = document.querySelector(".label-generator__input");

buttCopy.onclick = function () {
    // inputCopyFocus.focus();
    // setCaretPos(inputCopyFocus, inputCopyFocus.value.length);
    inputCopyFocus.select();
}

//--- /Функционал (CTRL + C) ---





//---Анииация волны на кнопках---

var btnWave = document.getElementsByClassName("BtnWave"),
    forEach = Array.prototype.forEach;

forEach.call(btnWave, function (b) {
    b.addEventListener('click', addElement);
});

function addElement(e) {
    var addDiv = document.createElement("div"),
        mValue = Math.max(this.clientWidth, this.clientHeight),
        rect = this.getBoundingClientRect();
    sDiv = addDiv.style,
        px = 'px';

    sDiv.width = sDiv.height = mValue + px;
    sDiv.left = e.clientX - rect.left - (mValue / 2) + px;
    sDiv.top = e.clientY - rect.top - (mValue / 2) + px;

    addDiv.classList.add('pulse');
    this.appendChild(addDiv);
}

//---/Анииация волны на кнопках---




const generator = document.querySelector(".generator");


