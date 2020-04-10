
window._ = require('lodash');

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.


/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
    // https://sweetalert2.github.io/
    window.Swal = window.swal = require('sweetalert2');


    // https://semantic-ui.com/
    require('./SemanticUI/semantic');

    require('../ext/imglazyload/jquery.lazyload.js');

    // H5 图片上传
    require('../ext/upload-h5/upload');

    require('../ext/prism/prism.js');
    require('../ext/jquery/jquery-ui/jquery-ui.min.js');
    require('../ext/jquery/jquery.tocify/jquery.tocify.min.js');
    require('../ext/Fluidbox/dist/js/jquery.fluidbox.min.js');
} catch (e) {}

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo'

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: 'your-pusher-key',
//     cluster: 'mt1',
//     encrypted: true
// });
