/**
 * Created by Ad8888 on 2016/12/6.
 */
var http = require('http');
var cheerio = require('cheerio');
var request = require('request');
var sqlite3 = require('sqlite3')
var w_url = 'http://www.ss.pku.edu.cn/index.php/newscenter/news/2391';
//全局变量i
var i = 0;
//函数 起点函数
function fetchUrl(url) {
    http.get(url, function (res) {
        var html = '';
        var titles = [];
        res.setEncoding('utf-8');
        // 监听data事件
        res.on('data', function (chunk) {
            html += chunk;
        });
        //都是回调
        res.on('end', function () {
            var $ = cheerio.load(html);
            var data = {
                title: $('div.article-title a').text().trim(),
                Time: $('.article-info a:first-child').next().text().trim(),
                link: "http://www.ss.pku.edu.cn" + $("div.article-title a").attr('href'),
                author: $('[title=供稿]').text().trim(),
                i: i++,
            };
            //下一个链接
            var nextLink = "http://www.ss.pku.edu.cn" + $("li.next a").attr('href');
            str1 = nextLink.split('-');
            str = encodeURI(str1[0]);
            if (i <= 500) {
                fetchUrl(str);
            }
            //输出   也可以存库
            console.log(typeof data.title)
            var db = new sqlite3.Database('sqlite.db', function () {
                db.run("create table test(name varchar(255),name1 varchar(255),name2 varchar(255))", function () {
                    db.run("insert into test values('" + data.title + "','" + data.Time + "','" + data.link + "')", function () {
                        db.all("select * from test", function (err, res) {
                            if (!err)
                                console.log(JSON.stringify(res));
                            else
                                console.log(err);
                        });
                    })
                })
            });

        })

    })
}
fetchUrl(w_url)