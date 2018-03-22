package com.huzp.cmsys.system.dao;

import com.huzp.cmsys.system.entity.User;
import org.springframework.stereotype.Component;

/**
 * @Author: huzp
 * @Description:
 * @Date: 13:20 2018/1/29
 * @Modified By:
 */
@Component
public interface UserDao {

    //根据用户id 查询用户信息
    User findById(Integer userid);

    //根据用户id修改用户密码
    void  updatePwdById(User user);

    //用户自己根据用户id 修改用户信息
    void editUserinfoById(User user);

    //根据username 查找用户名
    String findByUsername(Integer username);
}
