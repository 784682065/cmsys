package com.huzp.cmsys.system.dao;

import com.huzp.cmsys.system.entity.Mail;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @Author: huzp
 * @Description: 邮件dao
 * @Date: 13:25 2018/3/1
 * @Modified By:
 */
@Component
public interface MailDao {

    //根据接收人查找邮件list
    List<Mail> checkMail(Integer sendee);

    //根据id查找具体邮件
    Mail checkMailById(Integer id);

    //根据id 修改邮件的状态
    void modifyMailStatus(Integer id);

    //根据id 删除邮件
    void deleteMailById(Integer id);

    //存储邮件
    void saveMail(Mail mail);

    //根据发送人查找邮件
    List<Mail> checkMailByCreateuser(Integer createuser);
}
