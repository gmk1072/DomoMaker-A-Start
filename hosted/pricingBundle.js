"use strict";

var globCsrf = void 0;

var setup = function setup(csrf) {
    globCsrf = csrf;
    ReactDOM.render(React.createElement(PricingWindow, { csrf: globCsrf }), document.querySelector("#pricingContent"));
    /*
      ReactDOM.render(
        <BookmarkList bookmarks={[]} />, document.querySelector("#bookmarks")
    );
    ReactDOM.render(
        <UpdateModal bookmarks={[]} />, document.querySelector("#updateLocation")
    );
      loadBookmarksFromServer();*/
};

var PricingWindow = function PricingWindow(props) {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "div",
            { className: "pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center" },
            React.createElement(
                "h1",
                { className: "h1" },
                "Pricing"
            )
        ),
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
                            "Free"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "card-body" },
                        React.createElement(
                            "h1",
                            { className: "card-title pricing-card-title" },
                            "$0 ",
                            React.createElement(
                                "small",
                                { className: "text-muted" },
                                "/ mo"
                            )
                        ),
                        React.createElement(
                            "ul",
                            { className: "list-unstyled mt-3 mb-4" },
                            React.createElement(
                                "li",
                                { className: "h5" },
                                "Unlimited* bookmark storage"
                            ),
                            React.createElement(
                                "li",
                                { className: "h5" },
                                "Ads on page"
                            ),
                            React.createElement(
                                "li",
                                { className: "h5" },
                                "Email support"
                            ),
                            React.createElement(
                                "li",
                                { className: "h5" },
                                "Help center access"
                            )
                        ),
                        React.createElement(
                            "button",
                            { type: "button", className: "btn btn-lg btn-block btn-outline-primary" },
                            "Sign up for free"
                        ),
                        React.createElement("br", null),
                        React.createElement(
                            "p",
                            { className: "h6" },
                            "*Not unlimited"
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
                            "Pro"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "card-body" },
                        React.createElement(
                            "h1",
                            { className: "card-title pricing-card-title" },
                            "$5 ",
                            React.createElement(
                                "small",
                                { className: "text-muted" },
                                "/ mo"
                            )
                        ),
                        React.createElement(
                            "ul",
                            { className: "list-unstyled mt-3 mb-4" },
                            React.createElement(
                                "li",
                                { className: "h5" },
                                "Free perks included"
                            ),
                            React.createElement(
                                "li",
                                { className: "h5" },
                                "No Ads"
                            ),
                            React.createElement(
                                "li",
                                { className: "h5" },
                                "Priority email support"
                            ),
                            React.createElement(
                                "li",
                                { className: "h5" },
                                "Customizability"
                            )
                        ),
                        React.createElement(
                            "button",
                            { type: "button", className: "btn btn-lg btn-block btn-success" },
                            "Get started"
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
                            "Godmode"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "card-body" },
                        React.createElement(
                            "h1",
                            { className: "card-title pricing-card-title" },
                            "$2900 ",
                            React.createElement(
                                "small",
                                { className: "text-muted" },
                                "/ hr"
                            )
                        ),
                        React.createElement(
                            "ul",
                            { className: "list-unstyled mt-3 mb-4" },
                            React.createElement(
                                "li",
                                { className: "h5" },
                                "Pro Perks Included"
                            ),
                            React.createElement(
                                "li",
                                { className: "h5" },
                                "Access to the Make Facebook Button"
                            ),
                            React.createElement(
                                "li",
                                { className: "h5" },
                                "Quantum Network Access"
                            ),
                            React.createElement(
                                "li",
                                { className: "h5" },
                                "Can Use Our Help Center Teleporter for In-Person Help"
                            )
                        ),
                        React.createElement(
                            "button",
                            { type: "button", className: "btn btn-lg btn-block btn-success" },
                            "Contact us"
                        )
                    )
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
    //$("#bookmarkMessage").animate({width:'hide'},350);
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
