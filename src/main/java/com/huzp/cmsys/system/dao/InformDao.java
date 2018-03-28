package com.huzp.cmsys.system.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * @Author: huzp
 * @Description:
 * @Date: Created in  15:16 2018/3/27
 * @param:
 */
@Component
public interface InformDao {

    //获得所有活动与通知
    Integer getTotal();

    //获得某社团所有活动
    Integer getTotalCmInform(Integer id);

    //获得所有通知
    Integer getTotalNotices();

    //保存活动信息到信息表
    void saveInform(Map<String,Object> map);

    //保存公告到信息镖
    void saveNotices(Map<String,Object> map);

    //查找某个社团的所有信息
    List<Map<String,Object>> cmInform(@Param("cmid") int cmid , @Param("offset") int offset, @Param("limit") int limit);

    //查找所有公告
    List<Map<String,Object>> Allnotices(@Param("offset") int offset, @Param("limit") int limit);

    //查找所有信息
    List<Map<String,Object>> Allmes(@Param("offset") int offset, @Param("limit") int limit);


    //查找具体某条信息
    Map<String,Object> findMesById(Integer id);


    //获得前五条活动
    List<Map<String,Object>> get5Inform();

    //获得前五条通知
    List<Map<String,Object>> get5Notices();


}
