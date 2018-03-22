package com.huzp.cmsys.shiro;

import com.huzp.cmsys.shiro.dao.ShiroUserDao;
import com.huzp.cmsys.shiro.entity.ShiroUser;
import com.huzp.cmsys.util.ToolUtil;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

/**
 * @Author: huzp
 * @Description:
 * @Date: 16:33 2018/1/22
 * @Modified By:
 */
public class ShiroUserRealm extends AuthorizingRealm {


    @Autowired
    ShiroUserDao shiroUserDao;

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {

        ShiroUser shiroUser = (ShiroUser) principalCollection.getPrimaryPrincipal();
        System.out.println("用户信息 :"+shiroUser.toString() );

        String  roles = shiroUserDao.getById(shiroUser.getId());
        String[] split = roles.split(",");
        List<Integer> rolelist = new ArrayList<>();
        for (int i=0;i<split.length;i++){
            rolelist.add(i,Integer.parseInt(split[i]));
        }
        shiroUser.setRolelist(rolelist);
        System.out.println(shiroUser.getRolelist());


        Set<String> permissionSet = new HashSet<>();
        Set<String> roleNameSet = new HashSet<>();

        for (Integer roleId : rolelist) {
            //编写一个查找权限的sql
            List<String> permissions = shiroUserDao.findPermissionsByRoleId(roleId);
//            System.out.println(permissions.toString());
            //将权限添加到permissionSet中
            if (permissions != null) {
                for (String permission : permissions) {
                    if (ToolUtil.isNotEmpty(permission)) {
                        permissionSet.add(permission);
                    }
                }
            }
            //根据roleid 查询出roleName
            String roleName = shiroUserDao.findRoleNameByRoleId(roleId);
            //添加到roleNameSet 中
            roleNameSet.add(roleName);
        }

        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
        //添加到SimpleAuthorizationInfo 然后return
        info.addStringPermissions(permissionSet);
        info.addRoles(roleNameSet);
        return info;
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {

        UsernamePasswordToken token = (UsernamePasswordToken) authenticationToken;
        String userName=token.getUsername();

        ShiroUser user = shiroUserDao.getByUserName(userName);

        if ( null == user){
            System.out.println("如果没有此账户");
            throw new UnknownAccountException("不存在此账户");   //如果没有此账户
        }

        String password = new String((char[])token.getCredentials());

        if (password.equals(user.getPassword()) && password != null) {
            //设置用户session
            Session session = SecurityUtils.getSubject().getSession();
            session.setAttribute("user", user);

            System.out.println(user);
            //设置rolelist
            String  roles = shiroUserDao.getById(user.getId());

            System.out.println(roles);

            String[] split = roles.split(",");
            List<Integer> rolelist = new ArrayList<>();
            for (int i=0;i<split.length;i++){
                rolelist.add(i,Integer.parseInt(split[i]));
            }
            user.setRolelist(rolelist);

            return new SimpleAuthenticationInfo(user,user.getPassword(),getName());
        } else {
            throw new IncorrectCredentialsException("用户密码错误");  //如果密码错误
        }

    }
}
