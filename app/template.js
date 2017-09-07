// template.js
import { template } from 'rapscallion';

export default vo => template`
  <link rel="stylesheet" href=${() => vo.cssBundle}></style>
  <div id="root">
    <div>${vo.root}</div>
  </div>
  <script type="text/javascript">
    window.__data = ${() => JSON.stringify(vo.initialState) || {}};
  </script>
  <script src="${() => vo.jsBundle}" defer></script>
`;
