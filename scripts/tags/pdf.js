/**
 * pdf.js | https://theme-next.js.org/docs/tag-plugins/pdf
 */

 'use strict';

 module.exports = ctx => function(args) {
   const theme = ctx.theme.config;
   return `<div class="row"><embed src="${args[0]}" width="100%" height="${args[1] || theme.pdf.height}" isolation="isolate" type="application/pdf"></div>`;
 };
 