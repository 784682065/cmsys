package com.huzp.cmsys.system.controller;

import com.huzp.cmsys.base.BaseController;
import com.huzp.cmsys.exception.BizExceptionEnum;
import com.huzp.cmsys.exception.BussinessException;
import com.huzp.cmsys.shiro.ShiroKit;
import com.huzp.cmsys.shiro.dao.ShiroUserDao;
import com.huzp.cmsys.system.dao.UserDao;
import com.huzp.cmsys.system.entity.User;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * @Author: huzp
 * @Description:
 * @Date: 10:25 2018/1/29
 * @Modified By:
 */
//@RequiresPermissions("user:create") 注解权限控制
@Controller
public class UserController extends BaseController{

    private static String PREFIX = "system/user/";

    @Resource
    UserDao userDao;

    @Autowired
    ShiroUserDao shiroUserDao;

    /**
     * @author huzp
     * @description 返回用户信息页面
     * @param model
     * @return
     */
    @RequestMapping("/userinfo")
    public String userinfo(Model model){

        Integer userid = ShiroKit.getUser().getId();
        User user = userDao.findById(userid);

        model.addAttribute("user",user);

        //获取rolename
        List<Integer> roleList = ShiroKit.getUser().getRolelist();
        List<String> roleNameList = new ArrayList<>();
        for (Integer roleId: roleList) {
            String roleName = shiroUserDao.findRoleNameByRoleId(roleId);
            //添加到roleNameSet 中
            roleNameList.add(roleName);
        }
        model.addAttribute("roleNameList",roleNameList);

        System.out.printf("ceshi  sourcetree");
        return PREFIX + "user_view";
    }

    /**
     * @description 返回用户修改密码页面
     * @return
     */
    @RequestMapping("/userchpwd")
    public String userchpwd(){

        return PREFIX+"user_chpwd";

    }

    /**
     * @description 修改用户密码
     * @return
     */
    @RequestMapping("/changePwd")
    @ResponseBody
    public Object changePwd(@RequestParam String oldPwd, @RequestParam String newPwd, @RequestParam String rePwd) {
        if (!newPwd.equals(rePwd)) {
            throw new BussinessException(BizExceptionEnum.TWO_PWD_NOT_MATCH);
        }
        Integer userId = ShiroKit.getUser().getId();
        User user = userDao.findById(userId);
        if (user.getPassword().equals(oldPwd)) {
            user.setPassword(newPwd);
            //更新用户密码
            userDao.updatePwdById(user);
            return SUCCESS_TIP;
        } else {
            throw new BussinessException(BizExceptionEnum.OLD_PWD_NOT_RIGHT);
        }
    }

    @RequestMapping("/editUserinfo")
    public String editUser(@RequestParam String email, @RequestParam String birthday,@RequestParam String phone){
        Integer userId = ShiroKit.getUser().getId();
        User user = userDao.findById(userId);
        user.setEmail(email);
        user.setBirth(birthday);
        user.setPhone(phone);
        userDao.editUserinfoById(user);
        User u =userDao.findById(userId);
        System.out.println(u.toString());
        return REDIRECT + "/userinfo";
    }



}
