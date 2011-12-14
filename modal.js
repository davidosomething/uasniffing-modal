var mobileSurveyModal = (function() {
  var m = this;
  var debug = window.mobileSurveyDebug;

  this.isMobile = false;

  // detect mobile browsers, case insensitive
  this.detectMobile = function() {
    if (navigator.userAgent.match(/Android/i)
     || navigator.userAgent.match(/webOS/i)
     || navigator.userAgent.match(/iPhone|iPod|iPad/i)
     || navigator.userAgent.match(/Blackberry|Rim|WebOS/i)
     || navigator.userAgent.match(/mobile/i) // misc mobile including IEMobile
    ) { // is mobile UA
      m.isMobile = true;
    }
  };

  // read survey cookie, show survey
  this.show = function() {
    var cookieValue = document.cookie.match('(^|;) ?isMobileSurveyDone=([^;]*)(;|$)');
    var isMobileSurveyDone = cookieValue ? unescape(cookieValue[2]) : false;
    var isOpen = $('#mobile_survey_modal').length;

    if (debug) {
      console.log('isMobile? ' + m.isMobile);
      console.log('isMobileSurveyDone? ' + isMobileSurveyDone);
      console.log('isOpen? ' + isOpen);
    }

    if (isMobileSurveyDone == 1 || !m.isMobile || isOpen) return; // already done, not mobile, or already open

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

  this.init = function() {
    $('body').on('click', '#mobile_survey_modal-take, #mobile_survey_modal-never', m.done);
    $('body').on('click', '#mobile_survey_modal-later', m.hide);
    m.detectMobile();
    m.show();
  }

  return this;

}).call({});

$(mobileSurveyModal.init);
