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
                data.push({
                    title: title,
                    date: date
                });
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

