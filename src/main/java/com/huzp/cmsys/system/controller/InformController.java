package com.huzp.cmsys.system.controller;

import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.databind.jsonFormatVisitors.JsonAnyFormatVisitor;
import com.huzp.cmsys.base.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @Author: huzp
 * @Description:
 * @Date: Created in  14:22 2018/3/27
 * @param:
 */
@Controller
public class InformController extends BaseController {





    /**
     * 获取活动发布界面
     *
     * @return
     */
    @RequestMapping("/inform")
    public String index(Model model, @RequestParam("id") String id) {

        model.addAttribute("id",id);
        //类型2 为活动
        model.addAttribute("type",2);


        return "/system/community/inform";
    }


    @RequestMapping("/informsave")
    @ResponseBody
    public JSONObject save(){

        JSONObject jsonObject = new JSONObject();

        //save inform




        jsonObject.put("status","成功");

        return  jsonObject;
    }
}