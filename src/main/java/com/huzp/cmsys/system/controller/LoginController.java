package com.huzp.cmsys.system.controller;


import com.huzp.cmsys.shiro.ShiroKit;
import com.huzp.cmsys.base.BaseController;
import com.huzp.cmsys.shiro.dao.ShiroUserDao;
import com.huzp.cmsys.shiro.entity.ShiroUser;
import com.huzp.cmsys.system.dao.MenuDao;
import com.huzp.cmsys.system.node.MenuNode;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * @Author: huzp
 * @Description:
 * @Date: 16:33 2018/1/24
 * @Modified By:
 */

@Controller
public class LoginController extends BaseController{


    @Autowired
    MenuDao menuDao;

    @Autowired
    ShiroUserDao shiroUserDao;

    /**
     *
     * 点击登录执行的动作
     *
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String userlogin(Model model) {
        String username = super.getPara("username").trim();
        String password = super.getPara("password").trim();
        Subject subject = SecurityUtils.getSubject();
        UsernamePasswordToken token = new UsernamePasswordToken(username, password);

        try {
            subject.login(token);
        } catch (Exception e) {
            model.addAttribute("tips","账户或者密码错误");
            return "login";
        }
        return REDIRECT + "/";
    }

    /**
     *
     *跳转到登录界面
     *
     */
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login(){
        return "login";
    }



    /**
     *
     * 跳转到主页
     *
     */
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index(Model model){
        //获取菜单列表
        List<Integer> roleList =   ShiroKit.getUser().getRolelist();
        if (roleList == null || roleList.size() == 0) {
            ShiroKit.getSubject().logout();
            System.out.println("tips " + " 该用户没有角色，无法登陆");
            return "/login";
        }
        //根据rolelist查询出menu菜单

        List<MenuNode> menus = menuDao.getMenusByRoleIds(roleList);
//        System.out.println(menus.toString());
        List<MenuNode> titles = MenuNode.buildTitle(menus);
//        System.out.println(titles);

        List<String> roleNameList = new ArrayList<>();

        for (Integer roleId: roleList) {

            String roleName = shiroUserDao.findRoleNameByRoleId(roleId);
            //添加到roleNameSet 中
            roleNameList.add(roleName);
        }

        model.addAttribute("titles", titles);
        model.addAttribute("roleNameList",roleNameList);


        //获取用户头像
//        Integer id = ShiroKit.getUser().getId();
//        User user = userMapper.selectById(id);
//        String avatar = user.getAvatar();
//        model.addAttribute("avatar", avatar);


        return "index";
    }

    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public String logOut() {
        Subject currentUser = SecurityUtils.getSubject();
        currentUser.logout();
        return "login";
    }


    @RequestMapping(value = "/user", method = RequestMethod.GET)
    @RequiresPermissions("add")//权限管理;
    public String dept() {
        System.out.println("测试");
        return "404";
    }

//
//    private String loginMethod(String username, String password) {
//
//        Subject subject = SecurityUtils.getSubject();
//        UsernamePasswordToken token = new UsernamePasswordToken(username, password);
//
//        try {
//            subject.login(token);
//        }catch (UnknownAccountException e){
//            System.out.println("账户不存在");
//            return "404";
//        } catch (IncorrectCredentialsException e){
//
//        }catch (AuthenticationException e) {
//            e.printStackTrace();
//            return "404";
//        }
//
//        return  "redirect:/";
//    }



}
