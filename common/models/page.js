;

module.exports = function(Page) {
  Page.observe('before save', function(ctx, next) {
    const now = new Date();

    if (ctx.instance) {
      const {created} = ctx.instance;
      ctx.instance.created = created || now;
      ctx.instance.updated = now;
    } else {
      ctx.data.updated = now;
    }
    next();
  });
};
