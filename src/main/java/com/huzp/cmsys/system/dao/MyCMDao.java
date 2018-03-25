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

}
