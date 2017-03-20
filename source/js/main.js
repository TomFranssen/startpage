let linksPromise = fetch('data/links.json'),
    viewModel = ko.mapping.fromJS({
        "links": []
    });

linksPromise.then(data => data.json().then(data => {
    ko.mapping.fromJS(data, viewModel);
}));

ko.applyBindings(viewModel);

if ('serviceWorker' in navigator) {
    console.log('has serviceWorker support');
    navigator.serviceWorker.register('sw.js').then(swRegistration => {
        console.log('swRegistration', swRegistration);
    }).catch(error => {
        console.log('Error occured!', error);
    });
}
