
let globCsrf;
let updateTarget;
const handleBookmark = (e) => {
    e.preventDefault();

    $("#bookmarkMessage").animate({width:'hide'}, 350);
    if($("#bookmarkName").val() == '' || $("#bookmarkURL").val() == '') {
        handleError("all fields are required");
        return false;
    }

    sendAjax('POST', $("#bookmarkForm").attr("action"), $("#bookmarkForm").serialize(), function() {
        loadBookmarksFromServer();
    });
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
        className="bookmarkForm form-inline"
        >
        <div className="input-group">
        <div className="input-group-prepend">
        <span className="input-group-text bg-secondary text-light" id="bookmark-name-addon">Name</span>
        </div>
        <input className="form-control" id="bookmarkName" type="text" name="name" placeholder="Bookmark Name" aria-describedby="bookmark-name-addon"/>
        </div>

        <div className="input-group ml-sm-2">
        <div className="input-group-prepend">
        <span className="input-group-text bg-secondary text-light" id="bookmark-url-addon">URL</span>
        </div>
        <input className="form-control" id="bookmarkURL" type="text" name="url" placeholder="Bookmark URL" aria-describedby="bookmark-url-addon"/>
        </div>
        <input type="hidden" name="_csrf" value={props.csrf} />
        <button className="btn btn-success ml-sm-2" type="submit" value="Make Bookmark"><icon className="material-icons">add</icon></button>
        </form>
    );
};

const deleteBookmark = (e) => {
    e.preventDefault();
    //csrf
    sendAjax('DELETE', '/deleteBookmark', 'id=' + e.target.parentElement.id + "&_csrf=" + globCsrf, function() {
        loadBookmarksFromServer();
    });
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
        <div className="modal-content">
        <div className="modal-header">
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
            <a href="#" className="emptyBookmark list-group-item list-group-item-action">No bookmarks yet</a>
            </div>
        );
    }

    //<img src="/assets/img/bookmarkface.jpeg" atl="bookmark face" className="bookmarkFace" />
    const bookmarkNodes = props.bookmarks.map(function(bookmark) {
        return (
            <a href={bookmark.url} target="_blank" key={bookmark._id} className="bookmark container-fluid list-group-item list-group-item-action">
            <div className ="row" id={bookmark._id}>
            <h3 className="bookmarkName col-10"><img src={'http://www.google.com/s2/favicons?domain='+bookmark.url} /> {bookmark.name} </h3>
            <button type="button" data-toggle="modal" data-target="#updateModal" data-whatever="@mdo" className="bookmarkUpdate col-1 btn-sm btn-primary text-light" onClick={grabTarget}><icon className="material-icons">edit</icon></button>

            <button className="bookmarkDelete col-1 btn-sm btn-danger text-dark" onClick={deleteBookmark} ><icon className="material-icons">delete</icon></button>
            </div>
            <div className="row">
            <div className="col-1"></div>
            <h3 className="bookmarkURL col-10">{bookmark.url} </h3>
            </div>
            </a>
        );
    });
    return(
        <div className="bookmarkList">
        {bookmarkNodes}
        </div>
    );
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
    loadAds();
};


const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});
