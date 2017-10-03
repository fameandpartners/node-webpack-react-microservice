// template.js

export default vo => `
  <div id="root" class="PDP__wrapper">
    <div>${vo.root}</div>
  </div>
  <script type="text/javascript">
    window.__data = ${() => JSON.stringify(vo.initialState) || {}};
  </script>
`;
