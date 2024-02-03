module.exports.getData = (page) => {
     page.evaluate(() => {
        let user = document.querySelectorAll("a[role='link'][tabindex='0']")[1]
          .innerHTML;
        let content = document.querySelector("img._aa63._ac51");
        return { user, content };
      })
};
