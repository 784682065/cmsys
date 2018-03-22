package com.huzp.cmsys.system.entity;

import java.util.Date;

/**
 * @Author: huzp
 * @Description:
 * @Date: 13:27 2018/3/1
 * @Modified By:
 */
public class Mail {

    private Integer id;
    private String title;
    private String contents;
    private Integer status;
    private Date senddata;
    private Integer sendee;
    private Integer createuser;

    public Integer getCreateuser() {
        return createuser;
    }

    public void setCreateuser(Integer createuser) {
        this.createuser = createuser;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContents() {
        return contents;
    }

    public void setContents(String contents) {
        this.contents = contents;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Date getSenddata() {
        return senddata;
    }

    public void setSenddata(Date senddata) {
        this.senddata = senddata;
    }

    public Integer getSendee() {
        return sendee;
    }

    public void setSendee(Integer sendee) {
        this.sendee = sendee;
    }

    @Override
    public String toString() {
        return "Mail{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", contents='" + contents + '\'' +
                ", status=" + status +
                ", senddata=" + senddata +
                ", sendee=" + sendee +
                ", createuser=" + createuser +
                '}';
    }
}
