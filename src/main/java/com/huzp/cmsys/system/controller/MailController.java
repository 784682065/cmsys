package com.huzp.cmsys.system.controller;

import com.alibaba.fastjson.JSONObject;
import com.huzp.cmsys.base.BaseController;
import com.huzp.cmsys.shiro.ShiroKit;
import com.huzp.cmsys.system.dao.MailDao;
import com.huzp.cmsys.system.dao.UserDao;
import com.huzp.cmsys.system.entity.Mail;
import com.huzp.cmsys.system.entity.MyFile;
import com.huzp.cmsys.util.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


import java.util.Date;
import java.util.List;

/**
 * @Author: huzp
 * @Description:
 * @Date: 10:02 2018/3/1
 * @Modified By:
 */
@Controller
public class MailController extends BaseController{

    @Autowired
    MailDao mailDao;

    @Autowired
    UserDao userDao;

    /**
     * 打开查看邮件页面
     * @return
     */
    @RequestMapping("/checkmail")
    public String checkmail(Model model,Page<Mail> page){

        Integer username =Integer.parseInt(ShiroKit.getUser().getUsername());

        //根据usernmae查出他总共的文件数量
        Integer total = mailDao.findTotalMail(username);
        page.setTotalCount(total);

        int offset = (page.getCurrentPage() - 1) * page.getPageSize();
        int limit = page.getPageSize();

        List<Mail> myMailList = mailDao.checkMail(username,offset,limit);

        page.setDatas(myMailList);

        model.addAttribute("page",page);

        return "/system/mail/mail";
    }


    /**
     * 查看具体的邮件内容
     * @return
     */
    @RequestMapping("/checkMail")
    public String checkMail(@RequestParam("id") Integer id,Model model){

        Mail myMail = mailDao.checkMailById(id);

        System.out.println(myMail.toString());

        String byUsername = userDao.findByUsername(myMail.getCreateuser());

        System.out.println(byUsername.toString());

        model.addAttribute("myMail",myMail);

        model.addAttribute("byUsername",byUsername);

        //查看完修改此封邮件的status为 0
        mailDao.modifyMailStatus(id);


        return "/system/mail/checkMail";
    }

    /**
     * 是否有新邮件提示
     * @return
     */
    @RequestMapping("/mailtip")
    @ResponseBody
    public JSONObject mailtip(){
        JSONObject jsonObject =new JSONObject();
        Integer username =Integer.parseInt(ShiroKit.getUser().getUsername());

        //根据用户名查找所有邮件
        List<Mail> mailList = mailDao.checkMail1(username);
        //判断是否有邮件
        if(null != mailList){
            int flag = 0;
            //循环遍历邮件的status
            for (Mail mail:mailList) {
                if( 1 == mail.getStatus() ){
                    flag = 1;
                    break;
                }
            }
            if(0 == flag){
                jsonObject.put("status",0);
            }else{
                jsonObject.put("status",1);
            }
        }

        return jsonObject;
    }


    @RequestMapping("/deleteMail")
    public String deleteMail(@RequestParam("id") Integer id){

        mailDao.deleteMailById(id);

        System.out.println("删除成功");
        return REDIRECT+"/checkmail";
    }


    /**
     * 跳转邮件界面
     * @return
     */
    @RequestMapping("editmail")
    public  String editmail(){

        return  "/system/mail/editMail";
    }

    /**
     * 具体编写邮件页面
     */
    @RequestMapping("editMail")
    @ResponseBody
    public JSONObject  editMail(){

        JSONObject jsonObject = new JSONObject();

        String title = super.getPara("title").trim();
        String sendee = super.getPara("sendee").trim();
        String contents = super.getPara("contents").trim();
        String username = ShiroKit.getUser().getUsername();


        userDao.findByUsername(Integer.parseInt(sendee));

        Mail mail = new Mail();



        if(true){
            mail.setTitle(title);
            mail.setContents(contents);
            mail.setCreateuser(Integer.parseInt(username));
            mail.setSenddata(new Date());
            mail.setStatus(1);
            mail.setSendee(Integer.parseInt(sendee));

            System.out.println(mail);

            mailDao.saveMail(mail);

            jsonObject.put("status",1);

        }else {
            jsonObject.put("status",2);
        }

        return jsonObject;
    }


    /**
     * 查看发件箱
     * @return
     */
    @RequestMapping("/outbox")
    public  String outbox(Model model,Page<Mail> page){

        Integer username =Integer.parseInt(ShiroKit.getUser().getUsername());

        //根据usernmae查出他总共的发出的数量
        Integer total = mailDao.findTotalMail1(username);
        page.setTotalCount(total);

        int offset = (page.getCurrentPage() - 1) * page.getPageSize();
        int limit = page.getPageSize();

        List<Mail> myMailList = mailDao.checkMailByCreateuser(username,offset,limit);

        page.setDatas(myMailList);

        model.addAttribute("page",page);

        return "/system/mail/outBox";
    }


    /**
     * 查看具体的邮件内容
     * @return
     */
    @RequestMapping("/checkoutbox")
    public String checkoutbox(@RequestParam("id") Integer id,Model model){

        Mail myMail = mailDao.checkMailById(id);

        System.out.println(myMail.toString());

        String byUsername = userDao.findByUsername(myMail.getCreateuser());

        System.out.println(byUsername.toString());

        model.addAttribute("myMail",myMail);

        model.addAttribute("byUsername",byUsername);


        return "/system/mail/checkoutbox";
    }
}
