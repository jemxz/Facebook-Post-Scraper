module.exports = async function getLink(divSelector, page) {
  const links = [];

  try {
    let div_selector = divSelector;

    let list_length = await page.evaluate((sel) => {
      let elements = Array.from(document.querySelectorAll(sel));
      return elements.length;
    }, div_selector);
    console.log(list_length);

    for (let i = 0; i < list_length; i++) {
      var href = await page.evaluate(
        (l, sel) => {
          const div = Array.from(document.querySelectorAll("h3" + sel));
          var anchor;
          if (div[l].querySelector("span")) {
            var anchor = div[l]
              .querySelector("span")
              .querySelector("strong")
              .querySelector("a");
          } else if (div[l].querySelector("strong").querySelector("a")) {
            anchor = div[l].querySelector("strong").querySelector("a");
          } else {
            var anchor = div[l]
              .querySelector("strong")
              .querySelector("span")
              .querySelector("a");
          }

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
  console.log(links);
  return links;
};
