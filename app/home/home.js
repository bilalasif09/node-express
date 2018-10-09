const { index, search, dashboard, codeEditor } = require('./home.ctrl');

module.exports = (router) => {

    router.get('/', index);
    router.get('/search', search);
    router.get('/dashboard', dashboard);
    router.get('/codeeditor', codeEditor);

};