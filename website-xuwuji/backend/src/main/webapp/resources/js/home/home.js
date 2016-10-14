     $(document).ready(function () {
         getDailyHotNews('');
         getType();
         login();
         autofill();
     });

     function getDailyHotNews(type) {
         $
             .ajax({
                 type: "GET",
                 url: "/backend/news/dailyHotnews?time=&type=" + type,
                 contentType: " charset=utf-8 ",
             }).done(function (data) {
                 fixNewsContent(data);
                 if (type === '') {
                     fixButton("全部类别");
                 } else {
                     fixButton(type);
                 }
             });
     }

     function fixNewsContent(data) {
         var str = '';
         $
             .each(
                 data,
                 function (index, news) {
                     str = '<p> <a href=\'backend/news/' + news.id + '\'>' + news.title + '</a></p>' + str;
                     console.log(news.title);
                 });
         $('#hotNews').html(str);
     }

     function getType() {
         var typePart = '<li onclick=getDailyHotNews(\'' + '\')><a>全部类别</a></li>';
         $.ajax({
             type: "GET",
             url: "/backend/news/type",
         }).done(
             function (data) {
                 $.each(data, function (index, type) {
                     typePart = typePart + '<li onclick=getDailyHotNews(\'' + type + '\')><a> ' + type + '</a></li>'
                     console.log(type);
                 });
                 typePart = typePart + '</li>';
                 $('#typeContent').html(typePart);
                 console.log(typePart);
             });
     }

     function fixButton(type) {
         $('#typeButton').html(type);
     }

     function login() {
         $
             .ajax({
                 type: "GET",
                 url: "/backend/login/checkStatus",
             })
             .done(
                 function (data) {
                     //console.log(data);
                     if (data === '') {
                         console.log("not login");
                     } else {
                         var str = "<a href=\"backend/user/profile\">" + $.trim(data) + "</a>"
                             //console.log(data + " login");
                         $('#loginUsername').html(str);

                         $('#registerButton').attr("style",
                             "display:none");
                         $('#commandButton').attr("style", "");
                         var commands = "<li><a href=\"backend/user/profile\">个人信息</a></li><li role = \"separator\" class = \"divider\"> </li> <li> <a href = \"backend/login/logout\"> 退出 </a></li>";
                         $('#commands').html(commands);

                     }
                 });
     }


     function autofill() {
         $('#searchWord').keydown(function () {
             var value = $('#searchWord').val();
             console.log(value);
         });

     }
