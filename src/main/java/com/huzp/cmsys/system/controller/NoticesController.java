package com.huzp.cmsys.system.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Author: huzp
 * @Description:
 * @Date: Created in  14:54 2018/3/27
 * @param:
 */
@Controller
@RequestMapping("/notices")
public class NoticesController {




    /**
     * 获取公告发布界面
     *
     * @return
     */
    @RequestMapping("")
    public String index() {

        return "/system/community/inform";
    }
}
