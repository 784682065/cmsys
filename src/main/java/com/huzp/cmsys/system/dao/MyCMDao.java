package com.huzp.cmsys.system.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * @Author: huzp
 * @Description:
 * @Date: Created in 13:53 2018/3/25
 * @param:
 */
@Component
public interface MyCMDao {

    //查找记录总条数
    Integer getTotal();

    //查找我的社团
    List<Map<String,Object>> findMyCM(@Param("username") Integer username,@Param("offset") int offset,@Param("limit") int limit);

    //查询某个社团的信息
    Map<String,Object> findCM(Integer cmid);

    //更新社团信息
    void  updateCM(Map<String,Object> map);

    //退出社团
    void  quitMycm(@Param("cmid") int cmid,@Param("username") Integer username);

    //根据社团id 查找社团创建者
    Integer findCMPosition(int cmid);

}
