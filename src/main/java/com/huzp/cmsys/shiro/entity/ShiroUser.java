package com.huzp.cmsys.shiro.entity;


import java.util.List;

/**
 * @Author: huzp
 * @Description:
 * @Date: 10:40 2018/1/20
 * @Modified By:
 */
public class ShiroUser {

    public Integer id;          // 主键ID
    public String username;      // 账号
    public String password;      // 密码
    public String personname;         // 姓名
    public String salt;      //加密密码的盐
    public Integer sex;     //性别
    public List<Integer> rolelist; // 角色集
    public String dept;        // 部门号

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPersonname() {
        return personname;
    }

    public void setPersonname(String personname) {
        this.personname = personname;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public Integer getSex() {
        return sex;
    }

    public void setSex(Integer sex) {
        this.sex = sex;
    }

    public List<Integer> getRolelist() {
        return rolelist;
    }

    public void setRolelist(List<Integer> rolelist) {
        this.rolelist = rolelist;
    }

    public String getDept() {
        return dept;
    }

    public void setDept(String dept) {
        this.dept = dept;
    }

    @Override
    public String toString() {
        return "ShiroUser{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", personname='" + personname + '\'' +
                ", salt='" + salt + '\'' +
                ", sex=" + sex +
                ", rolelist=" + rolelist +
                ", dept='" + dept + '\'' +
                '}';
    }
}
