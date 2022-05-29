const sequelize = require('../config/connection');
const { Post } = require('../models');

const postData = [
  {
    "post_title": "herky berk",
    "post_content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer rutrum tincidunt lectus ac gravida. Maecenas eleifend nunc tortor, non varius diam fringilla vitae. Aenean vel porttitor velit. Nam vestibulum, purus id vestibulum hendrerit, quam leo vulputate elit, nec euismod lacus nibh id enim. Vestibulum vehicula blandit massa vel condimentum. Pellentesque egestas diam sit amet nulla pellentesque sagittis. Morbi pellentesque quam ac volutpat porta. Duis imperdiet erat porttitor ultricies maximus. Proin sit amet orci nec dolor facilisis maximus et eget ex.",
    "user_id": 1
  },
  {
    "post_title": "test 2",
    "post_content": "In hac habitasse platea dictumst. Maecenas suscipit tellus quis faucibus ullamcorper. Praesent vehicula condimentum ullamcorper. Maecenas volutpat tristique feugiat. Mauris sodales purus ut elit vestibulum pharetra. Sed venenatis mi a nisl euismod, eget auctor tellus consectetur. Suspendisse sem lacus, accumsan nec eros non, pulvinar pretium quam. Maecenas sed condimentum elit. Aenean congue vitae tellus eu hendrerit.",
    "user_id": 1
  },
  {
    "post_title": "text text test",
    "post_content": "Vestibulum non malesuada est, vitae accumsan nulla. Phasellus mauris ligula, tincidunt vel ornare at, porttitor sed turpis. Nam efficitur nulla vitae augue tincidunt luctus. Praesent faucibus id turpis non viverra. Aliquam erat volutpat. Nunc et volutpat ipsum. Sed sit amet velit vel ex auctor malesuada. Aliquam malesuada efficitur eros nec feugiat.",
    "user_id": 2
  },
  {
    "post_title": "laksdflsf yea yeah yea",
    "post_content": "Praesent ultrices semper arcu ac consequat. Morbi luctus pulvinar mi, tempor sagittis turpis. Fusce velit mi, imperdiet ac egestas nec, mollis elementum lacus. Praesent feugiat augue et augue congue, eu efficitur diam pellentesque. Nam condimentum, elit in placerat tincidunt, lacus sapien suscipit tortor, ut rhoncus lacus eros vitae nunc.",
    "user_id": 3
  }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;