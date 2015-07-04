var Weaved = (function() {
  var ajaxOpt = {method:"get"};
  function updateResponse(data, status, jqXHR) {
    $("#weavedResponse").html(data);
  }
  return {
    weavedOn: function() {
      $.ajax("/api/weaved/on", ajaxOpt)
        .done(updateResponse);
    },
    weavedOff: function() {
      $.ajax("/api/weaved/off", ajaxOpt)
        .done(updateResponse);
    },
    weavedStatus: function() {
      $.ajax("/api/weaved/status", ajaxOpt)
        .done(function(data, status, jqXHR) {
          if(data == "1") {
            $("#weavedStatus").html("on");
          } else if(data == "0") {
            $("#weavedStatus").html("off");
          }
        });
    }
  }
})();
