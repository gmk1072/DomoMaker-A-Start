
let globCsrf;
let updateTarget;
let listMode;
let darkmode;
const handleBookmark = (e) => {
    e.preventDefault();

    $("#bookmarkMessage").animate({width:'hide'}, 350);
    if($("#bookmarkName").val() == '' || $("#bookmarkURL").val() == '') {
        handleError("all fields are required");
        return false;
    }
    if(!($('#bookmarkURL').val().includes('https://'))){
        document.getElementById("bookmarkURL").value='https://' + document.getElementById("bookmarkURL").value;
    }

    sendAjax('POST', $("#bookmarkForm").attr("action"), $("#bookmarkForm").serialize(), function() {
        loadBookmarksFromServer();
    });
    clearBookmarkInputs();

    return false;
};
const grabTarget = (e) => {
    e.preventDefault();
    updateTarget = e.target.parentElement.id;
    document.querySelector("#updateName").value="";
    document.querySelector("#updateUrl").value="";
};
//        <label htmlFor="name" >Name: </label>
//<label htmlFor="level">Level: </label>
//<input id="bookmarkLevel" type="text" name="level" placeholder="Bookmark Level"/>
const BookmarkForm = (props) => {
    return (
        <form id="bookmarkForm"
        onSubmit={handleBookmark}
        name="bookmarkForm"
        action="/maker"
        method="POST"
        className="bookmarkForm form-inline justify-content-between w-100"
        >

        <div className="input-group">
        <div className="input-group">
        <div className="input-group-prepend">
        <span className="input-group-text bg-secondary text-light" id="bookmark-name-addon">Name</span>
        </div>
        <input className="form-control darkMode" id="bookmarkName" type="text" name="name" placeholder="Bookmark Name" aria-describedby="bookmark-name-addon"/>
        </div>

        <div className="input-group ml-sm-2">
        <div className="input-group-prepend">
        <span className="input-group-text bg-secondary text-light" id="bookmark-url-addon">URL</span>
        </div>
        <input className="form-control darkMode" id="bookmarkURL" type="text" name="url" placeholder="Bookmark URL" aria-describedby="bookmark-url-addon"/>
        </div>
        <input type="hidden" name="_csrf" value={props.csrf} />
        <button className="btn btn-success ml-sm-2" type="submit" value="Make Bookmark"><icon className="material-icons">add</icon></button>
        </div>

        <div className="btn-group mr-3" role="group" aria-label="View Mode" >
        <button type="button" className="btn btn-secondary" onClick={listListMode}><icon className="material-icons">view_list</icon></button>
        <button type="button" className="btn btn-secondary" onClick={moduleListMode}><icon className="material-icons">view_module</icon></button>
        </div>
        </form>

    );
};
const listListMode = (e) => {
    listMode = false;
    loadBookmarksFromServer();
};
const moduleListMode = (e) => {
    listMode = true;
    loadBookmarksFromServer();
};

const deleteBookmark = (e) => {
    e.preventDefault();
    //csrf
    if(e.target.parentElement.id == '')
    {
        sendAjax('DELETE', '/deleteBookmark', 'id=' + e.target.parentElement.parentElement.id + "&_csrf=" + globCsrf, function() {
            loadBookmarksFromServer();
        });
    }
    else{
        sendAjax('DELETE', '/deleteBookmark', 'id=' + e.target.parentElement.id + "&_csrf=" + globCsrf, function() {
            loadBookmarksFromServer();
        });

    }
    return false;
};
const updateBookmark = (e) => {
    e.preventDefault();
    const name = document.querySelector("#updateName").value;
    const url = document.querySelector("#updateUrl").value;
    sendAjax('POST', '/updateBookmark', 'id=' + updateTarget +"&name=" +name + "&url=" + url + "&_csrf=" + globCsrf, function() {
        loadBookmarksFromServer();
    });
    return false;
};

const UpdateModal = (props) => {

    return (
        <div className="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="updateModalModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
        <div className="modal-content darkMode">
        <div className="modal-header darkMode">
        <h5 className="modal-title" id="updateModalLabel">Update Bookmark</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div className="modal-body">
        <form id="updateForm" name="updateForm" action="/updateBookmark" method="POST" onSubmit={updateBookmark}>
        <div className="form-group">
        <label htmlFor="updateName" className="col-form-label">Name:</label>
        <input type="text" className="form-control" id="updateName" />
        </div>
        <div className="form-group">
        <label htmlFor="updateUrl" className="col-form-label">URL:</label>
        <input type="text" className="form-control" id="updateUrl" />
        </div>
        <button type="submit" value="updateSubmit" className="btn btn-primary">Confirm Update</button>
        </form>
        </div>
        </div>
        </div>
        </div>
    );
};

const Ads = (props) => {
    return (
        <img className="m-0 p-0" id="ad" src="/assets/img/Ad.gif" alt="ad"/>
    );
};

const BookmarkList = function(props) {
    if(props.bookmarks.length === 0) {
        return (
            <div className="bookmarkList list-group">
            <a href="#" className="emptyBookmark list-group-item list-group-item-action darkMode">No bookmarks yet</a>
            </div>
        );
    }

    //<img src="/assets/img/bookmarkface.jpeg" atl="bookmark face" className="bookmarkFace" />
    let bookmarkNodes;
    if(listMode == false)
        bookmarkNodes = props.bookmarks.map(function(bookmark) {
            return (
                <a href={bookmark.url} target="_blank" key={bookmark._id} className="bookmark container-fluid list-group-item list-group-item-action darkMode">
                <div className ="row" id={bookmark._id}>
                <h3 className="bookmarkName col-10"><img src={'http://www.google.com/s2/favicons?domain='+bookmark.url} /> {bookmark.name} </h3>
                <button type="button" data-toggle="modal" data-target="#updateModal" data-whatever="@mdo" className="bookmarkUpdate col-1 btn-sm btn-primary text-dark" onClick={grabTarget}><icon className="material-icons">edit</icon></button>

                <button className="bookmarkDelete col-1 btn-sm btn-primary text-dark" onClick={deleteBookmark} ><icon className="material-icons">delete</icon></button>
                </div>
                <div className="row">
                <div className="col-1"></div>
                <h3 className="bookmarkURL col-10">{bookmark.url} </h3>
                </div>
                </a>
            );
        });
    else{
        bookmarkNodes = props.bookmarks.map(function(bookmark) {
            return (
                <a href={bookmark.url} target="_blank" key={bookmark._id} className="bookmark rounded col-2 m-4 float-left list-group-item list-group-item-action darkMode">
                <div className="card rounded darkMode">
                <div className="card-header ">
                <h3 className="bookmarkName d-flex justify-content-between">
                <div className="cardhead">
                {bookmark.name}</div>
                <img className="icon" src={'http://www.google.com/s2/favicons?domain='+bookmark.url} />
                </h3>
                </div>
                <div className="card-body" id={bookmark._id}>
                <h3 className="bookmarkURL">{bookmark.url} </h3>
                <button type="button" data-toggle="modal" data-target="#updateModal" data-whatever="@mdo" className="bookmarkUpdate btn-sm btn-primary text-dark" onClick={grabTarget}><icon className="material-icons">edit</icon></button>

                <button className="bookmarkDelete btn-sm btn-primary text-dark" onClick={deleteBookmark} ><icon className="material-icons">delete</icon></button>
                </div>
                </div>
                </a>
            );
        });
    }

    return(
        <div className="bookmarkList">
        {bookmarkNodes}
        </div>
    );
};

const clearBookmarkInputs = () => {
    document.getElementById("bookmarkName").value='';
    document.getElementById("bookmarkURL").value='';
    document.getElementById("bookmarkName").focus();

};
const loadBookmarksFromServer = () => {
    sendAjax('GET', '/getBookmarks', null, (data) => {
        ReactDOM.render(
            <BookmarkList bookmarks={data.bookmarks} />, document.querySelector("#bookmarks")
        );
    });
};

const loadAds = () => {
    ReactDOM.render(
        <Ads />,
        document.querySelector("#ads")
    );
};

const setup = function(csrf) {
    globCsrf= csrf;
    ReactDOM.render(
        <BookmarkForm csrf={globCsrf} />, document.querySelector("#makeBookmark")
    );

    ReactDOM.render(
        <BookmarkList bookmarks={[]} />, document.querySelector("#bookmarks")
    );
    ReactDOM.render(
        <UpdateModal bookmarks={[]} />, document.querySelector("#updateLocation")
    );

    loadBookmarksFromServer();

    sendAjax('GET', '/getDarkMode', null, (data) => {
        if(data.darkMode){
            const sheet = document.getElementById("style");

            sheet.innerHTML = ".darkMode {background-color: #343a40!important; color: #fff!important;}";
        } else{
            const sheet = document.getElementById("style");

            sheet.innerHTML = ".darkMode {background-color: #fff!important; color: #343a40!important;}";
        }
    });

    const darkmodebutton = document.querySelector("#darkModeButton");
    darkmodebutton.addEventListener("click", (e) => {
        e.preventDefault();
        sendAjax('POST', '/toggleDarkMode', "_csrf=" + globCsrf, (data) => {
            window.location.reload();
        });
        return false;
    });
};


const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});
