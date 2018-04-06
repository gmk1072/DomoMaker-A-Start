"use strict";

var handleLogin = function handleLogin(e) {
    e.preventDefault();
    $("#bookmarkMessage").animate({ width: 'hide' }, 350);
    if ($("#user").val() == '' || $("#pass").val() == '') {
        handleError("RAWR! username or password is empty");
        return false;
    }

    console.log($("input[name=_csrf]").val());

    sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);
    return false;
};

var handleSignup = function handleSignup(e) {
    e.preventDefault();

    $("#bookmarkMessage").animate({ width: 'hide' }, 350);

    if ($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
        handleError("RAWR! all fields are required");
        return false;
    }

    if ($("#pass").val() !== $("#pass2").val()) {
        handleError("RAWR passwords do not match");
        return false;
    }

    sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);
    return false;
};

var LoginWindow = function LoginWindow(props) {
    return React.createElement(
        "form",
        { id: "loginForm", name: "loginForm", onSubmit: handleLogin, action: "/login", method: "POST", className: "mainForm" },
        React.createElement(
            "div",
            { className: "input-group" },
            React.createElement(
                "div",
                { className: "input-group-prepend" },
                React.createElement(
                    "span",
                    { className: "input-group-text bg-secondary text-light", id: "username-addon" },
                    "Username:"
                )
            ),
            React.createElement("input", { className: "form-control", id: "user", type: "text", name: "username", placeholder: "password", "aria-describedby": "username-addon" })
        ),
        React.createElement(
            "div",
            { className: "input-group" },
            React.createElement(
                "div",
                { className: "input-group-prepend" },
                React.createElement(
                    "span",
                    { className: "input-group-text bg-secondary text-light", id: "password-addon" },
                    "Password:"
                )
            ),
            React.createElement("input", { className: "form-control", id: "pass", type: "password", name: "pass", placeholder: "password", "aria-describedby": "password-addon" })
        ),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("br", null),
        React.createElement(
            "button",
            { className: "formSubmit btn btn-success offset-md-10 col-2", type: "submit", value: "Sign in" },
            "Enter"
        )
    );
};
var SignupWindow = function SignupWindow(props) {
    return React.createElement(
        "form",
        { id: "signupForm", name: "signupForm", onSubmit: handleSignup, action: "/signup", method: "POST", className: "mainForm" },
        React.createElement(
            "div",
            { className: "input-group" },
            React.createElement(
                "div",
                { className: "input-group-prepend" },
                React.createElement(
                    "span",
                    { className: "input-group-text bg-secondary text-light", id: "username-addon" },
                    "Username:"
                )
            ),
            React.createElement("input", { className: "form-control", id: "user", type: "text", name: "username", placeholder: "password", "aria-describedby": "username-addon" })
        ),
        React.createElement(
            "div",
            { className: "input-group" },
            React.createElement(
                "div",
                { className: "input-group-prepend" },
                React.createElement(
                    "span",
                    { className: "input-group-text bg-secondary text-light", id: "password-addon" },
                    "Password:"
                )
            ),
            React.createElement("input", { className: "form-control", id: "pass", type: "password", name: "pass", placeholder: "password", "aria-describedby": "password-addon" })
        ),
        React.createElement(
            "div",
            { className: "input-group" },
            React.createElement(
                "div",
                { className: "input-group-prepend" },
                React.createElement(
                    "span",
                    { className: "input-group-text bg-secondary text-light", id: "password2-addon" },
                    "Password:"
                )
            ),
            React.createElement("input", { className: "form-control", id: "pass2", type: "password", name: "pass2", placeholder: "password", "aria-describedby": "password-addon" })
        ),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("br", null),
        React.createElement(
            "button",
            { className: "formSubmit btn btn-success offset-md-10 col-2", type: "submit", value: "Sign Up" },
            "Sign Up"
        )
    )

    /*<form id="signupForm" name="signupForm" onSubmit={handleSignup} action="/signup" method="POST" className="mainForm">
    <label htmlFor="username">Username: </label>
    <input id="user" type="text" name="username" placeholder="username" />
    <label htmlFor="pass">Password: </label>
    <input id="pass" type="password" name="pass" placeholder="password" />
    <label htmlFor="pass2">Password: </label>
    <input id="pass2" type="password" name="pass2" placeholder="retype password" />
    <input type="hidden" name="_csrf" value={props.csrf} />
    <input className="formSubmit" type="submit" value="Sign Up" />
    </form>*/
    ;
};

var createLoginWindow = function createLoginWindow(csrf) {
    ReactDOM.render(React.createElement(LoginWindow, { csrf: csrf }), document.querySelector("#content"));
};

var createSignupWindow = function createSignupWindow(csrf) {
    ReactDOM.render(React.createElement(SignupWindow, { csrf: csrf }), document.querySelector("#content"));
};

var setup = function setup(csrf) {
    var loginButton = document.querySelector("#loginButton");
    var signupButton = document.querySelector("#signupButton");
    signupButton.addEventListener("click", function (e) {
        e.preventDefault();
        createSignupWindow(csrf);
        return false;
    });
    console.log(csrf);
    loginButton.addEventListener("click", function (e) {
        e.preventDefault();
        createLoginWindow(csrf);
        return false;
    });
    createLoginWindow(csrf);
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
    $("#bookmarkMessage").animate({ width: 'toggle' }, 350);
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
