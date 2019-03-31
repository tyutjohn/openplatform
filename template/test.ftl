<!DOCTYPE html>  
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:th="http://www.thymeleaf.org"  
      xmlns:sec="http://www.thymeleaf.org/thymeleaf-extras-springsecurity3">  
    <head>  
        <title>Hello World!</title>  
    </head>  
    <body>
       <center>
       <h4>我的好友：</h4>  
       <#list friends as item>  
               姓名：${item.name} , 年龄${item.age}  
           <br>  
       </#list>  
       <#list articles as title>
        <div class="item">
                    <div class="item-heading">
                        <div class="pull-right"><span class="text-muted">${title.time}</span> &nbsp; <a
                                        href="#" class="text-muted"><i class="icon-comments"></i>${title.like}</a></div>
                                <h4><a href="###">${title.head}</a></h4>
                            </div>
                            <div class="item-content">
                                <div class="text">${title.content}</div>
                            </div>
                        </div>
                        </#list>
       </center>
    </body>  
</html>

package com.xsjt.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class StudentController {
    @RequestMapping("/freemarker")
    public String freemarker(Map<String, Object> map){
        
        // 模拟数据
        List<Map<String, Object>> articles = new ArrayList<Map<String, Object>>();
        Map<String, Object> article = new HashMap<String, Object>();
        article.put("time", "2019");
        article.put("like", 22);
        article.put("head","这是第一个文章的标题");
        article.put("content","第一篇文章的内容：此为测试文章文章文章");
        articles.add(article);
        article = new HashMap<String, Object>();
        article.put("time", "2010");
        article.put("like", 23);
        article.put("head","这是第二个文章的标题");
        article.put("content","第二篇文章的内容：此为测试文章文章文章");
        articles.add(article);
        map.put("articles", articles);
        return "freemarker";
    }
}