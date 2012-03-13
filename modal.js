/**
 * Survey Modal JavaScript
 *
 * Depends on jQuery 1.7.1+
 * Replace $.on with $.delegate if need to backport
 *
 * Usage:
 * Call with surveyModal.init();
 *
 * Parameters
 * surveyModal.init({
 *  debug: true,
 *  ab: true
 * });
 */
var surveyModal = (function () {
  var m = this; // self reference

  /**
   * default options
   */
  this.options = {
    debug: false,
    ab: false
  };

  /**
   * detect mobile browsers, case insensitive
   * @return bool true if user agent matches mobile device UA
   */
  this.isMobile = function () {
    if (navigator.userAgent.match(/Android/i)
     || navigator.userAgent.match(/Kindle/i)
     || navigator.userAgent.match(/webOS/i)
     || navigator.userAgent.match(/iPhone|iPod|iPad/i)
     || navigator.userAgent.match(/Blackberry|Rim|WebOS/i)
     || navigator.userAgent.match(/mobile/i) // misc mobile including IEMobile
    ) { // is mobile UA
      return true;
    }
    return false;
  };

  /**
   * set cookie so lightbox never pops up again
   * set when user clicks yes or no
   */
  this.done = function (e) {
    document.cookie = 'isSurveyDone=1'; // unexpiring cookie
    m.hide();
  };

  /**
   * read cookie determining if lightbox should popup
   * read before opening popup on init
   * @return bool true if isSurveyDone cookie value is 1
   */
  this.isSurveyDone = function () {
    var cookieValue = document.cookie.match('(^|;) ?isSurveyDone=([^;]*)(;|$)');
    return cookieValue && (cookieValue[2] == 1) ? true : false;
  };

  /**
   * create and show the popup
   * can be called at any time
   */
  this.show = function () {
    if ($('#survey_modal').length) { // already open
      return;
    }
    m.debug();

    var modalHtml = '';
    modalHtml += '<div id="survey_modal"';
    if (m.isMobile()) {
      modalHtml += ' class="mobile"';
    }
    modalHtml += '>';
    modalHtml += '<p>Would you be willing to answer 3 questions?</p>';
    modalHtml += '<a href="';
    if (m.isMobile()) { // mobile link open same window
      modalHtml += 'http://surveyanalytics.com/t/ADVheZM9Bc" onclick="_gaq.push([\'_link\', \'http://surveyanalytics.com/t/ADVheZM9Bc\']); return false;"';
    }
    else { // desktop link, open new window
      modalHtml += 'http://surveyanalytics.com/t/ADVheZMTb8" target="_blank" onclick="_gaq.push([\'_link\', \'http://surveyanalytics.com/t/ADVheZMTb8\']); return false;"';
    }
    modalHtml += 'id="survey_modal-yes">Yes</a>';
    modalHtml += '<a id="survey_modal-no">No</a>';
    modalHtml += '</div>';
    $(modalHtml).appendTo('body');
  };

  /**
   * completely remove popup from DOM
   */
  this.hide = function (e) {
    $('#survey_modal').remove();
    m.debug();
  };

  // show mobile detection status and lightbox cookie
  this.debug = function () {
    if (!m.options.debug) {
      return;
    }
    console.log('isMobile? ' + m.isMobile());
    console.log('isSurveyDone? ' + m.isSurveyDone());
  };

  // debugging method to unset cookie
  this.undo = function (e) {
    document.cookie = 'isSurveyDone=0'; // unexpiring cookie
    m.debug();
  };

  /**
   * @param options object
   *  debug: bool   - debug to console?
   *  ab:    bool   - only open for 50% of people?
   */
  this.init = function () {
    if (arguments.length) {
      m.options = arguments[0];
    }
    if (m.options.debug) { // show options
      console.log(m.options);
    }

    // set cookie after click yes or no, so popup only appears once ever
    $('body').on('click', '#survey_modal-yes, #survey_modal-no', m.done);

    // determine sample group, show if in 50%
    var isInSampleGroup = true;
    if (m.options.ab) {
      isInSampleGroup = Math.floor(Math.random() * 2);
    }
    if (isInSampleGroup) {
      if (m.options.debug || (!m.isSurveyDone())) {
        m.show();
      }
    }
    else {
      if (m.options.debug) {
        console.log('Not in sample group');
      }
    }
  }

  // expose methods
  return this;

}).call({});
