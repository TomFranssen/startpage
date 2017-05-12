<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="Startpage">
        <link rel="stylesheet" href="target/css/main.css" />
    </head>
    <body>

        <p>access_token=40962132.bb318b7.2b80e13004a045fa95ec46d7be3d17cb</p>

        <div class="container">
            <div class="page-header">
                <h1>Start Page</h1>
            </div>

            <div id="data-bind-links">
                <ul data-bind="foreach: links" class="list-unstyled">
                    <li>
                        <div data-bind="text: name"></div>
                        <div data-bind="text: url"></div>
                    </li>
                </ul>
            </div>

            <div id="data-bind-instagram">
                <ul QQQdata-bind="foreach: items" class="list-unstyled">
                    <li>
                        <div QQQdata-bind="text: link">aaa</div>
                        <div QQQdata-bind="text: id">dddd</div>
                        <div>
                            <img QQQdata-bind="attr: {src: images.standard_resolution.url}" />
                        </div>
                    </li>
                </ul>
            </div>


        </div>
        <script src="target/js/main.js"></script>
    </body>
</html>
