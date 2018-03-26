package com.huzp.cmsys.system.controller;

import com.alibaba.fastjson.JSONObject;
import com.huzp.cmsys.base.BaseController;
import com.huzp.cmsys.shiro.ShiroKit;
import com.huzp.cmsys.system.dao.ApplyCMDao;
import com.huzp.cmsys.system.dao.PageDao;
import com.huzp.cmsys.system.dao.UserDao;
import com.huzp.cmsys.system.entity.ApplyCM;
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
 * @Description: 社团管理controller
 * @Date: 9:50 2018/3/9
 * @Modified By:
 */
@Controller
public class MagCmController extends BaseController{

    @Autowired
    ApplyCMDao applyCMDao;

    @Autowired
    UserDao userDao;

    @Autowired
    PageDao pageDao;

    /**
     * 打开管理申请页面
     * 前台还需做if 判断allMes 是否为空
     * @return
     */
    @RequestMapping(value= {"/magapply","/"})
    public String MagApply(Model model,Page<List<Map<String,Object>>> page){


        Integer total = applyCMDao.getTotal();

        page.setTotalCount(total);
        int offset = (page.getCurrentPage() - 1) * page.getPageSize();
        int limit = page.getPageSize();

        List<Map<String,Object>> allMes = applyCMDao.findAllMes(offset,limit);


        model.addAttribute("allMes",allMes);
        model.addAttribute("page",page);

        return "/system/community/magApply";
    }

    /**
     * 查看申请的具体内容
     * @param id
     * @return
     */
    @RequestMapping("/checkApply")
    public String CheckApply(@RequestParam("id") Integer id,Model model){

        //查出mes
        Map<String, Object> mesById = applyCMDao.findMesById(id);

        model.addAttribute("mesById",mesById);

        //更改status
        applyCMDao.UpdateStatusById(id);

        return "/system/community/checkMes";
    }


    /**
     * 拒绝申请通过
     * @param id
     * @return
     */
    @RequestMapping("/rejectApply")
    @ResponseBody
    public JSONObject rejectApply(@RequestParam("mesId") Integer id){

        JSONObject jsonObject = new JSONObject();
        String sign="FAILUR";
        applyCMDao.UpdateSignById(id,sign);


        jsonObject.put("status","成功");

        return jsonObject;
    }


    @RequestMapping("/passApply")
    @ResponseBody
    public JSONObject passApply(){
        
        JSONObject jsonObject = new JSONObject();

        super.getPara("name");

        Map<String, Object> CommunityMes = super.getRequestParameters();

        String sign="SUCCESS";

        //1.社团表+1
        applyCMDao.addCommunity(CommunityMes);

        Integer cmId = applyCMDao.findCmIdByName((String) CommunityMes.get("cmname"));

        CommunityMes.put("cmId",cmId);

        //2.社团社长人员表插入信息
        applyCMDao.addMemberProprieter(CommunityMes);

        //3.发送邮件通知
        // TODO: 2018/3/23   发送邮件通知

        //4.修改申请消息状态为成功
        applyCMDao.UpdateSignById((Integer.parseInt((String) CommunityMes.get("id"))),sign);

        //5.将身份修改为社长
        userDao.updateRole( Integer.parseInt((String)CommunityMes.get("applicant")));

        jsonObject.put("status","成功");

        return jsonObject;
    }

}
