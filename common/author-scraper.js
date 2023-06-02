module.exports = async function getLink(divSelector, page) {
  const links = [];

  try {
    let div_selector = divSelector;

    let list_length = await page.evaluate((sel) => {
      let elements = Array.from(document.querySelectorAll(sel));
      return elements.length;
    }, div_selector);

    for (let i = 0; i < list_length; i++) {
      var href = await page.evaluate(
        (l, sel) => {
          const div = Array.from(document.querySelectorAll("h3" + sel));
          const anchor = div[l]
            .querySelector("span")
            .querySelector("strong")
            .querySelector("a");

          return anchor ? anchor.href : "";
        },
        i,
        div_selector
      );
      links.push(href);
    }
  } catch (error) {
    return console.log(error);
  }
  // console.log(links);
  return links;
};
