const html = require("html-template-tag");
const layout = require("./layout");

module.exports = () => layout(html`
<h4>WE HAVE AN ERROR</h4>
<hr/>
<div class="page-body"></div>
<hr/>
`);
