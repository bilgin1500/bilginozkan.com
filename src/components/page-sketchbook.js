import { createEl, createPageContainer } from 'utilities/helpers';
import 'css/sketchbook';

/**
 * Creates this page's elements
 * @param  {object} page - Object containing page data
 *                        name: Name of the page
 *                        slug: Slug for this page, created by the app.js
 * @return {element} The page wrapper
 */
function createDom(page) {
  var page = createPageContainer(page);
  var $page = page.$page;
  var $pageContent = page.$content;

  return $page;
}

export default createDom;
