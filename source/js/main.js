let linksPromise = fetch('data/links.json'),
    instagramPromise = fetch('data/instagram.php'),
    viewModel = [];

viewModel.links = ko.mapping.fromJS({
    'links' : []
});

viewModel.instagram = ko.mapping.fromJS({
    'items' : []
});

linksPromise.then(data => data.json().then(data => {
    ko.mapping.fromJS(data, viewModel.links);
}));

instagramPromise.then(data => data.json().then(data => {
    ko.mapping.fromJS(data, viewModel.instagram);
}));


ko.applyBindings(viewModel.links, document.getElementById('data-bind-links'));
ko.applyBindings(viewModel.instagram, document.getElementById('data-bind-instagram'));


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').then( function (swRegistration) {

        var serviceWorker;


        if (swRegistration.installing) {
            console.log('Resolved at installing: ', swRegistration);
            serviceWorker = swRegistration.installing;
        } else if (swRegistration.waiting) {
            console.log('Resolved at installed/waiting: ', swRegistration);
            serviceWorker = swRegistration.waiting;
        } else if (swRegistration.active) {
            console.log('Resolved at activated: ', swRegistration);
            serviceWorker = swRegistration.active;
        }

        if (serviceWorker) {
            serviceWorker.addEventListener('statechange', function(e) {
                console.log('STATE CHANGED!' . e);
            });
        }



    }).catch(error => {
        console.log('Error occured!', error);
    });
}
