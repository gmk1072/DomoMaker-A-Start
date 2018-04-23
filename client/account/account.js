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
const AccountWindow = (props) => {
    return (
        <div className="h-100">
        <div className="container">
        <div className="card-deck mb-3 text-center">
        <div className="card mb-4 box-shadow">
        <div className="card-header">
        <h4 className="my-0 font-weight-normal">Username</h4>
        </div>
        <div className="card-body">
        <h4 className="my-0 font-weight-normal">{props.username}</h4>
        </div>
        </div>

        <div className="card mb-4 box-shadow">
        <div className="card-header">
        <h4 className="my-0 font-weight-normal">Number of Bookmarks</h4>
        </div>
        <div className="card-body">
        <h4 className="my-0 font-weight-normal">{props.numBookmarks}</h4>
        </div>
        </div>
        </div>
        <input type="hidden" name="_csrf" value={props.csrf} />
        </div>

        </div>
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
const PasswordUpdateWindow = (props) => {
    return (

        <div>
        <div className="col-3">
        </div>

        <div className="col-6">
        <form id="passUpdateForm" name="signupForm" onSubmit={handlePassUpdate} action="/updatePassword" method="POST" className="mainForm" >
        <div className="input-group">
        <div className="input-group-prepend col-3">
        <span className="input-group-text bg-secondary text-light w-100" id="newPassword-addon">New Password:</span>
        </div>
        <input className="form-control" id="newPass" type="password" name="newPass" placeholder="password" aria-describedby="password-addon"/>
        </div>

        <div className="input-group">
        <div className="input-group-prepend col-3">
        <span className="input-group-text bg-secondary text-light w-100" id="newPassword2-addon">Confrim Password:</span>
        </div>
        <input className="form-control" id="newPass2" type="password" name="newPass2" placeholder="password" aria-describedby="password-addon"/>

        </div>

        <input type="hidden" name="_csrf" value={props.csrf} />
        <br/>
        <button className="formSubmit btn btn-success offset-md-10 col-2" type="submit" value="Sign Up">Submit</button>
        </form>
        <button id="cancelButton" className="btn btn-secondary offset-md-10 text-light col-2" onClick={createAccountWindow}>Cancel</button>
        </div>
        <div className="col">
        </div>
        </div>
    );
};

const createPasswordWindow = () => {
    ReactDOM.render(
        <PasswordUpdateWindow csrf={globCsrf} />,
        document.querySelector("#accountContent")
    );
};

const createAccountWindow = () => {
    sendAjax('GET', '/getAccountData', null, (data) => {
        ReactDOM.render(
            <AccountWindow csrf={globCsrf.user} username={data.username} numBookmarks={data.numBookmarks} />,
            document.querySelector("#accountContent")
        );
    });
};

const setup = function(csrf) {
    globCsrf= csrf;
    ReactDOM.render(
        <SideBarList />,
        document.querySelector("#accountSideBar")
    );
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
const SideBarList = (props) => {
    return(
        <ul className="list-group h-100">
        <li className="bg-primary">
        <a id="pricingButton" href="/pricing">
        <div className="btn w-100 btn-secondary text-light ml-sm-2 align-middle">Upgrade
        </div>
        </a>
        </li>

        <li className="bg-primary">
        <div className="ml-sm-2 align-middle">
        </div>
        </li>

        <li className="bg-primary">
        <button id="updatePasswordButton" onClick={createPasswordWindow} className="btn w-100 btn-secondary text-light ml-sm-2 align-middle">Update Password
        </button>
        </li>

        <li className="bg-primary">
        <div className="ml-sm-2 align-middle">
        </div>
        </li>

        <li className="bg-primary">
        <a href="/logout">
        <button className="btn w-100 btn-secondary text-light align-middle ml-sm-2 ">Log out
        </button>
        </a>
        </li>

        </ul>
    );
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});
