package com.huzp.cmsys.system.entity;

import java.util.Date;

/**
 * @Author: huzp
 * @Description: 自己的文件夹类
 * @Date: 9:22 2018/2/2
 * @Modified By:
 */
public class MyFile {

    private Integer id;
    private String filename;
    private String filepath;
    private String filecap;
    private Date createtime;
    private Integer username;

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

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getFilepath() {
        return filepath;
    }

    public void setFilepath(String filepath) {
        this.filepath = filepath;
    }

    public String getFilecap() {
        return filecap;
    }

    public void setFilecap(String filecap) {
        this.filecap = filecap;
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }


    @Override
    public String toString() {
        return "MyFile{" +
                "id=" + id +
                ", filename='" + filename + '\'' +
                ", filepath='" + filepath + '\'' +
                ", filecap='" + filecap + '\'' +
                ", createtime=" + createtime +
                ", username=" + username +
                '}';
    }
}
