package com.huzp.cmsys.system.dao;


import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

@Component
public interface PageDao {

    //获得所有记录条数
    Integer getTotal(@Param("tableName") String tableName);




}
