;

module.exports = function(Page) {
  Page.observe('before save', function(ctx, next) {
    const now = new Date();

    if (ctx.instance) {
      const {created} = ctx.instance;
      ctx.instance.created = created || now;
      ctx.instance.updated = now;
    } else {
      let {created} = ctx.data;
      ctx.data.created = created || now;
      ctx.data.updated = now;
    }
    next();
  });
};
