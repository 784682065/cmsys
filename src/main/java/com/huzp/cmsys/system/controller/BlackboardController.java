package com.huzp.cmsys.system.controller;

import com.alibaba.fastjson.JSONObject;
import com.huzp.cmsys.base.BaseController;
import com.huzp.cmsys.system.dao.InformDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @Author: huzp
 * @Description:
 * @Date: Created in  13:59 2018/3/27
 * @param:
 */
@Controller
@RequestMapping("/blackboard")
public class BlackboardController extends BaseController {

    @Autowired
    InformDao informDao;

    /**
     * 跳转到黑板
     */
    @RequestMapping("")
    public String blackboard() {

        return "/blackboard";
    }


    /**
      * @author hzp
      * @param
      * @description 获取前五条通知和活动,初始化首页
      * @return
      */
    @RequestMapping("/getAll")
    @ResponseBody
    public JSONObject getAll(){

        JSONObject jsonObject = new JSONObject();
        List<List<Map<String, Object>>> rs = new ArrayList<>();

        List<Map<String, Object>> inform = informDao.get5Inform();

        List<Map<String, Object>> notices = informDao.get5Notices();

        rs.add(inform);
        rs.add(notices);

        jsonObject.put("rs",rs);


        return jsonObject;
    }




}