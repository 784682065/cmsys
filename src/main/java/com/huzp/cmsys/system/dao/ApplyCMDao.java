package com.huzp.cmsys.system.dao;

import com.huzp.cmsys.system.entity.ApplyCM;
import com.huzp.cmsys.util.Page;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * @Author: huzp
 * @Description:
 * @Date: 16:13 2018/3/7
 * @Modified By:
 */
@Component
public interface ApplyCMDao {

    //保存申请信息
    void saveMes(ApplyCM applyCM);

    //获得所有条数记录
    Integer getTotal();

    //分页查找所有未曾决策的申请信息
    List<Map<String,Object>> findAllMes(@Param("offset") int offset,@Param("limit") int limit);

    //根据id查找某一条Mes
    Map<String,Object> findMesById(Integer id);

    //根据id 更新申请的sign
    void  UpdateSignById(Integer arg0, String arg1);

    //根据id更新status
    void UpdateStatusById(Integer id);

    //根据社团名字查找是否有相同的社团
    String findCMByName (String cmname);

    //社团表增加社团
    void addCommunity (Map<String,Object> addCm);

    //社长插入社团人员表
    void addMemberProprieter (Map<String,Object> addMp);

    //根据社团名字查找社团id
    Integer findCmIdByName(String name);

    //查找所有社团的数量
    Integer getTotalCM();

    //分页查找出所有的社团
    List<Map<String,Object>> findAllCM(@Param("offset") int offset,@Param("limit") int limit);

}
