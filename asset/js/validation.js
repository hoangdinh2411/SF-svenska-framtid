function Validator(options){
    var selectorRule={};
    var parentElement;
    var errorElement;
    var errorMessage;
    
    const formElement = document.querySelector(options.form)

    function getParentElement(element, selector){
        while(element.parentElement){
            if(element.parentElement.matches(selector)){
                return element.parentElement;
            }

            element = element.parentElement;
        }

    }
    function validate(inputElement,rule){
        var rules =  selectorRule[rule.selector]
        // lap qua tung rules va kiem tra , neu co loi thi dung viec kiem tra

        for (let i = 0; i < rules.length; i++) {
            switch(inputElement.type){
                case 'radio':
                case 'checkbox':
                    errorMessage= rules[i](
                        formElement.querySelector(rule.selector +':checked')
                    );
                    break;
                    break;
                default:
                    errorMessage= rules[i](inputElement.value);
            }
            if(errorMessage) break;
            
        }


        parentElement = getParentElement(inputElement,options.formGroupSelector)
        errorElement= parentElement.querySelector(options.errorSelector)

        if(errorMessage){
            showErrorMessage(errorMessage,errorElement,parentElement)
        }else{
            removeErrorMessage(errorMessage,errorElement,parentElement)
        }
        return !errorMessage
    }

    function showErrorMessage(errorMessage,errorElement,parentElement){
            errorElement.innerText = errorMessage
            parentElement.classList.remove('done')
            parentElement.classList.add('invalid')
        
    }
    function removeErrorMessage(errorElement,parentElement){
            errorElement.innerText ='';
            parentElement.classList.add('done')
            parentElement.classList.remove('invalid')
    }
        
    
    if(formElement){
         formElement.onsubmit = (e)=>{
              //Loi bo hanh vi mac dinh
             e.preventDefault();
             var isFormValid = true;
             options.rules.forEach(rule =>{
                var inputElement= formElement.querySelector(rule.selector)
                var isValid = validate(inputElement,rule)
                if(!isValid ){
                    isFormValid = false;
                }
                
            });
            
            if(isFormValid){
                if(typeof options.onSubmit === 'function'){
                    var enableInputs = formElement.querySelectorAll('[name]')
                    var formValues = Array.from(enableInputs).reduce(function(values,input){
                        switch(input.type){
                            case 'radio':
                            case 'checkbox':
                                 values[input.name] = formElement.querySelector('input[name="]'+input.name+'"]:checked').value
                                break;

                            default:
                                values[input.name] = input.value
                        }
                         return values;
                    },{})
                    options.onSubmit(formValues)
                }else{
                    formElement.submit();

                }
            }
            
         }
        options.rules.forEach(rule =>{
            if(Array.isArray(selectorRule[rule.selector])){
                selectorRule[rule.selector].push(rule.test)
            }else{
                selectorRule[rule.selector] = [rule.test]
                
            }
            
            var inputElements = formElement.querySelectorAll(rule.selector)
            Array.from(inputElements).forEach(inputElement =>{
                if(inputElement){
                    inputElement.onblur = ()=>{
                        validate(inputElement,rule)
                    }
    
                    inputElement.oninput = ()=>{
                        removeErrorMessage(errorElement,parentElement)
                    }


                }
            })
            
        })
    }
}

Validator.isRequied = (selector,message)=>{
    return {
        selector: selector,
        test : (value)=>{
            return value ? undefined : message
        }
    }
}
Validator.isEmail = (selector,message)=>{
    return {
        selector: selector,
        test : (value)=>{
            var reg = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
           return reg.test(value) ? undefined : message

        }
    }
}

Validator.minLength = (selector,min,message)=>{
    return {
        selector: selector,
        test : (value)=>{
            return value.length >= min ? undefined : message
        }
    }
}
Validator.isConfirm = (selector,getConfirmValue,message)=>{
    return {
        selector: selector,
        test : (value)=>{
            return value === getConfirmValue() ?  undefined : message
        }
    }

}

Validator.isCheckedPolicy = () =>{

}