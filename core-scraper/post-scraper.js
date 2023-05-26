const puppeteer = require("puppeteer");
const log = require("log-to-file");

const getAuthor_id = require("./author_id");
const getAuthor_url = require("./author_url");
const getAuthor_name = require("./author_name");
const getText = require("./text");

var date = new Date().toLocaleString();
module.exports = async function createPosts(pages, account) {
  const data = [];

  for (let j = 0; j < pages.length; j++) {
    // Selectors for All thing relate to posts

    const postLink_selector = "._5msj";
    const postContent_selector = "._5rgt._5nk5._5msi";
    const timeOfPost_selector = "._52jc._5qc4._78cz._24u0._36xo";
    const author_image_selector = ".img._lt3._4s0y";
    const author_name_selector = "._52jd._52jb._52jh._5qc3._4vc-._3rc4._4vc-";

    ///////////////////////////////////// Scraping all things releated to posts  ////////////////////////////////////////////////////////////////////////////////
    const author_id = await getAuthor_id(author_name_selector, pages[j]);

    const author_url = await getAuthor_url(author_name_selector, pages[j]);

    const author_name = await getAuthor_name(author_name_selector, pages[j]);

    const author_image = await getAuthor_image(author_image_selector, pages[j]);

    const post_id = await getPost_id(postLink_selector, pages[j]);

    const post_url = await getPost_url(postLink_selector, pages[j]);

    const post_text = await getText_url(postContent_selector, pages[j]);

    const timeOfPost = await getText(timeOfPost_selector, page[j]);

    for (let i = 0; i < allPosts.length; i++) {
      const posts = {
        facebook_id: post_id[i],
        facebook_url: post_url[i],
        text: post_text[i],
        facebook_author_id: author_id[i],
        facebook_author_url: author_url[i],
        facebook_author_name: author_name[i],
        facebook_group_id: postLinks[i],
        facebook_group_url: postLikes[i],
        facebook_group_name: postImages[i],
        facebook_author_image_url: timeOfPost[i],
        user_profile: "user_profile",
      };
    }
  }
  return result;
};
