package com.huzp.cmsys.system.entity;

import java.util.Date;

/**
 * @Author: huzp
 * @Description: 申请或者解散社团
 * @Date: 16:08 2018/3/7
 * @Modified By:
 */
public class ApplyCM {

    private Integer id;
    private String type;
    private String cmname;
    private String applyreason;
    private String cmdirection;
    private Integer applicant;
    private Date createtime;
    private int status;
    private String sign;


    public String getSign() {
        return sign;
    }

    public void setSign(String sign) {
        this.sign = sign;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCmname() {
        return cmname;
    }

    public void setCmname(String cmname) {
        this.cmname = cmname;
    }

    public String getApplyreason() {
        return applyreason;
    }

    public void setApplyreason(String applyreason) {
        this.applyreason = applyreason;
    }

    public String getCmdirection() {
        return cmdirection;
    }

    public void setCmdirection(String cmdirection) {
        this.cmdirection = cmdirection;
    }

    public Integer getApplicant() {
        return applicant;
    }

    public void setApplicant(Integer applicant) {
        this.applicant = applicant;
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "ApplyCM{" +
                "id=" + id +
                ", type='" + type + '\'' +
                ", cmname='" + cmname + '\'' +
                ", applyreason='" + applyreason + '\'' +
                ", cmdirection='" + cmdirection + '\'' +
                ", applicant=" + applicant +
                ", createtime=" + createtime +
                ", status=" + status +
                ", sign='" + sign + '\'' +
                '}';
    }
}
