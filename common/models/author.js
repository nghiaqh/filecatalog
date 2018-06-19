'use strict';

module.exports = function(Author) {
  Author.observe('before save', function(ctx, next) {
    if (ctx.instance) {
      const {created} = ctx.instance;
      ctx.instance.created = created || new Date();
      ctx.instance.updated = new Date();
    } else {
      const {created} = ctx.data;
      ctx.data.created = created || new Date();
      ctx.data.updated = new Date();
    }
    next();
  });
};
