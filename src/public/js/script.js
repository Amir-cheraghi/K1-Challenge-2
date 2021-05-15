
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
        // success : location.reload()        
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
            success : (res)=>{
                if(res.status === 'Validation Error'){
                    $('#login-alert').remove()
                    $('#login-msg').append('<div class="alert alert-danger w-75  mt-4 mb-4 " id = "login-alert"></div>')
                    $('#login-alert').append('<ul style="font-size: 10px;"></ul>')
                    $('#login-alert ul').append("<h6>Please Fix Below Error Then Login</h6>")
                    res.msg.forEach(el=>{
                        $('#login-alert ul').append(`<li>${el}</li>`)

                    })
                }
                
                
            }
        })
    }

    async function register() {
        let data = {
            email : $('#register-email').val(),
            fname : $('#register-fname').val(),
            lname : $('#register-lname').val(),
            phone : $('#register-phone').val(),
            password:$('#register-password').val() ,
            repassword : $('#register-repassword').val(),

        }
        $.ajax({
            type : 'POST' ,
            url : `http://${location.hostname}:3000/api/user/register`,
            async : true,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success : (res)=>{
                if(res.status === 'Validation Error'){
                    $('#register-alert').remove()
                    $('#register-msg').append('<div class="alert alert-danger w-75  mt-4 mb-4 " id = "register-alert"></div>')
                    $('#register-alert').append('<ul style="font-size: 10px;"></ul>')
                    $('#register-alert ul').append("<h6>Please Fix Below Error Then register</h6>")
                    res.msg.forEach(el=>{
                        $('#register-alert ul').append(`<li>${el}</li>`)

                    })
                }
            }
        })
    }




















