'use strict';

module.exports = function(Manga) {
  Manga.observe('before save', async function(ctx, next) {
    if (ctx.instance) {
      ctx.instance.updated = new Date();
    } else {
      ctx.data.created = ctx.data.created || new Date();
      ctx.data.updated = new Date();
    }
    next();
    return;
  });
};
