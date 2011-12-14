var mobileSurveyModal = (function() {
  var m = this;

  // detect mobile browsers, case insensitive
  this.isMobile = function() {
    if (navigator.userAgent.match(/Android/i)
     || navigator.userAgent.match(/webOS/i)
     || navigator.userAgent.match(/iPhone|iPod|iPad/i)
     || navigator.userAgent.match(/Blackberry|Rim|WebOS/i)
     || navigator.userAgent.match(/mobile/i) // misc mobile including IEMobile
    ) { // is mobile UA
      return true;
    }
    return false;
  };

  this.isMobileSurveyDone = function() {
    var cookieValue = document.cookie.match('(^|;) ?isMobileSurveyDone=([^;]*)(;|$)');
    return cookieValue && (cookieValue[2] == 1) ? true : false;
  }

  // read survey cookie, show survey
  this.show = function() {
    if ($('#mobile_survey_modal').length) return;
    if (window.mobileSurveyDebug) m.debug();

    var modalHtml = '';
    modalHtml += '<div id="mobile_survey_modal">';
    modalHtml += '<p>Please help us by taking a brief survey about this mobile site.</p>';
    modalHtml += '<a href="http://surveyanalytics.com/t/ADVheZMTb8" target="_blank" id="mobile_survey_modal-take">Click here to take the survey.</a>';
    modalHtml += '<a target="_blank" id="mobile_survey_modal-later">Take it later</a>';
    modalHtml += '<a target="_blank" id="mobile_survey_modal-never">No, thanks</a>';
    modalHtml += '</div>';
    $(modalHtml).appendTo('body');
  };

  this.hide = function(e) {
    $('#mobile_survey_modal').remove();
  };

  this.done = function(e) {
    document.cookie = 'isMobileSurveyDone=1'; // unexpiring cookie
    m.hide();
  };

  this.undo = function(e) {
    document.cookie = 'isMobileSurveyDone=0'; // unexpiring cookie
  };

  this.debug = function() {
    console.log('isMobile? ' + m.isMobile());
    console.log('isMobileSurveyDone? ' + m.isMobileSurveyDone());
  };

  this.init = function() {
    $('body').on('click', '#mobile_survey_modal-take, #mobile_survey_modal-never', m.done);
    $('body').on('click', '#mobile_survey_modal-later', m.hide);
    if (window.mobileSurveyDebug || (!m.isMobileSurveyDone() && m.isMobile())) m.show();
  }

  return this;

}).call({});
