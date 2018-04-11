package com.huzp.cmsys.system.dao;

import com.huzp.cmsys.system.entity.Mail;
import org.apache.ibatis.annotations.Param;
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

    //查询这个用户收到的邮件记录总条数
    Integer findTotalMail(@Param("sendee") Integer sendee);

    //查询这个用户发送的邮件记录总条数
    Integer findTotalMail1(@Param("createuser") Integer createuser);

    //根据接收人查找邮件list
    List<Mail> checkMail(@Param("sendee") Integer sendee,
                         @Param("offset") int offset, @Param("limit") int limit);

    //根据id查找具体邮件
    Mail checkMailById(Integer id);

    //根据id 修改邮件的状态
    void modifyMailStatus(Integer id);

    //根据id 删除邮件
    void deleteMailById(Integer id);

    //存储邮件
    void saveMail(Mail mail);

    //根据发送人查找邮件
    List<Mail> checkMailByCreateuser(@Param("createuser") Integer createuser,
                               @Param("offset") int offset, @Param("limit") int limit);

    //根据用户名查找所有邮件
    List<Mail> checkMail1(@Param("sendee") Integer sendee);
}
