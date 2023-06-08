module.exports = async function ignoreSelectors(page) {
  await page.evaluate(() => {
    const parentDiv = document.querySelectorAll("._55wo._56bf._58k5");
    if (parentDiv) {
      for (let i = 0; i < parentDiv.length; i++) {
        const allDivs = parentDiv[i].querySelectorAll("*");
        allDivs.forEach((div) => {
          div.setAttribute("class", "myClass");
        });
      }
    } else {
      return;
    }
  });

  await page.evaluate(() => {
    const parentDiv = document.querySelectorAll("._3q6s._78cw");
    if (parentDiv) {
      for (let i = 0; i < parentDiv.length; i++) {
        const allDivs = parentDiv[i].querySelectorAll("*");
        allDivs.forEach((div) => {
          div.setAttribute("class", "myClass");
        });
      }
    } else {
      return;
    }
  });
  await page.evaluate(() => {
    const parentDiv = document.querySelectorAll("._hdn._4u3j");
    if (parentDiv) {
      for (let i = 0; i < parentDiv.length; i++) {
        const allDivs = parentDiv[i].querySelectorAll("*");
        allDivs.forEach((div) => {
          div.setAttribute("class", "myClass");
        });
      }
    } else {
      return;
    }
  });
  // await page.evaluate(() => {
  //   const elements = document.querySelectorAll("._k7v._2rgt._1j-f._2rgt.img");
  //   if (elements) {
  //     for (let i = 0; i < elements.length; i++) {
  //       elements[i].className = "img _1-yc profpic";
  //     }
  //   } else {
  //     return;
  //   }
  // });
  await page.evaluate(() => {
    const elements = document.querySelectorAll(
      "._52jd._52jb._52jg._5qc3._4vc-._3rc4._4vc-"
    );
    if (elements) {
      for (let i = 0; i < elements.length; i++) {
        elements[i].className = "_52jd _52jb _52jh _5qc3 _4vc- _3rc4 _4vc-";
      }
    } else {
      return;
    }
  });
};
