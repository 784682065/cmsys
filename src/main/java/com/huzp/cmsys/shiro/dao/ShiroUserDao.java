package com.huzp.cmsys.shiro.dao;

import com.huzp.cmsys.shiro.entity.ShiroUser;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @Author: huzp
 * @Description:
 * @Date: 15:33 2018/1/18
 * @Modified By:
 */
@Component
public interface ShiroUserDao {

       //根据用户名查找用户
       ShiroUser getByUserName(String username);

       //根据id查找用户的role
       String  getById(Integer id);

       //根据roleid查找permission
       List<String> findPermissionsByRoleId(Integer roleid);

       //根据roleid查询出rolename
       String findRoleNameByRoleId(Integer roleid);

}