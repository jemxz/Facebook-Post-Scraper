const puppeteer = require("puppeteer");
const log = require("log-to-file");

const getAuthor_id = require("./author_id");
const getAuthor_name = require("./author_name");
const getText = require("./text");
const getPost_id = require("./post_id");
const getAuthor_image = require("./author_image_url");
const getTime = require("./timeOfPost");
const sendPosts = require("../services/sendPosts");
const modifyDom = require("../common/dom-modifier");

module.exports = async function createPosts(pages, account) {
  const facebookGroup = account.groupAdmissions;

  const result = [];

  for (let j = 0; j < pages.length; j++) {
    await modifyDom(pages[j]);

    // Selectors for All thing relate to posts

    const postLink_selector = "._52jc._5qc4._78cz._24u0._36xo";
    const postContent_selector = "._5rgt._5nk5._5msi";
    const author_image_selector = "i.img._1-yc.profpic";
    const author_selector = "._52jd._52jb._52jh._5qc3._4vc-._3rc4._4vc-";

    ///////////////////////////////////// Scraping all things releated to posts  ////////////////////////////////////////////////////////////////////////////////

    const authorLinks = await getAuthor_id(author_selector, pages[j]);

    const author_name = await getAuthor_name(author_selector, pages[j]);

    const author_image = await getAuthor_image(author_image_selector, pages[j]);

    const postLinks = await getPost_id(postLink_selector, pages[j]);

    const post_text = await getText(postContent_selector, pages[j]);

    const timeOfPost = await getTime(postLink_selector, pages[j]);

    for (let i = 0; i < postLinks.length; i++) {
      var posts = {
        facebook_id: postLinks[i].postId,
        facebook_url: postLinks[i].postUrl,
        text: post_text[i],
        facebook_author_id: authorLinks[i].authorId,
        facebook_author_url: authorLinks[i].authorUrl,
        facebook_author_name: author_name[i],
        facebook_created_at: timeOfPost[i],
        facebook_group_id: facebookGroup[j].facebookId,
        facebook_group_url:
          "www.facebook.com/groups/" + facebookGroup[j].facebookId,
        facebook_group_name: facebookGroup[j].groupName,
        facebook_author_image_url: author_image[i],
        user_profile: account.primaryEmailAddress,
      };
      result.push(posts);

      //  console.log(posts);
    }
  }
  const finalResult = { data: result };
  sendPosts(finalResult);
};
