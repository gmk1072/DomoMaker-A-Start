const handleError = (message) => {
    $("#errorMessage").text(message);
    //$("#bookmarkMessage").animate({width:'toggle'},350);
    $('#bookmarkMessage').modal("show");
};

const redirect = (response) => {
    //$("#bookmarkMessage").animate({width:'hide'},350);
    window.location = response.redirect;
};

const sendAjax = (type, action, data, success) => {
    $.ajax({
        cache:false,
        type:type,
        url:action,
        data:data,
        dataType:"json",
        success:success,
        error:function(xhr, status, error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};
