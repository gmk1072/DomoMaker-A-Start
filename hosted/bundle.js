"use strict";

var globCsrf = void 0;
var updateTarget = void 0;
var listMode = void 0;
var darkmode = void 0;
var handleBookmark = function handleBookmark(e) {
    e.preventDefault();

    $("#bookmarkMessage").animate({ width: 'hide' }, 350);
    if ($("#bookmarkName").val() == '' || $("#bookmarkURL").val() == '') {
        handleError("all fields are required");
        return false;
    }
    if (!$('#bookmarkURL').val().includes('https://')) {
        document.getElementById("bookmarkURL").value = 'https://' + document.getElementById("bookmarkURL").value;
    }

    sendAjax('POST', $("#bookmarkForm").attr("action"), $("#bookmarkForm").serialize(), function () {
        loadBookmarksFromServer();
    });
    clearBookmarkInputs();

    return false;
};
var grabTarget = function grabTarget(e) {
    e.preventDefault();
    updateTarget = e.target.parentElement.id;
    document.querySelector("#updateName").value = "";
    document.querySelector("#updateUrl").value = "";
};
//        <label htmlFor="name" >Name: </label>
//<label htmlFor="level">Level: </label>
//<input id="bookmarkLevel" type="text" name="level" placeholder="Bookmark Level"/>
var BookmarkForm = function BookmarkForm(props) {
    return React.createElement(
        "form",
        { id: "bookmarkForm",
            onSubmit: handleBookmark,
            name: "bookmarkForm",
            action: "/maker",
            method: "POST",
            className: "bookmarkForm form-inline justify-content-between w-100"
        },
        React.createElement(
            "div",
            { className: "input-group" },
            React.createElement(
                "div",
                { className: "input-group" },
                React.createElement(
                    "div",
                    { className: "input-group-prepend" },
                    React.createElement(
                        "span",
                        { className: "input-group-text bg-secondary text-light", id: "bookmark-name-addon" },
                        "Name"
                    )
                ),
                React.createElement("input", { className: "form-control", id: "bookmarkName", type: "text", name: "name", placeholder: "Bookmark Name", "aria-describedby": "bookmark-name-addon" })
            ),
            React.createElement(
                "div",
                { className: "input-group ml-sm-2" },
                React.createElement(
                    "div",
                    { className: "input-group-prepend" },
                    React.createElement(
                        "span",
                        { className: "input-group-text bg-secondary text-light", id: "bookmark-url-addon" },
                        "URL"
                    )
                ),
                React.createElement("input", { className: "form-control", id: "bookmarkURL", type: "text", name: "url", placeholder: "Bookmark URL", "aria-describedby": "bookmark-url-addon" })
            ),
            React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
            React.createElement(
                "button",
                { className: "btn btn-success ml-sm-2", type: "submit", value: "Make Bookmark" },
                React.createElement(
                    "icon",
                    { className: "material-icons" },
                    "add"
                )
            )
        ),
        React.createElement(
            "div",
            { className: "btn-group mr-3", role: "group", "aria-label": "View Mode" },
            React.createElement(
                "button",
                { type: "button", className: "btn btn-secondary", onClick: listListMode },
                React.createElement(
                    "icon",
                    { className: "material-icons" },
                    "view_list"
                )
            ),
            React.createElement(
                "button",
                { type: "button", className: "btn btn-secondary", onClick: moduleListMode },
                React.createElement(
                    "icon",
                    { className: "material-icons" },
                    "view_module"
                )
            )
        )
    );
};
var listListMode = function listListMode(e) {
    listMode = false;
    loadBookmarksFromServer();
};
var moduleListMode = function moduleListMode(e) {
    listMode = true;
    loadBookmarksFromServer();
};

var deleteBookmark = function deleteBookmark(e) {
    e.preventDefault();
    //csrf
    if (e.target.parentElement.id == '') {
        sendAjax('DELETE', '/deleteBookmark', 'id=' + e.target.parentElement.parentElement.id + "&_csrf=" + globCsrf, function () {
            loadBookmarksFromServer();
        });
    } else {
        sendAjax('DELETE', '/deleteBookmark', 'id=' + e.target.parentElement.id + "&_csrf=" + globCsrf, function () {
            loadBookmarksFromServer();
        });
    }
    return false;
};
var updateBookmark = function updateBookmark(e) {
    e.preventDefault();
    var name = document.querySelector("#updateName").value;
    var url = document.querySelector("#updateUrl").value;
    sendAjax('POST', '/updateBookmark', 'id=' + updateTarget + "&name=" + name + "&url=" + url + "&_csrf=" + globCsrf, function () {
        loadBookmarksFromServer();
    });
    return false;
};

var UpdateModal = function UpdateModal(props) {

    return React.createElement(
        "div",
        { className: "modal fade", id: "updateModal", tabindex: "-1", role: "dialog", "aria-labelledby": "updateModalModalLabel", "aria-hidden": "true" },
        React.createElement(
            "div",
            { className: "modal-dialog", role: "document" },
            React.createElement(
                "div",
                { className: "modal-content" },
                React.createElement(
                    "div",
                    { className: "modal-header" },
                    React.createElement(
                        "h5",
                        { className: "modal-title", id: "updateModalLabel" },
                        "Update Bookmark"
                    ),
                    React.createElement(
                        "button",
                        { type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close" },
                        React.createElement(
                            "span",
                            { "aria-hidden": "true" },
                            "\xD7"
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "modal-body" },
                    React.createElement(
                        "form",
                        { id: "updateForm", name: "updateForm", action: "/updateBookmark", method: "POST", onSubmit: updateBookmark },
                        React.createElement(
                            "div",
                            { className: "form-group" },
                            React.createElement(
                                "label",
                                { htmlFor: "updateName", className: "col-form-label" },
                                "Name:"
                            ),
                            React.createElement("input", { type: "text", className: "form-control", id: "updateName" })
                        ),
                        React.createElement(
                            "div",
                            { className: "form-group" },
                            React.createElement(
                                "label",
                                { htmlFor: "updateUrl", className: "col-form-label" },
                                "URL:"
                            ),
                            React.createElement("input", { type: "text", className: "form-control", id: "updateUrl" })
                        ),
                        React.createElement(
                            "button",
                            { type: "submit", value: "updateSubmit", className: "btn btn-primary" },
                            "Confirm Update"
                        )
                    )
                )
            )
        )
    );
};

var Ads = function Ads(props) {
    return React.createElement("img", { className: "m-0 p-0", id: "ad", src: "/assets/img/Ad.gif", alt: "ad" });
};

var BookmarkList = function BookmarkList(props) {
    if (props.bookmarks.length === 0) {
        return React.createElement(
            "div",
            { className: "bookmarkList list-group" },
            React.createElement(
                "a",
                { href: "#", className: "emptyBookmark list-group-item list-group-item-action" },
                "No bookmarks yet"
            )
        );
    }

    //<img src="/assets/img/bookmarkface.jpeg" atl="bookmark face" className="bookmarkFace" />
    var bookmarkNodes = void 0;
    if (listMode == false) bookmarkNodes = props.bookmarks.map(function (bookmark) {
        return React.createElement(
            "a",
            { href: bookmark.url, target: "_blank", key: bookmark._id, className: "bookmark container-fluid list-group-item list-group-item-action" },
            React.createElement(
                "div",
                { className: "row", id: bookmark._id },
                React.createElement(
                    "h3",
                    { className: "bookmarkName col-10" },
                    React.createElement("img", { src: 'http://www.google.com/s2/favicons?domain=' + bookmark.url }),
                    " ",
                    bookmark.name,
                    " "
                ),
                React.createElement(
                    "button",
                    { type: "button", "data-toggle": "modal", "data-target": "#updateModal", "data-whatever": "@mdo", className: "bookmarkUpdate col-1 btn-sm btn-primary text-dark", onClick: grabTarget },
                    React.createElement(
                        "icon",
                        { className: "material-icons" },
                        "edit"
                    )
                ),
                React.createElement(
                    "button",
                    { className: "bookmarkDelete col-1 btn-sm btn-primary text-dark", onClick: deleteBookmark },
                    React.createElement(
                        "icon",
                        { className: "material-icons" },
                        "delete"
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "row" },
                React.createElement("div", { className: "col-1" }),
                React.createElement(
                    "h3",
                    { className: "bookmarkURL col-10" },
                    bookmark.url,
                    " "
                )
            )
        );
    });else {
        bookmarkNodes = props.bookmarks.map(function (bookmark) {
            return React.createElement(
                "a",
                { href: bookmark.url, target: "_blank", key: bookmark._id, className: "bookmark rounded col-2 m-4 float-left list-group-item list-group-item-action" },
                React.createElement(
                    "div",
                    { className: "card rounded" },
                    React.createElement(
                        "div",
                        { className: "card-header " },
                        React.createElement(
                            "h3",
                            { className: "bookmarkName d-flex justify-content-between" },
                            React.createElement(
                                "div",
                                { className: "cardhead" },
                                bookmark.name
                            ),
                            React.createElement("img", { className: "icon", src: 'http://www.google.com/s2/favicons?domain=' + bookmark.url })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "card-body", id: bookmark._id },
                        React.createElement(
                            "h3",
                            { className: "bookmarkURL" },
                            bookmark.url,
                            " "
                        ),
                        React.createElement(
                            "button",
                            { type: "button", "data-toggle": "modal", "data-target": "#updateModal", "data-whatever": "@mdo", className: "bookmarkUpdate btn-sm btn-primary text-dark", onClick: grabTarget },
                            React.createElement(
                                "icon",
                                { className: "material-icons" },
                                "edit"
                            )
                        ),
                        React.createElement(
                            "button",
                            { className: "bookmarkDelete btn-sm btn-primary text-dark", onClick: deleteBookmark },
                            React.createElement(
                                "icon",
                                { className: "material-icons" },
                                "delete"
                            )
                        )
                    )
                )
            );
        });
    }

    return React.createElement(
        "div",
        { className: "bookmarkList" },
        bookmarkNodes
    );
};

var clearBookmarkInputs = function clearBookmarkInputs() {
    document.getElementById("bookmarkName").value = '';
    document.getElementById("bookmarkURL").value = 'https://';
    document.getElementById("bookmarkName").focus();
};
var loadBookmarksFromServer = function loadBookmarksFromServer() {
    sendAjax('GET', '/getBookmarks', null, function (data) {
        ReactDOM.render(React.createElement(BookmarkList, { bookmarks: data.bookmarks }), document.querySelector("#bookmarks"));
    });
};

var loadAds = function loadAds() {
    ReactDOM.render(React.createElement(Ads, null), document.querySelector("#ads"));
};

var setup = function setup(csrf) {
    globCsrf = csrf;
    ReactDOM.render(React.createElement(BookmarkForm, { csrf: globCsrf }), document.querySelector("#makeBookmark"));

    ReactDOM.render(React.createElement(BookmarkList, { bookmarks: [] }), document.querySelector("#bookmarks"));
    ReactDOM.render(React.createElement(UpdateModal, { bookmarks: [] }), document.querySelector("#updateLocation"));

    loadBookmarksFromServer();
    loadAds();
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
