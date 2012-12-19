var $ = require("cheerio");
var request = require("request");

exports.rss = function(req, res) {
    request("http://himekyun.jp/pc/", function(err, response, body) {
        if (!err && response.statusCode == 200) {
            var $html = $(body);
            var data = [];
            $html.find(".px1").each(function() {
                var title = $(this).text();
                var date = $(this).next().text();
                // date format is (yyyy/mm/dd)
                console.log("title: " + date);
                console.log("date: " + date);
                if (date.match(/（[\d][\d][\d][\d]\/[\d][\d]\/[\d][\d]）/)) {
                    var yyyy = date.match(/（([\d][\d][\d][\d])/)[1];
                    var mm = date.match(/（[\d][\d][\d][\d]\/([\d][\d])/)[1];
                    var dd = date.match(/（[\d][\d][\d][\d]\/[\d][\d]\/([\d][\d])/)[1];
                    data.push({
                        title: title,
                        date: yyyy + "-" + mm + "-" + dd + "T00:00:00+09:00"
                    });
                }
            });
            res.contentType("xml");
            res.render("rss", {
                title: "ひめキュンフルーツ缶",
                link: "http://himenano-update.herokuapp.com/hime",
                data: data
            });
        }
        else {
            console.log("something wrong");
            res.send(500);
        }
    });
};

