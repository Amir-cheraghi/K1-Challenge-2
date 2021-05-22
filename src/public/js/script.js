
async function deleteTask(e){
const id = e.attributes["data-url"].nodeValue

$.ajax({
    url : `http://${location.hostname}:3000/api/tasks/${id}`,
    type : 'DELETE',
    async : true,
    success : location.reload()

})

    
}



async function editTask(e){
const id = e.attributes["data-url"].nodeValue
const data = {
    name : $(`#name-${id}`).val(),
    description : $(`#description-${id}`).val(),
    type : $(`#type-${id}`).val(),
}

$.ajax({
    type: "PUT",
    url:`http://${location.hostname}:3000/api/tasks/${id}` ,
    async : true,
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success : location.reload()

    
 });
}



async function createTask(type){

    const data = {
        name : $(`#${type}-name`).val(),
        description : $(`#${type}-description`).val(),
        type : $(`#${type}-type`).val(),
    }

    $.ajax({
        type: "POST",
        url:`http://${location.hostname}:3000/api/tasks` ,
        async : true,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
         success : location.reload()        
     });
    }


    async function login() {
        let data = {
            email : $('#login-email').val(),
            password:$('#login-password').val() ,
        }
        $.ajax({
            type : 'POST' ,
            url : `http://${location.hostname}:3000/api/user/login`,
            async : true,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            beforeSend: ()=>{
                $('#loginButton').html(`
                <span class="spinner-border" role="status" aria-hidden="true"></span>
                `).prop("disabled",true);
             },
             complete: ()=>{
                 $('#loginButton').html('Login').prop("disabled",false);
             },
            success : (res)=>{
                if(res.status === 'Validation Error' || res.status[0] === 'Validation Error'){
                    $('#login-alert').remove()
                    $('#login-msg').append('<div class="alert alert-danger w-75  mt-4 mb-4 " id = "login-alert"></div>')
                    $('#login-alert').append('<ul style="font-size: 10px;"></ul>')
                    $('#login-alert ul').append("<h6>Please Fix Below Error Then Login</h6>")
                    res.msg.forEach(el=>{
                        $('#login-alert ul').append(`<li>${el}</li>`)

                    })
                    window.scrollTo(0,0)

                }
                else if (res.status === "success" || res.status[0] === 'success') {
                    $('#login-alert').remove()
                    $('#login-msg').append('<div class="alert alert-success text-center w-75  mt-4 mb-4 " id = "login-alert"></div>')
                    $('#login-alert').append("<h6>Welcome To The Task Mnger Please Wait To Redirect To App</h6>")
                    window.scrollTo(0,0)
                 setTimeout(()=>{window.location.replace('/')},2000)
                }

                
                
            }
        })
    }

    async function register() {
        let data = {
            email : $('#register-email').val(),
            fName : $('#register-fname').val(),
            lName : $('#register-lname').val(),
            phoneNumber : $('#register-phone').val(),
            password:$('#register-password').val() ,
            repassword : $('#register-repassword').val(),

        }
        $.ajax({
            type : 'POST' ,
            url : `http://${location.hostname}:3000/api/user/register`,
            async : true,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            beforeSend: ()=>{
                $('#registerButton').html(`
                <span class="spinner-border" role="status" aria-hidden="true"></span>
                `).prop("disabled",true);
             },
             complete: ()=>{
                 $('#registerButton').html('Register').prop("disabled",false);
             },
            success : (res)=>{
                if(res.status === 'Validation Error' || res.status[0] === 'Validation Error'){
                    $('#register-alert').remove()
                    $('#register-msg').append('<div class="alert alert-danger w-75  mt-4 mb-4 " id = "register-alert"></div>')
                    $('#register-alert').append('<ul style="font-size: 10px;"></ul>')
                    $('#register-alert ul').append("<h6>Please Fix Below Error Then register</h6>")
                    res.msg.forEach(el=>{
                        $('#register-alert ul').append(`<li>${el}</li>`)

                    })
                    window.scrollTo(0,0)

                }
                else if (res.status === "success" || res.status[0] === 'success') {
                    $('#register-alert').remove()
                    $('#register-msg').append('<div class="alert alert-success text-center w-75  mt-4 mb-4 " id = "register-alert"></div>')
                    $('#register-alert').append("<h6>Successfully Registred Welcome To Task Manager</h6>")
                    window.scrollTo(0,0)
                 setTimeout(()=>{window.location.replace('/')},2000)
                }
            }
        })
    }


    async function logout(){
        $.ajax({
            type : 'get' ,
            url : `http://${location.hostname}:3000/api/user/logout`,
            async : true,
            success :(res)=>{
                if(res.status==='success'  || res.status[0] === 'success')
                {
                    window.location.replace('/login')
                }
            }
        })
    }


    async function forgetPassword(){
        let data = {
            email : $('#resetPasswormEmail').val()
        }
        $.ajax({
            url : `http://${location.hostname}:3000/api/user/resetpassword`,
            type : 'POST',
            async : true , 
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            beforeSend: ()=>{
                $('#resetPasswordButton').html(`
                <span class="spinner-border" role="status" aria-hidden="true"></span>
                `).prop("disabled",true);
             },
             complete: ()=>{
                 $('#resetPasswordButton').html('Send Link').prop("disabled",false);
             },
            success : (res)=>{
                if(res.status === "validation error" || res.status[0] ==="validation error"){
                    $('#resetPass-alert').remove()
                    $('#resetPassMsg').append('<div class="alert alert-danger text-center   mt-4 mb-4 " id = "resetPass-alert"></div>')
                    $('#resetPass-alert').append(`${res.msg[0]}`)
                }
                if(res.status === 'error' || res.status[0] === 'error'){
                    $('#resetPass-alert').remove()
                    $('#resetPassMsg').append('<div class="alert alert-danger text-center  mt-4 mb-4 " id = "resetPass-alert"></div>')
                    $('#resetPass-alert').append(`${res.msg}`)
                }
                if(res.status === 'success' || res.status[0] === 'success'){
                    $('#resetPass-alert').remove()
                    $('#resetPassMsg').append('<div class="alert alert-success text-center  mt-4 mb-4 " id = "resetPass-alert"></div>')
                    $('#resetPass-alert').append(`${res.msg}`)
                }
            }

        })
    }

    async function resetPasswordProcess(){
        const data = {
            password : $("#resetPassword-password").val(),
            repassword : $("#resetPassword-repassword").val()
        }
        $.ajax({
            url : `http://${location.hostname}:3000/api/user/resetpassword/${window.location.pathname.split('/').slice(-1)}`,
            type : 'POST',
            async : true , 
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            beforeSend: ()=>{
                $('#resetPasswordButton').html(`
                <span class="spinner-border" role="status" aria-hidden="true"></span>
                `).prop("disabled",true);
             },
             complete: ()=>{
                 $('#resetPasswordButton').html('Reset Password');
             },
            success : (res)=>{
                if(res.status === "validation error" || res.status[0] ==="validation error"){
                    $('#resetPass-alert').remove()
                    $('#resetPasswordMsg').append('<div class="alert alert-danger text-center   mt-4 mb-4 " id = "resetPass-alert"></div>')
                    $('#resetPass-alert').append('<ul style="font-size: 10px;"></ul>')
                    res.msg.forEach(el=>{
                        $('#resetPass-alert ul').append(`<li>${el}</li>`)

                    })
                    $('#resetPasswordButton').prop("disabled",false)
                    window.scrollTo(0,0)                    
                }
                if(res.status === 'error' || res.status[0] === 'error'){
                    $('#resetPass-alert').remove()
                    $('#resetPasswordMsg').append('<div class="alert alert-danger text-center  mt-4 mb-4 " id = "resetPass-alert"></div>')
                    $('#resetPass-alert').append(`${res.msg}`)
                    $('#resetPasswordButton').prop("disabled",false)

                    window.scrollTo(0,0)                    

                }
                if(res.status === 'success' || res.status[0] === 'success'){
                    $('#resetPass-alert').remove()
                    $('#resetPasswordMsg').append('<div class="alert alert-success text-center  mt-4 mb-4 " id = "resetPass-alert"></div>')
                    $('#resetPass-alert').append(`Password SuccesFully Changed .`)
                    setTimeout(()=>{window.location.replace('/login')},2000)
                }
            }
        })
    }




















