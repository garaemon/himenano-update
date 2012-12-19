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
                    var date_obj = new Date();
                    var yyyy = parseInt(date.match(/（([\d][\d][\d][\d])/)[1], 10);
                    var mm = parseInt(date.match(/（[\d][\d][\d][\d]\/([\d][\d])/)[1], 10);
                    var dd = parseInt(date.match(/（[\d][\d][\d][\d]\/[\d][\d]\/([\d][\d])/)[1], 10);
                    date_obj.setFullYear(yyyy);
                    date_obj.setMonth(mm - 1);
                    date_obj.setDate(dd);
                    date_obj.setTime(date_obj.getTime() - 9 * 60 * 60 * 1000);
                    data.push({
                        title: title,
                        date: date_obj.toString()
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

