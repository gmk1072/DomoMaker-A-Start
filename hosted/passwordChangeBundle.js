"use strict";

var globCsrf = void 0;

var handlePassUpdate = function handlePassUpdate(e) {
    e.preventDefault();

    //$("#bookmarkMessage").animate({width:'hide'},350);

    /*    if($("#currPass").val() !== $("#newPass").val()) {
        handleError("Current password cannot ");
        return false;
    }*/
    if ($("#newPass").val() == '' || $("#newPass2").val() == '') {
        handleError("both fields are required");
        return false;
    }

    if ($("#newPass").val() !== $("#newPass2").val()) {
        handleError("passwords do not match");
        return false;
    }
    sendAjax('POST', $("#passUpdateForm").attr("action"), $("#passUpdateForm").serialize(), redirect);
    return false;
};

var PasswordUpdateWindow = function PasswordUpdateWindow(props) {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "form",
            { id: "passUpdateForm", name: "signupForm", onSubmit: handlePassUpdate, action: "/updatePassword", method: "POST", className: "mainForm" },
            React.createElement(
                "div",
                { className: "input-group" },
                React.createElement(
                    "div",
                    { className: "input-group-prepend" },
                    React.createElement(
                        "span",
                        { className: "input-group-text bg-secondary text-light", id: "newPassword-addon" },
                        "New Password:"
                    )
                ),
                React.createElement("input", { className: "form-control", id: "newPass", type: "password", name: "newPass", placeholder: "password", "aria-describedby": "password-addon" })
            ),
            React.createElement(
                "div",
                { className: "input-group" },
                React.createElement(
                    "div",
                    { className: "input-group-prepend" },
                    React.createElement(
                        "span",
                        { className: "input-group-text bg-secondary text-light", id: "newPassword2-addon" },
                        "Confrim Password:"
                    )
                ),
                React.createElement("input", { className: "form-control", id: "newPass2", type: "password", name: "newPass2", placeholder: "password", "aria-describedby": "password-addon" })
            ),
            React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
            React.createElement("br", null),
            React.createElement(
                "button",
                { className: "formSubmit btn btn-success offset-md-10 col-2", type: "submit", value: "Sign Up" },
                "Sign Up"
            )
        ),
        React.createElement(
            "a",
            { href: "/account" },
            React.createElement(
                "button",
                { className: "btn btn-secondary text-light offset-md-10 col-2" },
                "Cancel"
            )
        )
    );
};

var setup = function setup(csrf) {
    globCsrf = csrf;
    ReactDOM.render(React.createElement(PasswordUpdateWindow, { csrf: globCsrf }), document.querySelector("#passwordContent"));
    /*
      ReactDOM.render(
        <BookmarkList bookmarks={[]} />, document.querySelector("#bookmarks")
    );
    ReactDOM.render(
        <UpdateModal bookmarks={[]} />, document.querySelector("#updateLocation")
    );
      loadBookmarksFromServer();*/
};

var getToken = function getToken() {
    sendAjax('GET', '/getToken', null, function (result) {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});
"use strict";

var handleError = function handleError(message) {
    $("#errorMessage").text(message);
    //$("#bookmarkMessage").animate({width:'toggle'},350);
    $('#bookmarkMessage').modal("show");
};

var redirect = function redirect(response) {
    $("#bookmarkMessage").animate({ width: 'hide' }, 350);
    window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function error(xhr, status, _error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};
