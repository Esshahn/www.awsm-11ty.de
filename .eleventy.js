module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("static");

  function sortByOrder(values) {
    let vals = [...values]; // this *seems* to prevent collection mutation...
    return vals.sort((a, b) => Math.sign(a.data.order - b.data.order));
  }

  // sort by reverse order, e.g. 5,4,3,2,1
  function sortReverse(values) {
    let vals = [...values]; // this *seems* to prevent collection mutation...
    return vals.sort((a, b) => Math.sign(b.data.order - a.data.order));
  }

  // return the latest of a collection
  function returnLatest(values, amount) {
    let vals = [...values]; // this *seems* to prevent collection mutation...
    return vals
      .sort((a, b) => Math.sign(b.data.order - a.data.order))
      .slice(0, amount);
  }

  eleventyConfig.addFilter("sortByOrder", sortByOrder);
  eleventyConfig.addFilter("sortReverse", sortReverse);
  eleventyConfig.addFilter("latest", returnLatest);

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
