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
  var m = this;

  this.options = {
    debug: false,
    ab: false
  };

  // detect mobile browsers, case insensitive
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

  this.isSurveyDone = function () {
    var cookieValue = document.cookie.match('(^|;) ?isSurveyDone=([^;]*)(;|$)');
    return cookieValue && (cookieValue[2] == 1) ? true : false;
  };

  // read survey cookie, show survey
  this.show = function () {
    if ($('#mobile_survey_modal').length) {
      return;
    }
    m.debug();

    var modalHtml = '';
    modalHtml += '<div id="mobile_survey_modal">';
    modalHtml += '<p>Would you be willing to answer 3 questions?</p>';
    modalHtml += '<a href="http://surveyanalytics.com/t/ADVheZMTb8" target="_blank" id="mobile_survey_modal-yes">Yes</a>';
    modalHtml += '<a ';
    if (!m.isMobile()) { // only new window on desktop mode
      modalHTML += 'target="_blank" ';
    }
    modalHtml += 'id="mobile_survey_modal-no">No</a>';
    modalHtml += '</div>';
    $(modalHtml).appendTo('body');
  };

  this.hide = function (e) {
    $('#mobile_survey_modal').remove();
  };

  this.done = function (e) {
    document.cookie = 'isSurveyDone=1'; // unexpiring cookie
    m.hide();
  };

  this.undo = function (e) {
    document.cookie = 'isSurveyDone=0'; // unexpiring cookie
  };

  this.debug = function () {
    if (!m.options.debug) {
      return;
    }
    console.log('isMobile? ' + m.isMobile());
    console.log('isSurveyDone? ' + m.isSurveyDone());
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
    if (m.options.debug) {
      console.log(m.options);
    }
    $('body').on('click', '#mobile_survey_modal-yes, #mobile_survey_modal-no', m.done);
    var isInSampleGroup = true;
    if (m.options.ab) {
      isInSampleGroup = Math.floor(Math.random() * 2);
    }
    if (isInSampleGroup) {
      if (m.options.debug || (!m.isSurveyDone() && m.isMobile())) {
        m.show();
      }
    }
    else {
      if (m.options.debug) {
        console.log('Not in sample group');
      }
    }
  }

  return this;

}).call({});
