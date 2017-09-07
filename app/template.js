// template.js
import { template } from 'rapscallion';

export default vo => template`
  <div id="root">
    <div>${vo.root}</div>
  </div>
  <script type="text/javascript">
    window.__data = ${() => JSON.stringify(vo.initialState) || {}};
  </script>
`;
