package com.huzp.cmsys.system.controller;

import com.alibaba.fastjson.JSONObject;
import com.huzp.cmsys.base.BaseController;
import com.huzp.cmsys.shiro.ShiroKit;
import com.huzp.cmsys.system.dao.MyCMDao;
import com.huzp.cmsys.util.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;


/**
 * @Author: huzp
 * @Description:
 * @Date: Created in 13:33 2018/3/25
 * @param:
 */

@Controller
public class MyCMController extends BaseController{

    @Autowired
    MyCMDao myCMDao;


    /**
     * 打开MyCommunity页面
     * @return
     */
    @RequestMapping(value = {"/mycm","/"})
    public String mycm(Model model, Page<Map<String,Object>> page){

        Integer username = Integer.parseInt(ShiroKit.getUser().getUsername());

        Integer total = myCMDao.getTotal();

        page.setTotalCount(total);
        int offset = (page.getCurrentPage() - 1) * page.getPageSize();
        int limit = page.getPageSize();

        List<Map<String, Object>> myCM = myCMDao.findMyCM(username,offset,limit);
        page.setDatas(myCM);

        model.addAttribute("page",page);


        return  "/system/community/myCommunity";
    }

    /**
      * @author hzp
      * @param
      * @description
      * @return
      */
    @RequestMapping("/checkMycm")
    public String checkMycm(Model model){

        String cmid = super.getPara("cmid");
        String position = super.getPara("position");
        //根据cmid查询出社团信息
        Map<String, Object> cm = myCMDao.findCM(Integer.parseInt(cmid));
        model.addAttribute("cm",cm);

        //社长的编辑页面
        if( null != position && position.equals("1") ){
            return "/system/community/editMyCM";
        }else if (null != position && position.equals("2")){
            return "/system/community/checkMyCM";
        }else {
            return "/404";
        }


    }


    @RequestMapping("/updateMyCm")
    @ResponseBody
    public JSONObject updateMyCm(){

        JSONObject jsonObject = new JSONObject();
        Map<String, Object> cmMes = super.getRequestParameters();

        myCMDao.updateCM(cmMes);
        jsonObject.put("status","成功");

        return jsonObject;
    }

}
