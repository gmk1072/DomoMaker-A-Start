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
var AccountWindow = function AccountWindow(props) {
    return React.createElement(
        "div",
        { className: "h-100" },
        React.createElement(
            "div",
            { className: "container" },
            React.createElement(
                "div",
                { className: "card-deck mb-3 text-center" },
                React.createElement(
                    "div",
                    { className: "card mb-4 box-shadow" },
                    React.createElement(
                        "div",
                        { className: "card-header" },
                        React.createElement(
                            "h4",
                            { className: "my-0 font-weight-normal" },
                            "Username"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "card-body" },
                        React.createElement(
                            "h4",
                            { className: "my-0 font-weight-normal" },
                            props.username
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "card mb-4 box-shadow" },
                    React.createElement(
                        "div",
                        { className: "card-header" },
                        React.createElement(
                            "h4",
                            { className: "my-0 font-weight-normal" },
                            "Number of Bookmarks"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "card-body" },
                        React.createElement(
                            "h4",
                            { className: "my-0 font-weight-normal" },
                            props.numBookmarks
                        )
                    )
                )
            ),
            React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf })
        )
    );
    /*
        <form>
        <div className="form-group row">
        <label htmlFor="staticUsername" className="col-sm-2 col-form-label">
        <div className="h2">
        Username:
        </div>
        </label>
        <br />
        <label id="staticUsername" className="col-sm-2 col-form-label">
        <div className="h3">
        {props.username}
        </div>
        </label>
        </div>
          <div className="form-group row">
        <label htmlFor="staticNumBookmarks" className="col-sm-2 col-form-label">
        <div className="h2">
        Number of Bookmarks:
        </div>
        </label>
        <br />
        <label id="staticNumBookmarks" className="col-sm-2 col-form-label">
        <div className="h3">
        {props.numBookmarks}
        </div>
        </label>
        </div>
        </form>*/
};
var PasswordUpdateWindow = function PasswordUpdateWindow(props) {
    return React.createElement(
        "div",
        null,
        React.createElement("div", { className: "col-3" }),
        React.createElement(
            "div",
            { className: "col-4" },
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
                    "Submit"
                )
            ),
            React.createElement(
                "button",
                { id: "cancelButton", className: "btn btn-secondary offset-md-10 text-light col-2", onClick: createAccountWindow },
                "Cancel"
            )
        ),
        React.createElement("div", { className: "col" })
    );
};

var createPasswordWindow = function createPasswordWindow() {
    ReactDOM.render(React.createElement(PasswordUpdateWindow, { csrf: globCsrf }), document.querySelector("#accountContent"));
};

var createAccountWindow = function createAccountWindow() {
    sendAjax('GET', '/getAccountData', null, function (data) {
        ReactDOM.render(React.createElement(AccountWindow, { csrf: globCsrf.user, username: data.username, numBookmarks: data.numBookmarks }), document.querySelector("#accountContent"));
    });
};

var setup = function setup(csrf) {
    globCsrf = csrf;
    ReactDOM.render(React.createElement(SideBarList, null), document.querySelector("#accountSideBar"));
    createAccountWindow();
    /*
    const passwordButton = document.querySelector("#updatePasswordButton");
    passwordButton.addEventListener("click", (e) => {
        e.preventDefault();
        createPasswordWindow(csrf);
        return false;
    });
      ReactDOM.render(
        <BookmarkList bookmarks={[]} />, document.querySelector("#bookmarks")
    );
    ReactDOM.render(
        <UpdateModal bookmarks={[]} />, document.querySelector("#updateLocation")
    );
      loadBookmarksFromServer();*/
};
var SideBarList = function SideBarList(props) {
    return React.createElement(
        "ul",
        { className: "list-group h-100" },
        React.createElement(
            "li",
            { className: "bg-danger" },
            React.createElement("div", { className: "ml-sm-2 align-middle" })
        ),
        React.createElement(
            "li",
            { className: "bg-danger" },
            React.createElement(
                "a",
                { id: "pricingButton", href: "/pricing" },
                React.createElement(
                    "div",
                    { className: "btn btn-secondary text-light ml-sm-2 align-middle" },
                    "Upgrade"
                )
            )
        ),
        React.createElement(
            "li",
            { className: "bg-danger" },
            React.createElement("div", { className: "ml-sm-2 align-middle" })
        ),
        React.createElement(
            "li",
            { className: "bg-danger" },
            React.createElement(
                "button",
                { id: "updatePasswordButton", onClick: createPasswordWindow, className: "btn btn-secondary text-light ml-sm-2 align-middle" },
                "Update Password"
            )
        ),
        React.createElement(
            "li",
            { className: "bg-danger" },
            React.createElement("div", { className: "ml-sm-2 align-middle" })
        ),
        React.createElement(
            "li",
            { className: "bg-danger" },
            React.createElement(
                "a",
                { href: "/logout" },
                React.createElement(
                    "button",
                    { className: "btn btn-secondary text-light align-middle ml-sm-2 " },
                    "Log out"
                )
            )
        )
    );
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
