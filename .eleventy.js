const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const embedYouTube = require("eleventy-plugin-youtube-embed");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(embedYouTube);
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("static");
  eleventyConfig.addFilter("sortByOrder", sortByOrder);
  eleventyConfig.addFilter("sortReverse", sortReverse);
  eleventyConfig.addFilter("sortReverseDate", sortReverseDate);
  eleventyConfig.addFilter("latest", returnLatest);

  function sortByOrder(values) {
    let vals = [...values]; // this *seems* to prevent collection mutation...
    return vals.sort((a, b) => Math.sign(a.data.order - b.data.order));
  }

  // sort by reverse order, e.g. 5,4,3,2,1
  function sortReverse(values) {
    let vals = [...values]; // this *seems* to prevent collection mutation...
    return vals.sort((a, b) => Math.sign(b.data.order - a.data.order));
  }

  // sort by reverse order, e.g. 5,4,3,2,1
  function sortReverseDate(values, amount) {
    let vals = [...values]; // this *seems* to prevent collection mutation...
    return vals
      .sort((a, b) => Math.sign(b.data.date - a.data.date))
      .slice(0, amount);
  }

  // return the latest of a collection
  function returnLatest(values, amount) {
    let vals = [...values]; // this *seems* to prevent collection mutation...
    return vals
      .sort((a, b) => Math.sign(b.data.order - a.data.order))
      .slice(0, amount);
  }

  return {
    dir: {
      input: "src",
      output: "dist",
      data: "_data",
    },
  };
};
