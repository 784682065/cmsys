package com.huzp.cmsys.system.controller;

import com.huzp.cmsys.base.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Author: huzp
 * @Description:
 * @Date: Created in  13:59 2018/3/27
 * @param:
 */
@Controller
@RequestMapping("/blackboard")
public class BlackboardController extends BaseController {

    /**
     * 跳转到黑板
     */
    @RequestMapping("")
    public String blackboard() {

        return "/blackboard";
    }
}