package com.huzp.cmsys.system.controller;

import com.alibaba.fastjson.JSONObject;
import com.huzp.cmsys.base.BaseController;
import com.huzp.cmsys.shiro.ShiroKit;
import com.huzp.cmsys.support.HttpKit;
import com.huzp.cmsys.system.dao.ApplyCMDao;
import com.huzp.cmsys.system.dao.UserDao;
import com.huzp.cmsys.system.entity.ApplyCM;
import com.huzp.cmsys.system.entity.User;
import com.huzp.cmsys.util.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @Author: huzp
 * @Description: 普通学生社团controller
 * @Date: 14:16 2018/3/7
 * @Modified By:
 */
@Controller
public class StudentCmController extends BaseController {


    @Autowired
    UserDao userDao;

    @Autowired
    ApplyCMDao applyCMDao;


    /**
     * @param model
     * @return
     * @author huzp
     * @description 打开申请个人社团页面
     */
    @RequestMapping("/createcm")
    public String createcm(Model model) {

        Integer userid = ShiroKit.getUser().getId();
        User user = userDao.findById(userid);
        model.addAttribute("user", user);


        return "system/community/createCM";
    }


    /**
     * 保存申请信息
     * @return
     */
    @RequestMapping("/applyCM")
    @ResponseBody
    public JSONObject applyCM(){
        JSONObject jsonObject = new JSONObject();

        ApplyCM applyCM= new ApplyCM();

        String cmname = super.getPara("cmname");


        String createuser = applyCMDao.findCMByName(cmname);

        if(null == createuser || "".equals(createuser)){
            String applyreason = super.getPara("applyreason");
            String cmdirection = super.getPara("cmdirection");

            //set值
            applyCM.setApplicant(Integer.parseInt(ShiroKit.getUser().getUsername()));
            applyCM.setApplyreason(applyreason);
            applyCM.setCmdirection(cmdirection);
            applyCM.setCmname(cmname);
            applyCM.setCreatetime(new Date());
            applyCM.setStatus(1);
            applyCM.setType("申请个人社团");
            applyCM.setSign("NOTDECIDE");


            applyCMDao.saveMes(applyCM);

        jsonObject.put("status","成功");
        }
        else {

            jsonObject.put("status","失败");
            jsonObject.put("createuser",createuser);
        }


        return  jsonObject;
    }

    /**
     * @author hzp
     * @param
     * @description 打开申请加入社团页面
     * @return
     */
    @RequestMapping(value = {"/applyjoin","/"})
    public String applyJoin(Model model,Page<Map<String,Object>> page,String condition){


        Integer total = applyCMDao.getTotalCM();
        page.setTotalCount(total);
        int offset = (page.getCurrentPage() - 1) * page.getPageSize();
        int limit = page.getPageSize();

        //分页查找出所有的社团
        List<Map<String, Object>> allCM = applyCMDao.findAllCM(offset,limit,condition);
        page.setDatas(allCM);

        model.addAttribute("page",page);
        model.addAttribute("condition",condition);


        return "system/community/applyJoin";
    }


    /**
       * @author hzp
       * @param
       * @description 打开申请加入页面
       * @return
      */
    @RequestMapping("/join")
    public String join(Model model, @RequestParam("id") Integer cmid,@RequestParam("cmname") String cmname){

        Integer userid = ShiroKit.getUser().getId();
        User user = userDao.findById(userid);

        model.addAttribute("user", user);
        model.addAttribute("cmname",cmname);
        model.addAttribute("cmid",cmid);



        return  "system/community/applyjoinCM";
    }


    @RequestMapping("/applyjoinCM")
    @ResponseBody
    public JSONObject applyjoinCM(){

        JSONObject jsonObject =new JSONObject();
        int username = Integer.parseInt(ShiroKit.getUser().getUsername());

        //获取申请值
        Map<String, Object> applyForm = HttpKit.getRequestParameters();


        //判断是否加入过社团
        Integer cmid = Integer.parseInt((String)applyForm.get("cmid"));
        List<Map<String, Object>> myCm = applyCMDao.findMyCm(cmid, username);

        if (myCm.isEmpty()){
            applyForm.put("applicant",username);
            applyForm.put("status",1);
            applyForm.put("type","申请加入社团");
            applyForm.put("sign","NOTDECIDE");

            //将申请存入数据库
            applyCMDao.applyjoinCM(applyForm);

            jsonObject.put("status","成功");
        }else {
            jsonObject.put("status","失败");
        }


        return  jsonObject;
    }
}
