package com.huzp.cmsys.system.entity;

/**
 * @Author: huzp
 * @Description:
 * @Date: 13:22 2018/1/29
 * @Modified By:
 */
public class User {


    /**
     * 用户id, 用户名, 用户密码, 用户真实姓名, 用户性别
     * 密码盐值, 用户社团号, 用户角色号, 用户邮箱, 用户电话
     * 用户生日, 用户创建时间
     */
    private Integer id;
    private Integer username;
    private String password;
    private String personname;
    private Integer sex;
    private String salt;
    private String dept;
    private String role;
    private String email;
    private String phone;
    private String birth;
    private String createtime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUsername() {
        return username;
    }

    public void setUsername(Integer username) {
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

    public Integer getSex() {
        return sex;
    }

    public void setSex(Integer sex) {
        this.sex = sex;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public String getDept() {
        return dept;
    }

    public void setDept(String dept) {
        this.dept = dept;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getBirth() {
        return birth;
    }

    public void setBirth(String birth) {
        this.birth = birth;
    }

    public String getCreatetime() {
        return createtime;
    }

    public void setCreatetime(String createtime) {
        this.createtime = createtime;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username=" + username +
                ", password='" + password + '\'' +
                ", personname='" + personname + '\'' +
                ", sex=" + sex +
                ", salt='" + salt + '\'' +
                ", dept='" + dept + '\'' +
                ", role='" + role + '\'' +
                ", email='" + email + '\'' +
                ", phone=" + phone +
                ", birth='" + birth + '\'' +
                ", createtime='" + createtime + '\'' +
                '}';
    }
}
