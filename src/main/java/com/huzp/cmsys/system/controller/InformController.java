package com.huzp.cmsys.system.controller;

import com.alibaba.fastjson.JSONObject;
import com.huzp.cmsys.base.BaseController;
import com.huzp.cmsys.shiro.ShiroKit;
import com.huzp.cmsys.system.dao.InformDao;
import com.huzp.cmsys.util.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

/**
 * @Author: huzp
 * @Description:
 * @Date: Created in  14:22 2018/3/27
 * @param:
 */
@Controller
public class InformController extends BaseController {


    @Autowired
    InformDao informDao;


    /**
     * 获取活动发布界面
     *
     * @return
     */
    @RequestMapping("/inform")
    public String inform(Model model, @RequestParam("id") String id) {

        model.addAttribute("id",id);
        //类型2 为活动
        model.addAttribute("type",2);


        return "/system/community/inform";
    }

    /**
     * 获取通知发布界面
     *
     * @return
     */
    @RequestMapping("/notices")
    public String notices(Model model) {

        //类型1 为通知
        model.addAttribute("type",1);

        return "/system/community/notices";
    }


    @RequestMapping("/informsave")
    @ResponseBody
    public JSONObject informsave(){

        JSONObject jsonObject = new JSONObject();

        Integer username = Integer.parseInt(ShiroKit.getUser().getUsername());

        Map<String, Object> inform = super.getRequestParameters();

        inform.put("username",username);

        //save inform
        informDao.saveInform(inform);

        jsonObject.put("status","成功");

        return  jsonObject;
    }


    @RequestMapping("/noticessave")
    @ResponseBody
    public JSONObject noticessave(){

        JSONObject jsonObject = new JSONObject();
        Integer username = Integer.parseInt(ShiroKit.getUser().getUsername());

        Map<String, Object> notices = super.getRequestParameters();

        notices.put("username",username);

        //save notices
        informDao.saveNotices(notices);

        jsonObject.put("status","成功");
        return  jsonObject;
    }


    /**
     * 社团的活动
     * @return
     */
    @RequestMapping(value = {"/cminform","/"})
    public String cminform(@RequestParam("cmid") String cmid,Model model,Page<Map<String,Object>> page){

        //根据社团id查找活动 1.type为2 cmid

        int  id1 = Integer.parseInt(cmid);
        //该社团的活动总条数id
        Integer total = informDao.getTotalCmInform(id1);

        page.setTotalCount(total);
        int offset = (page.getCurrentPage() - 1) * page.getPageSize();
        int limit = page.getPageSize();

        List<Map<String, Object>> cmInform = informDao.cmInform(id1,offset,limit);
        page.setDatas(cmInform);

        model.addAttribute("page",page);
        model.addAttribute("cmid",id1);


        return "/system/community/cminform";
    }

    /**
      * @author hzp
      * @param
      * @description 全部的公告
      * @return
      */
    @RequestMapping(value = {"/allnotices","/"})
    public String allnotices(Model model,Page<Map<String,Object>> page){


        //通知的全部条数
        Integer total = informDao.getTotalNotices();

        page.setTotalCount(total);
        int offset = (page.getCurrentPage() - 1) * page.getPageSize();
        int limit = page.getPageSize();

        List<Map<String, Object>> Allnotices = informDao.Allnotices(offset,limit);
        page.setDatas(Allnotices);

        model.addAttribute("page",page);


        return "/system/community/allnotices";
    }



    /**
      * @author hzp
      * @param
      * @description 打开所有mes 数据页面
      * @return
      */
    @RequestMapping("/allinform")
    public String  allmes(Model model,Page<Map<String,Object>> page){

        //通知的全部条数
        Integer total = informDao.getTotal();

        page.setTotalCount(total);
        int offset = (page.getCurrentPage() - 1) * page.getPageSize();
        int limit = page.getPageSize();

        List<Map<String, Object>> Allnotices = informDao.Allmes(offset,limit);
        page.setDatas(Allnotices);

        model.addAttribute("page",page);


        return "/system/community/allmes";
    }



}