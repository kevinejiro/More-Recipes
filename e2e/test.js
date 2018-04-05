module.exports = {

  /**
 *
 * @param {any} browser
 * @returns {void} any
 */
  'Demo user signup': function (browser) {
    browser
      .windowHandles((result) => {
        const handle = result.value[0];
        browser.switchWindow(handle);
      })
      .url('http://localhost:8000')
      .waitForElementVisible('body', 2000)
      .moveToElement('button#signup', 10, 10)
      .pause(1000)
      .click('button#signup')
      .pause(2000)
      .waitForElementVisible('body', 2000)
      // .expect.element('#signupForm').to.be.present
      .moveToElement('input#username', 10, 10)
      .pause(500)
      .setValue('input#username', 'nightwatch')
      .pause(1000)
      .moveToElement('input#email', 10, 10)
      .pause(500)
      .setValue('input#email', 'nightwatch@gmail.com')
      .pause(1000)
      .moveToElement('input#password', 10, 10)
      .pause(500)
      .setValue('input#password', 'nightwatch')
      .pause(1000)
      .moveToElement('input#passwordConfirmation', 10, 10)
      .pause(500)
      .setValue('input#passwordConfirmation', 'nightwatch')
      .pause(1000)
      .moveToElement('button[type=submit]', 10, 10)
      .pause(500)
      .click('button[type=submit]')
      .pause(1000)
      .moveToElement('button#signout', 10, 10)
      .pause(1000)
      .click('button#signout')
      .pause(2000)
      .waitForElementVisible('body', 2000)
      .moveToElement('button#signup', 10, 10)
      .pause(1000)
      .click('button#signup')
      .pause(2000)
      .waitForElementVisible('body', 2000)
      // .expect.element('#signupForm').to.be.present
      .moveToElement('input#username', 10, 10)
      .pause(500)
      .setValue('input#username', 'ravenBlack')
      .pause(1000)
      .moveToElement('input#email', 10, 10)
      .pause(500)
      .setValue('input#email', 'ravenBlack@gmail.com')
      .pause(1000)
      .moveToElement('input#password', 10, 10)
      .pause(500)
      .setValue('input#password', 'ravenBlack')
      .pause(1000)
      .moveToElement('input#passwordConfirmation', 10, 10)
      .pause(500)
      .setValue('input#passwordConfirmation', 'ravenBlack')
      .pause(1000)
      .moveToElement('button[type=submit]', 10, 10)
      .pause(500)
      .click('button[type=submit]')
      .pause(1000);
  },

  /**
 *
 * @param {any} browser
 * @returns {void} any
 */
  'Demo user signin': function (browser) {
    browser
      .moveToElement('button#signout', 10, 10)
      .pause(1000)
      .click('button#signout')
      .pause(2000)
      .waitForElementVisible('body', 2000)
      .moveToElement('input#username', 10, 10)
      .pause(500)
      .setValue('input#username', 'nightwatch')
      .pause(1000)
      .moveToElement('input#password', 10, 10)
      .pause(500)
      .setValue('input#password', 'nightwatch')
      .pause(1000)
      .moveToElement('button[type=submit]', 10, 10)
      .pause(500)
      .click('button[type=submit]')
      .pause(3000);
  },

  /**
 *
 * @param {any} browser
 * @returns {void} any
 */
  'Demo user create recipe': function (browser) {
    browser
      .moveToElement('button#Add-Recipe', 10, 10)
      .pause(1000)
      .click('button#Add-Recipe')
      .pause(2000)
      .waitForElementVisible('body', 2000)
      .moveToElement('input#recipeTitle', 10, 10)
      .pause(1000)
      .setValue('input#recipeTitle', 'nightwatch')
      .pause(1000)
      .moveToElement('textarea#recipeDescription', 10, 10)
      .pause(500)
      .setValue('textarea#recipeDescription', 'nightwatch')
      .pause(1000)
      .moveToElement('textarea#recipeIngredient', 10, 10)
      .pause(500)
      .setValue('textarea#recipeIngredient', 'nightwatch')
      .pause(1000)
      .moveToElement('textarea#recipeDirections', 10, 10)
      .pause(500)
      .setValue('textarea#recipeDirections', 'nightwatch')
      .pause(1000)
      .moveToElement('button#recipesubmit', 20, 20)
      .pause(500)
      .click('button#recipesubmit')
      .pause(2000)
      .moveToElement('button#Add-Recipe', 10, 10)
      .pause(1000)
      .click('button#Add-Recipe')
      .pause(2000)
      .waitForElementVisible('body', 2000)
      .moveToElement('input#recipeTitle', 10, 10)
      .pause(1000)
      .setValue('input#recipeTitle', 'Bangasoup')
      .pause(1000)
      .moveToElement('textarea#recipeDescription', 10, 10)
      .pause(500)
      .setValue('textarea#recipeDescription', 'A short description')
      .pause(1000)
      .moveToElement('textarea#recipeIngredient', 10, 10)
      .pause(500)
      .setValue('textarea#recipeIngredient', 'sugar, spice, and ketchup')
      .pause(1000)
      .moveToElement('textarea#recipeDirections', 10, 10)
      .pause(500)
      .setValue('textarea#recipeDirections', 'open the nightwatch')
      .pause(1000)
      .moveToElement('button#recipesubmit', 20, 20)
      .pause(500)
      .click('button#recipesubmit')
      .pause(2000);
  },

  /**
 *
 * @param {any} browser
 * @returns {void} any
 */
  'Demo user cannot vote their own recipe': function (browser) {
    browser
      .moveToElement('a#cardlink', 10, 10)
      .pause(1000)
      .click('a#cardlink')
      .pause(2000)
      .waitForElementVisible('body', 2000)
      .moveToElement('i#upvote', 10, 10)
      .pause(1000)
      .click('i#upvote')
      .pause(1000)
      .moveToElement('i#downvote', 10, 10)
      .pause(1000)
      .click('i#downvote')
      .pause(1000);
  },

  /**
 *
 * @param {any} browser
 * @returns {void} any
 */
  'Demo user favourite a recipe': function (browser) {
    browser
      .moveToElement('i#favourite', 10, 10)
      .pause(1000)
      .click('i#favourite')
      .pause(1000)
      .moveToElement('a#userIdName', 10, 10)
      .pause(1000)
      .click('a#userIdName')
      .pause(1000)
      .moveToElement('button#Favourite-Recipes', 10, 10)
      .pause(1000)
      .click('button#Favourite-Recipes')
      .pause(2000);
  },

  /**
 *
 * @param {any} browser
 * @returns {void} any
 */
  'Demo user edit a recipe': function (browser) {
    browser
      .moveToElement('a#cardlink', 10, 10)
      .pause(1000)
      .click('a#cardlink')
      .pause(2000)
      .waitForElementVisible('body', 2000)
      .moveToElement('i#edit', 10, 10)
      .pause(1000)
      .click('i#edit')
      .pause(1000)
      .waitForElementVisible('body', 2000)
      .moveToElement('input#recipeTitle', 10, 10)
      .pause(1000)
      .clearValue('input#recipeTitle')
      .pause(500)
      .setValue('input#recipeTitle', 'MorningSleep')
      .pause(1000)
      .moveToElement('textarea#recipeDescription', 10, 10)
      .pause(500)
      .clearValue('textarea#recipeDescription')
      .pause(500)
      .setValue('textarea#recipeDescription', 'A short something')
      .pause(1000)
      .moveToElement('textarea#recipeIngredient', 10, 10)
      .pause(500)
      .clearValue('textarea#recipeIngredient')
      .pause(500)
      .setValue('textarea#recipeIngredient', 'butter, garri, and beans')
      .pause(1000)
      .moveToElement('textarea#recipeDirections', 10, 10)
      .pause(500)
      .clearValue('textarea#recipeDirections')
      .pause(500)
      .setValue('textarea#recipeDirections', 'open the morningsleep')
      .pause(1000)
      .moveToElement('button#recipesubmit', 20, 20)
      .pause(500)
      .click('button#recipesubmit')
      .pause(2000);
  },

  /**
 *
 * @param {any} browser
 * @returns {void} any
 */
  'Demo user can delete a recipe': function (browser) {
    browser
      .moveToElement('a#cardlink', 10, 10)
      .pause(1000)
      .click('a#cardlink')
      .pause(2000)
      .waitForElementVisible('body', 2000)
      .moveToElement('i#delete', 10, 10)
      .pause(1000)
      .click('i#delete')
      .pause(1000)
      .moveToElement('button.swal2-cancel', 10, 10)
      .pause(1000)
      .click('button.swal2-cancel')
      .pause(1000)
      .moveToElement('button.swal2-styled', 10, 10)
      .pause(1000)
      .click('button.swal2-styled')
      .pause(1000)
      .moveToElement('i#delete', 10, 10)
      .pause(1000)
      .click('i#delete')
      .pause(1000)
      .moveToElement('button.swal2-confirm', 10, 10)
      .pause(1000)
      .click('button.swal2-confirm')
      .pause(1000);
  },

  /**
 *
 * @param {any} browser
 * @returns {void} any
 */
  'Demo user can upvote and downvote another users recipe': function (browser) {
    browser
      .moveToElement('button#signout', 10, 10)
      .pause(1000)
      .click('button#signout')
      .pause(2000)
      .waitForElementVisible('body', 2000)
      .moveToElement('input#username', 10, 10)
      .pause(500)
      .setValue('input#username', 'ravenBlack')
      .pause(1000)
      .moveToElement('input#password', 10, 10)
      .pause(500)
      .setValue('input#password', 'ravenBlack')
      .pause(1000)
      .moveToElement('button[type=submit]', 10, 10)
      .pause(500)
      .click('button[type=submit]')
      .pause(500)
      .moveToElement('button#Add-Recipe', 10, 10)
      .pause(1000)
      .click('button#Add-Recipe')
      .pause(2000)
      .waitForElementVisible('body', 2000)
      .moveToElement('input#recipeTitle', 10, 10)
      .pause(1000)
      .setValue('input#recipeTitle', 'ravenDish')
      .pause(1000)
      .moveToElement('textarea#recipeDescription', 10, 10)
      .pause(500)
      .setValue('textarea#recipeDescription', 'ravenDish')
      .pause(1000)
      .moveToElement('textarea#recipeIngredient', 10, 10)
      .pause(500)
      .setValue('textarea#recipeIngredient', 'ravenDish')
      .pause(1000)
      .moveToElement('textarea#recipeDirections', 10, 10)
      .pause(500)
      .setValue('textarea#recipeDirections', 'ravenDish')
      .pause(1000)
      .moveToElement('button#recipesubmit', 20, 20)
      .pause(500)
      .click('button#recipesubmit')
      .pause(2000)
      .moveToElement('button#Add-Recipe', 10, 10)
      .pause(1000)
      .click('button#Add-Recipe')
      .pause(2000)
      .waitForElementVisible('body', 2000)
      .moveToElement('input#recipeTitle', 10, 10)
      .pause(1000)
      .setValue('input#recipeTitle', 'suya and pasta')
      .pause(1000)
      .moveToElement('textarea#recipeDescription', 10, 10)
      .pause(500)
      .setValue('textarea#recipeDescription', 'A short description')
      .pause(1000)
      .moveToElement('textarea#recipeIngredient', 10, 10)
      .pause(500)
      .setValue('textarea#recipeIngredient', 'butter, mint, and sparkles')
      .pause(1000)
      .moveToElement('textarea#recipeDirections', 10, 10)
      .pause(500)
      .setValue('textarea#recipeDirections', 'open the pitch darkness')
      .pause(1000)
      .moveToElement('button#recipesubmit', 20, 20)
      .pause(500)
      .click('button#recipesubmit')
      .pause(2000)
      .url('http://localhost:8000/toprecipes')
      .waitForElementVisible('body', 2000)
      .moveToElement("a[href$='/recipes/1']", 10, 10)
      .pause(1000)
      .click("a[href$='/recipes/1']")
      .pause(2000)
      .waitForElementVisible('body', 2000)
      .moveToElement('i#downvote', 10, 10)
      .pause(1000)
      .click('i#downvote')
      .pause(1000)
      .moveToElement('i#downvote', 10, 10)
      .pause(1000)
      .click('i#downvote')
      .pause(1000)
      .moveToElement('i#downvote', 10, 10)
      .pause(1000)
      .click('i#downvote')
      .pause(1000)
      .moveToElement('i#upvote', 10, 10)
      .pause(1000)
      .click('i#upvote')
      .pause(1000)
      .moveToElement('i#upvote', 10, 10)
      .pause(1000)
      .click('i#upvote')
      .pause(1000)
      .moveToElement('i#upvote', 10, 10)
      .pause(1000)
      .click('i#upvote')
      .pause(1000)
      .url('http://localhost:8000/toprecipes')
      .waitForElementVisible('body', 2000)
      .moveToElement("a[href$='/recipes/1']", 10, 10)
      .pause(1000)
      .click("a[href$='/recipes/1']")
      .pause(2000)
      .moveToElement('i#upvote', 10, 10)
      .pause(1000)
      .click('i#upvote')
      .pause(1000)
      .url('http://localhost:8000/toprecipes')
      .waitForElementVisible('body', 2000);
  },

  /**
 *
 * @param {any} browser
 * @returns {void} any
 */
  'Demo user can search for recipe by title/ingredients': function (browser) {
    browser
      .moveToElement('input#searchTerm', 10, 10)
      .pause(500)
      .setValue('input#searchTerm', 'Morning')
      .pause(1000)
      .waitForElementVisible('body', 2000)
      .pause(1000)
      .moveToElement('a#cardlink', 10, 10)
      .pause(1000)
      .click('a#cardlink')
      .pause(1000)
      .url('http://localhost:8000/toprecipes')
      .waitForElementVisible('body', 2000)
      .moveToElement('input#searchTerm', 10, 10)
      .pause(500)
      .setValue('input#searchTerm', 'butter')
      .waitForElementVisible('body', 2000)
      .pause(1000)
      .moveToElement('a#cardlink', 10, 10)
      .pause(2000)
      .click('a#cardlink')
      .pause(1000);
  },

  /**
 *
 * @param {any} browser
 * @returns {void} any
 */
  'Demo user can review a recipe': function (browser) {
    browser
      .moveToElement('textarea#recipeComment', 10, 10)
      .pause(500)
      .setValue('textarea#recipeComment', 'great recipe man !!!')
      .pause(1000)
      .moveToElement('button#reviewbutton', 10, 10)
      .pause(3000)
      .click('button#reviewbutton')
      .pause(1000)
      .moveToElement('a#reviews', 10, 10)
      .pause(1000)
      .moveToElement('button#signout', 10, 10)
      .pause(1000)
      .click('button#signout')
      .pause(3000)
      .end();
  },
};
