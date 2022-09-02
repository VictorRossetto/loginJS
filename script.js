let validador = {
    handleSubmit:(event)=>{
        event.preventDefault()
        let send = true

        let inputs = form.querySelectorAll('input')

        validador.linpaErro()

        for(let i=0;i<inputs.length;i++){
            let input =inputs[i]
            let check =validador.checkInput(input)
            if(check !== true){
                send = false
                validador.showError(input,check)

            }
        }

        if(send){
            form.submit()
        }
    },
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules')
        if(rules !== null){
            rules = rules.split('|');
            for(let k in rules){
                let rDetails = rules[k].split('=')

                switch(rDetails[0]){
                    case 'required':
                        if(input.value == ''){
                            return 'Campo não pode ser vazio.'
                        }
                    break;
                    case 'min':
                        if(input.value.length < rDetails[1]){
                            return'campos tem qer ter pelo menos '+rDetails[1]+' caracters';
                        }
                    break;
                    case 'email':
                        if(input.value != ''){
                            let regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
                            if(regex.test(input.value.tolowerCase())){
                                return 'Campo de e-mail invalido!'
                            }
                        };

                    break;

                    
                }
            }
        }
        return true
    },
    showError:(input, error)=> {
        input.style.borderColor = '#0481f5'

        let errorElement = document.createElement('div')
        errorElement.classList.add('error')
        errorElement.innerHTML = error

        input.parentElement.insertBefore(errorElement, input.ElementSibling)
    },
    linpaErro:()=>{
        let inputs = form.querySelectorAll('input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].style = ''
            
        }

        let errorElements = document.querySelectorAll('.error')
        for (let i = 0; i < errorElements.length; i++) {
            errorElements[i].remove();
            
        }
    }
}

let form = document.querySelector('.validador')
form.addEventListener('submit', validador.handleSubmit)