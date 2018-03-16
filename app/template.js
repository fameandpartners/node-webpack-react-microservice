// template.js

export default vo => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  <meta charSet='utf-8' />
  <title>Fame and Partners</title>\
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
  <meta name="theme-color" content="#000" />
  <meta name="mobile-web-app-capable" content="yes"/>
  <meta name="apple-mobile-web-app-capable" content="yes"/>
  <meta name="apple-mobile-web-app-title" content="NKBA"/>
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
  <link id="favicon" rel="shortcut icon" href="/favicon.png" sizes="96x96" type="image/png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/icon/apple-touch-icon.png"/>
  <link rel="manifest" href="/manifest.json"/>
  <meta name="msapplication-tap-highlight" content="no"/>
  <meta name="msapplication-TileImage" content="/icon/ms-touch-icon-144x144-precomposed.png"/>
  <meta name="msapplication-TileColor" content="#000"/>
  <meta name="theme-color" content="#000"/>
  <link rel="stylesheet" href=${vo.cssBundle}></style>
</head>
<body>
  <div id="root">
    <div>${vo.root}</div>
  </div>
  <script src="${() => vo.jsBundle}" defer></script>
  <script type="text/javascript">
    window.__data = ${() => JSON.stringify(vo.initialState) || {}};
  </script>
</body>
</html>
`;
