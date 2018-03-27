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

    //获得某社团所有活动
    Integer getTotalCmInform(Integer id);

    //保存活动信息到信息表
    void saveInform(Map<String,Object> map);

    //保存公告到信息镖
    void saveNotices(Map<String,Object> map);

    //查找某个社团的所有信息
    List<Map<String,Object>> cmInform(@Param("cmid") int cmid , @Param("offset") int offset, @Param("limit") int limit);
}
