// success시, iframe 태그를 부모 창에 전송함.
// 성공한 경우에 한정해, 다시 VisitorCounter.php에 데이터를 전송해 방문 수를 체크함
(async function(){
  $.ajax({
      crossOrigin: true,
      type: "GET",
      url : "https://evcommentservice.ga/php-Action/URLVerification.php",
      data : {
          UserName : blogOwner,
          PageIdentifier : pageIdentifier,
          SiteURL : siteURL,
          EmotionalAnalysisMode : evMode,
          PageTitle: pageTitle
      },
      dataType:"HTML",

      success : function(response) {
          $('#EV-Start').append(response);

          $.ajax({
              crossOrigin: true,
              type: "POST",
              url : "https://evcommentservice.ga/php-Action/VisitorCounter.php",
              data : {
                  SiteURL : siteURL,
                  PageIdentifier : pageIdentifier
              },
              dataType:"HTML",

              success : function(response) {
                  console.log(response);
                  console.log("방문 수 체크 로직 실행 성공");
              },
              error: function(jqXHR, textStatus, errorThrown) {
                  console.log("Ajax 수신에 실패했습니다!" + jqXHR.responseText);
              }
            });
      },
      error: function(jqXHR, textStatus, errorThrown) {
          console.log("Ajax 수신에 실패했습니다!" + jqXHR.responseText);
      }
  });
})().then(() =>{

});

window.addEventListener('message', function(e) {
  if(e.origin == "https://evcommentservice.ga"){
    document.getElementById('EV-Iframe').height = e.data.height;
  }
});
