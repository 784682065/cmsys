package com.huzp.cmsys.system.dao;

import com.huzp.cmsys.system.entity.MyFile;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @Author: huzp
 * @Description:
 * @Date: 9:27 2018/2/2
 * @Modified By:
 */
@Component
public interface MyFileDao {

     void save(MyFile myFile);

     String getPathByName(String filename);

     List<MyFile> getMyFile(Integer username);

     void deleteFile(String fileName);

     //根据用户名获得他的文件列表
     Integer findTotalFile(Integer username);


}
