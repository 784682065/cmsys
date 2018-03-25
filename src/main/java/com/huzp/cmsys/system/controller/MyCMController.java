package com.huzp.cmsys.system.controller;

import com.huzp.cmsys.shiro.ShiroKit;
import com.huzp.cmsys.system.dao.MyCMDao;
import com.huzp.cmsys.util.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Map;


/**
 * @Author: huzp
 * @Description:
 * @Date: Created in 13:33 2018/3/25
 * @param:
 */

@Controller
public class MyCMController {

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

        model.addAttribute("myCM",myCM);


        return  "/system/community/myCommunity";
    }

}
