let globCsrf;

const setup = function(csrf) {
    globCsrf= csrf;
    ReactDOM.render(
        <PricingWindow csrf={globCsrf} />, document.querySelector("#pricingContent")
    );
    sendAjax('GET', '/getDarkMode', null, (data) => {
        if(data.darkMode){
            const sheet = document.getElementById("style");

            sheet.innerHTML = ".darkMode {background-color: #343a40!important; color: #fff!important;}";
        } else{
            const sheet = document.getElementById("style");

            sheet.innerHTML = ".darkMode {background-color: #fff!important; color: #343a40!important;}";
        }
    });
    /*

    ReactDOM.render(
        <BookmarkList bookmarks={[]} />, document.querySelector("#bookmarks")
    );
    ReactDOM.render(
        <UpdateModal bookmarks={[]} />, document.querySelector("#updateLocation")
    );

    loadBookmarksFromServer();*/
};

const PricingWindow = (props) => {
    return (
        <div>
        <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 className="h1">Pricing</h1>
        </div>

        <div className="container">
        <div className="card-deck mb-3 text-center">
        <div className="card mb-4 box-shadow darkMode">
        <div className="card-header">
        <h4 className="my-0 font-weight-normal">Free</h4>
        </div>
        <div className="card-body">
        <h1 className="card-title pricing-card-title">$0 <small className="text-muted">/ mo</small></h1>
        <ul className="list-unstyled mt-3 mb-4">
        <li className="h5">Unlimited* bookmark storage</li>
        <li className="h5">Ads on page</li>
        <li className="h5">Email support</li>
        <li className="h5">Help center access</li>
        </ul>
        <button type="button" className="btn btn-lg btn-block btn-outline-primary">Sign up for free</button>
        <br />
        <p className="h6">*Not unlimited</p>
        </div>
        </div>
        <div className="card mb-4 box-shadow darkMode">
        <div className="card-header">
        <h4 className="my-0 font-weight-normal">Pro</h4>
        </div>
        <div className="card-body">
        <h1 className="card-title pricing-card-title">$5 <small className="text-muted">/ mo</small></h1>
        <ul className="list-unstyled mt-3 mb-4">
        <li className="h5">Free perks included</li>
        <li className="h5">No Ads</li>
        <li className="h5">Priority email support</li>
        <li className="h5">Customizability</li>
        </ul>
        <button type="button" className="btn btn-lg btn-block btn-success">Get started</button>
        </div>
        </div>
        <div className="card mb-4 box-shadow darkMode">
        <div className="card-header">
        <h4 className="my-0 font-weight-normal">Godmode</h4>
        </div>
        <div className="card-body">
        <h1 className="card-title pricing-card-title">$2900 <small className="text-muted">/ hr</small></h1>
        <ul className="list-unstyled mt-3 mb-4">
        <li className="h5">Pro Perks Included</li>
        <li className="h5">Access to the Make Facebook Button</li>
        <li className="h5">Quantum Network Access</li>
        <li className="h5">Can Use Our Help Center Teleporter for In-Person Help</li>
        </ul>
        <button type="button" className="btn btn-lg btn-block btn-success">Contact us</button>
        </div>
        </div>
        </div>
        </div>
        </div>
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
