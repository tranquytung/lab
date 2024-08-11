const form = '#form-1';
// các rule cần check
const rules = [
    isRequired("#fullname"),
    isRequired("#email"),
    isEmail("#email"),
    isPassWord("#password"),
    isConfirm("#password_confirmation")
];
const selectorRules = {};


const formElement = document.querySelector(form);
if (formElement) {
    // sự kiện onsubmit
    formElement.onsubmit = function (e){
        e.preventDefault();
        let isFormValid = true;
        rules.forEach(rule => {
            let inputElement = formElement.querySelector(rule.selector);
            let isValid = validator(inputElement, rule);
            if(!isValid){
                isFormValid = false
            }
        });

        // check khi ma form khong con lỗi
        if(isFormValid){
            const fullName = formElement.querySelector("#fullname").value;
            const email = formElement.querySelector("#email").value;
            const password = formElement.querySelector("#password").value;
            console.log(fullName, email, password);
        }
    }

    // lặp lại mỗi rule và xử lý (lắng nghe sự kiện blur, input, ...)
    rules.forEach(rule => {
        let inputElement = formElement.querySelector(rule.selector);

        // Lưu lại các rules cho mỗi input
        if(Array.isArray(selectorRules[rule.selector])){
            selectorRules[rule.selector].push(rule.test)
        }else {
            selectorRules[rule.selector] = [rule.test]
        }

        if (inputElement) {
            // xử lý trong trường hợp blur khỏi input
            inputElement.onblur = function (){
                validator(inputElement, rule);
            }

            // xử lý mỗi khi người dung nhập vào ô input
            inputElement.oninput = function (){
                let errorElement = inputElement.parentElement.querySelector('.form-message');
                errorElement.innerText = "";
                inputElement.parentElement.classList.remove('invalid');
            }
        }
    })
}

// hàm check và show lỗi
function validator(inputElement, rule) {
    //let errorMessage = rule.test(inputElement.value);

    let errorMessage;
    let errorElement = inputElement.parentElement.querySelector('.form-message');

    // Lấy ra các rules của selector
    const rules = selectorRules[rule.selector];
    for (let i = 0; i < rules.length; i++) {
        errorMessage = rules[i](inputElement.value);
        if(errorMessage) break;
    }

    if(errorMessage){
        errorElement.innerText = errorMessage;
        inputElement.parentElement.classList.add('invalid')
    }else {
        errorElement.innerText = "";
        inputElement.parentElement.classList.remove('invalid')
    }

    return !errorMessage;
}


// kiêm tran trường không được trống
function isRequired (selector){
    return{
        selector,
        test: function (value) {
            return value.trim() ? undefined : 'Vui lòng nhập trường này!'
        }
    }

}

// kiểu tra có phải email hay không
function isEmail(selector){
    return{
        selector,
        test: function (value) {
            const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            return regex.test(value) ? undefined : "Trường này phải là email!"
        }
    }
}

// xác định mật khẩu có chính xác hay không
function isConfirm(selector){
    return{
        selector,
        test: function (value) {
            const passwordOld = document.querySelector('#password').value;
            return passwordOld === value ? undefined : "Mật khẩu không chính xác!"
        }
    }
}

function isPassWord(selector){
    return{
        selector,
        test: function (value) {
            const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
            return regex.test(value) ? undefined : "Mật khâủ tối thiểu 8 ký tự, phải chứa ít nhất một chữ cái in hoa, một chữ cái thường, và một chữ số!"
        }
    }
}

