let globCsrf;

const handlePassUpdate = (e) => {
    e.preventDefault();

    //$("#bookmarkMessage").animate({width:'hide'},350);

    /*    if($("#currPass").val() !== $("#newPass").val()) {
        handleError("Current password cannot ");
        return false;
    }*/
    if($("#newPass").val() =='' || $("#newPass2").val() == '') {
        handleError("both fields are required");
        return false
    }

    if($("#newPass").val() !== $("#newPass2").val()) {
        handleError("passwords do not match");
        return false;
    }
    sendAjax('POST', $("#passUpdateForm").attr("action"), $("#passUpdateForm").serialize(), redirect);
    return false;
};

const PasswordUpdateWindow = (props) => {
    return (
        <div>
        <form id="passUpdateForm" name="signupForm" onSubmit={handlePassUpdate} action="/updatePassword" method="POST" className="mainForm" >
        <div className="input-group">
        <div className="input-group-prepend">
        <span className="input-group-text bg-secondary text-light" id="newPassword-addon">New Password:</span>
        </div>
        <input className="form-control" id="newPass" type="password" name="newPass" placeholder="password" aria-describedby="password-addon"/>
        </div>

        <div className="input-group">
        <div className="input-group-prepend">
        <span className="input-group-text bg-secondary text-light" id="newPassword2-addon">Confrim Password:</span>
        </div>
        <input className="form-control" id="newPass2" type="password" name="newPass2" placeholder="password" aria-describedby="password-addon"/>

        </div>

        <input type="hidden" name="_csrf" value={props.csrf} />
        <br/>
        <button className="formSubmit btn btn-success offset-md-10 col-2" type="submit" value="Sign Up">Sign Up</button>
        </form>
        <a href="/account"><button className="btn btn-secondary text-light offset-md-10 col-2" >Cancel</button></a>
        </div>
    );
};

const setup = function(csrf) {
    globCsrf= csrf;
    ReactDOM.render(
        <PasswordUpdateWindow csrf={globCsrf} />, document.querySelector("#passwordContent")
    );
    /*

    ReactDOM.render(
        <BookmarkList bookmarks={[]} />, document.querySelector("#bookmarks")
    );
    ReactDOM.render(
        <UpdateModal bookmarks={[]} />, document.querySelector("#updateLocation")
    );

    loadBookmarksFromServer();*/
};


const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});
